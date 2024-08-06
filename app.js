let taskValue = document.getElementById('task_value')
let addBtn = document.getElementById('add_btn')
let userDate = []

addBtn.addEventListener('click', () => {
  if (taskValue.value.trim().length) {
    let date = new Date()
    let hours = date.getHours()
    let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    let today = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    let month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    let year = date.getFullYear()
    userDate.push({
      name: taskValue.value.trim(),
      date: `${hours}:${minute} AM, ${today}/${month}/${year}`
    })
    taskValue.value = ""
  }
})

function getTasks() {
  let taskList = document.getElementById('task_list')
  taskList.innerHTML = ""
  userDate.forEach(item => {
    let div = document.createElement('div')
    div = `<div class="bg-white flex items-center px-3 py-2 justify-between">
        <div class="flex items-center gap-2">
          <input class="w-6 h-6" type="checkbox">
          <div>
            <p class="text-lg font-medium text-gray-600 leading-5">Create a Todo list</p>
            <p class="text-[11px] text-gray-700 leading-4">5:23 AM, 01/06/2024</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="bg-gray-300 w-8 h-8 flex justify-center items-center rounded">
            <i class=" fa-solid fa-trash"></i>
          </div>
          <div class="bg-gray-300 w-8 h-8 flex justify-center items-center rounded">
            <i class="fa-solid fa-pen"></i>
          </div>
        </div>
      </div>`
  })
}