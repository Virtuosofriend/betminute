<template>
    <div class="circle">
        <h3>
            {{ games }}
            <small>
                {{ $t( `Games.H2HTab.numberOfGames` ) }}
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
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
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