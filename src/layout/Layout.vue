<template>
    <v-row>
        <v-col 
            class="col-md-2 sidebar">
            <router-view name="sidebar" />
        </v-col>
        <v-col 
            class="col-md-8 main">
            <router-view name="main" />
        </v-col>
        <v-col
            class="col-md-2"
        >
            <topTipsters></topTipsters>
        </v-col>
        </v-row>
</template>

<script>
import topTipsters from '../views/Dashboard/PanelTopTipsters.vue';

export default {
  name: "layout",

  components: {
    topTipsters
  },

}
</script>