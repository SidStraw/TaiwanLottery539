import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/plugins/firestore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lotteryRecord: [],
  },
  mutations: {
    setAllLotteryRecord(state, data) {
      const sirtData = data.sort((a, b) => {
        if (a.date < b.date) return 1
        if (a.date > b.date) return -1
        return 0
      })
      state.lotteryRecord = sirtData
    },
    addLotteryRecord(state, item) {
      state.lotteryRecord.unshift(item)
    },
    editLotteryRecord(state, { index, record }) {
      state.lotteryRecord.splice(index, 1, record)
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
          commit('setAllLotteryRecord', record)
        })
        .catch(err => console.warn('資料抓取異常：', err))
    },
    setLotteryRecord({ commit }, { index, record }) {
      db.collection('lotteryRecord')
        .doc(record.date)
        .set(record)
        .then(function(e) {
          console.log('Document successfully written!', e)
        })
        .then(() => {
          if (index === -1) commit('addLotteryRecord', record)
          else commit('editLotteryRecord', { index, record })
        })
        .catch(function(error) {
          console.error('Error writing document: ', error)
        })
    },
    delLotteryRecord({ commit }, { index, record }) {
      db.collection('lotteryRecord')
        .doc(record.date)
        .delete()
        .then(function(e) {
          console.log('Document successfully deleted!')
        })
        .then(() => {
          commit('delLotteryRecord', index)
        })
        .catch(function(error) {
          console.error('Error writing document: ', error)
        })
    },
  },
  modules: {},
})
