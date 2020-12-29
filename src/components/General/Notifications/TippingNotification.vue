<template>
    <v-snackbar
      v-model="notification.status"
      right
      :color="notification.color"
      :timeout="timeout"
      multi-line
    >
        <p class="notification__text">
            {{ notification.message }}
        </p>
    </v-snackbar>
</template>

<script>
import { CONFIG } from "../../../commons/config";
import { mapGetters } from "vuex";

export default {
    name:   "Tipping__notification",

    data() {
        return {
            status:     true,
            timeout:    CONFIG.default_notification_time
        }
    },

    computed: {
        ...mapGetters({
            notification:   "general/tipping_notification"
        })
    }
}
</script>

<style lang="scss" scoped>
.notification__text {
    margin-bottom: 0;
    text-align: center;
}
</style>