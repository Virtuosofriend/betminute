<template>
        <v-data-table
            :headers="headers"
            :items="tableData"
            :items-per-page="50"
            hide-default-footer
            class="elevation-0 custom__table ma-3"
        >
            <template
                v-slot:item.date="{ item }"
            >
                {{ item.date | dateOnly }}
            </template>
        
            <template
                v-slot:item.specification="{ item }"
            >
                <p class="mb-0">
                    {{ item.league }}
                    <span class="league__specification">
                        {{ item.specification }}
                    </span>
                </p>
            </template>

            <template
                v-slot:item.htskor="{ item }"
            >
                <chip-forscore
                    :textValue="item.htskor"
                    :result="item.fhalf"
                ></chip-forscore>
            </template>

            <template
                v-slot:item.skor="{ item }"
            >
                <chip-forscore
                    :textValue="item.skor"
                    :result="item.final"
                ></chip-forscore>
            </template>

            <template
                v-slot:item.htover1="{ item }"
            >
                <generic-truefalse
                    :result="item.htover1"
                ></generic-truefalse>
            </template>

            <template
                v-slot:item.htover2="{ item }"
            >
                <generic-truefalse
                    :result="item.htover2"
                ></generic-truefalse>
            </template>

        </v-data-table>
</template>

<script>
import { mapGetters } from "vuex";

import chipForscore from "../../components/General/ChipForScore";
import genericTruefalse from "../../components/General/GenericTrueFalse";

export default {
    name: "Pastmeetings__table",

    props: {
        tableData: {
            required:   true,
            type:       Array
        }
    },

    computed: {
        headers () {
            return [
                {
                    text:   this.$i18n.t( `Games.pastMeetingsTab.table_fields.date` ),
                    value:  "date"
                },
                {
                    text:   this.$i18n.t( `Games.pastMeetingsTab.table_fields.specification` ),
                    value: "specification",
                },
                {
                    text:   this.$i18n.t( `Games.pastMeetingsTab.table_fields.agwnistiki` ),
                    value:  "agwnistiki"
                },
                {
                    text:   this.$i18n.t( `Games.pastMeetingsTab.table_fields.htskor` ),
                    sortable: false,
                    value:  "htskor"
                },
                {
                    text:   this.$i18n.t( `Games.pastMeetingsTab.table_fields.skor` ),
                    sortable:   false,
                    value:      "skor"
                },
                {
                    text:   this.$i18n.t( `Games.pastMeetingsTab.table_fields.htover1` ),
                    sortable:   false,
                    value:      "htover1"
                },
                {
                    text:   this.$i18n.t( `Games.pastMeetingsTab.table_fields.htover2` ),
                    sortable:   false,
                    value:      "htover2"
                }
            ]
        },
    },

    components: {
        chipForscore,
        genericTruefalse
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