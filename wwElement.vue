<template>
  <button @click="handleClick">Test ElevenLabs Button</button>
</template>

<script>
export default {
  props: ['content'],
  methods: {
    handleClick() {
      // emit event that WeWeb can catch
      this.$emit('trigger-event', { name: 'connected' });
    }
  }
}
</script>

<style scoped>
button { padding: 8px 12px; border-radius: 6px; cursor: pointer; }
</style>
