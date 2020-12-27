<template>
    <v-select
        :items="selections"
        v-model="language"
        dark
        solo
        flat
        dense
        label="Selection"
        full-width
        hide-details
        item-color="accent"
        background-color="background lighten-2"
        color="primary"
        @change="languageSelection()"
    >
        <template v-slot:item="{ item }">
            <div class="selection">
                <div class="selection__image">
                    <img :src="item.image">
                </div>
                <div class="selection__text">
                    {{item.text}}
                </div>
            </div>
        </template>

        <template v-slot:selection="{ item }">
            <div class="selection">
                <div class="selection__image">
                    <img :src="item.image">
                </div>
                <div class="selection__text">
                    {{item.text}}
                </div>
            </div>
        </template>
    </v-select>
</template>

<script>
import en from "../../assets/langs/en.png";
import el from "../../assets/langs/el.png";
import { mapState } from "vuex";

export default {
    name:   "Language__dropdown",

    data() {
        return {
            language:   localStorage.getItem("bm_lang"),
            selections: [{
                id:     1,
                image:  en,
                value:  "en",
                text:   "English"
            },{
                id:     2,
                image:  el,
                value:  "el",
                text:   "Ελληνικά"
            }]
        }
    },

    computed: {
        ...mapState({
            locale: state => state.user.language
        })
    },

    methods: {
        languageSelection() {
            this.$store.dispatch("user/setLanguage", this.language);
            this.$i18n.locale = this.language;
        }
    },

    watch: {
        locale(newVal) {
            this.language = newVal;
        }
    }
}
</script>

<style lang="scss" scoped>
.selection {
    display: flex;
    align-items: center;
}
.selection__image {
    width: 32px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.selection__image img {
    width: 24px;
    height: 24px;
    margin-right: 6px;
    object-fit: cover;
    border-radius: 50%;
}
</style>