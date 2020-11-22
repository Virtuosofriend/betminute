<template>
    <v-row no-gutters>
        <v-col
            v-for="[value, key, index] in Object.entries(suggestions)"
            :key="index"
            cols="12"
        >
            <div 
                class="pl-2 pb-1"
            >
                <div 
                    class="suggestions"
                    v-if="value != 'simeio' && key"
                >
                    <v-icon 
                        color="success"
                        x-small
                        class="mr-2"
                    > 
                        fas fa-circle
                    </v-icon>
                    <p class="suggestions__title">
                        {{ $t(`Games.suggestions.${value}`) }}
                    </p>
                </div>

                <div 
                    class="suggestions"
                    v-if="value == 'simeio' && key != '-'"
                >
                    <v-icon 
                        color="success"
                        x-small
                        class="mr-2"
                    > 
                        fas fa-circle
                    </v-icon>
                    {{ $t(`Games.suggestions.${value}`) }}: {{ key }}
                </div>
            </div>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name:   "Game__pregamesuggestions",

    props: {
        suggestions: {
            type:       Object,
            required:   true
        }
    },

    data() {
        return {
            simeio:             "-",
            properSuggestions: {}
        }
    }
}
</script>

<style lang="scss" scoped>
.suggestions {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    padding-left: 8px;
    margin-top: 8px;
}

.suggestions__title {
    color: var(--v-primary-darken2);
    font-size: 12px;
    margin: 0;

}
</style>