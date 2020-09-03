<template>
  <v-data-table
    :headers="headers"
    :items="$store.state.lotteryRecord"
    id="data-table"
    class="elevation-1"
    mobile-breakpoint="300"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>歷史開獎資料</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" persistent max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">新增開獎資料</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="editedItem.date"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="editedItem.date"
                          label="開獎日期"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="editedItem.date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">取消</v-btn>
                        <v-btn text color="primary" @click="$refs.menu.save(editedItem.date)">確定</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" v-for="n in 5" :key="'numInput' + n">
                    <v-text-field v-model="editedItem.num[n - 1]" :label="`數字${n}`"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">取消</v-btn>
              <v-btn color="blue darken-1" text @click="save">儲存</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      資料下載中...
    </template>
  </v-data-table>
</template>

<script>
const defaultItem = {
  date: new Date().toISOString().substr(0, 10),
  num: [],
}
export default {
  data: () => ({
    dialog: false,
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    headers: [
      { text: '開獎日期', value: 'date', align: 'center' },
      { text: '數字1', value: 'num[0]', align: 'center', sortable: false },
      { text: '數字2', value: 'num[1]', align: 'center', sortable: false },
      { text: '數字3', value: 'num[2]', align: 'center', sortable: false },
      { text: '數字4', value: 'num[3]', align: 'center', sortable: false },
      { text: '數字5', value: 'num[4]', align: 'center', sortable: false },
      { text: 'Actions', value: 'actions', align: 'center', sortable: false },
    ],
    desserts: [{ date: '1111-11-11', num: [1, 2, 3, 4, 5] }],
    editedIndex: -1,
    editedItem: {
      date: new Date().toISOString().substr(0, 10),
      num: [],
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? '新增開獎資料' : '修改資料'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
  },

  methods: {
    editItem(item) {
      const { lotteryRecord } = this.$store.state
      this.editedIndex = lotteryRecord.findIndex(record => record.date === item.date)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      const { lotteryRecord } = this.$store.state
      const index = lotteryRecord.findIndex(record => record.date === item.date)
      confirm(`確定刪除 ${lotteryRecord[index].date} 此筆資料？`) &&
        this.$store.dispatch('delLotteryRecord', { index, record: item })
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      // if (this.editedIndex > -1) {
      //   Object.assign(this.desserts[this.editedIndex], this.editedItem)
      // } else {
      //   this.desserts.push(this.editedItem)
      // }
      this.editedItem.num = this.editedItem.num.map(val => val.replace(/^(\d)$/, '0$1')).sort()
      this.$store.dispatch('setLotteryRecord', {
        index: this.editedIndex,
        record: this.editedItem,
      })
      this.close()
    },
  },
}
</script>
