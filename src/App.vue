<template>
  <v-app>
    <v-app-bar app color="primary" dark class="noprint">
      <div class="d-flex align-center" v-if="$vuetify.breakpoint.smAndUp">
        <v-toolbar-title>今彩539輔助運算工具</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
      <template v-if="!/\/login/i.test($route.path)">
        <v-btn text to="/">開獎資料</v-btn>
        <v-btn text to="/query">計算查詢</v-btn>
        <v-btn color="#78909C" @click="print">列印</v-btn>
        <v-btn text @click="logout">登出</v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import data2020 from '@/assets/2020data.json'
export default {
  name: 'App',

  data: () => ({
    //
  }),
  mounted() {
    if (firebase.auth().currentUser) this.$store.dispatch('getLotteryRecord')
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('登入用戶：', user.email, 'uid:', user.uid)
        this.$store.dispatch('getLotteryRecord')
        if (/\/login/i.test(this.$route.path)) this.$router.push('/')
      } else {
        this.$router.push('/login')
      }
    })
    // this.addData()
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
      // console.log(firebase.auth().currentUser)
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {})
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
@media screen and (min-width: 600px) {
  #data-table {
    td,
    th {
      font-size: 1.1rem;
    }
  }
}
</style>
