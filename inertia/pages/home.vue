<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <Navbar link="/available-project" message="Available Projects" />
    <div class="flex-1 flex items-center justify-center pt-4">
      <div class="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 md:p-10">
        <h2 class="text-2xl md:text-3xl font-bold text-blue-600 mb-6 text-center">
          Add Project Details
        </h2>
        <form class="space-y-6" action="/create-project" method="POST" @submit.prevent="handleSubmit" autocomplete="off">
          <input type="hidden" name="_csrf" :value="csrfToken" />

          <div v-for="(field, index) in formFields" :key="index" class="relative">
            <label :for="field.toLowerCase()" class="block text-gray-700 font-medium mb-2">
              Meeting {{ field }}
            </label>

            <input type='text' :id="field.toLowerCase()"
              :name="field.toLowerCase()" :placeholder="`Enter the Project ${field}`" required
              class="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 shadow-sm" />
          </div>

          <button type="submit"
            class="w-full py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 transition duration-300 shadow-md">
            Create Project
          </button>
        </form>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SharedProps } from '@adonisjs/inertia/types'
import { usePage } from '@inertiajs/vue3'
import { onMounted, ref } from 'vue'
import Navbar from './component/Navbar.vue'
const page = usePage<SharedProps>()
const csrfToken = ref(page.props.csrfToken)

const formFields = ref(['Name', 'Description'])

function handleSubmit(e: Event) {
  const form = e.target as HTMLFormElement
  form.submit()
}
</script>
