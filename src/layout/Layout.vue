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
import { mapGetters } from 'vuex';
import topTipsters from '../views/Dashboard/PanelTopTipsters.vue';

export default {
  name: "layout",

  components: {
    topTipsters
  },

  computed: {
    ...mapGetters({
        loggedIn: 'auth/isLoggedIn',
        userInformation: 'auth/userInformation'
    })
  },
  data() {
    return {

    }
  },
  created() {
    if (this.loggedIn) {
      this.$store.dispatch('auth/socketLogin').then(res => {
        if (res) {          
          this.$store.dispatch('user/userBanka', {...this.userInformation})
        }
      });
    }
    
  }
}
</script>