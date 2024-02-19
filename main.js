const input = document.getElementById('todo-input')
const addButton = document.getElementById('add-button')
const todoContainer = document.getElementById('todo-container')
const completedTodoList = document.getElementById('completed-todolist')
const deleteButton = document.getElementById('delete-button')

function createTodo(todoText) {
  const div = document.createElement('div')
  div.classList.add('todo')
  div.setAttribute('id', 'todo')
  
  const completeButton = document.createElement('button')
  completeButton.setAttribute('type','button')
  completeButton.setAttribute('id','complete-button')
  completeButton.innerText = '完了'
  completeButton.addEventListener('click', function () {
    const todoText = document.querySelector('.todo-text').textContent
    const completedTodo = createCompletedTodo(todoText)
    
    addButton.disabled = false
    deleteButton.disabled = true
    deleteAllCompletedTodoButton.disabled = false
    deleteAllTodo(todoContainer)
    completedTodoList.appendChild(completedTodo)
  })

  const span = document.createElement('span')
  span.classList.add('todo-text')
  span.innerText = todoText

  const editButton = document.createElement('button')
  editButton.setAttribute('type','button')
  editButton.setAttribute('id','edit-button')
  editButton.classList.add('edit-button')
  editButton.innerText = '編集'
  editButton.addEventListener('click', function () {
    const todo = document.getElementById('todo')
    const todoText = todo.querySelector('.todo-text').textContent

    deleteAllTodo(todoContainer)

    const editInput = createEditInput(todoText)
    const updateButton = createUpdateButton()
    todoContainer.append(editInput, updateButton)

    updateButton.addEventListener('click', function () {
      const newTodoText = editInput.value
      const todo = createTodo(newTodoText)
      deleteAllTodo(todoContainer)
      todoContainer.append(todo)
    })
  })

  div.append(completeButton, span, editButton)

  return div
}

function createCompletedTodo(todoText) {
  const li = document.createElement('li')
  li.classList.add('completed-todo')

  const span = document.createElement('span')
  span.classList.add('todo-text', 'completed-todo')
  span.innerText = todoText

  const deleteCompletedTodoButton = document.createElement('button')
  deleteCompletedTodoButton.setAttribute('type','button')
  deleteCompletedTodoButton.classList.add('delete-button')
  deleteCompletedTodoButton.innerText = '削除'
  deleteCompletedTodoButton.addEventListener('click',function () {
    deleteCompletedTodoButton.parentNode.remove()
  })

  li.append(span, deleteCompletedTodoButton)

  return li
}

function createEditInput(todoText) {
  const editInput = document.createElement('input')
  editInput.setAttribute('type', 'text')
  editInput.setAttribute('id', 'edit-input')
  editInput.value = todoText

  return editInput
}

function createUpdateButton() {
  const updateButton = document.createElement('button')
  updateButton.setAttribute('id','update-button')
  updateButton.innerText = '更新'
  return updateButton
}

function addTodo() {
  const todoText = input.value.trim();
  if (todoText === '') return;

  const todo = createTodo(todoText)

  todoContainer.appendChild(todo)

  addButton.disabled = true
  deleteButton.disabled = false
  input.value = ''
}

function completedTodo() {
  
}


function deleteAllTodo(todoList) {
  todoList.innerHTML = ''
}

addButton.addEventListener('click', function () {
  addTodo()
})

deleteButton.addEventListener('click', function () {
  deleteAllTodo(todoContainer)
  addButton.disabled = false
  deleteButton.disabled = true
})

const deleteAllCompletedTodoButton = document.getElementById('delete-all-button')

deleteAllCompletedTodoButton.addEventListener('click', function () {
  deleteAllTodo(completedTodoList)
  deleteAllCompletedTodoButton.disabled = true
})