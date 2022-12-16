<script lang="ts">
	import { onMount } from 'svelte';
	import { initializeApp } from '@firebase/app';
	import {
		getAuth,
		signInWithEmailAndPassword,
		signOut,
		onAuthStateChanged,
		type User
	} from 'firebase/auth';
	import { storeUser } from '$protectedUser';
	import { debug, has_prop } from 'svelte/internal';
	import { error } from '@sveltejs/kit';
	import { storeHCPId } from '$protectedMongoId';
	import Navbar from './navbar.svelte';

	export let api = ''; //makes it so the api string can be inserted to the component
	export let healthcareProfessionals: any[] = [{}];
	let mongoId = healthcareProfessionals[0]._id;
	//https://www.youtube.com/watch?v=PXf0t6Id7i0&ab_channel=IvanSantos
	const firebaseConfig = {
		apiKey: api,
		authDomain: 'stepup-health.firebaseapp.com',
		projectId: 'stepup-health',
		storageBucket: 'stepup-health.appspot.com',
		messagingSenderId: '155380053451',
		appId: '1:155380053451:web:870d0809c0a08aa580324e',
		measurementId: 'G-5YFZ569QL8'
	};

	const app = initializeApp(firebaseConfig);

	const auth = getAuth(app);

	let user: User | null;
	let email = '';
	let password = '';
	let errorMessage = '';

	const login = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredentials) => {
				let foundUser = healthcareProfessionals.find(
					(hp) => hp.firebaseUID == userCredentials.user.uid
				);
				if (foundUser != null) {
					user = userCredentials.user;
					storeHCPId.set(foundUser.id);
					storeUser.set(JSON.stringify(user));
					errorMessage = '';
				} else {
					user = null;
					errorMessage = 'Only healthcare professionals can use this service!';
				}
			})
			.catch((error) => {
				const errorCode = error.code;
				const fireError = error.message;
				errorMessage = 'Wrong password!';
			});
	};

	const logout = async () => {
		signOut(auth)
			.then(() => {
				user = null;
				storeUser.set('');
				storeHCPId.set('');
				console.log('You are logged out!');
			})
			.catch((error) => {
				console.log('Error logging out!');
			});
	};

	onMount(async () => {
		onAuthStateChanged(auth, (newUser) => {
			user = newUser;
		});
	});
</script>

<Navbar />
<div class="container-fluid" style="margin: auto; text-align: center;">
	<h1>Welcome to Healthcare Dashboard!</h1>
</div>
<div
	class="container-fluid"
	style="margin: auto; width: 35%; background-color: grey; padding: 10px; margin-top: 20%"
>
	{#if $storeUser != ''}
		<p>Signed in!</p>
		<button class="btn btn-primary" on:click={logout}>Logout</button>
	{:else}
		<div class="form-group">
			<input
				class="form-control"
				type="email"
				id="email"
				placeholder="email"
				bind:value={email}
			/><br />
			<input
				class="form-control"
				type="password"
				id="password"
				placeholder="password"
				bind:value={password}
			/><br />
			<button class="btn btn-primary" on:click={login}>Login</button>
			<p style="color: red;">{errorMessage}</p>
		</div>
	{/if}
</div>
