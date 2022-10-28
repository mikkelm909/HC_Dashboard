<script lang="ts">
    import { onMount } from "svelte"
    import { initializeApp } from "@firebase/app";
    import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from "firebase/auth";
    //https://www.youtube.com/watch?v=PXf0t6Id7i0&ab_channel=IvanSantos
    const firebaseConfig = {
        apiKey: "AIzaSyCnM42APKThIKwvesEAwoXmE6DLbHlk6Z0",
        authDomain: "stepup-health.firebaseapp.com",
        projectId: "stepup-health",
        storageBucket: "stepup-health.appspot.com",
        messagingSenderId: "155380053451",
        appId: "1:155380053451:web:870d0809c0a08aa580324e",
        measurementId: "G-5YFZ569QL8"
    };

    const app = initializeApp(firebaseConfig);

    const auth = getAuth(app);

    let user: User | null;
    let email = "";
    let password = "";
    
    const login = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            user = userCredentials.user;
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + errorMessage);
        })
    };

    const logout = async () => {
        signOut(auth).then(() => {
            user = null;
            console.log("You are logged out!");
        }).catch((error) => {
            console.log("Error logging out!")
        })
    };

    onMount(async () => {
        onAuthStateChanged(auth, (newUser) => {
            user = newUser;
        })
    })
</script>



{#if user}
    <p>Signed in!</p>
    <button on:click={logout}>Logout</button>
{:else}
    <input type="email" id="email" placeholder="email" bind:value={email}>
    <input type="password" id="password" placeholder="password" bind:value={password}>
    <button on:click={login}>Login</button>
{/if}