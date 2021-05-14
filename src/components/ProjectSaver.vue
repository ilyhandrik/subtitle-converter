<template>
    <v-card>
      <v-card-text class="pa-0">
        <v-container>
          <v-text-field
              label="Название проекта"
              v-model="projectName"
              hide-details
          >
          </v-text-field>
          <v-list
            class="list mb-2 grey lighten-3"
            dense
        >
          <v-list-item-group
              v-model="selectedItem"
          >
            <v-list-item
                v-for="(project, index) in projects"
                :key="index"
                link
                class="item mb-0 pa-0 pl-3"
                @click="setName(project.name)"
            >
              {{ project.name }}
            </v-list-item>
          </v-list-item-group>
        </v-list>
          <v-container>
            <v-row>
              <v-btn
                  @click="$emit('close')"
              >
                Отмена
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                  @click="apply"
              >
                Сохранить
              </v-btn>
            </v-row>
          </v-container>
        </v-container>
      </v-card-text>
    </v-card>
</template>

<script>
export default {
  name: 'ProjectSaver',
  data() {
    return {
      projectName: '',
      selectedItem: 0,
    };
  },
  computed: {
    actorToCharacters() {
      return this.$store.getters.actorToCharacters;
    },
    projects() {
      return [...this.$store.state.projects].reverse();
    },
    openedProjectName() {
      return this.$store.state.openedProjectName;
    },
  },
  created() {
    this.projectName = this.openedProjectName || this.$store.state.fileName;
    this.selectedItem = this.projects.findIndex((p) => (p.name === this.openedProjectName));
  },
  methods: {
    apply() {
      let projects = localStorage.getItem('projects');
      if (projects) {
        projects = JSON.parse(projects);
      } else {
        projects = [];
      }
      const project = projects.find((p) => (p.name === this.projectName));
      if (project) {
        project.actorToCharacters = this.actorToCharacters;
      } else {
        projects.push({
          name: this.projectName,
          actorToCharacters: this.actorToCharacters,
        });
      }
      localStorage.setItem('projects', JSON.stringify(projects));
      this.$store.commit('SET_PROJECTS', projects);
      this.$emit('close');
    },
    setName(name) {
      this.projectName = name;
    },
  },
};
</script>

<style scoped>
  .list {
    overflow-y: auto;
    max-height: 160px;
  }
  .item {
    min-height: 28px;
    height: 28px;
  }
</style>
