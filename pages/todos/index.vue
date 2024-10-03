<template>
  <div>
    haha
    <AlertsSuccess :message="message" />

    <div class="grid grid-cols-3 gap-4">
      <div
        v-for="(item, index) in todos"
        :key="index"
        class="bg-gray-200 rounded-lg p-4"
      >
        <h3>{{ item.title }}</h3>
        <p>{{ item.body }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const todos = ref([]);
const result = await $fetch("https://jsonplaceholder.typicode.com/posts");
todos.value = result;
console.log(todos.value);
const message = {
  myMessage: "post was created",
};
</script>
