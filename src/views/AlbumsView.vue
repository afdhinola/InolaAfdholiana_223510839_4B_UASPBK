<template>
  <div class="albums">
    <div class="album-table">
      <div v-for="album in paginatedAlbums" :key="album.id" class="album-row">
        <router-link :to="'/albums/' + album.id" class="album-link">
          <div class="album-title">{{ album.title }}</div>
        </router-link>
      </div>
    </div>
    <div class="pagination">
      <button
        class="page-number"
        v-for="page in totalPages"
        :key="page"
        @click="changePage(page)"
        :class="{ active: currentPage === page }"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useAlbumsStore } from '../stores/AlbumStore';

export default defineComponent({
  setup() {
    const albums = ref([]);
    const albumsStore = useAlbumsStore();
    const currentPage = ref(1);
    const itemsPerPage = ref(6);

    const totalPages = computed(() => {
      return Math.ceil(albums.value.length / itemsPerPage.value);
    });

    const paginatedAlbums = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return albums.value.slice(start, end);
    });

    const changePage = (page) => {
      currentPage.value = page;
    };

    onMounted(async () => {
      await albumsStore.fetchAlbums();
      albums.value = albumsStore.albums;
    });

    return {
      albums,
      paginatedAlbums,
      totalPages,
      currentPage,
      changePage
    };
  },
});
</script>

<style scoped>
.albums {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.album-table {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.album-row {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #333;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;
}

.album-row:hover {
  background-color: #555;
  transform: scale(1.02);
}

.album-link {
  text-decoration: none;
  color: whitesmoke;
  width: 100%;
}

.album-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.page-number {
  background: none;
  border: 1px solid whitesmoke;
  color: whitesmoke;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.page-number:hover {
  background-color: #555;
  color: whitesmoke;
}

.page-number.active {
  background-color: whitesmoke;
  color: black;
  border-color: black;
}
</style>
