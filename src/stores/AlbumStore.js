import { defineStore } from 'pinia';
import axios from 'axios';

export const useAlbumsStore = defineStore('albums', {
  state: () => ({
    albums: [],
  }),

  actions: {
    async fetchAlbums() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
        this.albums = response.data;
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    },
  },
});