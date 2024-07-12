<template>
<div class="min-h-screen bg-cover bg-center relative">
  <div class="absolute inset-0">
    <video class="w-full h-full object-cover" autoplay loop muted>
      <source src="https://player.vimeo.com/progressive_redirect/playback/840627949/rendition/1080p/file.mp4?loc=external&signature=df9cfec6465233ea6f14bd85906ac7412e35a0a00e65cdb6823b45d2b2cf5607" type="video/mp4">
    </video>
  </div>

  <nav class="relative px-4 py-4 flex justify-between items-center bg-transparent">
    <a class="text-3xl font-bold leading-none" href="#">
        <!-- SVG del logo de Netflix -->
        <img class="h-8" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix">
    </a>
    <div class="lg:hidden">
        <button class="navbar-burger flex items-center text-blue-600 p-3">
            <svg class="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Mobile menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
        </button>
    </div>
    <ul class="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
        <li><a class="text-sm text-zinc-50" href="#">Inicio</a></li>
        <li class="text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>
        </li>
        <li><a class="text-sm text-zinc-50" href="#">Peliculas</a></li>
        <li class="text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>
        </li>
        <li><a class="text-sm text-zinc-50" href="#">Series</a></li>
        <li class="text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>
        </li>
        <li><a class="text-sm text-zinc-50" href="#">Mi Lista</a></li>
    </ul>
</nav>
<div class="navbar-menu relative z-50 hidden">
    <div class="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
    <nav class="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
        <div class="flex items-center mb-8">
            <a class="mr-auto text-3xl font-bold leading-none" href="#">
                <!-- SVG del logo de Netflix -->
                <img class="h-6" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix">
            </a>
            <button class="navbar-close">
                <svg class="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
        <div>
            <ul>
                <li class="mb-1">
                    <a class="block p-4 text-sm font-semibold text-black hover:bg-red-200 hover:text-red-800 rounded" href="#">Inicio</a>
                </li>
                <li class="mb-1">
                    <a class="block p-4 text-sm font-semibold text-black hover:bg-red-200 hover:text-red-800 rounded" href="#">Peliculas</a>
                </li>
                <li class="mb-1">
                    <a class="block p-4 text-sm font-semibold text-black hover:bg-red-400 hover:text-red-800 rounded" href="#">Series</a>
                </li>
                <li class="mb-1">
                    <a class="block p-4 text-sm font-semibold text-black hover:bg-red-400 hover:text-red-800 rounded" href="#">Mi Lista</a>
                </li>
            </ul>
        </div>
    </nav>
</div>


  <!-- Contenido principal -->
  <div class="absolute inset-0 flex items-center justify-center text-center mt-20 z-10">
    <div class="text-white p-4">
      <h1 class="text-4xl font-bold mb-4">Bienvenido a Netflix</h1>
      <p class="text-xl">Disfruta de tus películas y series favoritas</p>
      <!-- Aquí va la barra de búsqueda -->
    </div>
  </div>
</div>

  <div class="movies">
    <SearchMovies v-model="searchTerm" @search="searchMovies" />
    <div v-if="loading" class="loading">Cargando...</div>
    <div v-else-if="selectedMovie" class="movie-details">
      <h2>{{ selectedMovie.title }}</h2>
      <p>{{ selectedMovie.overview }}</p>
      <p>Año de lanzamiento: {{ selectedMovie.release_date }}</p>
      <p>Calificación: {{ selectedMovie.vote_average }}</p>
      <button @click="selectedMovie = null">Cerrar</button>
    </div>
    <ul v-else class="movie-list">
      <li v-for="movie in searchResults" :key="movie.id" @click="showMovieDetails(movie)">
        <img v-if="movie.poster_path" :src="'https://image.tmdb.org/t/p/w185' + movie.poster_path" :alt="movie.title" />
        <div v-else class="no-poster">No hay póster disponible</div>
        <div>
          <h3>{{ movie.title }}</h3>
          <p>{{ movie.release_date }}</p>
        </div>
      </li>
    </ul>
  </div>

  <div class="flex bg-neutral-900">
  <div class="w-full overflow-x-auto">
    <div class="max-w-7xl mx-auto p-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-3xl font-bold text-white mb-2">{{ selectedGenreName || 'Tendencias' }}</h2>
        <select v-model="selectedGenre" @change="fetchMoviesByGenre" class="text-black">
          <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
        </select>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-20"> <!-- Ajuste de margen inferior aquí -->
        <div v-for="movie in movies.slice(0, 12)" :key="movie.id" class="relative group">
          <div class="bg-black rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl">
            <a :href="'https://www.themoviedb.org/movie/' + movie.id" target="_blank">
              <div class="overflow-hidden relative">
                <img
                  :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
                  class="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110"
                  :alt="movie.title">
                <div class="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                  <h3 class="text-xl font-semibold mb-2">{{ movie.title }}</h3>
                  <p class="text-sm mb-4">{{ movie.overview.substring(0, 100) }}...</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


  <section class="relative isolate overflow-hidden bg-gray-800 py-16 sm:py-24 lg:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
        <article class="max-w-xl lg:max-w-lg">
          <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Suscríbete a nuestras notificaciones
            diarias</h2>
          <p class="mt-4 text-lg leading-8 text-gray-300">Suscríbete y recibe nuestras nuevas noticias sobre las
            peliculas y series que están por salir en la plataforma.</p>
          <div class="mt-6 flex max-w-md gap-x-4">
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required
              class="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              placeholder="Enter your email">
            <button type="submit"
              class="botones flex-none rounded-md bg-emerald-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500">Suscribirse</button>
          </div>
        </article>
        <aside class="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
          <div class="flex flex-col items-start">
            <figure class="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-18 0v-2.25m18 2.25h-2.25m2.25-2.25v2.25M6.75 15h.008v.008H6.75V15zm0 2.25h.008v.008H6.75V15zm0-6h.008v.008H6.75V9zM9 15h.008v.008H9V15zm0 2.25h.008v.008H9V15zm0-6h.008v.008H9V9zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12V15zm0-6h.008v.008H12V9zm2.25 0h.008v.008H14.25V9zM14.25 15h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm0-6h.008v.008h-.008V9zm0 2.25h.008v.008h-.008v-.008zm2.25 2.25h.008v.008h-.008v-.008zm0-6h.008v.008h-.008V9zm0 2.25h.008v.008h-.008v-.008z" />
              </svg>
            </figure>
            <dl>
              <dt class="mt-4 font-semibold text-white">Artículos semanales</dt>
              <dd class="mt-2 leading-7 text-gray-400">Explora los nuevos estrenos de peliculas en Kekson Review Ultimate con
                nuestras reseñas semanales. Mantente al día con lo último en la plataforma. ¡No te pierdas nuestros análisis!
              </dd>
            </dl>
          </div>
          <div class="flex flex-col items-start">
            <figure class="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" />
              </svg>
            </figure>
            <dl>
              <dt class="mt-4 font-semibold text-white">No spam</dt>
              <dd class="mt-2 leading-7 text-gray-400">Suscríbete para recibir análisis semanales de las últimas peliculas y series. Mantente informado sin spam. ¡Únete ahora!</dd>
            </dl>
          </div>
        </aside>
      </div>
    </div>
    <div class="absolute left-1/2 top-0 z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
      <div class="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
      </div>
    </div>
  </section>

<footer class="w-full">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <!--Grid-->
            <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-8 py-10 max-sm:max-w-sm max-sm:mx-auto gap-y-8">
                <div class="col-span-full mb-10 lg:col-span-2 lg:mb-0">
                    <a href="https://pagedone.io/"  class="flex justify-center lg:justify-start">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" class="h-8" alt="Netflix Logo" />
                    </a>
                </div>
                <!--End Col-->
                <div class="lg:mx-auto text-left ">                   
                    <ul class="text-sm  transition-all duration-500">
                        <li class="mb-6"><a href="javascript:;"  class="text-gray-600 hover:text-gray-900">Audio Descriptivo</a></li>
                        <li class="mb-6"><a href="javascript:;"  class=" text-gray-600 hover:text-gray-900">Relaciones con inversionistas</a></li>
                        <li class="mb-6"><a href="javascript:;"  class=" text-gray-600 hover:text-gray-900">Avisos legales</a></li>
                    </ul>
                </div>
                <!--End Col-->
                <div class="lg:mx-auto text-left ">      
                    <ul class="text-sm  transition-all duration-500">
                        <li class="mb-6"><a href="javascript:;"  class="text-gray-600 hover:text-gray-900">Centro de ayuda</a></li>
                        <li class="mb-6"><a href="javascript:;"  class=" text-gray-600 hover:text-gray-900">Empleo</a></li>
                        <li class="mb-6"><a href="javascript:;"  class=" text-gray-600 hover:text-gray-900">Preferencias de cookies</a></li>
                    </ul>
                </div>
                <!--End Col-->
                <div class="lg:mx-auto text-left">                  
                    <ul class="text-sm  transition-all duration-500">
                        <li class="mb-6"><a href="javascript:;"  class="text-gray-600 hover:text-gray-900">Tarjetas de regalo</a></li>
                        <li class="mb-6"><a href="javascript:;"  class=" text-gray-600 hover:text-gray-900">Terminos de uso</a></li>
                        <li class="mb-6"><a href="javascript:;"  class=" text-gray-600 hover:text-gray-900">Información corporativa</a></li>
                    </ul>
                </div>
                <!--End Col-->
                <div class="lg:mx-auto text-left">
                    <ul class="text-sm  transition-all duration-500">
                        <li class="mb-6"><a href="javascript:;"  class="text-gray-600 hover:text-gray-900">Prensa</a></li>
                        <li class="mb-6"><a href="javascript:;"  class=" text-gray-600 hover:text-gray-900">Privacidad</a></li>
                        <li class="mb-6"><a href="javascript:;"  class=" text-gray-600 hover:text-gray-900">Contáctanos</a></li>                        
                    </ul>
                </div>
            </div>
            <!--Grid-->
            <div class="py-7 border-t border-gray-200">
                <div class="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
                    <span class="text-sm text-gray-500 ">©<a href="#">Kekson</a> 2024, All rights reserved.</span>
                    <div class="flex mt-4 space-x-4 sm:justify-center lg:mt-0 ">
                        <a href="javascript:;"  class="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-indigo-600">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <g id="Social Media">
                            <path id="Vector" d="M11.3214 8.93666L16.4919 3.05566H15.2667L10.7772 8.16205L7.1914 3.05566H3.05566L8.47803 10.7774L3.05566 16.9446H4.28097L9.022 11.552L12.8088 16.9446H16.9446L11.3211 8.93666H11.3214ZM9.64322 10.8455L9.09382 10.0765L4.72246 3.95821H6.60445L10.1322 8.8959L10.6816 9.66481L15.2672 16.083H13.3852L9.64322 10.8458V10.8455Z" fill="white"/>
                            </g>
                          </svg>
                        </a>
                        <a href="javascript:;"  class="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-indigo-600">
                            <svg class="w-[1.25rem] h-[1.125rem] text-white" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.70975 7.93663C4.70975 6.65824 5.76102 5.62163 7.0582 5.62163C8.35537 5.62163 9.40721 6.65824 9.40721 7.93663C9.40721 9.21502 8.35537 10.2516 7.0582 10.2516C5.76102 10.2516 4.70975 9.21502 4.70975 7.93663ZM3.43991 7.93663C3.43991 9.90608 5.05982 11.5025 7.0582 11.5025C9.05658 11.5025 10.6765 9.90608 10.6765 7.93663C10.6765 5.96719 9.05658 4.37074 7.0582 4.37074C5.05982 4.37074 3.43991 5.96719 3.43991 7.93663ZM9.97414 4.22935C9.97408 4.39417 10.0236 4.55531 10.1165 4.69239C10.2093 4.82946 10.3413 4.93633 10.4958 4.99946C10.6503 5.06259 10.8203 5.07916 10.9844 5.04707C11.1484 5.01498 11.2991 4.93568 11.4174 4.81918C11.5357 4.70268 11.6163 4.55423 11.649 4.39259C11.6817 4.23095 11.665 4.06339 11.6011 3.91109C11.5371 3.7588 11.4288 3.6286 11.2898 3.53698C11.1508 3.44536 10.9873 3.39642 10.8201 3.39635H10.8197C10.5955 3.39646 10.3806 3.48424 10.222 3.64043C10.0635 3.79661 9.97434 4.00843 9.97414 4.22935ZM4.21142 13.5892C3.52442 13.5584 3.15101 13.4456 2.90286 13.3504C2.57387 13.2241 2.33914 13.0738 2.09235 12.8309C1.84555 12.588 1.69278 12.3569 1.56527 12.0327C1.46854 11.7882 1.3541 11.4201 1.32287 10.7431C1.28871 10.0111 1.28189 9.79119 1.28189 7.93669C1.28189 6.08219 1.28927 5.86291 1.32287 5.1303C1.35416 4.45324 1.46944 4.08585 1.56527 3.84069C1.69335 3.51647 1.84589 3.28513 2.09235 3.04191C2.3388 2.79869 2.57331 2.64813 2.90286 2.52247C3.1509 2.42713 3.52442 2.31435 4.21142 2.28358C4.95417 2.24991 5.17729 2.24319 7.0582 2.24319C8.9391 2.24319 9.16244 2.25047 9.90582 2.28358C10.5928 2.31441 10.9656 2.42802 11.2144 2.52247C11.5434 2.64813 11.7781 2.79902 12.0249 3.04191C12.2717 3.2848 12.4239 3.51647 12.552 3.84069C12.6487 4.08513 12.7631 4.45324 12.7944 5.1303C12.8285 5.86291 12.8354 6.08219 12.8354 7.93669C12.8354 9.79119 12.8285 10.0105 12.7944 10.7431C12.7631 11.4201 12.6481 11.7881 12.552 12.0327C12.4239 12.3569 12.2714 12.5882 12.0249 12.8309C11.7784 13.0736 11.5434 13.2241 11.2144 13.3504C10.9663 13.4457 10.5928 13.5585 9.90582 13.5892C9.16306 13.6229 8.93994 13.6296 7.0582 13.6296C5.17645 13.6296 4.95395 13.6229 4.21142 13.5892ZM4.15307 1.03424C3.40294 1.06791 2.89035 1.18513 2.4427 1.3568C1.9791 1.53408 1.58663 1.77191 1.19446 2.1578C0.802277 2.54369 0.56157 2.93108 0.381687 3.38797C0.207498 3.82941 0.0885535 4.3343 0.0543922 5.07358C0.0196672 5.81402 0.0117188 6.05074 0.0117188 7.93663C0.0117188 9.82252 0.0196672 10.0592 0.0543922 10.7997C0.0885535 11.539 0.207498 12.0439 0.381687 12.4853C0.56157 12.9419 0.802334 13.3297 1.19446 13.7155C1.58658 14.1012 1.9791 14.3387 2.4427 14.5165C2.89119 14.6881 3.40294 14.8054 4.15307 14.839C4.90479 14.8727 5.1446 14.8811 7.0582 14.8811C8.9718 14.8811 9.212 14.8732 9.96332 14.839C10.7135 14.8054 11.2258 14.6881 11.6737 14.5165C12.137 14.3387 12.5298 14.1014 12.9219 13.7155C13.3141 13.3296 13.5543 12.9419 13.7347 12.4853C13.9089 12.0439 14.0284 11.539 14.062 10.7997C14.0962 10.0587 14.1041 9.82252 14.1041 7.93663C14.1041 6.05074 14.0962 5.81402 14.062 5.07358C14.0278 4.33424 13.9089 3.82913 13.7347 3.38797C13.5543 2.93135 13.3135 2.5443 12.9219 2.1578C12.5304 1.7713 12.137 1.53408 11.6743 1.3568C11.2258 1.18513 10.7135 1.06735 9.96388 1.03424C9.21256 1.00058 8.97236 0.992188 7.05876 0.992188C5.14516 0.992188 4.90479 1.00002 4.15307 1.03424Z" fill="currentColor"/>
                                </svg>
                                
                        </a>
                        <a href="javascript:;"  class="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-indigo-600">
                            <svg class="w-[1rem] h-[1rem] text-white" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.8794 11.5527V3.86835H0.318893V11.5527H2.87967H2.8794ZM1.59968 2.81936C2.4924 2.81936 3.04817 2.2293 3.04817 1.49188C3.03146 0.737661 2.4924 0.164062 1.61666 0.164062C0.74032 0.164062 0.167969 0.737661 0.167969 1.49181C0.167969 2.22923 0.723543 2.8193 1.5829 2.8193H1.59948L1.59968 2.81936ZM4.29668 11.5527H6.85698V7.26187C6.85698 7.03251 6.87369 6.80255 6.94134 6.63873C7.12635 6.17968 7.54764 5.70449 8.25514 5.70449C9.18141 5.70449 9.55217 6.4091 9.55217 7.44222V11.5527H12.1124V7.14672C12.1124 4.78652 10.8494 3.68819 9.16483 3.68819C7.78372 3.68819 7.17715 4.45822 6.84014 4.98267H6.85718V3.86862H4.29681C4.33023 4.5895 4.29661 11.553 4.29661 11.553L4.29668 11.5527Z" fill="currentColor"/>
                                </svg>
                                
                        </a>
                        <a href="javascript:;"  class="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-indigo-600">
                            <svg class="w-[1.25rem] h-[0.875rem] text-white" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9346 1.13529C14.5684 1.30645 15.0665 1.80588 15.2349 2.43896C15.5413 3.58788 15.5413 5.98654 15.5413 5.98654C15.5413 5.98654 15.5413 8.3852 15.2349 9.53412C15.0642 10.1695 14.5661 10.669 13.9346 10.8378C12.7886 11.1449 8.19058 11.1449 8.19058 11.1449C8.19058 11.1449 3.59491 11.1449 2.44657 10.8378C1.81277 10.6666 1.31461 10.1672 1.14622 9.53412C0.839844 8.3852 0.839844 5.98654 0.839844 5.98654C0.839844 5.98654 0.839844 3.58788 1.14622 2.43896C1.31695 1.80353 1.81511 1.30411 2.44657 1.13529C3.59491 0.828125 8.19058 0.828125 8.19058 0.828125C8.19058 0.828125 12.7886 0.828125 13.9346 1.13529ZM10.541 5.98654L6.72178 8.19762V3.77545L10.541 5.98654Z" fill="currentColor"/>
                                </svg>
                                
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import { getPopularMovies, getGenres, getMoviesByGenre } from '../api';
import SearchMovies from './SearchMovies.vue';
import axios from 'axios';

export default {
  components: {
    SearchMovies,
  },
  data() {
    return {
      movies: [],
      genres: [],
      loading: true,
      searchTerm: '',
      searchResults: [],
      selectedMovie: null,
      selectedGenre: null,
      selectedGenreName: '',
      menuOpen: false
    };
  },
  async created() {
    this.movies = await getPopularMovies();
    this.genres = await getGenres();
    this.loading = false;
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    async searchMovies() {
      try {
        this.loading = true;
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
          params: {
            api_key: 'd5343d9d805485c0eb112ca8e81d7caa',
            query: this.searchTerm
          }
        });
        this.searchResults = response.data.results;
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        this.loading = false;
      }
    },
    async showMovieDetails(movie) {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}`, {
          params: {
            api_key: 'd5343d9d805485c0eb112ca8e81d7caa'
          }
        });
        this.selectedMovie = response.data;
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        this.searchTerm = '';
        this.searchResults = [];
      }
    },
    async fetchMoviesByGenre() {
      try {
        this.loading = true;
        const response = await getMoviesByGenre(this.selectedGenre);
        this.movies = response;
        const selectedGenreObj = this.genres.find(genre => genre.id === this.selectedGenre);
        this.selectedGenreName = selectedGenreObj ? selectedGenreObj.name : '';
      } catch (error) {
        console.error('Error fetching movies by genre:', error);
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    // Integrar el script para el menú responsivo aquí
    document.addEventListener('DOMContentLoaded', () => {
      const burger = document.querySelectorAll('.navbar-burger');
      const menu = document.querySelectorAll('.navbar-menu');

      if (burger.length && menu.length) {
        burger.forEach(burgerButton => {
          burgerButton.addEventListener('click', () => {
            menu.forEach(menuElement => {
              menuElement.classList.toggle('hidden');
            });
          });
        });
      }

      const close = document.querySelectorAll('.navbar-close');
      const backdrop = document.querySelectorAll('.navbar-backdrop');

      if (close.length) {
        close.forEach(closeButton => {
          closeButton.addEventListener('click', () => {
            menu.forEach(menuElement => {
              menuElement.classList.add('hidden');
            });
          });
        });
      }

      if (backdrop.length) {
        backdrop.forEach(backdropElement => {
          backdropElement.addEventListener('click', () => {
            menu.forEach(menuElement => {
              menuElement.classList.add('hidden');
            });
          });
        });
      }
    });
  }
};
</script>








<style scoped>

.group:hover .bg-white {
  transform: scale(1.1);
}
.group:hover .shadow-md {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
}
.group:hover img {
  transform: scale(1.15);
}
.movies {
  max-width: 800px;
  margin: auto;
}

.movie-list {
  list-style: none;
  padding: 0;
}

.movie-list li {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
}

.movie-list li img {
  width: 100px;
  height: auto;
  margin-right: 20px;
}

.movie-details {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 20px;
}

.no-poster {
  font-style: italic;
  color: #999;
}

.loading {
  text-align: center;
  margin-top: 20px;
}
</style>