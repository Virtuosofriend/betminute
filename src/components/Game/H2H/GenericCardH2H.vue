<template>
    <v-card
        flat
        color="background"
        class="pa-2"
        elevation="0"
        height="140"
    >
        <v-card-title>
            <h3 class="card__title mb-0">
                <slot name="title">Title</slot>
            </h3>
        </v-card-title>
        <v-card-text>
            <v-row
                align="center"
                class="mx-0"
            >
                <div class="my-2 description">
                    <p class="mb-0">{{ cardData | noDecimals }}%</p>
                </div>

                <v-progress-linear 
                    :value="cardData"
                    color="info lighten-4"
                >
                </v-progress-linear>
            </v-row>
            </v-card-text>
    </v-card>
</template>

<script>
export default {
    name:   "H2H__genericCard",

    props: {
        cardData: {
            required:   true,
            type:       Number
        }
    },

    methods: {
        coloredProgress(value) {
            if ( value <= 30 ) {
                return "warning";
            }

            if ( value > 30 && value <= 60 ) {
                return "warning darken-2"
            }

            if ( value > 60 && value <= 80 ) {
                return "info"
            }
            return "info lighten-4";
        }
    }
}
</script>

<style lang="scss" scoped>
.card__title {
    font-size: 14px;
    text-transform: initial;
    font-weight: 600;
}

.description {
    text-align: center;
    font-size: 14px;
}
</style>