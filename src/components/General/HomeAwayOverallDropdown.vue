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
    name: "Selection__dropdown",

    props: {
        defaultValue: {
            required:   false,
            type:       String
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
                    value:  "overall",
                    text:   this.$i18n.t( `General.overall` )
                },
                {
                    value:  "home",
                    text:   this.$i18n.t( `General.home` )
                },
                {
                    value:  "away",
                    text:   this.$i18n.t( `General.away` )
                }
            ]
        }
    },

    methods: {
        emitSelection() {
            this.$emit("changeDefaultValue", this.selection);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>