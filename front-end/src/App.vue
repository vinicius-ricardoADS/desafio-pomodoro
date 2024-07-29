<template>
  <div id="app">
    <h1>Pomodoro Task List</h1>
    <TaskList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskList from './components/TaskList.vue';

export default defineComponent({
  components: {
    TaskList,
  },
});
</script>

<style scoped>
#app {
  text-align: center;
  margin: 20px;
}

h1 {
  color: #2c3e50;
}
</style>
