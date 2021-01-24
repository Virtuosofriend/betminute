<template>
    <v-overlay 
        :value="overlay"
        z-index="999"
        color="background"
        opacity="0.9"
    >
        <h2 style="text-transform:initial;">
            Oh dang!
        </h2>
        <p>
            Connection lost to the server, please reconnect!
        </p>
        <v-btn
            @click="restart()"
            color="error"
            depressed
            block
        >
            Reconnect
        </v-btn>
    </v-overlay>
</template>

<script>
import { mapState } from "vuex";
export default {
    name:   "Application__overlay",

    computed: {
        ...mapState({
            overlay:    state => state.general.overlay
        })
    },

    methods: {
        restart() {
            this.$router.go();
        }
    }
}
</script>

<style lang="scss" scoped>

</style>