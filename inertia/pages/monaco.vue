<template>
  <Navbar link="/available-project" message="Available Projects" />
  <div class="mt-10" style="height: 400px" v-if="CodeEditor">
    <CodeEditor
      v-model:value="code"
      language="javascript"
      theme="vs-dark"
      :readOnly="true"
      :options="editorOptions"
      @Change="changeinEditor"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'
import Navbar from './component/Navbar.vue'
const props = defineProps<{
  result: Record<string, any>[]
  content: string
}>()
const CodeEditor = shallowRef()
const result = props.result.at(0)
const members = result?.members.at(0)
const workspace = result?.workspaces.at(0)
const ws = ref<WebSocket | null>(null)
const protocol = ref('')
const host = ref('')
const wsUrl = ref('')
const readOnly = ref(members.roleId == 3 ? true : false)
const connectWebSocket = () => {
  protocol.value = window.location.protocol
  host.value = window.location.host
  const wsProtocol = protocol.value === 'https:' ? 'wss' : 'ws'
  wsUrl.value = `${wsProtocol}://${host.value}/editor/${props.result.at(0)?.organizationId}/${props.result.at(0)?.name}/${members.roleId}`
  if (!ws.value) {
    ws.value = new WebSocket(wsUrl.value)
  }
  ws.value.onmessage = async (event) => {
    code.value = event.data
    console.log('messagein forntend', code.value)
  }
  console.log(wsUrl.value)
}
onMounted(async () => {
  const module = await import('monaco-editor-vue3')
  CodeEditor.value = module.CodeEditor
  connectWebSocket()
})
const code = ref(props.content)

const editorOptions = {
  fontSize: 14,
  minimap: { enabled: false },
  automaticLayout: true,
  readOnly: readOnly.value,
}
function changeinEditor(changes: any) {
  if (!ws.value || ws.value.readyState !== WebSocket.OPEN) return
  ws.value.send(changes)
}
</script>
