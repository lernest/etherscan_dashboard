<template>
  <v-app>
    <v-app-bar color="primary" dense bottom min-height="40px" max-height="50px">
      <v-btn
        v-for="link in links"
        :key="`${link.label}-footer-link`"
        color="white"
        text
        x-small
        class="my-2 mx-1 custom-btn"
        :to="link.url"
      >
        {{ link.label }}
      </v-btn>
      <v-btn
        @click="toggleMode"
        color="white"
        text
        tile
        x-small
        class="my-2 custom-btn"
        >Switch to {{ colorMode }} mode</v-btn
      >
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  beforeCreate() {
    this.$vuetify.theme.isDark = true
  },
  methods: {
    toggleMode() {
      if (this.colorMode == 'dark') {
        this.$vuetify.theme.isDark = true
        this.colorMode = 'light'
      } else {
        this.$vuetify.theme.isDark = false
        this.colorMode = 'dark'
      }
    },
  },
  data: () => ({
    colorMode: 'light',
    links: [
      {
        label: 'Explore',
        url: '/',
      },
      {
        label: 'About',
        url: '/about',
      },
    ],
  }),
}
</script>
