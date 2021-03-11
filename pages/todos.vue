<template>
  <pre>{{ todos }}</pre>
</template>

<script>
import { todosData } from '~/api/todos'
export default {
  name: 'Todos',
  setup() {
    return { todosData }
  },
}
</script>

<style scoped></style>
