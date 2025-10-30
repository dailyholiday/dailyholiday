import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyBS7C50eMiRtQ4nge4HrXo0ZuEkKoIVIUE",
  authDomain: "daily-holiday.firebaseapp.com",
  projectId: "daily-holiday",
  storageBucket: "daily-holiday.firebasestorage.app",
  messagingSenderId: "51054604621",
  appId: "1:51054604621:web:deffcd35458bb7c6b18704",
  measurementId: "G-SX1PV7VLSX"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
