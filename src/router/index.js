import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostView from '../views/PostView.vue'
import AlbumsView from '../views/AlbumsView.vue'
import TodoListView from '@/views/TodoListView.vue'
import PhotosView from '@/views/PhotosView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/todos',
    name: 'todos',
    component: TodoListView
  },
  {
    path: '/post',
    name: 'post',
    component: PostView
  },
  {
    path: '/albums',
    name: 'albums',
    component: AlbumsView
  },
  {
    path: '/albums/:id',
    name: 'photos',
    component: PhotosView
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
