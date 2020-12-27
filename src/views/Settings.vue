<template>
    <v-container fluid>
      <v-row>
        <v-col md="12">
          <div class="main--wrapper">
            <div class="daily--tip">
              
              <div class="daily--tip-wrapper">
                <div>
                  <h2>
                      {{ $t( `Dashboard.topTitle` ) }}
                  </h2>
                </div>

              </div>
            </div>
            <h2 class="main--title">
                {{ $t( `Settings.title` ) }}
            </h2>

            <div class="card__box">
                <v-container>

                    <v-row no-gutters>
                        <v-col>
                            <p class="mb-0 primary--text">
                                {{ $t( `Settings.langSelection` ) }}
                            </p>
                        </v-col>
                        <v-col>
                            <language-dropdown></language-dropdown>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
          </div>
        </v-col>

      </v-row>
    </v-container>
</template>

<script>
import LanguageDropdown from "../components/Settings/LanguageDropdown.vue"
export default {
    name:   "User__settings",

    components: {
        LanguageDropdown
    }
}
</script>

<style lang="scss" scoped>

</style>