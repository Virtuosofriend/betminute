<template>
    <div class="p-1 matches__description">
        <p class="mb-0">
            {{ gameData.scoreless_defeat}} {{ $t( `Games.H2HTab.scoreless_defeat` )}}.
        </p>
        <p class="mb-0">
            
            {{ gameData.clean_sheet_win}} {{ $t( `Games.H2HTab.clean_sheet_win` )}}.
        </p>
    </div>
</template>

<script>
export default {
    name:   "Extra__wonlossdraw",

    props: {
        gameData: {
            required:   true,
            type:       Object
        }
    }
}
</script>

<style lang="scss" scoped>
.matches__description {
    width: 75%;
    margin-left: auto;
    margin-right: auto;
    background-color: var(--v-background-base);
    border-radius: 6px;
    padding: 6px;
}

.matches__description p {
    font-size: 14px;
    color: #fff;
    padding-left: 6px;
}
</style>