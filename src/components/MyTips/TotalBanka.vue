<template>
    <div class="unit">
        <div class="unit__icon">
            <slot name="icon"></slot>
        </div>
        <div class="unit__description">
            <h4>
                <slot name="title"></slot>
            </h4>
            <p class="mb-0">
                {{ units }} <span>units</span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name:   "Total__banka",

    props: {
        units: {
            required:   true,
            type:       Number
        }
    }
}
</script>

<style lang="scss" scoped>
.unit {
    display: flex;
    flex-direction: column;
}
.unit div {
    margin: 8px;
}
.unit__icon > i {
    font-size: 32px;
    color: var(--v-secondary-lighten4);
}

p {
    color: var(--v-primary-base);
    font-size: 14px;
}

span {
    color: var(--v-secondary-lighten4);
    font-size: 12px;
}
</style>