<template>
  <v-container>
    <v-row class="rule-area text-center justify-center">
      <v-col cols="12" sm="5" lg="3" class="d-flex align-center">
        <div class="text">當某期開出</div>
        <v-text-field dense></v-text-field>
        <div class="text">，</div>
      </v-col>
      <v-col cols="12" sm="7" lg="4" class="d-flex align-center">
        <div class="text">下</div>
        <v-text-field dense></v-text-field>
        <div class="text">期開出</div>
        <v-text-field dense></v-text-field>
        <div class="text">，</div>
      </v-col>
      <!-- </v-row>
    <v-row class="text-center justify-center"> -->
      <v-col cols="12" sm="6" md="5" lg="4" class="d-flex align-center">
        <div class="text">下</div>
        <v-text-field dense></v-text-field>
        <div class="text">期開出之日期、號碼：</div>
      </v-col>
    </v-row>
    <QueryDataList />
    <v-textarea class="mt-5" rows="3" label="備註" auto-grow></v-textarea>
  </v-container>
</template>

<script>
// @ is an alias to /src
import QueryDataList from '@/components/QueryDataList'

export default {
  name: 'Query',
  components: {
    QueryDataList,
  },
}
</script>

<style lang="scss" scoped>
.text {
  flex: 0 0 auto;
  margin: 0 15px;
}
.rule-area ::v-deep input {
  text-align: center;
}
</style>
