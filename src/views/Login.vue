<template>
    <v-container fluid class="login--wrapper">
        <div class="login--wrapper-overlay"></div>
        <div class="login--box">
            <div class="mb-4">
                <h1>BetMinute
                    <span>
                        {{ $t( `Login.subtitle` ) }}
                    </span>
                </h1>
            </div>
            <div class="login--form mt-4">
                <v-form
                	ref="loginForm"
                	full-width
                >
                <v-text-field
                    v-model="formData.name"
                    :label="`${ $t('Login.username')}`"
                    flat
                    solo
                    full-width
                    background-color="#dadada"
                    class="login--fields"
                    :error-messages="errorMessage('name')"
                    @input="$v.formData.name.$touch()"
                    @blur="$v.formData.name.$touch()"
                ></v-text-field>

                <v-text-field
                    v-model="formData.pass"
                    :label="`${ $t('Login.password')}`"
                    type="password"
                    flat
                    solo
                    full-width
                    background-color="#dadada"
                    class="login--fields"
                    :error-messages="errorMessage('pass')"
                    @input="$v.formData.pass.$touch()"
                    @blur="$v.formData.pass.$touch()"
                ></v-text-field>

                <v-btn
                    color="success"
                    block
                    dark
                    depressed
                    @click="login()"
                    :disabled="$v.$invalid"
                    class="mt-4"
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

        <login-notification
            :status="loading"
            :message="message"
            @resetDialog="resetDialog()"
        ></login-notification>
  </v-container>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import LoginNotification from '../components/General/Notifications/LoginNotification.vue';
import { CONFIG } from "../commons/config";

export default {
    name:   "Login__page",

    validations: {
        formData: {
            name:  {
                required
            },
            pass: {
                required
            }
        }
    },

    data() {
        return {
            formData:   {},
            loading:    false,
            message:    ""
        }
    },

    methods: {
        login() {
            this.loading = true;

            const xhttp = new XMLHttpRequest();
            xhttp.open("POST", `${CONFIG.login_api}login.php`, true);
            xhttp.responseType = "json";
            xhttp.send(JSON.stringify(this.formData));

            xhttp.onload = res => {
                if ( xhttp.response != null ) {
                    const { user } = xhttp.response;
                    if ( user ) {
                        localStorage.setItem("bm_token", user.session_token);
                        localStorage.setItem("bm_user", user.user_name);
                        localStorage.setItem("bm_userID", +user.user_id);
                        localStorage.setItem("bm_avatar", user.user_picture);
                        this.$store.commit("auth/session", { 
                            token:  user.session_token, 
                            user:   user.user_name, 
                            id:     +user.user_id, 
                            avatar: user.user_picture 
                        });
                        this.loading = false;
                        return this.$router.push({ name: "dashboard" });
                    }

                    return this.message = xhttp.response.message;
                }

                return this.message = `You have to choose an email and a password`;
            };

            xhttp.onerror = error => {
                console.log(error)
                return error;
            };
        },

        errorMessage(field) {
            const errors = [];
                if (!this.$v.formData[field].$dirty) return errors
                !this.$v.formData[field].required && errors.push(this.$i18n.t(`ErrorMessages.required`))
                return errors
        },

        resetDialog() {
            this.loading = false;
            this.message = ""
        }
    },

    beforeDestroy() {
        this.$off("resetDialog");
    },

    components: { 
        LoginNotification 
    }
}
</script>

<style scoped lang="scss">
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
        height: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2em 3em;
        z-index: 10;
        background-color: var(--theme-dark-60);
        border-radius: 10px;
    }

    .login--form {
        width: 100%;
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