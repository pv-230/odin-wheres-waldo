import { initializeApp } from 'firebase/app';

// Not necessary to hide Firebase API key
const firebaseConfig = {
  apiKey: 'AIzaSyAcnYaKGUqHjPtC_VSKhqvlKZxG4dS48fM',
  authDomain: 'where-s-waldo-c4111.firebaseapp.com',
  projectId: 'where-s-waldo-c4111',
  storageBucket: 'where-s-waldo-c4111.appspot.com',
  messagingSenderId: '307823725310',
  appId: '1:307823725310:web:78d27859dd70f0c9e1f3af',
};

// eslint-disable-next-line import/prefer-default-export
export const db = initializeApp(firebaseConfig);
