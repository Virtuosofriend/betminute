<template>
    <h4>
        {{ dataText }}
    </h4>
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
h4 {
    text-transform: initial;
    color: var(--theme-dark-30);
    font-weight: 400;
    width: 100%;
    margin-top: .3em;
}
</style>