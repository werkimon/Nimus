export default {
  editor: {
    label: 'ElevenLabs Button',
    icon: 'microphone'
  },
  properties: {
    agentId: {
      label: 'Agent ID',
      type: 'Text',
      bindable: true
    }
  },
  events: [
    { name: 'connected', label: 'Connected' },
    { name: 'disconnected', label: 'Disconnected' },
    { name: 'error', label: 'Error' }
  ]
}
