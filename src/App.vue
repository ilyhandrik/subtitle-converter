<template>
  <v-app>
    <v-app-bar
        app
    >
      <div>
        {{ fileName }}
      </div>
      <v-spacer></v-spacer>
      <v-btn
          small
          @click="selectAssFile"
      >
        открыть файл *.ass
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
        permanent
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
              class="title"
          >
            RVISION subtitle
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
        <v-list-item-group
            v-model="currentPage"
            color="primary"
        >
          <v-list-item
              v-for="item in items"
              :key="item.path"
              link
              @click="setPage(item.path)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <project-list/>
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
import ProjectList from '@/components/ProjectList.vue';

export default {
  name: 'App',
  components: {
    ProjectList,
  },
  data() {
    return {
      items: [
        {
          title: 'Таблица актер-персонаж',
          icon: 'mdi-table',
          path: '/',
        },
        {
          title: 'Список актеров',
          icon: 'mdi-account-box-multiple',
          path: '/actors',
        },
        {
          title: 'Подсчет тайминга',
          icon: 'mdi-clipboard-clock-outline',
          path: '/time',
        },
        {
          title: 'Редактировать проекты',
          icon: 'mdi-clipboard-list-outline',
          path: '/projects',
        },
      ],
      currentPage: 0,
      fileName: '',
    };
  },
  created() {
    const projects = localStorage.getItem('projects');
    if (projects) {
      this.$store.commit('SET_PROJECTS', JSON.parse(projects));
    }
  },
  methods: {
    selectAssFile() {
      this.$refs.input.click();
    },
    openSubtitles(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      if (!file) return;
      reader.onload = (e) => {
        this.fileName = file.name;
        this.$store.dispatch('SET_ASS_FILE', {
          data: e.target.result,
          fileName: this.fileName,
        });
      };
      reader.readAsText(file);
    },
    setPage(key) {
      this.$store.state.currentView = key;
      this.$router.push({ path: key });
    },
  },
};
</script>
