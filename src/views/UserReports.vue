<template>
    <div class="main--wrapper">
      <v-row>

        <!-- Accepted Reports -->
        <v-col sm="6">
          <v-card
                class="pa-2 main--card"
                elevation="0"
                dark
            >
            <h2 class="main--card-title">
              <i class="fas fa-check"></i>
              Accepted Reports
            </h2>
              <div class="main--card-body table--card">
                <v-data-table
                  :headers="headers"
                  :items="reportsListAccept"
                  :items-per-page="itemsPerPage"
                  sort-by="created_at"
                  class="elevation-0"
                  v-model="selectedRowsAccepted"
                  dark
                  show-select
                  v-if="reportsListAccept.length > 0"
                >
                    <template v-slot:item.status="{ item }">
                      <v-chip 
                        :color="getColor(item.status)"
                        class="text-uppercase"
                        small
                        dark
                      >
                        {{ item.status }}
                      </v-chip>
                    </template>

                    <template v-slot:item.created_at="{ item }">
                      {{ item.created_at | properDate }}
                      <br>
                      {{ item.created_at | properTime }}
                    </template>

                    <template v-slot:item.action="{ item }">
                      <v-menu>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            icon
                            dark
                            v-on="on"
                          >
                          <v-icon small>
                            fas fa-bars
                          </v-icon>
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-item>
                            <v-list-item-title>Metabase</v-list-item-title>
                          </v-list-item>
                          <v-list-item
                            :href="`${downloadURL}/${item.fname}`"
                          >
                            <v-list-item-title>Download</v-list-item-title>
                          </v-list-item>
                          <v-list-item
                            @click="unstageItem(item.id)"
                          >
                            <v-list-item-title>Unstage</v-list-item-title>
                          </v-list-item>
                          <v-list-item
                            @click="deleteItemAccepted(item.id)"
                          >
                            <v-list-item-title>Delete</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </template>
                </v-data-table>
                  <div class="my-2" v-if="reportsListAccept.length > 0">
                    <v-btn 
                        color="error"
                        outlined
                        @click="massDeleteItemsAccepted()"
                        small
                      >
                      Delete
                    </v-btn>
                    <v-btn 
                      color="primary"
                      outlined
                      class="ml-1"
                      @click="massUnstageItems()"
                      small
                    >
                    Unstage
                    </v-btn>
                  </div>

                  <div class="table--card empty" v-if="reportsListAccept.message">
                    <h5>{{ reportsListAccept.message }}</h5>
                  </div>
              </div>
          </v-card>
        </v-col>

        <!-- ./Accepted Reports -->

        <!-- Approved Reports -->
        <v-col sm="6">
          <v-card
                class="pa-2 main--card"
                elevation="0"
                dark
            >
            <h2 class="main--card-title">
              <i class="fas fa-user-check"></i>
              Approved Reports
            </h2>
              <div class="main--card-body table--card">
                <v-data-table
                  :headers="headers"
                  :items="reportsListApproved"
                  :items-per-page="itemsPerPage"
                  sort-by="created_at"
                  class="elevation-0"
                  v-model="selectedRowsApproved"
                  dark
                  show-select
                  v-if="reportsListApproved.length > 0"
                >
                    <template v-slot:item.status="{ item }">
                      <v-chip 
                        :color="getColor(item.status)"
                        class="text-uppercase"
                        small
                        dark
                      >
                        {{ item.status }}
                      </v-chip>
                    </template>

                    <template v-slot:item.created_at="{ item }">
                      {{ item.created_at | properDate }}
                      <br>
                      {{ item.created_at | properTime }}
                    </template>

                    <template v-slot:item.action="{ item }">
                      <v-menu>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            icon
                            dark
                            v-on="on"
                          >
                          <v-icon small>
                            fas fa-bars
                          </v-icon>
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-item
                            :href="`${downloadURL}/${item.fname}`"
                          >
                            <v-list-item-title>
                              Download
                              </v-list-item-title>
                          </v-list-item>
                          <v-list-item
                            @click="migrateItem(item.id)"
                          >
                            <v-list-item-title>Migrate</v-list-item-title>
                          </v-list-item>
                          <v-list-item
                            @click="disapproveItem(item.id)"
                          >
                            <v-list-item-title>Disapprove</v-list-item-title>
                          </v-list-item>
                          <v-list-item
                            @click="deleteItemApproved(item.id)"
                          >
                            <v-list-item-title>Delete</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </template>
                </v-data-table>
                  <div 
                    class="my-2"
                    v-if="reportsListApproved.length > 0"
                  >
                    <v-btn 
                        color="error"
                        outlined
                        small
                        @click="massDeleteItemsApproved()"
                      >
                      Delete
                    </v-btn>
                    <v-btn 
                      color="primary"
                      outlined
                      class="ml-1"
                      small
                      @click="massMigrateItems()"
                    >
                      Migrate
                    </v-btn>
                    <v-btn 
                      color="accent"
                      outlined
                      class="ml-1"
                      small
                      @click="massDispproveItems()"
                    >
                      disapprove
                    </v-btn>
                  </div>

                  <div class="table--card empty" v-if="reportsListApproved.message">
                    <h5>{{ reportsListApproved.message }}</h5>
                  </div>
              </div>
          </v-card>
        </v-col>
        <!-- ./Approved reviews -->

        <!-- Pending Reports -->
        <v-col sm="12">
          <v-card
                class="pa-2 main--card"
                elevation="0"
                dark
            >
            <h2 class="main--card-title">
              <i class="fas fa-user-cog"></i>
              Pending Reports
            </h2>
              <div class="main--card-body table--card">
                <v-data-table
                  :headers="headers"
                  :items="reportsListPending"
                  :items-per-page="itemsPerPage"
                  sort-by="created_at"
                  class="elevation-0"
                  v-model="selectedRowsPending"
                  dark
                  show-select
                  v-if="reportsListPending.length > 0"
                >
                    <template v-slot:item.status="{ item }">
                      <v-chip 
                        :color="getColor(item.status)"
                        class="text-uppercase"
                        dark
                        small
                      >
                        {{ item.status }}
                      </v-chip>
                    </template>

                    <template v-slot:item.created_at="{ item }">
                      {{ item.created_at | properDate }}
                      <br>
                      {{ item.created_at | properTime }}
                    </template>

                    <template v-slot:item.action="{ item }">
                      <v-menu>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            icon
                            dark
                            v-on="on"
                          >
                          <v-icon small>
                            fas fa-bars
                          </v-icon>
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-item
                            :href="`${downloadURL}/${item.fname}`"
                          >
                            <v-list-item-title>Download</v-list-item-title>
                          </v-list-item>
                          <v-list-item
                            @click="approveItem(item.id)"
                          >
                            <v-list-item-title>Approve</v-list-item-title>
                          </v-list-item>
                          <v-list-item
                            @click="deleteItemPending(item.id)"
                          >
                            <v-list-item-title>Delete</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </template>
                </v-data-table>
                  <div 
                    class="my-2"
                    v-if="reportsListPending.length > 0"
                  >
                    <v-btn 
                        color="error"
                        outlined
                        @click="massDeleteItemsPending()"
                        small
                      >
                      Delete
                    </v-btn>
                    <v-btn 
                      color="primary"
                      outlined
                      class="ml-1"
                      @click="massApproveItems()"
                      small
                    >
                      Approve
                    </v-btn>
                  </div>

                  <div class="table--card empty" v-if="reportsListPending.message">
                    <h5>{{ reportsListPending.message }}</h5>
                  </div>
              </div>
          </v-card>
        </v-col>
        <!-- ./pending reviews -->

        <!-- queued Reports -->
        <v-col sm="12">
          <v-card
              class="pa-2 main--card"
              elevation="0"
              dark
            >
            <h2 class="main--card-title">Queue</h2>
              <div class="main--card-body table--card">
                <v-data-table
                  :headers="headers"
                  :items="reportsListQueue"
                  :items-per-page="itemsPerPage"
                  sort-by="created_at"
                  class="elevation-0"
                  v-model="selectedRowsPending"
                  dark
                  show-select
                >
                    <template v-slot:item.status="{ item }">
                      <v-chip 
                        :color="getColor(item.status)"
                        class="text-uppercase"
                        dark
                        small
                      >
                        {{ item.status }}
                      </v-chip>
                    </template>

                    <template v-slot:item.created_at="{ item }">
                      {{ item.created_at | properDate }}
                      <br>
                      {{ item.created_at | properTime }}
                    </template>

                    <template v-slot:item.action="{ item }">
                      <v-btn
                        small
                        filled
                        color="#EA665D"
                        depressed
                        v-if="item.status == 'error'"
                        @click="listErrors(item.id)"
                      >
                        Log
                      </v-btn>                    
                    </template>
                </v-data-table>
              </div>
          </v-card>
        </v-col>
        <!-- ./pending reviews -->

      </v-row>

      <!-- Modals -->
      <v-dialog 
        v-model="errorLogsDialog" 
        width="600px"
      >
        <v-card
          class="pa-2 main--card"
          elevation="0"
          dark
        >
          <h2 class="main--card-title">Error Logs</h2>
          <div class="main--card-body table--card">
            <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Report Type</th>
                      <th class="text-left">Error</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="errors in errorLogFile" :key="errors.name">
                      <td>{{ errors.name }}</td>
                      <td>{{ errors.error }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn 
                text
                class="mt-5"
                @click="errorLogsDialog = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </div>

        </v-card>
      </v-dialog>
      <!-- ./Modals -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import helper from '../plugins/helper.js';
import { bus } from '../main'

export default {
    data: () => ({
      itemsPerPage: 5,
      headers: [
        { text: 'Report type', value: 'type_name' },
        { text: 'Status', value: 'status' },
        { text: 'Provider', value: 'submitted_by' },
        { text: 'Created', value: 'created_at' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        id: '',
        fname: '',
        status: '',
        submitted_by: '',
        type_name: '',
        created_at: ''
      },
      defaultItem: {
        id: '',
        fname: '',
        status: '',
        submitted_by: '',
        type_name: '',
        created_at: ''
      },
      selectedRowsPending: [],
      selectedRowsAccepted: [],
      selectedRowsApproved: [],
      downloadURL: helper.csv,
      errorLogFile: [],
      errorLogsDialog: false
    }),

    computed: {
      ...mapGetters({
        reportsListPending: 'reports/reportsListPending',
        reportsListAccept: 'reports/reportsListAccept',
        reportsListApproved: 'reports/reportsListApproved',
        reportsListQueue:    'reports/reportsListQueue'
      })
    },

    methods: {

      listReports() {
        this.$store.dispatch('reports/listQueue').then(()=> {
        });

        this.$store.dispatch('reports/listPending').then(()=> {
        });

        this.$store.dispatch('reports/listApproved').then(()=> {
        });

        this.$store.dispatch('reports/listAccepted').then(()=> {
        });
      },

      deleteItemApproved(item) {
        return this.$store.dispatch("notifications/dialogDetails", { action:"reports/removeApproved", data: [{ id: item }] } );   
      },

      deleteItemAccepted(item) {
        return this.$store.dispatch("notifications/dialogDetails", { action:"reports/removeAccepted", data: [{ id: item }] } );  
      },

      deleteItemPending(item) {
        return this.$store.dispatch("notifications/dialogDetails", { action:"reports/removePending", data: [{ id: item }] } );
      },

      massDeleteItemsAccepted() {
        return this.$store.dispatch("notifications/dialogDetails", { action:"reports/removeAccepted", data: this.selectedRowsAccepted } );
      },

      massDeleteItemsPending() {
        return this.$store.dispatch("notifications/dialogDetails", { action:"reports/removePending", data: this.selectedRowsPending } );
      },

      massDeleteItemsApproved() {
        return this.$store.dispatch("notifications/dialogDetails", { action:"reports/removeApproved", data: this.selectedRowsApproved } );
      },

      migrateItem(item) {
        return this.$store.dispatch('reports/migrate', [{ id: item }]).then((res) => {
        });
      },

      massMigrateItems() {
        return this.$store.dispatch('reports/migrate', this.selectedRowsApproved).then((res) => {
        });
      },

      unstageItem(item) {
        return this.$store.dispatch('reports/unstage', [{ id: item }]).then((res) => {
        }); 
      },

      massUnstageItems() {
        return this.$store.dispatch('reports/unstage', this.selectedRowsAccepted).then((res) => {
        });
      },

      approveItem(item) {
        return this.$store.dispatch('reports/approve', [ { id: item } ]).then((res) => {
        });
      },

      disapproveItem(item) {
        return this.$store.dispatch('reports/disapprove', [ { id: item } ]).then((res) => {
        });
      },

      massApproveItems() {
        return this.$store.dispatch('reports/approve', this.selectedRowsPending).then((res) => {
        });
      },

      massDispproveItems() {
        return this.$store.dispatch('reports/disapprove', this.selectedRowsApproved).then((res) => {
        });
      },

      getColor (status) {        
        if (status == "accepted" || status == "approved" ) {
          return "#105457";
        } else if ( status === "pending" ) {
          return "#ff9267";
        } else if ( status === "processing" ) {
          return "#8c1e61";
        } else {
          return "#d93d3e";
        }
      },

      listErrors(id) {
        this.$store.dispatch('reports/fetchErrorLog', id).then(res => {
          this.errorLogFile = res.data;
          this.errorLogsDialog = true;
        })
      }
    },

    mounted() {
        return this.listReports();
    },

    filters: {
        properDate(value) {
        if ( !value ) {
          return "";
        }
        let date = moment(value);
        return date.format("DD-MM-YYYY");
      },

      properTime(value) {
        if ( !value ) {
          return "";
        }
        let date = moment(value);
        return date.format("hh:mm:ss");
      }
    }
}
</script>

<style scoped>

.main--card-title i {
  opacity: .1;
  margin-right: .2em;
}

.table--card.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  min-height: 300px;
}

</style>