<template>
  <div class="container">
    <div class="post-component">
      <select v-model="selectedUser" @change="fetchUserPosts">
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
      <div class="post-container">
        <table v-if="selectedUser !== null && userPosts.length > 0" class="posts-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in userPosts" :key="post.id">
              <td>{{ post.title }}</td>
              <td>{{ post.body }}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="selectedUser !== null && userPosts.length === 0" class="no-posts">
          No posts available for selected user.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserPosts',
  data() {
    return {
      users: [],
      selectedUser: null,
      userPosts: []
    };
  },
  methods: {
    fetchUsers() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
          this.users = data;
        });
    },
    fetchUserPosts() {
      if (this.selectedUser !== null) {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`)
          .then(response => response.json())
          .then(data => {
            this.userPosts = data;
          });
      } else {
        this.userPosts = [];
      }
    }
  },
  created() {
    this.fetchUsers();
  }
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: transparent;
  margin-top: 75px;
  height: 500px;
  overflow-y: auto;
}

.post-component {
  text-align: center;
  width: 100%;
  max-width: 900px;
  background-color: transparent;
  border: 2px dotted rgb(144, 1, 1);
  padding: 20px;
  height: 900px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

select {
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  border: 2px dotted rgb(144, 1, 1);
  background-color: #fbf6E4;
}

.post-container {
  margin-top: 20px;
  overflow-y: auto;
}

.posts-table {
  width: 100%;
  border-collapse: collapse;
}

.posts-table th, .posts-table td {
  padding: 10px;
  text-align: center;
  border: 2px dotted rgb(144, 1, 1);
}

.posts-table th {
  background-color: #fbf6E4;
}

.no-posts {
  color: #999;
  font-style: italic;
  margin-top: 10px;
}
</style>
