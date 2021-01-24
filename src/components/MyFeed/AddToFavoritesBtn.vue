<template>
    <v-btn
        fab
        icon
        x-small
        @click.stop="saveFavorite()"
    >
        <slot name="icon"></slot>
    </v-btn>
</template>

<script>
export default {
    name:   "Add__favs",

    props: {
        gameID: {
            required:   true,
            type:       Number
        }
    },

    methods: {
        saveFavorite() {
            this.$store.dispatch("feed/setFavoriteGame", this.gameID);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>