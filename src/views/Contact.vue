<template>
    <div class="main--wrapper">
        <v-row>
            <v-col sm="12">
                <v-card
                    class="pa-2 main--card"
                    elevation="0"
                    dark
                >
                    <h2 class="main--card-title">
                        Contact Form
                    </h2>
                    
                    <div class="main--card-body">
                        <v-form>
                            <v-text-field
                                v-model="formData.name"
                                label="Name"
                                
                            ></v-text-field>

                            <v-text-field
                                v-model="formData.email"
                                label="E-mail"
                                
                            ></v-text-field>

                            <v-text-field
                                v-model="formData.subject"
                                label="Subject"
                                
                            ></v-text-field>

                            <v-textarea
                                v-model="formData.message"
                                name="Message"
                                label="Your message"
                                
                            ></v-textarea>
                        </v-form>

                        <v-btn
                            outlined
                            color="primary"
                            class="mt-5"
                            @click="sendEmail(formData)"
                        >
                            Send message
                        </v-btn>

                        <div class="error-messages-box mt-5" v-if="showErrors">
                            <h3
                                :class="{'error-messages-success': successMessage, 'error-messages-fail': !successMessage }"
                            >Your message was sent</h3>
                        </div>
                    </div>

                </v-card>

            </v-col>
    </v-row>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            formData: {},
            showErrors: false,
            successMessage: true
        }
    },
    methods: {
        sendEmail(formData) {
            const response = axios.post(`api/contact`, { name: formData.name, email: formData.email, message: formData.message, subject: formData.subject } ).then(res => {
                this.showErrors = true;
                if ( res.message === "Message sent." ) {
                    this.successMessage = true;
                }  
            });
            
        }
    }
}
</script>

<style scoped>

</style>