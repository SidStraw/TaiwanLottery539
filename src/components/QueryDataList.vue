<template>
  <v-data-table
    id="data-table"
    :headers="headers"
    :items="desserts"
    :items-per-page="12"
    disable-pagination
    hide-default-footer
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:no-data>
      沒有符合的資料
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    desserts: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    headers: [
      { text: '開獎日期', value: 'date', align: 'center', sortable: false },
      { text: '數字1', value: 'num[0]', align: 'center', sortable: false },
      { text: '數字2', value: 'num[1]', align: 'center', sortable: false },
      { text: '數字3', value: 'num[2]', align: 'center', sortable: false },
      { text: '數字4', value: 'num[3]', align: 'center', sortable: false },
      { text: '數字5', value: 'num[4]', align: 'center', sortable: false },
    ],
  }),
}
</script>
