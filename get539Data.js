/*eslint-disable*/
const request = require('request')
const $ = require('cheerio')
const url = 'https://www.taiwanlottery.com.tw/lotto/dailycash/history.aspx'
const fs = require('fs')
let postData = {
  D539Control_history1$DropDownList1: 5,
  D539Control_history1$chk: 'radYM',
  D539Control_history1$btnSubmit: '查詢',
  __VIEWSTATEGENERATOR: '09BD3138',
}
// postData.D539Control_history1$dropYear = 109
// postData.D539Control_history1$dropMonth = 8

const getToken = () => {
  return new Promise((resolve, reject) => {
    request.post(url, { form: {} }, function(error, response, html) {
      const __EVENTVALIDATION = $('#__EVENTVALIDATION', html).val()
      const __VIEWSTATE = $('#__VIEWSTATE', html).val()

      resolve({ __VIEWSTATE, __EVENTVALIDATION })
    })
  })
}

const getData = (year, month) => {
  return new Promise((resolve, reject) => {
    const dataList = []
    const pagePostData = {
      ...postData,
      D539Control_history1$dropYear: year,
      D539Control_history1$dropMonth: month,
    }
    request.post(url, { form: pagePostData }, function(error, response, html) {
      const tableList = $('table.td_hm', html)
      tableList.each(function(index, element) {
        const newsItem = {
          date: $(element)
            .find(`#D539Control_history1_dlQuery_D539_DDate_${index}`)
            .text()
            .replace(/\//g, '-')
            .replace(/^.\d*-/, `${year + 1911}-`),
          num: [
            $(element)
            .find(`#D539Control_history1_dlQuery_No1_${index}`)
            .text(),
            $(element)
            .find(`#D539Control_history1_dlQuery_No2_${index}`)
            .text(),
            $(element)
            .find(`#D539Control_history1_dlQuery_No3_${index}`)
            .text(),
            $(element)
            .find(`#D539Control_history1_dlQuery_No4_${index}`)
            .text(),
            $(element)
            .find(`#D539Control_history1_dlQuery_No5_${index}`)
            .text(),
          ],
        }
        newsItem.num.sort()
        dataList.push(newsItem)
      })
      resolve(dataList)
    })
  })
}

;(async () => {
  // const year = 109
  const allYearData = []
  postData = { ...postData, ...(await getToken()) }

  for (let year = 103; year <= 109 ; year++) {
    for (let m = 1; m <= 12; m++) {
      allYearData.push(...(await getData(year, m)))
    }
  }
  const sortData = allYearData.sort((a, b) => {
    if (a.date < b.date) return -1
    if (a.date > b.date) return 1
    return 0
  })
  fs.writeFileSync(`./src/assets/Data.json`, JSON.stringify(sortData, null, 2))
})()
