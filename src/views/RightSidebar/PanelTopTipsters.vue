<template>
    <div>
        <h4 class="tipsters__title">
            {{ $t( `RightSidebar.topTipsters.title` ) }}
            <span>
                <v-menu
                    bottom
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            text
                            v-on="on"
                            v-bind="attrs"
                            class="tipsters__button"
                        >
                            <h4 class="tipsters__title">
                                {{ $t( `RightSidebar.topTipsters.${selection}` ) }}
                            </h4>
                            <v-icon x-small class="ml-2">fas fa-caret-down</v-icon>
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item
                            v-for="item in selection_options"
                            :key="item.id"
                            @click="changeSelection(item.label)"
                            class="menu__selection"
                        >
                            <v-list-item-title>
                                {{ $t( `RightSidebar.topTipsters.${item.label}` ) }}
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </span>
        </h4>

        <v-row no-gutters v-if="topTipsters">
            <v-col 
                cols="12"
                v-for="(values, index) in filtered_tipsters"
                :key="index"
            >
                <div class="tipsters">
                    <div class="tipsters__avatar">
                        <img :src="`${values.picture}`">
                    </div>
                    <div class="tipsters__username">
                        <p class="mb-0">{{ values.user_name }}</p>
                    </div>
                    <div class="tipsters__score">
                        <p class="mb-0">
                            {{ values[selection] }}
                        </p>
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { CONFIG } from "../../commons/config";

export default {
    name: "topTipsters",
    
    data() {
        return {
            imagePath:      "https://www.socialtipsters.com/content/uploads/",
            closeOnClick:    true,
            selection_options:  [{
                id:     1,
                label:  "win_ratio"
            },{
                id:     2,
                label:  "roi"
            },{
                id:     3,
                label:  "net"
            },{
                id:     4,
                label:  "yield"
            }]
        }
    },

    computed: {
        ...mapGetters({
            topTipsters:    "feed/topTipsters"
        }),

        ...mapState({
            selection:  state => state.feed.top_tipsters_selection
        }),

        filtered_tipsters() {
            if ( Object.keys(this.topTipsters).length > 0 ) {
                let arr = this.topTipsters[`best_${this.selection}`];

                return arr.map(elem => {
                    if ( elem.picture == null ) {
                        return {
                            user_name:              elem.user_name,
                            picture:                CONFIG.default_avatar,
                            [this.selection]:       elem[this.selection]
                        }
                    }
                    return {
                        user_name:          elem.user_name,
                        picture:            `${this.imagePath}${elem.picture}`,
                        [this.selection]:   elem[this.selection]
                    }
                }).splice(0,9);
                
            }
        
            return [];
        }
    },

    methods: {
        changeSelection(value) {
            this.$store.dispatch("feed/setTipstersSelection", value);
        }
    }
}
</script>

<style lang="scss" scoped>
.tipsters__title {
    text-transform: initial;
    display: flex;
    align-items: center;
}

.tipsters__title span {
    display: inline-block;
    margin-left: auto;
}

.tipsters__button {
    text-transform: initial;
    letter-spacing: initial;
}
.tipsters {
    display: flex;
    align-items: center;
    height: 32px;
    padding: 8px 0px;
    margin: 4px auto 4px auto;
    background-color: var(--v-accent-base);
    border-radius: 6px;
}

.tipsters__avatar img {
    width: 24px;
    height: 24px;
    object-fit: cover;
    border-radius: 4px;
    display: block;
    margin: auto 6px;
}

.tipsters__username {
    width: 100%;
    margin-left: 6px;
}
.tipsters__score {
    width: 10%;
    margin-right: 6px;
}

.tipsters__username p {
    color: var(--v-primary-lighten2);
    font-size: 12px;
}

.tipsters__score p {
    color: var(--v-primary-base);
    font-weight: 600;
    font-size: 12px;
}

.menu__selection {
   cursor: pointer;
}
</style>