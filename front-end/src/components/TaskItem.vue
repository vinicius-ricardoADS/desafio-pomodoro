<template>
  <div class="task-item">
    <h3>{{ task.description }}</h3>
    <p>Pomodoros: {{ task.numberOfPomodoros }}</p>
    <p v-if="task.timeSpent">Tempo gasto: {{ task.timeSpent }}</p>
    <button @click="startTask" :disabled="task.isStarted || task.isFinished">
      {{ task.isStarted ? 'Iniciada' : 'Iniciar' }}
    </button>
    <button @click="removeTask">Remover</button>
    <TaskTimer
      v-if="task.isStarted && !task.isFinished"
      :numberOfPomodoros="task.numberOfPomodoros!"
      @tarefaFinalizada="handleTarefaFinalizada"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskTimer from './TaskTimer.vue';
import type { Task } from '../types/Task';

export default defineComponent({
  props: {
    task: {
      type: Object as () => Task,
      required: true,
    },
    tempoGasto: {
      type: String,
      required: true,
    },
  },
  components: {
    TaskTimer,
  },
  methods: {
    startTask(): void {
      this.$emit('start-task', this.task);
    },
    removeTask(): void {
      this.$emit('remove-task', this.task.id);
    },
    handleTarefaFinalizada(payload: { pomodoros: number; tempoGasto: number }): void {
      this.$emit('tarefa-finalizada', { ...payload, task: this.task });
    },
  },
});
</script>

<style scoped>
.task-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
button {
  margin-right: 5px;
}
</style>
