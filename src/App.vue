<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-toolbar-title>今彩539</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
      <v-btn text large to="/">開獎資料</v-btn>
      <v-btn text large to="/Query">計算查詢</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>
