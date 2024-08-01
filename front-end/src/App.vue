<template>
  <div id="app">
    <h1 class="tittle">Pomodoro</h1>
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
  display: flex;
  align-items: center;
  flex-direction: column;
}

.tittle {
  text-align: center;
  color: wheat;
  margin: 0;
  padding: 1rem;
}
</style>
