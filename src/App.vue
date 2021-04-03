<template>
    <v-app>
        <v-container 
            fluid
            class="container-top"
        >   
            <router-view />
        </v-container>
        <app-overlay></app-overlay>
    </v-app>
</template>

<script>
export default {
    name: "App",

    components: {
        AppOverlay: () => import("./components/General/Notifications/AppOverlay.vue")
    },
  
    mounted() {
        console.log(`Bet minute - v${process.env.VUE_APP_VERSION}`);
    }
};
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Fira+Sans:100,300,400,600,800&display=swap&subset=greek');
    @import url("./sass/scrollbar.scss");
    @import url("./sass/common.scss");
    @import url("./sass/components.scss");

</style>