/* Optional Firebase Cloud Leaderboard
   你現在不用改也可以玩，排行榜會先存在自己的瀏覽器。

   如果要做「全班排行榜」：
   1. 到 Firebase 建立專案
   2. 建立 Firestore Database
   3. 把 Firebase SDK 和 config 貼在這裡
   4. 定義 window.cloudSaveScore 和 window.cloudLoadLeaderboard

   因為每個人的 firebaseConfig 都不同，所以這個檔案先保持空白。
*/

// Example structure only:
//
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
// import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
//
// const firebaseConfig = {
//   apiKey: "你的",
//   authDomain: "你的",
//   projectId: "你的",
//   storageBucket: "你的",
//   messagingSenderId: "你的",
//   appId: "你的"
// };
//
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
//
// window.cloudSaveScore = async function(record) {
//   await addDoc(collection(db, "scores"), record);
// };
//
// window.cloudLoadLeaderboard = async function() {
//   const q = query(collection(db, "scores"), orderBy("score", "desc"), limit(5));
//   const snapshot = await getDocs(q);
//   return snapshot.docs.map(doc => doc.data());
// };
