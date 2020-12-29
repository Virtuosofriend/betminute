<template>
    <v-data-table
        :headers="headers"
        :items="table_data"
        :items-per-page="10"
        dark
        class="elevation-0 custom__table"
    >
        <template
            v-slot:item.status="{ item }"
        >
            <v-chip
                :color="coloredStatus(item.status)"
                small
                label
            >
                {{ $t( `Mytips.tips_table.${item.status}`) }}
            </v-chip>
        </template>
    </v-data-table>
</template>

<script>
export default {
    name: "Mytips__table",

    props: {
        tableData: {
            required:   true,
            type:       Array
        }
    },

    data() {
        return {
            table_data: []
        }
    },

    computed: {
        headers () {
            return [
                {
                    text:       this.$i18n.t( `Mytips.tips_table.country` ),
                    value:      "country"
                },
                {
                    text:       this.$i18n.t( `Mytips.tips_table.league` ),
                    value:      "league",
                },
                {
                    text:       this.$i18n.t( `Mytips.tips_table.teams` ),
                    value:      "game"
                },
                {
                    text:       this.$i18n.t( `Mytips.tips_table.minute` ),
                    sortable:   false,
                    value:      "when_played.minute"
                },
                {
                    text:       this.$i18n.t( `Mytips.tips_table.market_name` ),
                    sortable:   false,
                    value:      "market_name"
                },
                {
                    text:       this.$i18n.t( `Mytips.tips_table.odd` ),
                    sortable:   false,
                    value:      "odd"
                },
                {
                    text:       this.$i18n.t( `Mytips.tips_table.units` ),
                    sortable:   false,
                    value:      "when_played.units"
                },
                {
                    text:       this.$i18n.t( `Mytips.tips_table.status` ),
                    sortable:   true,
                    value:      "status"
                }
            ]
        },
    },

    methods: {
        init() {
            let result = this.tableData;
            const tips = [];
            for ( let values of this.tableData ) {
                if ( values.tips ) {
                    values.tips.forEach(tip => { 
                        tip["status"] = values.tip_status;
                        tip["game"] = `${tip.home} - ${tip.away}`
                    });
                    tips.push(values.tips);
                }
            }
            this.table_data = tips.flat();
        },

        coloredStatus(status) {
            if ( status == "open" ) {
                return "background";
            }

            if ( status == "win" ) {
                return "success";
            }
        }
    },

    mounted() {
        this.init();
    }
}
</script>

<style lang="scss" scoped>
.league__specification {
    opacity: .7;
    display: block;
    font-size: 12px;
}
</style>