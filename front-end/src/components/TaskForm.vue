<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="description">Descrição</label>
      <input
        type="text"
        id="description"
        v-model="description"
        placeholder="Descrição da tarefa"
        required
      />
    </div>
    <div>
      <label for="numberOfPomodoros">Número de Pomodoros</label>
      <input
        type="number"
        id="numberOfPomodoros"
        v-model.number="numberOfPomodoros"
        placeholder="Quantidade de pomodoros"
        required
      />
    </div>
    <button type="submit">Adicionar Tarefa</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Task } from '../types/Task';

export default defineComponent({
  props: {
    onSubmit: {
      type: Function as PropType<(task: Task) => void>,
      required: true,
    },
  },
  data() {
    return {
      description: '',
      numberOfPomodoros: 1,
    };
  },
  methods: {
    handleSubmit() {
      const task: Task = {
        description: this.description,
        numberOfPomodoros: this.numberOfPomodoros,
        pomodoroTime: 25,
        pomodoroBreak: this.numberOfPomodoros % 3 === 0 ? 15 : 5,
        isStarted: false,
        isFinished: false,
      };
      this.$emit('submit', task);
      this.description = '';
      this.numberOfPomodoros = 1;
    },
  },
});
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
div {
  margin-bottom: 10px;
}
label {
  font-weight: bold;
}
input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
button {
  padding: 5px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>
