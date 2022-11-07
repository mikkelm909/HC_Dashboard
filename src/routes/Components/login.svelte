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
	import { debug } from 'svelte/internal';

	export let api = ''; //makes it so the api string can be inserted to the component

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

	const login = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredentials) => {
				user = userCredentials.user;
				storeUser.set(user.email);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode + errorMessage);
			});
	};

	const logout = async () => {
		signOut(auth)
			.then(() => {
				user = null;
				storeUser.set('');
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

{#if user != null}
	<p>Signed in!</p>
	<button on:click={logout}>Logout</button>
{:else}
	<input type="email" id="email" placeholder="email" bind:value={email} />
	<input type="password" id="password" placeholder="password" bind:value={password} />
	<button on:click={login}>Login</button>
{/if}
