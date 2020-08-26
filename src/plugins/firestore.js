const firebase = require('firebase')
// Required for side-effects
require('firebase/firestore')

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyDH8KuKkGcP3TNhfaiKrhQ-8abh-jdxGfg',
  authDomain: 'taiwanlottery539.web.app',
  projectId: 'taiwanlottery539',
})

var db = firebase.firestore()

export default db
