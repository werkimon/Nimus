<template>
  <button
    :class="['el-call-button', state]"
    @click="handleClick"
    :disabled="state === 'connecting' || state === 'disconnecting'"
  >
    <slot :state="state">
      {{ buttonLabel }}
    </slot>
  </button>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'
import { ElevenLabsClient } from '@elevenlabs/client'

const props = defineProps({
  agentId: {
    type: String,
    required: true
  }
})

const emit = defineEmits([
  'connected',
  'disconnected',
  'error',
  'state-change'
])

const state = ref('idle')
const client = ref(null)
const conversation = ref(null)

const buttonLabel = computed(() => {
  switch (state.value) {
    case 'connecting': return 'Connecting...'
    case 'connected': return 'Disconnect'
    case 'disconnecting': return 'Disconnecting...'
    case 'error': return 'Retry'
    default: return 'Connect'
  }
})

async function startConversation() {
  try {
    state.value = 'connecting'
    emit('state-change', state.value)

    client.value = new ElevenLabsClient()

    conversation.value = await client.value.conversations.start({
      agentId: props.agentId
    })

    state.value = 'connected'
    emit('connected')
    emit('state-change', state.value)

    conversation.value.on('end', () => {
      state.value = 'idle'
      emit('disconnected')
      emit('state-change', state.value)
    })

    conversation.value.on('error', (err) => {
      state.value = 'error'
      emit('error', err)
      emit('state-change', state.value)
    })

  } catch (err) {
    state.value = 'error'
    emit('error', err)
    emit('state-change', state.value)
  }
}

async function stopConversation() {
  if (!conversation.value) return

  try {
    state.value = 'disconnecting'
    emit('state-change', state.value)

    await conversation.value.end()

    state.value = 'idle'
    emit('disconnected')
    emit('state-change', state.value)

  } catch (err) {
    state.value = 'error'
    emit('error', err)
    emit('state-change', state.value)
  }
}

function handleClick() {
  if (state.value === 'idle' || state.value === 'error') {
    startConversation()
  } else if (state.value === 'connected') {
    stopConversation()
  }
}

onBeforeUnmount(() => {
  if (conversation.value) {
    conversation.value.end()
  }
})
</script>

<style scoped>
.el-call-button {
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  border: none;
}

.el-call-button.connecting,
.el-call-button.disconnecting {
  opacity: 0.6;
  pointer-events: none;
}
</style>
