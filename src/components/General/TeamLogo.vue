<template>
    <img :src="logo" class="team__logo">
</template>

<script>
export default {
    name: "Team__logo",

    props: {
        logo: {
            required:   true,
            type:       String
        }
    }
}
</script>

<style lang="scss" scoped>
.team__logo {
    object-fit: contain;
    width: 64px;
    height: 64px;
    margin: 0px 16px 16px 0;
}
</style>