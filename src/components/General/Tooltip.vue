<template>
    <v-tooltip
        color="sidebar"
        bottom
    >
        <template 
            v-slot:activator="{ on }"
        >
            <img 
                :src="image" 
                class="event-icon"
                v-on="on"
            >
      </template>

      <span>
          {{ tooltip }}
      </span>
    </v-tooltip>
</template>

<script>
export default {
    name: "Tooltip",

    props: {
        tooltip: {
            type: String
        },

        image: {
            type: String
        }
    }
}
</script>

<style scoped>
.event-icon {
    opacity: .5;
    width: 15px;
    object-fit: cover;
    height: 15px;
    margin: .3em;
}

span {
    font-size: 12px;
}
</style>