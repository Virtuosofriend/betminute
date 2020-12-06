<template>
    <v-chip
        label
        small
        :color="color"
        :class="{'darker': result == 'X' || result == 'D'}"
    >
        {{ textValue }}
    </v-chip>
</template>

<script>

export default {
    name: "Generic__chip",

    props: {
        result: {
            required:   true,
            type:       String
        },

        textValue: {
            requited:   true,
            type:       String
        }
    },

    computed: {
        color() {
            if ( this.result == "1" || this.result == "W" ) {
                return "success";
            }

            if ( this.result == "X" || this.result == "D" ) {
                return "warning";
            }

            return "error";
        }
    }
}
</script>

<style lang="scss" scoped>
.darker {
    color: var(--v-accent-base) !important;
}
</style>