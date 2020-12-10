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
                    text:   "10 mins interval"
                },
                {
                    value:  15,
                    text:   "15 mins interval"
                },
                {
                    value:  30,
                    text:   "30 mins interval"
                },
                {
                    value:  45,
                    text:   "45 mins interval"
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