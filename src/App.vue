<template>
  <v-app>
    <v-app-bar app color="primary" dark class="noprint">
      <div class="d-flex align-center" v-if="$vuetify.breakpoint.smAndUp">
        <v-toolbar-title>今彩539</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
      <v-btn text to="/">開獎資料</v-btn>
      <v-btn text to="/Query">計算查詢</v-btn>
      <v-btn color="#78909C" @click="print">列印</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import data2020 from '@/assets/2020data.json'
export default {
  name: 'App',

  data: () => ({
    //
  }),
  mounted() {
    this.$store.dispatch('getLotteryRecord')
  },
  methods: {
    addData() {
      // Add a second document with a generated ID.
      data2020.forEach(item => {
        this.$db
          .collection('lotteryRecord')
          .doc(item.date)
          .set(item)
          .then(function() {
            console.log('Document successfully written!')
          })
          .catch(function(error) {
            console.error('Error writing document: ', error)
          })
      })
    },
    print() {
      window.print()
    },
  },
}
</script>
<style lang="scss">
@media print {
  .noprint {
    display: none !important;
  }
}
@page {
  size: A4 portrait;
  margin-left: 0 auto;
}
#data-table {
  td,
  th {
    font-size: 1.1rem;
  }
}
</style>
