<template>
  <nav class="navbar">
    <div class="container">
      <div class="logo">
        <router-link to="/">
        </router-link>
      </div>
      <div class="nav-links">
        <router-link to="/todos"><li>TODOS</li></router-link>
        <router-link to="/post"><li>POSTS</li></router-link>
        <router-link to="/albums"><li>ALBUMS</li></router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
.navbar {
  background-color: transparent;
  color: white;
  padding: 10px 0;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  margin-top: 120px;
  margin-left: 112px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo i {
  font-size: 1.5rem;
  margin-right: 5px;
}

.logo-text {
  font-size: 1.2rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  align-items: center;
  color: brown;
  background-color: white;
  border-radius: 25px;
  padding: 6px;
}

.nav-links li {
  list-style: none;
  margin-left: 20px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 800;
}
</style>
