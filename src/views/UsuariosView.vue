<template>
  <div class="bg-black h-screen flex flex-col items-center justify-center">
    <h1 class="text-white text-2xl mb-8">¿Quién está viendo ahora?</h1>

    <!-- Profiles -->
    <div class="flex flex-row flex-wrap gap-5 justify-center">
      <!-- Profile 1 -->
      <button @click="selectUser('Papa')" class="flex flex-col items-center group gap-2">
        <img class="rounded-full border-2 border-transparent group-hover:border-2 group-hover:border-gray-300 w-24 h-24" src="https://picsum.photos/seed/a/150/150" />
        <p class="text-gray-500 group-hover:text-gray-300">Papa</p>
      </button>

      <!-- Profile 2 -->
      <button @click="selectUser('Mama')" class="flex flex-col items-center group gap-2">
        <img class="rounded-full border-2 border-transparent group-hover:border-2 group-hover:border-gray-300 w-24 h-24" src="https://picsum.photos/seed/b/150/150" />
        <p class="text-gray-500 group-hover:text-gray-300">Mama</p>
      </button>

      <!-- Profile 3 -->
      <button @click="selectUser('Gony')" class="flex flex-col items-center group gap-2">
        <img class="rounded-full border-2 border-transparent group-hover:border-2 group-hover:border-gray-300 w-24 h-24" src="https://picsum.photos/seed/c/150/150" />
        <p class="text-gray-500 group-hover:text-gray-300">Gony</p>
      </button>

      <!-- Profile 4 -->
      <button @click="selectUser('Tom')" class="flex flex-col items-center group gap-2">
        <img class="rounded-full border-2 border-transparent group-hover:border-2 group-hover:border-gray-300 w-24 h-24" src="https://picsum.photos/seed/d/150/150" />
        <p class="text-gray-500 group-hover:text-gray-300">Tom</p>
      </button>
    </div>

    <!-- Manage Profiles -->
    <button class="border-2 border-gray-600 text-gray-600 px-4 py-1 mt-20 hover:border-gray-400 hover:text-gray-400">
      Administrar perfiles
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    selectUser(username) {
      // Aquí redirigimos a la vista de películas y pasamos el parámetro del usuario seleccionado
      this.$router.push({ name: 'MoviesView', params: { username } });
    },
    addProfile() {
      // Función para añadir un nuevo perfil (aquí puedes implementar la lógica si es necesario)
      console.log('Add profile clicked');
    }
  }
};
</script>

<style scoped>
@media (max-width: 640px) {
  .flex-row {
    flex-direction: column;
  }
  .gap-5 {
    gap: 10px;
  }
}
</style>
