<template>
    <div class="bar">
        <p>
            {{ $t( `Banka.roi` ) }}
            <span>{{ roi }}</span>
        </p>

        <p>
            {{ $t( `Banka.yield` ) }}
            <span>{{ data_yield }}</span>
        </p>

        <p>
            {{ $t( `Banka.avg_odd` ) }}
            <span>{{ avgOdd }}</span>
        </p>
    </div>
</template>

<script>
export default {
    name:   "Extra__tipsterinfo",

    props: {
        avgOdd: {
            required:   true,
            type:       Number
        },
        roi: {
            required:   true,
            type:       Number
        },
        data_yield: {
            required:   true,
            type:       Number
        }
    }
}
</script>

<style lang="scss" scoped>
.bar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    margin: 0 auto;
}

.bar p {
    width: 100%;
}

p {
    color: var(--v-primary-base);
    font-size: 14px;
}

span {
    color: var(--v-primary-darken1);
    font-size: 12px;
    display: block;
}
</style>