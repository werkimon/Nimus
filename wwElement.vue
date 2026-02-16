<template>
  <button @click="emitClick">Test</button>
</template>

<script>
export default {
  props: ['content'],
  methods: {
    emitClick() {
      this.$emit('connected')
    }
  }
}
</script>
