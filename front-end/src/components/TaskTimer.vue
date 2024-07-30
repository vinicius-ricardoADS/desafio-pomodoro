<template>
  <div class="task-timer">
    <p>Pomodoros usados: {{ completedPomodoros }}/{{ numberOfPomodoros }}</p>
    <p v-if="!isFinished">Tempo restante: {{ formattedTime }}</p>
    <p v-if="isBreakTime">{{ breakMessage }}</p>
    <p v-if="!isFinished">Tempo decorrido: {{ formattedElapsedTime }}</p>
    <button v-if="!isStarted && !isFinished && !isBreakTime" @click="startTimer">Iniciar Pomodoro</button>
    <button v-if="!isStarted && !isFinished && elapsedTime > 0 && !isBreakTime" @click="resumeTimer">Retomar Pomodoro</button>
    <button v-if="isFinished || !isFinished" @click="finalizarTarefa">Finalizar</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onUnmounted } from 'vue';

export default defineComponent({
  props: {
    numberOfPomodoros: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const pomodoroTime = 0.10 * 60 * 1000; // 25 minutos em milissegundos
    const shortBreakTime = 0.10 * 60 * 1000; // 5 minutos em milissegundos
    const longBreakTime = 0.10 * 60 * 1000; // 15 minutos em milissegundos

    const completedPomodoros = ref(0);
    const isStarted = ref(false);
    const isFinished = ref(false);
    const isBreakTime = ref(false);
    const startTime = ref<number | null>(null);
    const elapsedTime = ref(0);
    const elapsedTimeTotal = ref(0);
    let timer: ReturnType<typeof setInterval> | null = null;

    const startTimer = () => {
      if (isStarted.value || isFinished.value) return;

      isStarted.value = true;
      startTime.value = Date.now() - elapsedTime.value;
      timer = setInterval(() => {
        elapsedTime.value = Date.now() - (startTime.value ?? 0);

        if (isBreakTime.value) {
          const breakTime = (completedPomodoros.value % 3 === 0) ? longBreakTime : shortBreakTime;
          if (elapsedTime.value >= breakTime) {
            isBreakTime.value = false;
            elapsedTime.value = 0;
            startTime.value = Date.now();
            // Se estivermos no final de um intervalo longo e completamos todos os pomodoros necessários
            if (completedPomodoros.value >= props.numberOfPomodoros) {
              isFinished.value = true;
              clearInterval(timer as ReturnType<typeof setInterval>);
              timer = null;
            }
          }
        } else {
          if (elapsedTime.value >= pomodoroTime) {
            completedPomodoros.value += 1;
            elapsedTimeTotal.value =+ elapsedTime.value;
            elapsedTime.value = 0;
            startTime.value = Date.now();
            isBreakTime.value = true;
          }
        }
      }, 1000);
    };

    const pauseTimer = () => {
      if (!isStarted.value || isFinished.value) return;

      isStarted.value = false;
      elapsedTime.value = Date.now() - (startTime.value ?? 0);
      clearInterval(timer as ReturnType<typeof setInterval>);
      timer = null;
    };

    const resumeTimer = () => {
      if (isStarted.value || isFinished.value) return;

      isStarted.value = true;
      startTime.value = Date.now() - elapsedTime.value;
      timer = setInterval(() => {
        elapsedTime.value = Date.now() - (startTime.value ?? 0);

        if (isBreakTime.value) {
          const breakTime = (completedPomodoros.value % 3 === 0) ? longBreakTime : shortBreakTime;
          if (elapsedTime.value >= breakTime) {
            isBreakTime.value = false;
            elapsedTime.value = 0;
            startTime.value = Date.now();
            // Se estivermos no final de um intervalo longo e completamos todos os pomodoros necessários
            if (completedPomodoros.value >= props.numberOfPomodoros) {
              isFinished.value = true;
              clearInterval(timer as ReturnType<typeof setInterval>);
              timer = null;
            }
          }
        } else {
          if (elapsedTime.value >= pomodoroTime) {
            completedPomodoros.value += 1;
            elapsedTime.value = 0;
            startTime.value = Date.now();
            isBreakTime.value = true;
          }
        }
      }, 1000);
    };

    const resetTimer = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      isStarted.value = false;
      isFinished.value = false;
      isBreakTime.value = false;
      elapsedTime.value = 0;
      completedPomodoros.value = 0;
    };

    const restartTask = () => {
      resetTimer();
      startTimer();
    };

    const finalizarTarefa = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      emit('tarefaFinalizada', { pomodoros: completedPomodoros.value, tempoGasto: elapsedTimeTotal.value });
      resetTimer();
    };

    const formattedTime = computed(() => {
      const time = isBreakTime.value ? ((completedPomodoros.value % 3 === 0 ? longBreakTime : shortBreakTime) - elapsedTime.value) : pomodoroTime - elapsedTime.value;
      const minutes = Math.floor(time / 60000);
      const seconds = Math.floor((time % 60000) / 1000);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    });

    const formattedElapsedTime = computed(() => {
      const minutes = Math.floor(elapsedTime.value / 60000);
      const seconds = Math.floor((elapsedTime.value % 60000) / 1000);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    });

    const breakMessage = computed(() => {
      return isBreakTime.value ? (completedPomodoros.value % 3 === 0 ? "Intervalo longo (15 min)" : "Intervalo curto (5 min)") : "";
    });

    onUnmounted(() => {
      if (timer) {
        clearInterval(timer);
      }
    });

    return {
      completedPomodoros,
      isStarted,
      isFinished,
      isBreakTime,
      startTimer,
      pauseTimer,
      resumeTimer,
      resetTimer,
      restartTask,
      finalizarTarefa,
      formattedTime,
      formattedElapsedTime,
      breakMessage,
      elapsedTime
    };
  },
});
</script>

<style scoped>
.task-timer {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}
button {
  margin-right: 5px;
}
</style>
