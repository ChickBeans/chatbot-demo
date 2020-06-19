import firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseConfig from './config'

// firebase初期化
firebase.initializeApp(firebaseConfig);
// firestoreのメモリッカウホ
export const db = firebase.firestore();