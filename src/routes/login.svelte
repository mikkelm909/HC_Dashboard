<script lang="ts">
    import { initializeApp } from "@firebase/app";
    
    const firebaseConfig = {
        apiKey: "AIzaSyCnM42APKThIKwvesEAwoXmE6DLbHlk6Z0",
        authDomain: "stepup-health.firebaseapp.com",
        projectId: "stepup-health",
        storageBucket: "stepup-health.appspot.com",
        messagingSenderId: "155380053451",
        appId: "1:155380053451:web:870d0809c0a08aa580324e",
        measurementId: "G-5YFZ569QL8"
    };

    let email = "";
    let password = "";

    const login = () => {};

    const logout = () => {};
</script>

<input type="email" id="email" placeholder="email" bind:value={email}>
<input type="password" id="password" placeholder="password" bind:value={password}>
<button on:click={login}>Login</button>
<button on:click={logout}>Logout</button>