<template>
    <div class="search">
        <v-text-field
            v-model="search"
            :label="`${ $t('General.search')}`"
            flat
            solo
            dense
            autofocus
            full-width
            hide-details
            clearable
            color="primary"
            background-color="accent lighten-1"
            @keyup.enter="emit()"
            @click:clear="clear()"
        >
            <template v-slot:label>
                <p>
                    {{ $t( `General.search`) }}
                </p>
            </template>
        </v-text-field>

        <div class="ml-4">
            <v-btn
                color="white"
                depressed
                icon
                small
                @click="emit()"
            >
                <v-icon
                    small
                >
                    fas fa-search
                </v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name:   "Search__livescore",

    data() {
        return {
            search: ""
        }
    },

    methods: {
        emit() {
            this.$emit("searchResult", this.search);
        },

        clear() {
            this.$emit("searchResult", null);
        }
    }
}
</script>

<style lang="scss" scoped>
p {
    margin-bottom: 0;
    font-size: 12px;
}

.search {
    display: flex;
    align-items: center;
}
</style>