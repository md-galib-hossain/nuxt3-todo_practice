<template lang="">
    <div class="py-6 bg-orange-500">
      <div class="flex justify-between items-center max-w-screen-lg m-auto">
        <h1 class="text-white text-2xl font-bold text-center">
          Welcome to Nuxt-3 Todo App
        </h1>
        <div class="flex gap-4">
          <nuxt-link to="/todos">
            <h1 class="text-white text-lg font-bold text-center">Todo</h1>
          </nuxt-link>
          <nuxt-link to="/">
            <h1 class="text-white text-lg font-bold text-center">Have Done</h1>
          </nuxt-link>
        </div>
      </div>
    </div>
</template>
