<template>
    <v-container 
      fluid
    >
        <v-row>
            <v-col md="12">
                <Game-header></Game-header>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import GameHeader from '../components/Game/Header';

export default {
    name: "GameCard",

    components: {
        GameHeader
    }
}
</script>

<style scoped>

</style>