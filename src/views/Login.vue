<template>
    <v-container fluid class="login--wrapper">
        <div class="login--wrapper-overlay"></div>
        <div class="login--box">
            <div class="mb-4">
                <h1>BetMinute<span>please login</span></h1>
            </div>
            <div class="login--form mt-4">
                <v-form
                ref="loginForm"
                full-width
                >
                <v-text-field
                    v-model="loginData.name"
                    label="Username"
                    flat
                    full-width
                    background-color="#dadada"
                    class="login--fields"
                ></v-text-field>

                <v-text-field
                    v-model="loginData.pass"
                    label="Password"
                    type="password"
                    flat
                    full-width
                    background-color="#dadada"
                    class="login--fields"
                ></v-text-field>

                <v-btn
                    color="primary"
                    block
                    @click="login()"
                >
                    Login
                </v-btn>
                </v-form>
            </div>
            <div class="my-5">
                <v-btn 
                    text 
                    small
                    color="#fff"
                >Forgot your password?</v-btn>
            </div>
            <div class="my-2">
                <p class="login--create-text">
                    You don't have an account?
                </p>
                <v-btn 
                    text 
                    small
                    color="#fff"
                >Create one</v-btn>
            </div>
        </div>
  </v-container>
</template>

<script>
import router from '../router';

export default {
    data() {
        return {
            loginData: {}
        }
    },
    methods: {
        login() {          
            this.$store.dispatch('auth/socketLogin', this.loginData).then((res) => {               
                router.push("/");
            });
        }
    }
}
</script>

<style scoped>
    .login--wrapper {
        height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url("../assets/login.jpg");
        background-size: cover;
        background-position: center center
    }
    .login--wrapper-overlay {
        background-color: rgba(0,0,0, .8);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        width: 100%;
    }
    .login--box {
        background-color: var(--theme-darkblue);
        width: 550px;
        height: 420px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2em;
        z-index: 10;
        background-color: var(--theme-dark-60);
        border-radius: 15px;
    }

    .login--form {
        width: 100%;
    }
    .login--fields {
        height: 60px;
    }
    h1 {
        line-height: 1em;
    }
    h1 span {
        font-weight: 100;
        color: #fff;
        display: block;
        font-size: 1.6rem;
    }
    .login--create-text {
        display: inline;
        color: #bebebe;
        font-size: .9rem;
    }
</style>