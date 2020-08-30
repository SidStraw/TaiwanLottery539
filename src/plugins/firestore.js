import firebase from 'firebase/app'
import 'firebase/firestore'

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyDH8KuKkGcP3TNhfaiKrhQ-8abh-jdxGfg',
  authDomain: 'taiwanlottery539.web.app',
  projectId: 'taiwanlottery539',
})

var db = firebase.firestore()

export default db
