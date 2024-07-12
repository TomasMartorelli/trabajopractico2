<template>
  <div class="max-w-2xl mx-auto p-5">
    <input 
      type="text" 
      v-model="query" 
      @input="searchMovies" 
      placeholder="Buscar películas..." 
      class="w-full p-2 text-lg border border-gray-300 rounded mb-5 text-black"
    >
    <ul v-if="showList && movies.length > 0" class="list-none p-0 m-0">
      <li 
        v-for="(movie, index) in displayedMovies" 
        :key="movie.id" 
        @click="selectMovie(movie)" 
        class="cursor-pointer p-2 bg-gray-100 rounded mb-2 text-black hover:bg-gray-200"
      >
        {{ movie.title }}
      </li>
    </ul>

    <!-- Paginación -->
    <div v-if="showList && movies.length > 0" class="mt-2 text-center">
      <button 
        v-if="currentPage > 1" 
        @click="currentPage--"
        class="cursor-pointer p-1 mx-1 border border-gray-300 rounded bg-gray-100 text-black hover:bg-gray-200"
      >
        Anterior
      </button>
      <span>{{ currentPage }}</span>
      <button 
        v-if="hasNextPage"
        @click="currentPage++"
        class="cursor-pointer p-1 mx-1 border border-gray-300 rounded bg-gray-100 text-black hover:bg-gray-200"
      >
        Siguiente
      </button>
    </div>

    <div v-if="loading" class="mt-2 text-red-500">Cargando...</div>
    <div v-if="error" class="mt-2 text-red-500">{{ error }}</div>

    <!-- Detalles de la película seleccionada -->
    <div v-if="selectedMovie" class="relative mt-5 p-2 bg-gray-100 rounded text-black">
      <img 
        :src="getImageUrl(selectedMovie.poster_path)" 
        alt="Poster de la película" 
        class="w-full h-auto rounded"
      >
      <div class="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center opacity-0 hover:opacity-100 text-white p-4 rounded">
        <h2 class="text-xl mb-2">{{ selectedMovie.title }}</h2>
        <p class="text-sm">{{ selectedMovie.overview }}</p>
        <p class="mt-2">Año de lanzamiento: {{ selectedMovie.release_date }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      movies: [],
      selectedMovie: null,
      loading: false,
      error: null,
      currentPage: 1,
      moviesPerPage: 4, // Mostrar hasta 4 películas por página
      showList: false // Controlar la visibilidad de la lista de resultados
    };
  },
  computed: {
    displayedMovies() {
      const startIndex = (this.currentPage - 1) * this.moviesPerPage;
      return this.movies.slice(startIndex, startIndex + this.moviesPerPage);
    },
    hasNextPage() {
      return this.currentPage < Math.ceil(this.movies.length / this.moviesPerPage);
    }
  },
  watch: {
    query(newQuery) {
      if (!newQuery.trim()) {
        this.selectedMovie = null; // Restablecer selectedMovie cuando query está vacío
        this.showList = false; // Ocultar la lista si la consulta está vacía
        this.movies = []; // Limpiar la lista de películas
      } else {
        this.showList = true; // Mostrar la lista cuando hay una nueva consulta
      }
    }
  },
  methods: {
    async searchMovies() {
      if (!this.query.trim()) {
        this.movies = [];
        return;
      }
      
      this.loading = true;
      this.error = null;

      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${this.query}&api_key=d5343d9d805485c0eb112ca8e81d7caa`);
        const data = await response.json();
        this.movies = data.results;
        this.currentPage = 1; // Reiniciar a la primera página al buscar
      } catch (error) {
        console.error('Error fetching movies:', error);
        this.error = 'Hubo un problema al buscar las películas.';
      } finally {
        this.loading = false;
      }
    },
    async selectMovie(movie) {
      this.loading = true;
      this.error = null;

      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=d5343d9d805485c0eb112ca8e81d7caa`);
        const data = await response.json();
        this.selectedMovie = data;
        this.showList = false; // Ocultar la lista cuando se selecciona una película
      } catch (error) {
        console.error('Error fetching movie details:', error);
        this.error = 'Hubo un problema al obtener los detalles de la película.';
      } finally {
        this.loading = false;
      }
    },
    getImageUrl(posterPath) {
      if (!posterPath) {
        return ''; 
      }
      return `https://image.tmdb.org/t/p/w500/${posterPath}`;
    }
  }
};
</script>
