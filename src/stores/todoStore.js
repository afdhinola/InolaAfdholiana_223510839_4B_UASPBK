// stores/todoStore.js
import { defineStore } from 'pinia';

export const useTodoStore = defineStore({
  id: 'todoStore',
  state: () => ({
    tasks: []
  }),
  getters: {
    incompleteTasksCount: (state) => {
      return state.tasks.filter(task => !task.completed).length;
    }
  },
  actions: {
    addTask(task) {
      this.tasks.push(task);
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    },
    updateTask(index, updatedTask) {
      this.tasks[index] = updatedTask;
      // Optionally, if using Vue 3.2+, trigger Pinia reactivity manually
      this.$patch();
    }
  }
});
