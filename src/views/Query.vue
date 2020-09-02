<template>
  <v-container>
    <v-row class="rule-area text-center justify-center">
      <v-col cols="12" sm="5" lg="3" class="d-flex align-center">
        <div class="text">當某期開出</div>
        <v-text-field v-model="condition.num1" dense></v-text-field>
        <div class="text">，</div>
      </v-col>
      <v-col cols="12" sm="7" lg="4" class="d-flex align-center">
        <div class="text">下</div>
        <v-text-field v-model="condition.next1" dense></v-text-field>
        <div class="text">期開出</div>
        <v-text-field v-model="condition.num2" dense></v-text-field>
        <div class="text">，</div>
      </v-col>
      <!-- </v-row>
    <v-row class="text-center justify-center"> -->
      <v-col cols="12" sm="6" md="5" lg="4" class="d-flex align-center">
        <div class="text">下</div>
        <v-text-field v-model="condition.next2" dense></v-text-field>
        <div class="text">期開出之日期、號碼：</div>
      </v-col>
    </v-row>
    <QueryDataList :desserts="desserts" />
    <v-textarea class="note-area mt-3" rows="2" label="備註" auto-grow></v-textarea>
  </v-container>
</template>

<script>
// @ is an alias to /src
import QueryDataList from '@/components/QueryDataList'

export default {
  name: 'Query',
  data() {
    return {
      condition: {
        num1: '',
        num2: '',
        next1: '',
        next2: '',
      },
    }
  },
  components: {
    QueryDataList,
  },
  computed: {
    desserts() {
      let { num1, num2, next1, next2 } = this.condition
      num1 = num1.replace(/^(\d)$/, '0$1')
      num2 = num2.replace(/^(\d)$/, '0$1')
      next1 = parseInt(next1, 10) || 0
      next2 = parseInt(next2, 10) || 0
      if (!num1 || !num2 || !next1 || !next2) return []
      const { lotteryRecord } = this.$store.state
      const result = []
      lotteryRecord.some((item, index, array) => {
        if (index + next1 + next2 >= array.length) return true
        const rule2 = array[index + next2].num.some(val => val === num2)
        const rule1 = array[index + next1 + next2].num.some(val => val === num1)
        if (rule2 && rule1) result.push(item)
        return result.length >= 12
      })
      return result
    },
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
.note-area ::v-deep textarea {
  font-size: 2rem;
  line-height: 3.5rem;
}
</style>
