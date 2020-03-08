<template>
  <v-row>
      <v-col class="col-2 sidebar">
        <router-view name="sidebar" />
      </v-col>
      <v-col class="col-10 main">
        <router-view name="main" />
      </v-col>
    </v-row>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "layout",
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