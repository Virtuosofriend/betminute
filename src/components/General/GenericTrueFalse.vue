<template>
    <v-icon
        small
        :color="result ? 'success' : 'error'"
    >
        fas fa-circle
    </v-icon>
</template>

<script>

export default {
    name: "Generic__boolean",

    props: {
        result: {
            required:   true,
            type:       Boolean
        }
    },
}
</script>

<style lang="scss" scoped>

</style>