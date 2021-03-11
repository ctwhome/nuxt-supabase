/*
 * Using Composition API  in Vue 2
 * https://github.com/vuejs/composition-api
 */
import { supabase } from '~/plugins/supabase'
import { reactive, set } from '@nuxtjs/composition-api'
import { nanoid } from 'nanoid'

// Reactive 'global' variable
const todos = reactive({
  data: [],
  error: null,
  fetching: false,
})

/**
 * == REALTIME ==
 * Listen for realtime changes
 */
supabase
  // ['*', 'tableName']
  .from('*')
  // [INSERT | UPDATE | DELETE | *]
  .on('*', (payload) => {
    // If the updated element is the same that the one existing in state, do not fetch again

    if (payload.eventType !== 'DELETE') {
      let localIdx = todos.data.findIndex((i) => i.id === payload.new.id)
      localIdx = localIdx === -1 ? todos.data.length : localIdx
      set(todos.data, localIdx, payload.new)
    } else {
      // check if the payload.new is in the todos.list,
      // if yes, delete it. Tha means that it comes from outside
      const deletedIdx = todos.data.findIndex((i) => i.id === payload.old.id)
      if (deletedIdx !== -1) {
        todos.data.splice(deletedIdx, 1)
      }
    }
  })
  .subscribe()

/**
 * Retrieve all todo for the signed in user
 */
const fetchTodos = async () => {
  try {
    todos.fetching = true
    const { data, count, error } = await supabase
      .from('todos')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: true })

    if (error) {
      console.log('error', error)
      return
    }
    todos.data = data
  } catch (err) {
    todos.error = err
    console.error('Error retrieving data from db', err)
  } finally {
    todos.fetching = false
  }
}
/**
 *  Add a new todo to supabase
 */
const addTodo = async (todoText) => {
  try {
    if (!todoText) {
      return
    }
    // const now = new Date().toISOString().slice(0, -1)
    const todo = {
      id: nanoid(), // custom ID
      text: todoText,
      done: false,
      // created_at: now,
    }
    // Update local state
    todos.data.push(todo)

    // Save data in DB
    // Returns the new todo in case it's needed
    await supabase.from('todos').insert(todo).single()
  } catch (err) {
    console.error('Unknown problem inserting to db', err)
    // remove local todo in case of error
    return null
  }
}
const doneTodo = async (todo, index) => {
  try {
    // update current state (Optimistic UI)
    todos.data[index].done = !todo.done

    // Update database
    const { data, error } = await supabase
      .from('todos')
      .update({ done: todos.data[index].done })
      .match({ id: todo.id })
  } catch (e) {
    console.error(e)
  }
}

const removeTodo = async (todo, index) => {
  try {
    // update current state (Optimistic UI)
    todos.data.splice(index, 1)
    // Update database
    await supabase.from('todos').delete().match({ id: todo.id })
  } catch (e) {
    console.error(e)
  }
}

export { todos, fetchTodos, addTodo, doneTodo, removeTodo }
