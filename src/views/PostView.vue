<template>
    <div>
      <div class="post-component">
        <select v-model="selectedUser" @change="fetchUserPosts">
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
        <div class="post-container">
          <div v-if="selectedUser !== null" v-for="post in userPosts" :key="post.id" class="post">
            <h3>{{ post.title }}</h3>
            <p>{{ post.body }}</p>
          </div>
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
  .post-component {
    margin-top: 20px;
    text-align: center;
    margin-right: 150px;
  }
  
  select {
    margin-bottom: 20px;
  }
  
  .post-container {
    display: flex;
    flex-direction: column;
    align-items: center; /* Center align the posts */
    margin-top: 20px;
    max-height: 500px;
    overflow-y: auto;
  }
  
  .post {
    width: 70%;
    margin-bottom: 20px;
    padding: 20px;
    background-color: #FFFFFF;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .no-posts {
    color: #999;
    font-style: italic;
    margin-top: 10px;
  }
  </style>
  