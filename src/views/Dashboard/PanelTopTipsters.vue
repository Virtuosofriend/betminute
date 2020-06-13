<template>
    <div>
        <h4 class="subtitle">Top 20 tipsters</h4>
        <!-- <code>{{ topTipsters.best_win_ratio }}</code> -->
        <div
            class="topTipsters--wrapper"
        >
        <img 
        v-for="(tipsters, index) in topTipsters.best_win_ratio"
        :key="index"
        :src="`${imagePath}${tipsters.picture}`">
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
    name: 'topTipsters',
    computed: {
        ...mapGetters({
            topTipsters:    "feed/topTipsters"
        })
    },
    data() {
        return {
            imagePath: "https://www.socialtipsters.com/content/uploads/"
        }
    },

    methods: {
        
    },
}
</script>

<style scoped>

.topTipsters--wrapper {
    display: flex;
    flex-wrap: wrap;
}

.topTipsters--wrapper img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
    margin: .6em;
}
</style>