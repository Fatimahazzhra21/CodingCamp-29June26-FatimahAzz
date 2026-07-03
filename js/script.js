// Greeting, Date & Clock

const greeting = document.getElementById("greeting");

const todayDate = document.getElementById("todayDate");

const clock = document.getElementById("clock");

function updateDateTime(){

    const now = new Date();

    const hour = now.getHours();

    const minute = String(now.getMinutes()).padStart(2,"0");

    const second = String(now.getSeconds()).padStart(2,"0");

    let message = "";

    if(hour >= 5 && hour < 11){

        message = "Good Morning";

    }

    else if(hour >= 11 && hour < 15){

        message = "Good Afternoon";

    }

    else if(hour >= 15 && hour < 18){

        message = "Good Evening";

    }

    else{

        message = "Good Night";

    }

    greeting.textContent =`${message}, Fatimah`;

    clock.innerHTML = `${String(hour).padStart(2,"0")}:${minute}:${second}`;

    todayDate.innerHTML = now.toLocaleDateString("en-US",{

        weekday:"long",

        day:"numeric",

        month:"long",

        year:"numeric"

    });

}

updateDateTime();

setInterval(updateDateTime,1000);
// Focus Timer

const timer = document.getElementById("timer");

const startBtn = document.getElementById("startBtn");

const pauseBtn = document.getElementById("pauseBtn");

const resetBtn = document.getElementById("resetBtn");

let totalTime = 25 * 60;

let currentTime = totalTime;

let timerInterval = null;

function updateTimer(){

    const minutes = Math.floor(currentTime / 60);

    const seconds = currentTime % 60;

    timer.textContent =
        `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

}

function startTimer(){

    if(timerInterval) return;

    timerInterval = setInterval(()=>{

        if(currentTime > 0){

            currentTime--;

            updateTimer();

        }

        else{

            clearInterval(timerInterval);

            timerInterval = null;

            alert("🎉 Focus session completed!");

        }

    },1000);

}

function pauseTimer(){

    clearInterval(timerInterval);

    timerInterval = null;

}

function resetTimer(){

    clearInterval(timerInterval);

    timerInterval = null;

    currentTime = totalTime;

    updateTimer();

}

startBtn.addEventListener("click",startTimer);

pauseBtn.addEventListener("click",pauseTimer);

resetBtn.addEventListener("click",resetTimer);

updateTimer();
// Todo List

const taskInput = document.getElementById("taskInput");

const addTask = document.getElementById("addTask");

const taskList = document.getElementById("taskList");

const progressFill = document.getElementById("progressFill");

const progressText = document.getElementById("progressText");

const progressPercent = document.getElementById("progressPercent");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks(){

    taskList.innerHTML = "";

    tasks.forEach((task,index)=>{

        const li = document.createElement("li");

        li.className = "task";

        li.innerHTML = `

        <div class="task-left">

            <input
                type="checkbox"
                ${task.completed ? "checked" : ""}>

            <span class="${task.completed ? "completed" : ""}">

                ${task.text}

            </span>

        </div>

        <div class="task-actions">

            <button class="edit-btn">

                <i class="fa-solid fa-pen"></i>

            </button>

            <button class="delete-btn">

                <i class="fa-solid fa-trash"></i>

            </button>

        </div>

        `;

        const checkbox = li.querySelector("input");

        checkbox.addEventListener("change",()=>{

            tasks[index].completed = checkbox.checked;

            renderTasks();

        });

        const editBtn = li.querySelector(".edit-btn");

        editBtn.addEventListener("click",()=>{

            const newTask = prompt("Edit task",tasks[index].text);

            if(newTask && newTask.trim() !== ""){

                tasks[index].text = newTask.trim();

                renderTasks();

            }

        });

        const deleteBtn = li.querySelector(".delete-btn");

        deleteBtn.addEventListener("click",()=>{

            tasks.splice(index,1);

            renderTasks();

        });

        taskList.appendChild(li);

    });

    updateProgress();
    localStorage.setItem("tasks",JSON.stringify(tasks));

}
function updateProgress(){

    const total = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    progressFill.style.width = percent + "%";

    progressPercent.textContent = percent + "%";

    progressText.textContent =
        `${completed} of ${total} tasks completed`;

}
addTask.addEventListener("click",()=>{

    const value = taskInput.value.trim();

    if(value === ""){

        alert("Please enter a task.");

        return;

    }

    if(tasks.some(task => task.text.toLowerCase() === value.toLowerCase())){

        alert("Task already exists.");

        return;

    }

    tasks.push({

        text:value,

        completed:false

    });

    taskInput.value = "";

    renderTasks();

});
taskInput.addEventListener("keypress",(e)=>{

    if(e.key === "Enter"){

        addTask.click();

    }

});

renderTasks();
// Dark Mode

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");

if(savedTheme === "dark"){

    document.body.classList.add("dark");

    themeToggle.innerHTML='<i class="fa-solid fa-sun"></i>';

}

themeToggle.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

        themeToggle.innerHTML='<i class="fa-solid fa-sun"></i>';

    }

    else{

        localStorage.setItem("theme","light");

        themeToggle.innerHTML='<i class="fa-solid fa-moon"></i>';

    }

});
// Daily Quote

const quotes=[

"Small progress is still progress.",

"Done is better than perfect.",

"Stay consistent, not perfect.",

"Dream big. Start small.",

"Discipline beats motivation.",

"One task at a time."

];

const quote=document.getElementById("quote");

quote.textContent=

quotes[Math.floor(Math.random()*quotes.length)];
document.addEventListener("keydown",(e)=>{

    if(e.code==="Space"){

        e.preventDefault();

        startTimer();

    }

});
const toast=document.getElementById("toast");

function showToast(message){

    toast.textContent=message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}
tasks.push({

text:value,

completed:false

});
showToast("Task added successfully.");