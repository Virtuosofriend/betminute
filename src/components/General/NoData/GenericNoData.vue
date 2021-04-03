<template>
    <div>
        <h5>
            {{ dataText }}
        </h5>
    </div>
</template>

<script>
export default {
    name:   "Generic__nodata",

    props: {
        dataText: {
            type:       String,
            required:   false,
            default:    "No data available"
        }
    }
}
</script>
<style lang="scss" scoped>
div {
    width: 100%;
    margin: .3em auto;
}
h5 {
    text-transform: initial;
    color: var(--v-primary-base);
    opacity: .5;
    font-weight: 400;
}
</style>