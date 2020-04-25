import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from '../lang/en.json';
import el from '../lang/el.json';

Vue.use(VueI18n);

export default new VueI18n({
    locale: "en",
    fallbackLocale: "en",
    messages: {
        en,
        el
    }
});