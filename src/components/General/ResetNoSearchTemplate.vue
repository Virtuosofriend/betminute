<template>
    <v-btn
        color="secondary"
        depressed
        @click="emit()"
        class="letter-spacing-initial text-transform-initial"
    >
        {{ $t( `General.resetNoResults` ) }}
    </v-btn>
</template>

<script>
import { EventBus } from "../../plugins/EventBus";

export default {
    name: "Reset__nosearch",

    methods: {
        emit() {
            EventBus.$emit("resetSearch", null);
        }
    }
}
</script>