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
            <v-container fluid>
                <v-row>
                    <v-col cols="12">
                        <top-tipsters></top-tipsters>
                    </v-col>
                </v-row>            
            </v-container>
        </v-col>
        </v-row>
</template>

<script>
import topTipsters from "../views/RightSidebar/PanelTopTipsters.vue";

export default {
  name: "layout",

  components: {
      topTipsters
  },

}
</script>