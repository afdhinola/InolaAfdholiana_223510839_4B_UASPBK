<template>
    <nav>
      <ul>
        <li>
          <router-link to="/todos">Todos</router-link>
        </li>
        <li>
          <router-link to="/post">Post</router-link>
        </li>
        <li>
          <router-link to="/albums">Albums</router-link>
        </li>
      </ul>
    </nav>
  </template>
  
  <style>
    nav {
      display: flex;
      background-color: transparent;
      margin-left: 410px;
      margin-top: 48px;
    }
    ul {
      list-style: none;
      display: flex;
      padding: 0;
      gap: 195px;
    }
    li {
      margin: 0 10px;
      font-size: 18px;
      font-weight: bold;
    }
  </style>
  