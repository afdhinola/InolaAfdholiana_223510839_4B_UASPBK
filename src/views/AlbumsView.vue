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
        class="page-dot"
        v-for="page in totalPages"
        :key="page"
        @click="changePage(page)"
        :class="{ active: currentPage === page }"
      >
        •
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
    const itemsPerPage = ref(7);

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
  margin-top: 65px;
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
  background-color: #fbf6E4;
  border: 2px dotted rgb(144, 1, 1);
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;
}

.album-row:hover {
  font-weight: bold;
  transform: scale(1.02);
}

.album-link {
  text-decoration: none;
  color: rgb(144, 1, 1);
  width: 100%;
}

.album-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.pagination {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 55%;
  right: 300px;
  transform: translateY(-50%);
  align-items: center;
}

.page-dot {
  background: none;
  border: none;
  color: rgb(144, 1, 1);
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  transition: color 0.5s;
  padding: 0;
}

.page-dot:hover,
.page-dot.active {
  color: white;
}
</style>
