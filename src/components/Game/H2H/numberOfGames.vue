<template>
    <div class="circle">
        <h3>
            {{ games }}
            <small>
                Matches
            </small>
        </h3>
    </div>
</template>

<script>
export default {
    name: "H2H__numbergames",

    props: {
        games: {
            required:   true,
            type:       Number
        }
    }
}
</script>

<style lang="scss" scoped>
.circle {
    background-color: var(--v-background-lighten2);
    padding: 10px;
    border-radius: 6px;
}

h3 {
    line-height: 1;
}
small {
    display: block;
    opacity: .7;
    font-weight: 400;
}
</style>