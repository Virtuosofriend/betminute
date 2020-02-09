<template>
  <v-row>
      <v-col class="col-2 sidebar">
        <router-view name="sidebar" />
      </v-col>
      <v-col class="col-10 main">
        <router-view name="main" />
      </v-col>
    </v-row>
</template>