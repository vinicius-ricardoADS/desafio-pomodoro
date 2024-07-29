<template>
  <div>
    <TaskForm :onSubmit="addTask" />

    <ul>
      <li v-for="task in tasks" :key="task.id" class="task-item">
        <TaskItem
          :task="task"
          :tempoGasto="tempoGasto"
          @start-task="handleStartTask"
          @finish-task="handleFinishTask"
          @remove-task="deleteTask"
          @tarefa-finalizada="handleTarefaFinalizada"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Task } from '../types/Task';
import TaskForm from './TaskForm.vue';
import TaskItem from './TaskItem.vue';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

export default defineComponent({
  components: {
    TaskForm,
    TaskItem,
  },
  data() {
    return {
      tasks: [] as Task[],
      tempoGasto: '',
    };
  },
  async created() {
    try {
      this.tasks = await getTasks();
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  },
  methods: {
    async addTask(task: Task) {
      try {
        const newTask = await createTask(task);
        this.tasks.push(newTask);
      } catch (error) {
        console.error('Failed to create task:', error);
      }
    },
    async deleteTask(id: string) {
      try {
        await deleteTask(id);
        this.tasks = this.tasks.filter(task => task.id !== id);
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    },
    async handleStartTask(task: Task) {
      try {
        await updateTask(task.id, { isStarted: true });
        task.isStarted = true;
      } catch (error) {
        console.error('Failed to start task:', error);
      }
    },
    async handleFinishTask(task: Task) {
      try {
        await updateTask(task.id, { isFinished: true });
        task.isFinished = true;
      } catch (error) {
        console.error('Failed to finish task:', error);
      }
    },
    async handleTarefaFinalizada({ task, pomodoros, tempoGasto }) {
      console.log(`Pomodoros completados: ${pomodoros}`);
      const minutes = Math.floor(tempoGasto / 60000);
      const seconds = Math.floor((tempoGasto % 60000) / 1000);
      this.tempoGasto = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      await updateTask(task.id, { isFinished: true });
      task.isFinished = true;
      
      // Aqui você pode adicionar lógica para atualizar o estado das tarefas ou armazenar os dados finalizados
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
