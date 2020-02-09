<template>
    <div class="main--wrapper">
        <v-row>
            <v-col
                sm="8"
                lg="8"
            >
            <v-card
                class="pa-2 main--card"
                elevation="0"
            >
                <h2 class="main--card-title">Report Templates</h2>
                <div class="main--card-body">
                    <v-list
                        dark
                        class="custom--list overflow-y-auto pr-5"
                        max-height="300"
                    >
                        <v-list-item-group  
                        >
                            <v-list-item
                                v-for="(item, i) in reportsTemplates"
                                :key="i"
                            >
                            <v-list-item-content>
                                <v-list-item-title v-text="item.name"></v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn-toggle
                                    borderless
                                    v-model="btnToggle"
                                    background-color="#263859"
                                >
                                    <v-btn
                                        small
                                        icon
                                        color="#263859"
                                    >
                                        <v-icon
                                            small
                                        >fas fa-download</v-icon>
                                    </v-btn>
                                    <v-btn
                                        small
                                        icon
                                        @click="enableOptionsDialog(item)"
                                        color="#263859"
                                    >
                                        <v-icon
                                            small
                                            :class="{'op2': item.metabase_link == null}"
                                        >
                                            fas fa-chart-area
                                        </v-icon>
                                    </v-btn>
                                    <v-btn
                                        small
                                        icon
                                        color="#263859"
                                        @click="deleteCustomReport(item.type)"
                                        v-if="item.category != 'core'"
                                    >
                                        <v-icon
                                            small
                                        >fas fa-trash</v-icon>
                                    </v-btn>
                                </v-btn-toggle>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
                </div>
            </v-card>
        </v-col>

        <v-col
            sm="4"
            lg="4"
        >
            <v-card
                class="pa-2 main--card"
                elevation="0"
                dark
            >
                <h2 class="main--card-title">Add custom Type Report</h2>
                <div class="main--card-body">
                    <img 
                        :src="formImg"
                        class="customReport--image"
                    >
                </div>
            </v-card>
        </v-col>

        <v-col
            sm="8"
            lg="8"
        >
            <v-card
                class="pa-2 main--card"
                elevation="0"
                dark
            >
                <h2 class="main--card-title">Add custom Type Report</h2>
                <div class="main--card-body">
                    <v-form
                        ref="customReport"
                    >
                        <v-text-field
                            v-model="formData.table_name"
                            label="Custom report type name"
                            required
                        ></v-text-field>

                        <v-checkbox
                            v-for="(matches, index) in checkboxes"
                            :key="index"
                            v-model="formData[matches.form]"
                            :label="matches.label"
                        ></v-checkbox>

                        <div 
                            v-for="(value, index) in customColumns"
                            :key="index"
                        >
                            <v-text-field
                                v-model="customCols[index].title"
                                label="Custom column name"
                                append-outer-icon="fas fa-times"
                                @click:append-outer="customColumns--"
                            ></v-text-field>
                            <v-select
                                :items="customColumnsValue"
                                v-model="customCols[index].value"
                                label="Select the type of the column"
                            ></v-select>
                        </div>

                        <v-btn
                            color="primary"
                            class="mr-4"
                            depressed
                            
                            @click="create()"
                        >
                            Create new type
                        </v-btn>
                        <v-btn
                            color="secondary"
                            class="mr-4"
                            dark
                            depressed
                            @click="addColumn()"
                        >
                            Add custom column
                        </v-btn>
                    </v-form>
                </div>
            
            </v-card>
        </v-col>

        <v-col
            sm="4"
            lg="4"
        >
            <v-card
                class="pa-2 main--card"
                elevation="0"
                dark
            >
                <h2 class="main--card-title">Register user</h2>
                <div class="main--card-body">
                    <v-form class="pa-5">
                        <v-text-field
                            v-model="regformData.name"
                            label="Name"  
                        ></v-text-field>

                        <v-text-field
                             v-model="regformData.email"
                            label="E-mail"
                            type="email"
                        ></v-text-field>
                        
                        <v-text-field
                            v-model="regformData.password"
                            label="Password"
                            type="password"
                        ></v-text-field>
                        
                        <v-text-field
                            v-model="regformData.c_password"
                            label="Re-type password"
                            type="password"
                        ></v-text-field>
                    </v-form>
                    <v-btn
                        outlined
                        color="primary"
                        class="mt-5"
                        block
                        @click="registerUser()"
                    >
                        Add user
                    </v-btn>
                </div>
            </v-card>
        </v-col>
    </v-row>

    <!-- Dialogs -->
    <v-dialog
      v-model="dialog.status"
      width="500"
    >
      <v-card
        class="pa-2 main--card"
        elevation="0"
        dark
        >
        <h2 class="main--card-title">Options</h2>
            <div class="main--card-body">
                <v-form>
                    <v-row
                        align="center"
                        justify="center"
                    >
                    <v-col
                        md="12"
                    >
                        <v-text-field
                            v-model="reportDialog.metabase_link"
                            label="Metabase URL"
                            required
                        ></v-text-field>
                    </v-col>
                </v-row>
          </v-form>

          <p class="mt-2 text-center red--text" v-if="dialog.message != ''">
              {{ dialog.message }}
          </p>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            color="primary"
            class="mt-4"
            @click="addMetaBase()"
          >
            Save
          </v-btn>

          <v-btn
            text
            color="accent"
            class="mt-4"
            @click="dialog.status = false"
          >
            Close
          </v-btn>
          
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import imageForm from '../assets/svg/form.svg';
import { bus } from '../main'

export default {
    computed: {
        ...mapGetters({
            reportsTemplates: 'user/reportsTemplates',
        })
    },
    data() {
        return {
            formData: {
                year: false,
                month: false,
                day: false,
                time: false,
                island: false,
                municipality: false,
                power_plant: false,
                distributor: false,
                power_plant_unit: false,
                energy_product: false,
                tariff_voltage_category:false,
                client_type: false,
                voltage_level: false,
                country: false,
                port: false
            },
            regformData: {},
            btnToggle: undefined,
            customCols: [],
            checkboxes: [
                {
                    label: "Do you need a year column?",
                    form: "year"
                },{
                    label: "Do you need a month column?",
                    form: "month"
                },{
                    label: "Do you need a day column?",
                    form: "day"
                },{
                    label: "Do you need a time column?",
                    form: "time"
                },{
                    label: "Do you want to match it with an existing island?",
                    form: "island"
                },{
                    label: "Do you want to match it with an existing municipality?",
                    form: "municipality"
                },{
                    label: "Do you want to match it with an existing power plant?",
                    form: "power_plant"
                }, {
                    label: "Do you have a unit in your power plant?",
                    form: "power_plant_unit"
                }, {
                    label: "Are you a distributor?",
                    form: "distributor"
                }, {
                    label: "Energy Product",
                    form: "energy_product"
                }, {
                    label: "Tariff Voltage Category",
                    form: "tariff_voltage_category"
                }, {
                    label: "Client Type",
                    form: "client_type"
                }, {
                    label: "Voltage level",
                    form: "voltage_level"
                }, {
                    label: "Country column",
                    form: "country"
                }, {
                    label: "Port column",
                    form: "port"
                }
            ],
            customColumnsValue: [
                {
                    text: "Text",
                    value: "string"
                },
                {
                    text: "Numbers",
                    value: "double"
                }
            ],
            customColumns: 0,
            dialog: {
                status: false,
                message: ""
            },
            reportDialog: {
                type: ""
            },
            formImg: imageForm
        }
    },

    methods: {
        create() {
            for( let data of this.customCols ) {
                this.formData[data.title] = data.value;
            }            
            this.$store.dispatch('user/addNewReportType', this.formData).then(res => {
                this.$store.dispatch('notifications/sendNotification', { message: `Your custom report type ${this.formData.table_name} was created!` });
            });
        },

        addColumn() {
            this.customColumns++;
            this.customCols.push({
                title: null,
                value: null
            });
        },

        enableOptionsDialog(item) {
            this.reportDialog.type = item.type;
            this.reportDialog.metabase_link = item.metabase_link;
            this.dialog.status = true;
        },

        addMetaBase() {            
            this.$store.dispatch('user/setMetaBaseUrl', this.reportDialog).then((res) => {
                if ( res.status === 200 ) {
                    return this.dialog.status = false;
                }

                return this.dialog.message = "Something went wrong, please refresh the page!";
            });
        },

        registerUser() {
            this.$store.dispatch('user/addNewUser', this.regformData).then((res) => {
            });
        },

        deleteCustomReport(reportType) {
            return this.$store.dispatch("notifications/dialogDetails", { action:"user/removeCustomReport", data: reportType } );
        }
    },

}
</script>

<style scoped>
    .custom--list .v-list-item.theme--dark{
        background-color: var(--theme-dark-10);
        border-bottom: 0;
        margin: .5em 0;
    }

    .custom--list .v-list-item.theme--dark .v-btn-toggle--borderless {
        background-color: transparent !important;
    }

    .custom--list .v-list-item.theme--dark:hover .v-btn-toggle--borderless {
        background-color: transparent !important;
        border-color: trasnparent !important;
    }

    .custom--list .v-list-item.theme--dark .v-btn-toggle--borderless:hover {
        background-color: var(--theme-dark-10) !important;
    }
    .op2 {
        opacity: .2;
    }

    .customReport--image {
        width: 100%;
        height: 100%;
    }



</style>