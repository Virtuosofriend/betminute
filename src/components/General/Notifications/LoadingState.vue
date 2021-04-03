<template>
    <div class="loading box">
        <div>
            <h2>
                {{ $t( `Loading.pleaseWait` )}}
            </h2>
        </div>
        <div class="mt-4">
            <v-progress-circular
                indeterminate
                color="primary darken-4"
                size="32"
            ></v-progress-circular>
        </div>
    </div>
</template>

<script>
export default {
    name:   "Loading__state"
}
</script>

<style lang="scss" scoped>
.loading {
    height: 100vh;
    width: 100%;
    flex-direction: column;
}

.loading.box {
    display: flex;
    justify-content: center;
    align-items: center;
}

h2 {
    text-transform: initial;
    font-weight: 400;
    font-size: 18px;
}
</style>