import Vuex from 'vuex'
import { supabase } from '~/plugins/supabase'

//
// Subscriptions
//
supabase
  .from('*')
  .on('*', (payload) => {
    const todos = window.$nuxt.$store.state.todos.todos // TODO: access from window.$nuxt? arg...
    const idx = todos.findIndex((todo) => todo.id === payload.new.id)
    console.log('🎹', payload.new)
    window.$nuxt.$store.commit('todos/updateTodoText', {
      idx,
      todo: payload.new.text,
    })
  })
  .subscribe()

//
// State
//
export const state = {
  todos: [],
}

export const getters = {
  getterName(state, id /* Params */) {
    // state.todos.push({
    //   id,
    //   done: false,
    // })
  },
}

export const actions = {
  async fetchTodos({ commit } /* Context */ /* Params */) {
    const todos = await supabase
      .from('todos')
      .select('*')
      .order('id', { ascending: true })
    commit('addTodos', todos.data)
  },
}

export const mutations = {
  addTodos(state, payload) {
    state.todos = payload
  },
  updateTodoText(state, { idx, todo }) {
    state.todos[idx] = todo
  },
}
