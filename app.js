let taskValue = document.getElementById('task_value')
let addBtn = document.getElementById('add_btn')
let deleteTasks = document.getElementById('delete_tasks')
let tasksCount = document.getElementById('tasks_count')

let userDate = JSON.parse(localStorage.getItem("users")) || []

document.addEventListener('DOMContentLoaded', () => {
  addBtn.addEventListener('click', btnClicked)
  getTasks()
  document.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
      btnClicked()
    }
  })
  deleteTasks.addEventListener('click', deleteTaskFn)
  tasksCount.innerHTML = userDate.length

})


function btnClicked() {
  if (taskValue.value.trim().length) {
    let date = new Date()
    let hours = date.getHours()
    let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    let today = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    let month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    let year = date.getFullYear()
    userDate.push({
      name: taskValue.value.trim(),
      date: `${hours}:${minute} AM, ${today}/${month}/${year}`,
      disablited: false
    })
    taskValue.value = ""
    tasksCount.innerHTML = userDate.length
  }
  getTasks()
  getLocalStorage()
}

function getTasks() {
  let taskList = document.getElementById('task_list')
  taskList.innerHTML = ""
  userDate.forEach((item, index) => {
    let div = document.createElement('div')
    div.innerHTML +=
      `<div class="bg-white flex items-center px-3 py-2 justify-between">
        <div class="flex items-center gap-2">
          <input class="checkbox w-6 h-6" ${item.disablited ? "checked" : ""} type="checkbox">
          <div>
            <p class="${item.disablited ? "disablited" : ""} text-lg font-medium text-gray-600 leading-5">${item.name}</p>
            <p class="text-[11px] text-gray-700 leading-4">${item.date}</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button id="delete_btn" class="bg-gray-300 w-8 h-8 flex justify-center items-center rounded">
            <i class=" fa-solid fa-trash"></i>
          </button>
          <button id="edite_btn" class="bg-gray-300 w-8 h-8 flex justify-center items-center rounded">
            <i class="fa-solid fa-pen"></i>
          </button>
        </div>
      </div>`
    taskList.appendChild(div)
    div.querySelector('#delete_btn').addEventListener("click", () => {
      deleteToggle(index)
    })
    div.querySelector('.checkbox').addEventListener('click', () => {
      taskToggle(index)
    })
    div.querySelector('#edite_btn').addEventListener('click', () => {
      editeToggle(index)
    })
  })
}

function getLocalStorage() {
  localStorage.setItem("users", JSON.stringify(userDate))
}

function deleteTaskFn() {
  userDate = []
  getLocalStorage()
  getTasks()
  tasksCount.innerHTML = userDate.length
}


function deleteToggle(index) {
  userDate.splice(index, 1)
  getTasks()
  getLocalStorage()
  tasksCount.innerHTML = userDate.length
}

function taskToggle(index) {
  userDate[index].disablited = !userDate[index].disablited
  getLocalStorage()
  getTasks()
  getTasks()
}


function editeToggle(index) {
  let newTask_name = prompt()
  console.log(userDate[index]);
  if (newTask_name.trim().length) {
    userDate[index].name = newTask_name
    getLocalStorage()
    getTasks()
  }
}