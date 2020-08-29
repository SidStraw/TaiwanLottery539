/*eslint-disable*/
const request = require('request')
const $ = require('cheerio')
const url = 'https://www.taiwanlottery.com.tw/lotto/dailycash/history.aspx'
const fs = require('fs')
const postData = {
  __VIEWSTATE:
    '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',
  D539Control_history1$DropDownList1: 5,
  D539Control_history1$chk: 'radYM',
  D539Control_history1$btnSubmit: '查詢',
  __VIEWSTATEGENERATOR: '09BD3138',
  __EVENTVALIDATION:
    'TGqqi5eZVupgqGM9T3Qn6ZTd9fIKkG6QDUi2pEx2lPrX6VPGkFNjD0mnTLcSKdtQj2hX7zb7QfOZ70YjKqIGUzOc8ojkA9r5X84rsFhEIJ1NxO3pFtiU2SYlRWSx1hp2uKr+OdSsWG38SHl1Far3rEGnush9msXxr5NigUyIauwmN6pyc8sZdN7iCu4oUDsRKKvaWCKYXWJSx+Pjjgcoa2TRVQ+Y8uRY4gJRLKrlauiQAZgNXDsWf2X0RuiCiDkuu7aVSVoc7JSnKummKS28lYdZrJJmhB+186zJsV7/J2CBJpGuAZB9Ds0fTys4LSJdSqU07PAxOJLdAz3glSQRrF6trEX8ZFyynblVvtaD8YK89xDWSywr4Jl4S5NWF0d7mTKh1fKBGtO8HmFsD8M5FtzaxKkygkL2kmGsNyHOeJmLXV15xLjTr9qjOociUiVeKJwLM54QXdVirPRjMN8tikWzbRIst70AkZksTUKg2SK3Cso9X2cYk7oKGqyw8H2B5/z4Sn6HfbAi7h+GH3kPnMPKZbc3h2pNQqcRw62GIwHmpWu368lBwA+e/hx7VJ4j/gbLwzhpbY4C45i12wKiw/6Wkf73QvOzmVbseaVs+V4JI710Tpc9AmA/iXkfCRoZZcmj5KVNxBqhv+QBhyglTFGtEJQFVPEWLL3/IyW1gU3qdmnjqYUxkLbNKbjYCQ5cG6Kfp8PgTOWOE704qXdgFjsmyYgRpCz18XUc/f4taOwXjYPiERRS9kmC8qHy+2GfzJV/7tolP/7QG0aE0BNZhPOz9ixLmz/cnzbZSq5PrJ8uhdFqoZAm7yqPb5guffhHmjXJin9H1hJsXQQ7NFYgbn9+D4k=',
}
// postData.D539Control_history1$dropYear = 109
// postData.D539Control_history1$dropMonth = 8

const getData = (year, month) => {
  return new Promise((resolve, reject) => {
    const dataList = []
    const pagePostData = {
      ...postData,
      D539Control_history1$dropYear: year,
      D539Control_history1$dropMonth: month,
    }
    request.post(url, { form: pagePostData }, function (error, response, html) {
      const tableList = $('table.td_hm', html)
      tableList.each(function (index, element) {
        const newsItem = {
          date: $(element)
            .find(`#D539Control_history1_dlQuery_D539_DDate_${index}`)
            .text()
            .replace(/\//g, '-')
            .replace(/^.\d*-/, `${year + 1911}-`),
          n1: $(element).find(`#D539Control_history1_dlQuery_No1_${index}`).text(),
          n2: $(element).find(`#D539Control_history1_dlQuery_No2_${index}`).text(),
          n3: $(element).find(`#D539Control_history1_dlQuery_No3_${index}`).text(),
          n4: $(element).find(`#D539Control_history1_dlQuery_No4_${index}`).text(),
          n5: $(element).find(`#D539Control_history1_dlQuery_No5_${index}`).text(),
        }
        dataList.push(newsItem)
      })
      resolve(dataList)
    })
  })
}

;(async () => {
  const year = 109
  const allYearData = []
  for (let m = 1; m <= 12; m++) {
    allYearData.push(...await getData(year, m))
  }
  const sortData = allYearData.sort((a, b) => {
    if (a.date < b.date) return -1
    if (a.date > b.date) return 1
    return 0
  })
  fs.writeFileSync(`./src/assets/${year + 1911}Data.json`, JSON.stringify(sortData, null, 2));
})()
