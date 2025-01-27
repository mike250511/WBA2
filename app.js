const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Add Task
addTaskBtn.addEventListener('click', async () => {
    const task = taskInput.value.trim();
    if (task) {
    const taskInput = document.getElementById("taskInput");
    const taskText = sanitizeInput(taskInput.value.trim());
    if (taskText) {
    await addTaskToFirestore(taskText);
    renderTasks();
    taskInput.value = "";
    }
    renderTasks();
    }
   });
   async function addTaskToFirestore(taskText) {
    await addDoc(collection(db, "todos"), {
    text: taskText,
    completed: false
    });
    }
   

// Remove Task on Click
taskList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        e.target.remove();
    }
});

//Retrieveing the To-Do List
async function renderTasks() {
    var tasks = await getTasksFromFirestore();
    taskList.innerHTML = "";
   
    tasks.forEach((task, index) => {
    if(!task.data().completed){
    const taskItem = document.createElement("li");
    taskItem.id = task.id;
    taskItem.textContent = task.data().text;
    taskList.appendChild(taskItem);
    }
    });
    }
   async function getTasksFromFirestore() {
    var data = await getDocs(collection(db, "todos"));
    let userData = [];
    data.forEach((doc) => {
    userData.push(doc);
    });
    return userData;
   }

//Adding Security and Validation
function sanitizeInput(input) {
    const div = document.createElement("div");
    div.textContent = input;
    return div.innerHTML;
   }

const sw = new URL('service-worker.js', import.meta.url)
if ('serviceWorker' in navigator) {
 const s = navigator.serviceWorker;
 s.register(sw.href, {
 scope: '/YOUR_REPOSITORY_NAME_HERE/'
 })
 .then(_ => console.log('Service Worker Registered for scope:', sw.href,
'with', import.meta.url))
 .catch(err => console.error('Service Worker Error:', err));
}

import { initializeApp } from 'firebase/app';
import { doc, getDocs, addDoc, updateDoc, getFirestore, collection } from
"firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD-2SzFAO5Uas5d-27Lx7Zj1YivxgPAll4",
    authDomain: "wba2-39928.firebaseapp.com",
    projectId: "wba2-39928",
    storageBucket: "wba2-39928.firebasestorage.app",
    messagingSenderId: "912660614557",
    appId: "1:912660614557:web:4520aa23a9fb69f79b7374",
    measurementId: "G-4BKTWBE1GK"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
