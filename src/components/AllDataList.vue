<template>
  <v-data-table :headers="headers" :items="$store.state.lotteryRecord" id="data-table" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>歷史開獎資料</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
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
                  <!-- <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.n1" type="tel" maxlength="2" label="數字1"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.n2" label="數字2"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.n3" label="數字3"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.n4" label="數字4"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.n5" label="數字5"></v-text-field>
                  </v-col> -->
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
      <!-- <v-btn color="primary" @click="initialize">Reset</v-btn> -->
      資料下載中...
    </template>
  </v-data-table>
</template>

<script>
import data2020 from '@/assets/2020data'
export default {
  data: () => ({
    dialog: false,
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    headers: [
      { text: '開獎日期', value: 'date', align: 'center' },
      { text: '數字1', value: 'n1', align: 'center', sortable: false },
      { text: '數字2', value: 'n2', align: 'center', sortable: false },
      { text: '數字3', value: 'n3', align: 'center', sortable: false },
      { text: '數字4', value: 'n4', align: 'center', sortable: false },
      { text: '數字5', value: 'n5', align: 'center', sortable: false },
      { text: 'Actions', value: 'actions', align: 'center', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      date: new Date().toISOString().substr(0, 10),
      num: [],
    },
    defaultItem: {
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

  created() {
    // this.initialize()
  },

  methods: {
    headerDateFormat(e) {
      console.log(e)
    },
    initialize() {
      const sortData = data2020.sort((a, b) => {
        if (a.date < b.date) return 1
        if (a.date > b.date) return -1
        return 0
      })
      this.desserts = sortData
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      const { lotteryRecord } = this.$store.state
      const index = lotteryRecord.findIndex(record => record.date === item.date)
      confirm(`確定刪除 ${lotteryRecord[index].date} 此筆資料？`) && this.$store.commit('delLotteryRecord', index)
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
