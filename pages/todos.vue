<template>
  <pre>{{ todos }}</pre>
</template>

<script>
import { todos } from '~/api/todos'
export default {
  name: 'Todos',
  setup() {
    return { todos }
  },
}
</script>

<style scoped></style>
