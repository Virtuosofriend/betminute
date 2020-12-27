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
import { mapGetters } from "vuex";

export default {
  name: "App",
  
  computed: {
    ...mapGetters({
      loggedIn: "auth/isLoggedIn",
      userInfo: "auth/userInformation",
      user:     "feed/information"
    }),
    },

  mounted() {
    console.log(`Bet minute - v${process.env.VUE_APP_VERSION}`);
  }
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Fira+Sans:100,300,400,600,800&display=swap&subset=greek');
  .v-application {
    background-color: var(--v-background-base) !important;
  }

  .container-top {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
  }

  :root {
    --theme-black: #000;
    --theme-dark: #363D44;
    --theme-dark-subtitle: #727c86;
    --theme-dark-border: #2b3339;
    --theme-dark-60: #181e23;
    --theme-dark-30: #fff;
    --theme-dark-10: #2c343a;
    --theme-dark-sidebar: #16191c;
    --theme-dark-active: #fff;
    --theme-dark-orange: #A24E3D;
    --theme-dark-brow: #59291E;
    --theme-dark-accent: #5F86A3;
    --theme-dark-success: #4bb288;
    --theme-dark-error: #aa2e38;
    --theme-dark-warning: #eb9a28;
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
    padding: 2em;
  }
  .sidebar {
    align-self: stretch;
    background-color: var(--theme-dark-sidebar);
  }

  .main--wrapper {
    margin-top: 0;
    padding: 0em 1em 0 1em;
  }

  .main--title {
    margin: 1em 0;
    text-transform: capitalize;
  }

  .subtitle {
    font-weight: 400;
    text-transform: capitalize;
  }

  /* General Compns */
  .theme--dark.v-tabs-items {
    background-color: transparent !important;
  }
  .v-progress-circular__underlay {
    z-index: 1;
    stroke: #2c343a !important;
  }
  .v-slide-group__content.v-tabs-bar__content {
    background-color: #181e23 !important;
  }

  /*** Cards  ***/
  .card--box {
    display: flex;
    width: 100%;
    background-color: var(--theme-dark-10);
    border-radius: 15px;
    flex-wrap: wrap;
    margin: .5em auto;
    min-height: 50px;
  }

  .card--box__title {
    padding-left: .5em;
    margin: .5em 0;
    font-weight: 600;
    text-transform: initial;
  }

  .card--content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: .5em 1em;
  }

  .card--content div {
    width: 100%;
  }

  .card__box {
    width: 100%;
    background-color: var(--theme-dark-10);
    border-radius: 15px;
    margin: .5em auto;
    min-height: 50px;
  }

  .card__box-title {
      padding-left: 16px;
      padding-top: 8px;
      font-weight: 600;
      text-transform: initial;
  }

  /** Tabs **/
  .tab--title_active {
    font-weight: 600 !important;
  }

  /** Tables **/
  .custom__table tr {
      background-color: var(--v-accent-base);
  }

  .custom__table thead tr {
      background-color: var(--v-background-lighten2);
  }

  .custom__table thead th {
      border: 0 !important;
  }
  .custom__table tr {
      border: 0;
  }
  .custom__table tbody td {
      border: 0 !important;
  }
  tr.active {
        background-color:var(--v-background-base) !important; 
  }
  .custom__table .v-data-footer {
      background-color: var(--v-background-lighten2);
      border-top: 0 !important;
  }
.highcharts-area.zone-0 {
  fill: #f7a35c;
}
  /** Helpers **/
  .w-100 {
    width: 100%;
  }
  .letter-spacing-initial {
    letter-spacing: initial !important;
  }
  .text-transform-initial {
    text-transform: initial !important;
  }
</style>