<template>
  <div class="app-container">
    <div class="todo-list-container">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
      </head>

      <form @submit.prevent="addTask" class="task-form">
        <input type="text" v-model="newTask" placeholder="Tambah tugas baru" />
        <button type="submit">Tambah</button>
      </form>

      <div v-if="tasks.length > 0" class="task-list">
        <transition-group name="slide-fade" tag="div">
          <div v-for="(task, index) in tasks" :key="index" class="task-item">
            <label :class="{ completed: task.completed }" class="task-name">
              <input
                type="checkbox"
                :checked="task.completed"
                @change="toggleTask(index)"
                class="heart-checkbox"
              />
              <span>{{ task.name }}</span>
            </label>
            <div class="task-buttons">
              <button @click="startEditing(index)" class="edit-button">
                <i class="fas fa-edit"></i>
              </button>
              <button @click="removeTask(index)" class="remove-button">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </transition-group>
      </div>

      <p v-else>Tidak ada tugas yang tersedia</p>
      <p v-if="incompleteCount === 0 && tasks.length > 0">Good Job, Have a Nice Day :)</p>
      <p v-else-if="incompleteCount > 0">{{ incompleteCount }} tugas tersisa.</p>
    </div>

    <div v-if="editingTask !== null" class="edit-modal">
      <div class="edit-modal-content">
        <h2>Edit Tugas</h2>
        <form @submit.prevent="saveEdit">
          <input type="text" v-model="editingTask.name" />
          <button type="submit">Simpan</button>
          <button type="button" @click="cancelEdit">Batal</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useTodoStore } from '../stores/todoStore';

export default defineComponent({
  name: 'TodoListView',
  data() {
    return {
      newTask: '',
      editingTask: null,
      editingTaskIndex: null,
    };
  },
  computed: {
    tasks() {
      return useTodoStore().tasks;
    },
    incompleteCount() {
      return useTodoStore().incompleteTasksCount;
    },
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== '') {
        useTodoStore().addTask({
          name: this.newTask,
          completed: false,
        });
        this.newTask = '';
      }
    },
    removeTask(index) {
      useTodoStore().removeTask(index);
    },
    toggleTask(index) {
      const task = this.tasks[index];
      task.completed = !task.completed;
      useTodoStore().updateTask(index, task); // Update the task status in the store
    },
    startEditing(index) {
      this.editingTaskIndex = index;
      this.editingTask = { ...this.tasks[index] };
    },
    saveEdit() {
      if (this.editingTaskIndex !== null && this.editingTask.name.trim() !== '') {
        useTodoStore().updateTask(this.editingTaskIndex, this.editingTask);
        this.editingTask = null;
        this.editingTaskIndex = null;
      }
    },
    cancelEdit() {
      this.editingTask = null;
      this.editingTaskIndex = null;
    },
  },
});
</script>

<style scoped>
/* General styling for the app container */
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  z-index: 1001;
}

/* Container for the todo list */
.todo-list-container {
  background-color: transparent;
  border-radius: 12px;
  padding: 20px;
  width: 400px;
  text-align: center;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  position: absolute;
  top: 30%;
  left: 45%;
  transform: translate(-50%, -50%);
  max-height: 95px !important;
  z-index: 1;
}

/* Form styling */
.task-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

/* Input field styling */
.task-form input[type="text"] {
  flex: 1;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* Add button styling */
.task-form button[type="submit"] {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #aa4465;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

/* Hover effect for the add button */
.task-form button[type="submit"]:hover {
  background-color: #883c55;
}

/* Styling for the list of tasks */
.task-list {
  text-align: left;
}

/* Individual task item styling */
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s;
}

/* Hover effect for task items */
.task-item:hover {
  background-color: #f1f1f1;
}

/* Task name styling */
.task-name {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 1rem;
}

/* Checkbox customization */
.heart-checkbox {
  display: none;
}

.heart-checkbox + span {
  position: relative;
  padding-left: 30px;
  cursor: pointer;
}

.heart-checkbox + span::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 30px;
  height: 20px;
  background: url('../assets/love1.png') no-repeat center center / contain;
}

.heart-checkbox:checked + span::before {
  background: url('../assets/love1.png') no-repeat center center / contain;
}

/* Styling untuk tugas yang sudah selesai */
.task-name.completed {
  text-decoration: line-through; /* Coret teks untuk tugas yang selesai */
  color: #999; /* Warna abu-abu untuk tugas yang selesai */
}


/* Task buttons container */
.task-buttons {
  display: flex;
  gap: 10px;
}

/* Edit button styling */
.edit-button {
  background: none;
  border: none;
  color: #883c55;
  cursor: pointer;
  font-size: 1.2rem;
  transition: color 0.3s;
}

.edit-button:hover {
  color: #883c55;
}

/* Remove button styling */
.remove-button {
  background: none;
  border: none;
  color: #ff0800;
  cursor: pointer;
  font-size: 1.2rem;
  transition: color 0.3s;
}

/* General paragraph styling */
p {
  margin-top: 20px;
  color: #666;
}

/* Transition group styles */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from, .slide-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Edit modal styling */
.edit-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1002;
}

.edit-modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
}

.edit-modal form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.edit-modal form input[type="text"] {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.edit-modal form button[type="submit"],
.edit-modal form button[type="button"] {
  padding: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

/* Hover effect for the save and cancel buttons */
.edit-modal form button[type="submit"]:hover {
  background-color: #883c55;
  color: white;
}

.edit-modal form button[type="button"]:hover {
  background-color: #ff0800;
  color: white;
}
</style>
