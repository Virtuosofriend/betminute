<template>
    <div>
        <img :src="image">
        <h4>
            {{ $t( `General.noResultsGames` ) }}
        </h4>

        <reset-no-search-template></reset-no-search-template>
    </div>
</template>

<script>
import image from "../../../assets/svg/anxiety.svg";
import ResetNoSearchTemplate from "../ResetNoSearchTemplate.vue";

export default {
    name: "NoResults__table",

    data() {
        return {
            image
        }
    },

    components: { 
        ResetNoSearchTemplate 
    }
}
</script>

<style lang="scss" scoped>
div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
    flex-direction: column;
}

h4 {
    font-weight: 400;
    text-transform: initial;
    color: var(--v-primary-darken2);
    margin-top: 16px;
    margin-bottom: 16px;
}

img {
    object-fit: contain;
    height: 100px;
    width: 100px;
    opacity: .7;
}
</style>