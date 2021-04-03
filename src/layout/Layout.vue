<template>
    <v-row no-gutters>
        <v-col 
            class="col-md-2 sidebar"
        >
            <router-view name="sidebar" />
        </v-col>
        <v-col 
            class="col-md-8 h-100 pl-2"
        >
            <router-view name="main" />
        </v-col>
        <v-col
            class="col-md-2"
        >
            <v-container fluid>
                <v-row>
                    <v-col cols="12">
                        <top-tipsters></top-tipsters>
                    </v-col>
                    <v-col cols="12">
                        <favorite-games></favorite-games>
                    </v-col>
                </v-row>            
            </v-container>
        </v-col>
        </v-row>
</template>

<script>
import FavoriteGames from "../components/RightSidebar/FavoriteGames.vue";
import topTipsters from "../views/RightSidebar/PanelTopTipsters.vue";

export default {
    name: "Main__layout",
    
    components: {
        FavoriteGames,
        topTipsters,
    },

    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.$store.dispatch("auth/socketLogin");
        });
    }
}
</script>