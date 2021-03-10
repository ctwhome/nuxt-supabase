import { reactive, readonly } from '@vue/composition-api'

const state = reactive({
  tasks: [
    {
      id: 1,
      description: 'Finish the course',
      done: false,
    },
    {
      id: 2,
      description: 'Walk the dog',
      done: true,
    },
    {
      id: 3,
      description: 'Exercise',
      done: false,
    },
    {
      id: 4,
      description: 'Read a book',
      done: true,
    },
    {
      id: 5,
      description: 'Write an article',
      done: false,
    },
  ],
  nextId: 6,
  tasksFiltered: [],
  activeTab: 'all',
})

const filterTodos = function (filterOption) {
  switch (filterOption) {
    case 'done':
      state.tasksFiltered = state.tasks.filter((task) => task.done)
      state.activeTab = 'done'
      break
    case 'undone':
      state.tasksFiltered = state.tasks.filter((task) => !task.done)
      state.activeTab = 'undone'
      break
    default:
      state.activeTab = 'all'
      state.tasksFiltered = [...state.tasks]
  }
}

const addTodo = function (todo) {
  const newTodoObj = {
    id: state.nextId,
    description: todo,
    done: false,
  }

  state.tasks.push(newTodoObj)
  filterTodos(state.activeTab)
  state.nextId++
}

const deleteTask = function (task) {
  state.tasks = state.tasks.filter((todoObj) => todoObj.id !== task.id)
  filterTodos(state.activeTab)
}

const toggleTaskStatus = function (task) {
  const taskObj = state.tasks.find((item) => item.id === task.id)
  taskObj.done = !taskObj.done
  filterTodos(state.activeTab)
}

export default {
  state: readonly(state),
  filterTodos,
  addTodo,
  deleteTask,
  toggleTaskStatus,
}
