<template>
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
      useTodoStore().updateTask(index, task);
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
.todo-list-container {
  background-color: transparent;
  border-radius: 10px;
  border: 2px dotted rgb(144, 1, 1);
  padding: 20px;
  width: 400px;
  text-align: center;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  position: relative;
  margin-top: 330px;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  overflow-y: auto;
  max-height: 500px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.task-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.task-form input[type="text"] {
  flex: 1;
  padding: 10px;
  font-size: 1rem;
  border: 2px dotted rgb(144, 1, 1);
  background-color: transparent;
  border-radius: 4px;
}

.task-form button[type="submit"] {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #aa4465;
  color: white;
  border: 2px dotted rgb(144, 1, 1);
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.task-form button[type="submit"]:hover {
  background-color: #883c55;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 2px dotted rgb(144, 1, 1);
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.task-list {
  width: 100%;
}

.task-name {
  flex: 1; 
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 1rem;
}

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

.task-name.completed {
  text-decoration: line-through;
  color: #999;
}

.task-buttons {
  display: flex;
  gap: 10px;
}

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

.remove-button {
  background: none;
  border: none;
  color: #ff0800;
  cursor: pointer;
  font-size: 1.2rem;
  transition: color 0.3s;
}

p {
  margin-top: 20px;
  color: #666;
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from, .slide-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

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

.edit-modal form button[type="submit"]:hover {
  background-color: #883c55;
  color: white;
}

.edit-modal form button[type="button"]:hover {
  background-color: #ff0800;
  color: white;
}

</style>
