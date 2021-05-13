<template>
    <v-card>
      <v-card-text>
        <v-container>
          <v-text-field
              label="Название проекта"
              v-model="projectName"
          >
          </v-text-field>
          <v-btn
              @click="apply"
          >
            Сохранить
          </v-btn>
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
    };
  },
  computed: {
    actorToCharacters() {
      return this.$store.getters.actorToCharacters;
    },
  },
  created() {
    this.projectName = this.$store.state.fileName;
  },
  methods: {
    apply() {
      let projects = localStorage.getItem('projects');
      if (projects) {
        projects = JSON.parse(projects);
      } else {
        projects = [];
      }
      projects.push({
        name: this.projectName,
        actorToCharacters: this.actorToCharacters,
      });
      localStorage.setItem('projects', JSON.stringify(projects));
      this.$store.commit('SET_PROJECTS', projects);
      this.$emit('close');
    },
  },
};
</script>

<style scoped>

</style>
