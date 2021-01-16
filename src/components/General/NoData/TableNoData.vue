<template>
    <div>
        <img :src="image">
        <h4>
            {{ $t( `General.noFilteringResult` ) }}
        </h4>
    </div>
</template>

<script>
import image from "../../../assets/svg/anxiety.svg";

export default {
    name: "Table__nodata",

    data() {
        return {
            image
        }
    },
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