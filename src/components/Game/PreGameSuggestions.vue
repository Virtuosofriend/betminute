<template>
    <v-row no-gutters>
        <v-col
            v-for="[value, key, index] in Object.entries(suggestions)"
            :key="index"
           
        >
            <div class="pl-2 pb-1 suggestions">
                <v-btn
                    v-if="value != 'simeio'"
                    :color="key ? 'success' : 'accent'"
                    depressed
                    outlined
                    small
                >
                    {{ $t(`Games.suggestions.${value}`) }}
                </v-btn>

                <v-btn
                    v-if="value == 'simeio' && key != '-'"
                    :color="key ? 'success' : 'accent'"
                    depressed
                    small
                    text
                >
                    {{ $t(`Games.suggestions.${value}`) }}: {{ key }}
                </v-btn>
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
}
</style>