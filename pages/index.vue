<template>
  <div class="max-w-screen-lg mx-auto">
    <div class="bg-gray-50 p-6 rounded-lg shadow-md mt-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Todo List</h1>
      
      <p v-if="errorMessages.length" class="text-red-500 text-sm mb-4">
        {{ errorMessages.join(', ') }}
      </p>

      <div class="flex items-center gap-4 mb-4">
        <AppInput
          type="text"
          id="todo-input"
          v-model="newTodo.title"
          placeholder="Enter todo title"
          class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <AppInput
          type="text"
          id="todo-description"
          v-model="newTodo.description"
          placeholder="Enter todo description"
          class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button 
          @click="addTodo" 
          class="bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600 transition duration-200"
        >
          Add Todo
        </button>
      </div>

      <ul v-if="todos.length" class="space-y-2">
        <li
          v-for="(item, index) in todos"
          :key="index"
          class="flex justify-between items-center bg-orange-50 rounded-lg p-4 shadow"
        >
          <div>
            <h3 :class="[{ 'line-through': item.completed }, 'text-lg font-semibold text-gray-800']">{{ item.title }}</h3>
            <p class="text-gray-600">{{ item.description }}</p>
          </div>
          <div class="flex space-x-2">
            <button 
              @click="markAsComplete(index)" 
              :class="[ 
                item.completed ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-400', 
                'text-white px-3 py-1 rounded transition duration-200'
              ]"
            >
              {{ item.completed ? "Completed" : "Complete" }}
            </button>
            <button 
              @click="removeFromTodo(index)" 
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 transition duration-200"
            >
              x
            </button>
          </div>
        </li>
      </ul>
      <p v-else class="text-red-500 text-lg">No todos available</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

const newTodo = ref<{ title: string; description: string }>({ title: "", description: "" });
const todos = ref<Todo[]>([]);
const errorMessages = ref<string[]>([]);
const config = useRuntimeConfig().public.api;

async function addTodo() {
  errorMessages.value = []; 

  try {
    const data: { data: Todo } = await $fetch(`${config}/todos`, {
      method: 'POST',
      body: {
        title: newTodo.value.title,
        description: newTodo.value.description,
      }
    });

    todos.value.unshift(data.data);
    newTodo.value = { title: "", description: "" };

  } catch (error: any) {
    if (error.data?.errorSources) {
      errorMessages.value = error.data.errorSources.map((item: { path: string; message: string }) => item.message);
    } else {
      errorMessages.value.push('An unknown error occurred.');
    }
  }
}

function markAsComplete(index: number) {
  todos.value[index].completed = !todos.value[index].completed; 
}

function removeFromTodo(index: number) {
  todos.value.splice(index, 1);
}

onMounted(async () => {
  try {
    const result: any = await $fetch(`${config}/todos`);
    todos.value = result.data.map((item: any) => ({
      title: item.title,
      description: item.description,
      completed: item.completed || false, 
    })); 
    console.log(result.data);
  } catch (error) {
    console.error('Failed to fetch todos:', error);
  }
});
</script>
