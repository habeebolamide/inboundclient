import { Icon } from '@iconify/vue'
import { h } from 'vue'
import { createVuetify } from 'vuetify'
import { VBtn } from 'vuetify/components/VBtn'
import defaults from './defaults'
import { icons as defaultIcons } from './icons' // 👈 fixed alias
import { themes } from './theme'

// Styles
import '@core/scss/template/libs/vuetify/index.scss'
import 'vuetify/styles'

// ✅ Extend Vuetify icons without editing ./icons.js
const extendedIcons = {
  ...defaultIcons,
  sets: {
    ...defaultIcons.sets,
    iconify: {
      component: props => h(Icon, { icon: props.icon }),
    },
  },
  aliases: {
    ...defaultIcons.aliases,
    pencilTabler: 'tabler-pencil',
    dotsTabler: 'tabler-dots',
    userCogTabler: 'tabler-user-cog',
  },
}

export default function (app) {
  const vuetify = createVuetify({
    aliases: {
      IconBtn: VBtn,
      ...extendedIcons.aliases,
    },
    defaults,
    icons: extendedIcons, // ✅ use extended version
    theme: {
      defaultTheme: 'light',
      themes,
    },
  })

  app.use(vuetify)
}
