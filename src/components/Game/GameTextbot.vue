<template>
    <div class="mt-4">
        <v-slide-group
            class="pb-4"
            dark
        >
                <v-slide-item
                    v-for="n in mobility"
                    :key="`${n}-index`"
                    v-slot="{ active, toggle }"
                >
                    <v-card
                        color="secondary"
                        class="ma-4"
                        width="180"
                    >
                        <v-row
                            class="fill-height"
                            align="center"
                            justify="center"
                        >
                            <v-col>
                                <p class="mb-0 text--white ma-2 mt-0" style="font-size:12px">
                                    {{ n }}
                                </p>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-slide-item>
        </v-slide-group>
    </div>
</template>

<script>
export default {
    name: "Game__textbot",

    props: {
        textbotValues: {
            required:   true,
            type:       Object
        }
    },

    data() {
        return {
            mobility:   [],
        }
    },

    methods: {
        mobilityValues(val) {
            const labels = val.split(".");
            this.mobility = labels.slice(0,labels.length-1);
        }
    },
    beforeMount() {
      
        if ( this.textbotValues.mobility_text ) {
            this.mobilityValues(this.textbotValues.mobility_text)
        }
    },

    mounted() {

    }

}
</script>

<style lang="scss" scoped>

</style>