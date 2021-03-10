<template>
  <div>
    <v-card>
      <v-card-title> ToDo App </v-card-title>
      <v-card-text>
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

    <hr />
    <todos />
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import { todos, fetchTodos, addTodo, doneTodo, removeTodo } from '~/api/todos'

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
    }
  },
  mounted() {
    this.fetchTodos()
  },

  /*
   * newTodo with Options API
   * /
   */
  // data() {
  //   return { newTodo: '' }
  // },

  // async asyncData({ $supabase }) {
  //   const data = await $supabase.from('todos').select('*')
  //   return {
  //     todos: data.data,
  //   }
  // },
  // computed: {
  //   todos() {
  //     return this.$store.state.todos.todos
  //   },
  // },
  // async created() {
  //   this.$store.dispatch('todos/fetchTodos')
  // },
  // setup(props) {
  //   let todos = []
  //
  //   const getTodos = async () => {
  //     todos = await fetchTodos()
  //   }
  //
  //   return {
  //     todos,
  //     getTodos, // functions returned behave the same as methods
  //   }
  // },
  // async created() {
  //   await fetchTodos()
  // },
  // computed: {
  //   todos,
  // },
}
</script>
<style lang="scss">
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
