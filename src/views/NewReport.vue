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
                Add new report
            </h2>
            
            <div class="main--card-body">
                <v-stepper 
                    v-model="e1" 
                    class="stepper-custom"
                    dark
                    alt-labels
                >
                <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">
                    Select the type of your report
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="2">
                    Upload the CSV file
                </v-stepper-step>

                <v-divider></v-divider>

                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-row 
                            align="center" 
                            justify="center"
                        > 
                            <v-col class="mt-4" md="4" sm="10">
                                <p>
                                    First you need to select a <strong>valid</strong> report type for the system to identify your CSV.
                                </p>

                                <v-select
                                    v-model="formData"
                                    class="custom-select"
                                    :items="reportsTemplates"
                                    filled
                                    label="Available report types"
                                    item-text="name"
                                    item-value="type"
                                >
                                </v-select>

                                <h3 class="mt-5 text-center">
                                    No valid template? <br>
                                    <v-btn
                                        text
                                        depressed
                                        class="font-weight-bold"
                                        @click="goTosettings()"
                                    >
                                        Download now!
                                    </v-btn>
                                </h3>

                            </v-col>

                            <v-col sm="12">
                                <small 
                                    class="warning--error"
                                    v-if="firstPageButton"
                                >
                                    You must select a report type!
                                </small>
                                <v-btn
                                    color="primary"
                                    depressed
                                    elevation="0"
                                    @click="checkValidity()"
                                    style="float: right;"
                                >
                                    Next Page
                                </v-btn>
                            </v-col>
                        </v-row>

                        
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <v-row 
                            align="center" 
                            justify="center"
                        > 
                            <v-col class="mt-4" md="4" sm="10">
                                <p>
                                    Upload your CSV using the form below. <br>
                                    The CSV will be <strong>validated</strong> by the system.
                                </p>

                                <file-pond
                                    name="csv_file"
                                    ref="pond"
                                    label-idle="Add your CSV here..."
                                    v-bind:allow-multiple="false"
                                    accepted-file-types="text/csv"
                                    server=""
                                    v-on:addfile="handleFilePondAdd"
                                    v-on:removefile="handleFilePondRemove"
                                    v-on:processfile="handleFilePondProcess"
                                />

                                <div class="error-messages-box" v-if="errorMessage != null">
                                    <p v-if="errorMessage == 'wrong_template'">
                                        The CSV you have uploaded doesn't match the <strong>template</strong> you have selected!
                                    </p>
                                    <p v-if="errorMessage == 'empty_csv'">
                                        Oops, this is an empty CSV! Please re-upload it with some real data.
                                    </p>
                                </div>

                            </v-col>

                            <v-col sm="12">
                                <v-btn
                                    text
                                    elevation="0"
                                    @click="e1 = 1"
                                    style="float: left;"
                                >
                                    Back
                                </v-btn>

                                <v-btn
                                    color="primary"
                                    depressed
                                    elevation="0"
                                    @click="finishAdd()"
                                    style="float: right;"
                                >
                                    Finish
                                </v-btn>

                                <v-btn
                                    color="accent"
                                    depressed
                                    elevation="0"
                                    @click="addAnother()"
                                    style="float: right; margin-right:.5em"
                                >
                                    Add another
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
            </div>
        </v-card>
        </v-col>
    </v-row>
    </div>
</template>

<script>
import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { mapGetters } from 'vuex';
import api from '../plugins/helper.js';
import { bus } from '../main'

const FilePond = vueFilePond( FilePondPluginFileValidateType );

export default {
    data () {
      return {
        e1: 0,
        formData: {},
        files: [],
        firstPageButton: false,
        errorMessage: null
      }
    },

    computed: {
        ...mapGetters({
            reportsTemplates: 'user/reportsTemplates',
        })
    },
    
    methods: {
        handleFilePondAdd(file) {
            let pond = this.$refs.pond;
            pond._pond.setOptions({
                server: {
                    url: `${api.url}api/add_report/${this.formData}`,
                    process: {
                            // url: '/media_manager/images',
                            // method: 'POST',
                            withCredentials: false,
                            headers: {
                                "accept": "application/json;",
                                "Authorization": `Bearer ${localStorage.getItem('token')}`
                            },
                            onload: response => {      
                                this.errorMessage = null;                          
                                return response.key;
                            },
                            onerror: response => {   
                                this.errorMessage = JSON.parse(response).error[0];                
                                return response;
                            }
                        },
                    fetch: null,
                    revert: null
                }
            });  
        },

        handleFilePondRemove() {
            this.errorMessage = null;
        },

        handleFilePondProcess() {
            this.$store.dispatch('notifications/sendNotification', { message: "Your report was succesfully inserted for inspection" });
        },

        checkValidity() {            
            if ( this.formData.length != undefined) {
                this.e1 = 2;
                this.firstPageButton = false;
            } else {
                this.firstPageButton = !this.firstPageButton;
            }
        },

        finishAdd() {
            this.$router.push({ name: 'userReports' });
        },

        addAnother() {
            this.$router.go();
        },

        goTosettings() {
            this.$router.push({ name: "userProfile" });
        }

    },
    components: {
        FilePond
    }
}
</script>

<style scoped>
  .theme--dark.v-stepper.stepper-custom {
    background-color: var(--theme-dark-60);
    box-shadow: none;
  }

  .stepper-custom .v-stepper__header {
      box-shadow: none;
      background-color: var(--theme-dark-10);
      border-radius: 15px;
  }

  .custom-select {
      margin: 5em 0;
  }

  .warning--error {
    display: block;
    color: var(--theme-dark-warning);
    text-align: right;
    margin-bottom: .5em;
  }

  .error-messages-box p {
      color: var(--theme-dark-warning);
      font-size: 80%;
  }
</style>