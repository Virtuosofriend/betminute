<template>
    <v-container 
      fluid
    >
      <v-row>
        <v-col md="12">
          <div class="main--wrapper">
            <div class="daily--tip">
              
              <div class="daily--tip-wrapper">
                <div>
                  <h2>
                    {{ $t( `Sidebar.myFeed` ) }}
                  </h2>
                </div>
              </div>
            </div>
            <v-tabs
                fixed-tabs
                background-color="background"
                dark
                v-model="tabs"
                slider-color="#2c343a"
                slider-size="1"
              >
                <v-tab 
                  class="tab--title"
                  href="#live"
                >
                  {{ $t( `myFeed.livefeed` ) }} 
                </v-tab>

                <v-tab 
                  class="tab--title"
                  href="#timeline"
                >
                  {{ $t( `myFeed.timeline` ) }}
                </v-tab>

                <v-tab 
                  class="tab--title"
                  href="#favs"
                >
                  {{ $t( `myFeed.favorites` ) }}
                </v-tab>

              </v-tabs>

              <v-tabs-items
                v-model="tabs"
                dark
                class="tabs--wrapper"
              >
                <v-tab-item
                  style="background-color: transparent"
                  value="live"
                >
                    <v-responsive
                        class="overflow-y-auto"
                        max-height="960"
                    >
                        <livescore
                            :data="feed"
                        ></livescore>
                    </v-responsive>
                               
                </v-tab-item>

                <v-tab-item
                  style="background-color: transparent"
                  class="scrollable overflow-y-auto"
                  value="timeline"
                >
                  <livescore
                    :data="finished"
                  ></livescore>                  
                </v-tab-item>
                
              </v-tabs-items>
          </div>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'myfeed',

    data() {
        return {
            tabs: null,
        }
    },

    computed: {
        ...mapGetters({
            feed:         "feed/liveAndnotStarted",
            finished:     "feed/finished"
        })
    },

    components: {
        livescore: () => import("../components/MyFeed/Livescore")
    },  
}
</script>

<style>
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

.scrollable {
  max-height: 960px;
  overflow-y: scroll;
  scrollbar-color: var(--theme-dark-border) var(--theme-dark-60);
  scrollbar-width: none;
}

.feed--box {
    margin: 2em auto;
}

.feed--box-league {
    padding: 1em auto;
}

.feed--box-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1em 0;
}

.feed--box-header div {
    width: 100%;
}

.country {
    margin-left: 2em;
}
.feed--box-header p {
    margin-bottom: 0;
    display: inline-flex;
    font-size: 13px;
}

p.country-name {
    color: var(--theme-dark-subtitle);
    margin-left: 1em;
}

p.league-name {
    color: var(--theme-dark-30);
}
</style>