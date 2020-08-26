import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/plugins/firestore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lotteryRecord: [],
  },
  mutations: {
    setLotteryRecord(state, data) {
      const sirtData = data.sort((a, b) => {
        if (a.date < b.date) return 1
        if (a.date > b.date) return -1
        return 0
      })
      state.lotteryRecord = sirtData
    },
    delLotteryRecord(state, index) {
      state.lotteryRecord.splice(index, 1)
    },
  },
  actions: {
    getLotteryRecord({ commit }) {
      db.collection('lotteryRecord')
        .get()
        .then(querySnapshot => {
          const record = []
          querySnapshot.forEach(doc => record.push(doc.data()))
          commit('setLotteryRecord', record)
        })
        .catch(err => console.warn('資料抓取異常：', err))
    },
  },
  modules: {},
})
