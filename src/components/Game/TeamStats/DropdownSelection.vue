<template>
    <v-select
        :items="selection_items"
        v-model="selection"
        dark
        solo
        flat
        dense
        full-width
        item-color="accent"
        background-color="background lighten-2"
        color="primary"
        @change="emitSelection()"
    ></v-select>
</template>

<script>
export default {
    name: "TimeIntervals__dropdown",

    props: {
        defaultValue: {
            required:   false,
            type:       Number
        }
    },

    data() {
        return {
            selection:  this.defaultValue,
        }
    },

    computed: {
        selection_items() {
            return [
                {
                    value:  10,
                    text:   this.$i18n.t( `Games.teamStatsTab.dropDown.10mins` )
                },
                {
                    value:  15,
                    text:   this.$i18n.t( `Games.teamStatsTab.dropDown.15mins` )
                },
                {
                    value:  30,
                    text:   this.$i18n.t( `Games.teamStatsTab.dropDown.30mins` )
                },
                {
                    value:  45,
                    text:   this.$i18n.t( `Games.teamStatsTab.dropDown.45mins` )
                }
            ]
        }
    },

    methods: {
        emitSelection() {
            this.$emit("changeTimeInterval", this.selection);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>