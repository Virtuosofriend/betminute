<template>
    <v-container>
        <v-simple-table
            dark
            class="team__stats"
        >
            <template v-slot:default>
            <thead>
                <tr> 
                    <th class="text-left"></th>
                    <th class="text-left">{{ $t( `Games.belowHeader.corners`) }}</th>
                    <th class="text-left">{{ $t( `Games.belowHeader.yellowCards`) }}</th>
                    <th class="text-left">{{ $t( `Games.belowHeader.redCards`) }}</th>
                    <th class="text-left">{{ $t( `Games.belowHeader.attacks`) }}</th>
                    <th class="text-left">{{ $t( `Games.belowHeader.dAttacks`) }}</th>
                    <th class="text-left">{{ $t( `Games.belowHeader.shotsOn`) }}</th>
                    <th class="text-left">{{ $t( `Games.belowHeader.shotsOff`) }}</th>
                    <th class="text-left">{{ $t( `Games.belowHeader.posession`) }}</th>
                </tr>
            </thead>
            <tbody>
                <tr 
                    v-for="data in properGameData"
                    :key="data.id"
                >
                    <td>
                        <v-img :src="data.logo" class="team__logo"></v-img>
                    </td>
                    <td>
                        {{ data.c }}
                    </td>
                    <td>
                        {{ data.yc }}
                    </td>
                    <td>
                        {{ data.rc }}
                    </td>
                    <td>
                        {{ data.attacks }}
                    </td>
                    <td>
                        {{ data.dangerousattacks }}
                    </td>
                    <td>
                        {{ data.shots_on }}
                    </td>
                    <td>
                        {{ data.shots_off }}
                    </td>
                    <td>
                        {{ data.posession }}%
                    </td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
    </v-container>
</template>

<script>
export default {
    name:   "GameLiveData",

    props: {
        awayTeam: {
            required:   true,
            type:       String
        },
        gameData: {
            required:   true,
            type:       Object
        },
        homeTeam: {
            required:   true,
            type:       String
        }
    },

    computed: {
        properGameData() {
            let teams = [{
                logo:   this.homeTeam,
                id:     1
            }, {
                logo:   this.awayTeam,
                id:     2
            }];

            for (let [key, value] of Object.entries(this.gameData.match_stats)) {
                if (key[0] == "h") {
                    teams[0][key.slice(1)] = value;
                } else {
                    teams[1][key.slice(1)] = value;
                }
            }
            
            return teams;
        }
    }
}
</script>

<style lang="scss" scoped>
.team__logo {
    width: 25px;
}

.team__stats tr {
    background-color: var(--v-accent-base);
}

.team__stats thead tr th {
    font-weight: 400;
    color: var(--v-primary-base);
    border: 0 !important;
}

.team__stats td {
    background-color: var(--v-background-base);
    border: 0 !important;
}
</style>