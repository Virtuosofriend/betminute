<template>
    <v-btn-toggle
        v-model="selection"
        small
        background-color="transparent"
        dark
        multiple
        borderless
        style="align-items:center"
        @change="applyFilter()"
      >
        <v-btn 
            depressed
            color="accent lighten-1"
            class="letter-spacing-initial text-transform-initial small-fs"
            value="hot30"
        >
            <!-- <img :src="hot30"> -->
            Hot <br>30
        </v-btn>

        <v-btn 
            depressed
            color="accent lighten-1"
            class="letter-spacing-initial text-transform-initial small-fs"
            value="hot70"
        >
            <!-- <img :src="hot70"> -->
            Hot <br>70
        </v-btn>

        <v-btn 
            depressed
            color="accent lighten-1"
            class="letter-spacing-initial text-transform-initial small-fs"
            value="wait_goal"
        >
            <!-- <img :src="late"> -->
            Late <br>Goal
        </v-btn>
      </v-btn-toggle>
</template>

<script>
import hot30 from "../../assets/livescore/hot30.png";
import hot70 from "../../assets/livescore/hot70.png";
import late from "../../assets/livescore/lategoal.png";

import { mapState } from "vuex";

export default {
    name: "Livescore__filters",

    data() {
        return {
            selection:  [],
            hot30,
            hot70,
            late
        }
    },

    computed: {
        ...mapState({
            filter: state => state.feed.filter_feed
        })
    },

    methods: {
        applyFilter() {
            this.$store.dispatch("feed/setFeedFilter", this.selection)
        }
    },

    mounted() {
        this.selection = this.filter;
    }
}
</script>

<style lang="scss" scoped>
.small-fs {
    font-size: 12px;
}
</style>