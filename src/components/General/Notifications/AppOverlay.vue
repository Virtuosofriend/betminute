<template>
    <v-overlay 
        :value="overlay"
        z-index="999"
        color="background"
        opacity="0.6"
    >
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
    </v-overlay>
</template>

<script>
export default {
    name:   "Application__overlay",

    props: {
        overlay: {
            required:   true,
            type:       Boolean,
            default:    false
        }
    }
}
</script>

<style lang="scss" scoped>

</style>