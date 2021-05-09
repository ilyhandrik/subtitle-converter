<template>
  <v-app>
    <v-app-bar
        class="d-flex justify-end"
        app
    >
      <v-btn
          small
          dark
          @click="selectAssFile"
      >
        загрузить субтитры *.ass
      </v-btn>
      <input
          @input="openSubtitles"
          ref="input"
          accept=".ass"
          hidden type="file"
      >
    </v-app-bar>
    <v-navigation-drawer
        app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
              class="title"
          >
            Subtitle converter
          </v-list-item-title>
          <v-list-item-subtitle>
            v 1.0
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
          dense
          nav
      >
        <v-list-item
            v-for="item in items"
            :key="item.title"
            link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container
          fluid
      >
        <router-view/>
      </v-container>
    </v-main>
    <v-footer
        app
    >
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      items: [
        { title: 'Таблица актер-персонаж', icon: 'mdi-table' },
        { title: 'Список актеров', icon: 'mdi-account-box-multiple' },
        { title: 'Подсчет тайминга', icon: 'mdi-clipboard-clock-outline' },
      ],
    };
  },
  methods: {
    selectAssFile() {
      this.$refs.input.click();
    },
    openSubtitles(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.$store.dispatch('SET_ASS_FILE', e.target.result);
      };
      reader.readAsText(file);
    },
  },
};
</script>
