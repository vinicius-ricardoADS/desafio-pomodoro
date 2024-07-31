<template>
  <form @submit.prevent="handleSubmit">
    <div class="field">
      <label for="description" class="lb-input">Descrição</label>
      <input
        type="text"
        id="description"
        v-model="description"
        placeholder="Descrição da tarefa"
        required
      />
    </div>
    <div class="field">
      <label for="numberOfPomodoros" class="lb-input">Pomodoro</label>
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
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { Task } from '../types/Task';

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
      numberOfPomodoros: 0,
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
        timeSpent: '',
      };
      this.$emit('submit', task);
      this.description = '';
      this.numberOfPomodoros = 0;
    },
  },
});
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lb-input {
  padding-right: 15px;
  color: wheat;
} 

.field {
  margin-top: 20px;
}

label {
  font-weight: bold;
}

input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  width: 250px;
}

button {
  margin-top: 20px;
  padding: 5px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  height: 32px;
  width: 354px;
}

button:hover {
  background-color: #45a049;
}
</style>
