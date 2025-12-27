<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <Navbar link="/" message="Create Project" />
    <div class="flex-1 p-6 md:p-10">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">
        {{ props?.projects?.length > 0 ? 'Available Projects' : 'No Available Project' }}
      </h2>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(project, index) in props.projects"
          :key="index"
          @click="$inertia.get(`/?projectid=${project.id}`)"
          class="bg-white hover:cursor-pointer hover:shadow-amber-700 rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition"
        >
          <h3 class="text-lg font-semibold text-blue-600 mb-2">
            {{ project.name }}
          </h3>

          <p class="text-gray-600 text-sm mb-1">📅 {{ project.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { InferPageProps } from '@adonisjs/inertia/types'
import Navbar from './component/Navbar.vue'
import DashboardController from '#controllers/available_projects_controller'
const props = defineProps<{
  projects: InferPageProps<DashboardController, 'projects'>['projects']
}>()
</script>
