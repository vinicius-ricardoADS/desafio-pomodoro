<template>
  <div>
    <TaskForm :onSubmit="handleFormSubmit" :taskToEdit="taskToEdit" />

    <ul class="list-pomodoro">
      <li v-for="task in tasks" :key="task.id" class="task-item">
        <TaskItem
          :task="task"
          :tempoGasto="tempoGasto"
          @start-task="handleStartTask"
          @remove-task="deleteTask"
          @tarefa-finalizada="handleTarefaFinalizada"
          @edit-task="editTask"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Task } from '../types/Task';
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
      taskToEdit: null as Task | null,
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
    async handleFormSubmit(task: Task) {
      const { id, ...taskData } = task;
      if (id) {
        try {
          await updateTask(id, taskData);
          this.tasks = this.tasks.map(t => (t.id === task.id ? task : t));
          this.taskToEdit = null;
        } catch (error) {
          console.error('Failed to update task:', error);
        }
      } else {
        try {
          const newTask = await createTask(task);
          this.tasks.push(newTask);
        } catch (error) {
          console.error('Failed to create task:', error);
        }
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
        await updateTask(task.id!, { isStarted: true });
        task.isStarted = true;
      } catch (error) {
        console.error('Failed to start task:', error);
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async handleTarefaFinalizada({ task, pomodoros, tempoGasto }: { task: Task; pomodoros: number; tempoGasto: number }) {
      const minutes = Math.floor(tempoGasto / 60000);
      const seconds = Math.floor((tempoGasto % 60000) / 1000);
      this.tempoGasto = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      await updateTask(task.id!, { isFinished: true, timeSpent: this.tempoGasto });
      this.tasks = await getTasks();
      task.isFinished = true;
    },
    editTask(task: Task) {
      this.taskToEdit = task;
    },
  },
});
</script>

<style scoped>
.list-pomodoro {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

.task-item {
  padding: 10px;
  margin-bottom: 10px;
  text-align: center;
  margin: 20px;
  border-radius: 5px;
}
</style>
