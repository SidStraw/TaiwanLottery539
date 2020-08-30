<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="12"
    disable-pagination
    hide-default-footer
    sort-by="calories"
    class="elevation-1"
  >
    <!-- <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>計算查詢結果</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template> -->
    <template v-slot:no-data>
      沒有符合的資料
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: '開獎日期', value: 'date', sortable: false },
      { text: '數字1', value: 'num[0]', align: 'center', sortable: false },
      { text: '數字2', value: 'num[1]', align: 'center', sortable: false },
      { text: '數字3', value: 'num[2]', align: 'center', sortable: false },
      { text: '數字4', value: 'num[3]', align: 'center', sortable: false },
      { text: '數字5', value: 'num[4]', align: 'center', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          date: 'Frozen Yogurt',
          n1: 6,
          n2: 21,
          n3: 26,
          n4: 27,
          n5: 34,
        },
      ]
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
