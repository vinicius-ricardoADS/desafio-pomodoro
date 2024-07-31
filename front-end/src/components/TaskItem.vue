<template>
  <div class="task-item">
    <h3 class="h3">{{ task.description }}</h3>
    <p class="p-numberPomodoros">Pomodoros: {{ task.numberOfPomodoros }}</p>
    <p class="p-timeSpent" v-if="task.timeSpent">Tempo gasto: {{ task.timeSpent }}</p>
    <div class="flex-button">
      <button :class="!task.isStarted ? 'bt-start' : ''" @click="startTask" :disabled="task.isStarted || task.isFinished">
        {{ task.isStarted ? 'Iniciada' : 'Iniciar' }}
      </button>
      <button class="bt-remove" @click="removeTask">Remover</button>
      <button class="bt-edit" @click="editTask">Editar</button>
    </div>
    <TaskTimer
      v-if="task.isStarted && !task.isFinished"
      :task="task"
      :numberOfPomodoros="task.numberOfPomodoros!"
      @tarefaFinalizada="handleTarefaFinalizada"
      @tarefaIniciada="startTask"
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
    editTask(): void {
      this.$emit('edit-task', this.task);
    },
    handleTarefaFinalizada(payload: { pomodoros: number; tempoGasto: number }): void {
      this.$emit('tarefa-finalizada', { ...payload, task: this.task });
    },
  },
});
</script>

<style scoped>
.bt-start {
  background-color: green;
}
.bt-remove {
  background-color: red;
}
.bt-edit {
  background-color: blue;
}
.bt-start:hover {
  background-color: rgb(69, 216, 69);
}
.bt-remove:hover {
  background-color: rgb(211, 85, 85);
}
.bt-edit:hover {
  background-color: rgb(69, 69, 197);
}
p {
  color: wheat;
}

h3 {
  color: wheat;
}
.h3 {
  margin-bottom: 15px;
  font-size: 28px;
}
.p-numberPomodoros {
  margin-bottom: 22px;
  font-size: 28px;
}

.p-timeSpent {
  font-size: 28px;
  margin-bottom: 20px;
}
.task-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  height: 100%;
}

.flex-button {
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
}

button {
  height: 31px;
  width: 73px;
  color: white;
  border: 0;
  border-radius: 0.5rem;
  font-family: Arial, Helvetica, sans-serif;
}

button:hover {
  cursor: pointer;
}
</style>
