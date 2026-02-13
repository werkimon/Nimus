export default {
  editor: {
    label: {
      en: "ElevenLabs Call Button"
    }
  },

  properties: {
    agentId: {
      label: {
        en: "Agent ID"
      },
      type: "Text",
      bindable: true,
      defaultValue: ""
    }
  },

  events: [
    {
      name: "connected",
      label: { en: "On Connected" }
    },
    {
      name: "disconnected",
      label: { en: "On Disconnected" }
    },
    {
      name: "error",
      label: { en: "On Error" }
    },
    {
      name: "state-change",
      label: { en: "On State Change" }
    }
  ]
}
