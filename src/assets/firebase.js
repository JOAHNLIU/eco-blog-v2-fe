import { initializeApp } from "firebase/app";
import { getAuth, browserPopupRedirectResolver } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfdgO7x3PS-JNlxk65xldOC11Y8xaIQLw",
  authDomain: "eco-blog-dc2dd.firebaseapp.com",
  projectId: "eco-blog-dc2dd",
  storageBucket: "eco-blog-dc2dd.firebasestorage.app",
  messagingSenderId: "707700783324",
  appId: "1:707700783324:web:73d779783d18927ce51c19",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app, {
  popupRedirectResolver: browserPopupRedirectResolver,
});
