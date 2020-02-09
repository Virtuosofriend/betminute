<template>
  <v-app>
    <v-container 
      fluid
      class="container-top"
    >
    <router-view />
  </v-container>
   
  </v-app>
</template>

<script>
import { bus } from './main';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters({
      notifications: 'notifications/notifications',
      confirmDialog: 'notifications/dialog',
      loggedIn: 'auth/isLoggedIn',
      userInformation: 'auth/userInformation'
    })
  },

  data: () => ({
  }),

  methods: {
  },

  mounted() {
    if (this.loggedIn) {
      this.$store.dispatch('auth/socketLogin').then(res => {
        if (res) {
          this.$store.dispatch('user/userBanka', {...this.userInformation})
        }
      });
    }
    
  }
  
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Fira+Sans:100,300,400,600,800&display=swap&subset=greek');
  .v-application {
    background-color: var(--v-background-base) !important;
  }
  :root {
    --theme-black: #000;
    --theme-dark: #495059;
    --theme-orange: #ff6768;
    --theme-dark-border: #2b3339;
    --theme-dark-60: #181e23;
    --theme-dark-30: #fff;
    --theme-dark-10: #2c343a;
    --theme-dark-sidebar: #16191c;
    --theme-dark-active: #fff;
    --theme-dark-warning: #EA665D;
    --theme-dark-success: #97e899;
  }

  body,html {
    height: 100%;
    width: 100%;
    margin: 0;
    color: var(--theme-dark-60);
  }

  h1,h2,h3,h4,h5,h6 {
    color: var(--theme-dark-30);
    text-transform: uppercase;
  }

  h1 small,
  h2 small,
  h3 small,
  h4 small,
  h5 small,
  h6 small {
    text-transform: lowercase;
    font-size: 70%;
    color: var(--theme-dark-active);
  }

  button:focus {
    outline:0 !important;
  }

  a {
   outline: 0;
  }

  .theme--error {
    color: var(--theme-dark-warning) !important;
  }

  .theme--success {
    color: var(--theme-dark-success) !important;
  }

  .main {
    background-color: var(--theme-dark-60);
  }
  .sidebar {
    align-self: stretch;
    background-color: var(--theme-dark-sidebar);
  }

  .container-top {
    padding-top: 0px !important;
    height: 100vh;
    display: flex;
    align-items: flex-start;
  }

  .main--wrapper {
    padding: 1em 1em;
    height: 100%;
  }

  .main--card {
    background-color: var(--theme-dark-10) !important;
  }

  .main--card-title {
    padding: 20px 1em;
    color: var(--theme-dark-30);
    font-size: 20px;
  }
  
  .main--card-title::before {
    display: block;
    content: '';
    font-weight: 900;
  }

  .main--card-body {
    background-color: var(--theme-dark-60);
    padding: 1.5em 2em;
    margin-top: .2em;
    border-radius: 15px;
    min-height: 350px;
  }

  .main--card-modal {
    min-height: 300px;
  }

  .main--card-modal .modal-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
  }

  .main--card-modal img {
    height: 180px;
    margin-bottom: 2em;
    opacity: .6;
  }

  .theme--dark.v-list {
    background-color: transparent !important;
    margin: auto 1em;
  }

  .v-list-item.theme--dark {
   background-color: #0a3a53;
   border-radius: 5px;
  }
  .v-list-item.theme--dark:not(:last-of-type) {
    border-bottom: 2px solid var(--theme-darkblue);
    
  }

  .theme--dark.v-data-table {
    background-color: var(--theme-dark-60) !important;
  }

  .table--card header {
    background-color: var(--theme-dark-60) !important;
  }

  .theme--light.v-list {
    background-color: var(--theme-dark-30) !important;
  }

  .theme--light.v-list .v-list-item .v-list-item__title {
    font-size: 14px;
  }

  .error-messages-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .error-messages-box .error-messages-success {
    color: var(--theme-dark-success);
  }

  .error-messages-box .error-messages-fail {
    color: var(--theme-dark-warning);
  }
</style>