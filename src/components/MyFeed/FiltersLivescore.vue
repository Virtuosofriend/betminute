<template>
    <v-select
        :items="selection_items"
        v-model="selection"
        dark
        solo
        flat
        dense
        hide-details
        label="Filters"
        full-width
        item-color="accent"
        background-color="background lighten-2"
        color="primary"
        @change="emitSelection()"
    >
        <template #label>
            <p class="small-fs">
               {{ $t(`myFeed.filters.title`) }} 
            </p>
        </template>
    </v-select>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "Livescore__filters",

    data() {
        return {
            selection:  "",
            
        }
    },

    computed: {
        ...mapState({
            filter: state => state.feed.filter_feed
        }),

        selection_items() {
            return [{
                id: 1,
                text:   this.$i18n.t(`myFeed.filters.over05HT`),
                value:  "over05HT"
            },{
                id: 2,
                text:   this.$i18n.t(`myFeed.filters.over05FT`),
                value:  "over05FT"
            },{
                id: 3,
                text:   this.$i18n.t(`myFeed.filters.over15FT`),
                value:  "over15FT"
            }]
        }
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