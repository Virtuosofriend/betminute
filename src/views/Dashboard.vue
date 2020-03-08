<template>
    <v-container 
      fluid
    >
      <v-row>
        <v-col md="8">
          <div class="main--wrapper">
            <div class="daily--tip">
              
              <div class="daily--tip-wrapper">
                <div>
                  <h2>Daily suggestion</h2>
                </div>

              </div>
            </div>
            <h2 class="main--title">System picks</h2>
            <panelOver05></panelOver05>
              
            <panelOver15 class="mt-5"></panelOver15>
          </div>
        </v-col>

        <v-col md="4">
          <topTipsters></topTipsters>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

import panelOver05 from '../views/Dashboard/PanelOver05.vue';
import panelOver15 from '../views/Dashboard/PanelOver15.vue';
import topTipsters from '../views/Dashboard/PanelTopTipsters.vue';

export default {
  name: 'dashboard',
  components: {
    panelOver05,
    panelOver15,
    topTipsters
  },
  data() {
    return {      
    }
  },
  mounted() {
    this.$store.dispatch("dashboard/fetchLists");
  }
}
</script>

<style scoped>
.daily--tip {
  background: url("../assets/dashboard/dailytip.jpg") no-repeat 50% 30%;
  background-size: cover;
  width: 100%;
  height: 100%;
  overflow: hidden;
  min-height: 350px;
  border-radius: 15px;
}

.daily--tip .overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,.5);
  z-index: 0;
}

.daily--tip-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1em;
  position: relative;
}

.daily--tip-wrapper h2 {
  font-weight: 400;
}

</style>