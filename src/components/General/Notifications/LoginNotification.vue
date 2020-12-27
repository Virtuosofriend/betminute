<template>
    <v-dialog
        v-model="status"
        persistent
        width="360"
        max-width="420"
    >
        <v-card
            color="accent"
            dark
        >
            <v-card-text>
                <v-row 
                    no-gutters
                    v-if="status && message == ''"
                >
                    <v-col cols="12">
                        <div class="block">
                            <p class="mt-4">
                                Please stand by
                            </p>
                        </div>
                    </v-col>
                    <v-col cols="12">
                        <div class="block">
                            <v-progress-circular
                                indeterminate
                                size="32"
                            ></v-progress-circular>
                        </div>
                        
                    </v-col>
                </v-row>

                <v-row 
                    no-gutters 
                    v-else
                >
                    <v-col cols="12">
                        <div class="block my-4">
                            <v-icon
                                color="error"
                                style="font-size: 48px"
                            >
                                fas fa-times
                            </v-icon>
                        </div>

                        <div class="block">
                            <p>
                                {{ message }}
                            </p>
                        </div>
                        
                    </v-col>
                </v-row>
            
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary darken-2"
                    text
                    @click="reset()"
                >
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name:   "Login__notification",

    props: {
        message: {
            required:   true,
            type:       String
        },
        status: {
            required:   true,
            type:       Boolean
        }
    },

    data() {
        return {
            dialog: this.status
        }
    },

    methods: {
        reset() {
            this.$emit("resetDialog");
        }
    }
}
</script>

<style lang="scss" scoped>
.block {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>