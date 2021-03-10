<template>
  <div class="d-flex flex-column align-center">
    <v-card max-width="600px">
      <v-btn @click="drawer = !drawer">Open Drawer</v-btn>
      <v-card-title style="word-break: break-word">
        Nuxt Supabase template
      </v-card-title>
      <v-card-text>
        <p>
          Nuxt Supabase Realtime - CRUD template with Composition API and
          Optimistic UI.
        </p>
        <form
          @submit.prevent="
            addTodo(newTodo)
            newTodo = ''
          "
        >
          <label>New ToDo </label>
          <input v-model="newTodo" name="newTodo" autocomplete="off" />
          <button>Add ToDo</button>
        </form>
        <h2>ToDo List {{ todos.count }}</h2>
        <ul>
          <li v-for="(todo, index) in todos.data" :key="index">
            <div
              @click="doneTodo(todo, index)"
              style="cursor: pointer; width: 100%"
            >
              <v-icon :color="todo.done ? 'green' : ''"
                >mdi-check-circle-outline</v-icon
              >
              <span :class="{ done: todo.done }">
                {{ todo.text }}
              </span>
            </div>
            <button @click="removeTodo(todo, index)">Remove</button>
          </li>
        </ul>
        <h4 v-if="todos.length === 0">Empty list.</h4>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'
import { todos, fetchTodos, addTodo, doneTodo, removeTodo } from '~/api/todos'
import { drawer } from '~/layouts/default'
export default {
  setup() {
    // Reactive state newTodo with composition API. You can still use data(){return {newTodo:''}} from the options API
    const newTodo = ref('')
    // Return the properties that the rest of the vue component can access
    return {
      todos,
      addTodo,
      fetchTodos,
      doneTodo,
      removeTodo,
      newTodo,
      drawer,
    }
  },
  mounted() {
    this.fetchTodos()
  },
}
</script>
<style lang="scss" scoped>
$border: 2px solid
  rgba(
    $color: white,
    $alpha: 0.35,
  );
$size1: 6px;
$size2: 12px;
$size3: 18px;
$size4: 24px;
$size5: 48px;
$backgroundColor: #27292d;
$textColor: white;
$primaryColor: #a0a4d9;
$secondTextColor: #1f2023;
body {
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: $backgroundColor;
  color: $textColor;
  #app {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
    h1 {
      font-weight: bold;
      font-size: 28px;
      text-align: center;
    }
    form {
      display: flex;
      flex-direction: column;
      width: 100%;
      label {
        font-size: 14px;
        font-weight: bold;
      }
      input,
      button {
        height: $size5;
        box-shadow: none;
        outline: none;
        padding-left: $size2;
        padding-right: $size2;
        border-radius: $size1;
        font-size: 18px;
        margin-top: $size1;
        margin-bottom: $size2;
      }
      input {
        background-color: transparent;
        border: $border;
        color: inherit;
      }
    }
    button {
      cursor: pointer;
      background-color: $primaryColor;
      border: 1px solid $primaryColor;
      color: $secondTextColor;
      font-weight: bold;
      outline: none;
      border-radius: $size1;
    }
    h2 {
      font-size: 22px;
      border-bottom: $border;
      padding-bottom: $size1;
    }
    ul {
      padding: 10px;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: $border;
        padding: $size2 $size4;
        border-radius: $size1;
        margin-bottom: $size2;
        span {
          cursor: pointer;
        }
        .done {
          text-decoration: line-through;
        }
        button {
          font-size: $size2;
          padding: $size1;
        }
      }
    }
    h4 {
      text-align: center;
      opacity: 0.5;
      margin: 0;
    }
  }
}
</style>
