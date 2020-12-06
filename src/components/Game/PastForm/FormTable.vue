<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="selectedItem"
            :items-per-page="5"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :footer-props="footerProps"
            class="elevation-0 custom__table ma-3"
        >
            <template
                v-slot:item.date="{ item }"
            >
                {{ item.date | dateSmall }}
            </template>

            <template
                v-slot:item.away="{ item }"
            >
                <span 
                    v-if="homeTeam == item.home" 
                    class="teams"
                >
                    <img :src="item.away_logo" class="logo">
                        {{ item.away }}
                </span>

                <span 
                    v-if="homeTeam != item.home"
                    class="teams"
                >
                    <img :src="item.home_logo" class="logo">
                        @{{ item.home }}
                </span>
            </template>

            <template
                v-slot:item.htskor="{ item }"
            >
                <v-chip
                    label
                    small
                    color="secondary"
                >
                    {{ item.htskor }}
                </v-chip>
            </template>

            <template
                v-slot:item.skor="{ item }"
            >
                <chip-forscore
                    :textValue="item.skor"
                    :result="item.dwl"
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

            <template 
                v-slot:footer.page-text="items"
            > 
                {{ items.pageStart }} - {{ items.pageStop }} {{ $t( `General.of` ) }} {{ items.itemsLength }} 
            </template>
        </v-data-table>
    </div>
</template>

<script>
import chipForscore from "../../General/ChipForScore";
import genericTruefalse from "../../General/GenericTrueFalse";

export default {
    name: "HomeTeam__pastform",

    props: {
        dropdownSelection: {
            required:   false,
            type:       String
        },
        homeTeam: {
            requited:   true,
            type:       String
        },
        meetings: {
            required:   true,
            type:       Array
        }
    },

    data() {
        return {
            sortBy:     "agwnistiki",
            sortDesc:   true,
            footerProps: {
                "items-per-page-text": this.$i18n.t( `General.results` )
            }
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
                    text:   this.$i18n.t( `Games.pastMeetingsTab.table_fields.away` ),
                    value:  "away"
                },
                                {
                    text:   this.$i18n.t( `Games.pastMeetingsTab.table_fields.agwnistiki` ),
                    value: "agwnistiki",
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

        setHomeMeetings() {
            if ( this.meetings ) {
                return this.meetings.filter( elem => elem.home == this.homeTeam);
            }

            return [];
        },

        setAwayMeetings() {
            if ( this.meetings ) {
                return this.meetings.filter( elem => elem.home != this.homeTeam);
            }

            return [];
        },

        selectedItem() {
            if ( this.dropdownSelection == "overall" ) {
                return this.meetings;
            }

            if ( this.dropdownSelection == "home") {
                return this.setHomeMeetings;
            }

            return this.setAwayMeetings;
        }
    },

    components: {
        chipForscore,
        genericTruefalse
    }
}
</script>

<style lang="scss" scoped>

.teams {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.logo {
    width: 20px;
    margin-right: 6px;
}
</style>