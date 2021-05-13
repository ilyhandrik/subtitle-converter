<template>
  <div
      class="container"
      v-if="projects.length"
  >
    <v-container>
      <div class="header pa-1 pl-2 grey lighten-2">
        <span>Список проектов</span>
        <v-icon>mdi-paperclip</v-icon>
      </div>
      <div class="list grey lighten-4">
        <div
            class="list__item"
            v-for="(project, index) in projects"
            :key="index"
            @click="applyProject(index)"
        >
          {{ project.name }}
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'ProjectList',
  computed: {
    projects() {
      return this.$store.state.projects;
    },
  },
  methods: {
    applyProject(index) {
      this.$store.dispatch('APPLY_PROJECT', index);
    },
  },
};
</script>

<style scoped lang="scss">
  .container {
    padding-left: 6px;
    font-size: 13px;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 2px;
    font-weight: bold;
    font-size: 13px !important;
  }
  .list {
    overflow-y: auto;
    max-height: 100%;
    height: 100%;

  &__item {
    display: flex;
    padding-left: 8px;
    align-items: center;
    min-height: 28px;
    height: 28px;

    &:hover {
      border-radius: 2px;
      background-color: #d4d6dd;
      cursor: pointer;
      background-image: url("../assets/autorenew.svg");
      background-position: right;
      background-size: 8%;
    }
   }
  }
</style>
