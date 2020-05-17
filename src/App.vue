<template>
  <v-app>
    <v-app-bar dense bottom min-height="40px" max-height="50px">
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
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    links: [
      {
        label: "Explore",
        url: "/"
      },
      {
        label: "About",
        url: "/about"
      }
    ]
  })
};
</script>
