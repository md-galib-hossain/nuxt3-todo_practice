<template>
    <div class="">
      <AppInput type="text" id="name" v-model="name" placeholder="Name" />
  <AppSelect v-model="country">
    <option value="BD">Bangladesh</option>
    <option value="PK">Pakisthan</option>
    <option value="SA">Saudi Arabia</option>
    <option value="TRKY">Turkey</option>
  </AppSelect>
  <AppInput type="file" @change="mychangeFunction"/>
  {{ country }}
      <button @click="addTodo">Add</button>
      <ul v-if="names.length">
        <li v-for="(item, index) in names" :key="index">
          {{ item }} - <button @click="removeFromTodo(index)">x</button>
        </li>
      </ul>
      <p v-else class="text-red-500 text-lg">Names are not available</p>
    </div>
  </template>
  
  <script setup lang="ts">
  const config = useRuntimeConfig().public.api
  console.log(config)
  const name = ref("");
  const country = ref("");
  let names = ref([]);
  function addTodo() {
    names.value.push(name.value);
    name.value = "";
  }
  function removeFromTodo(id: number) {
    console.log(id);
   names.value.splice(id,1);
    console.log(names);
  }
  function mychangeFunction(e){
    console.log(e.target.files[0])
  }
  </script>
  