import { defineStore } from 'pinia';
import axios from 'axios';

export const usePhotosStore = defineStore('photos', {
  state: () => ({
    photos: [],
  }),

  actions: {
    async fetchPhotos(albumId) {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
        this.photos = response.data;
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    },
  },
});