<template>
  <v-container>
    <v-data-table
        :items="projects"
        :headers="headers"
        class="elevation-1"
    >
      <template v-slot:item.name="props">
        <v-edit-dialog
            :return-value.sync="props.item.name"
            @save="save"
        >
          {{ props.item.name }}
          <template v-slot:input>
            <v-text-field
                v-model="props.item.name"
                label="Edit"
                single-line
                counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            @click="remove(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: 'ProjectListEditor',
  data() {
    return {
      headers: [
        {
          value: 'name',
          text: 'Название проекта',
        },
        {
          text: '',
          value: 'actions',
          align: 'end',
        },
      ],
      tableData: [],
    };
  },
  computed: {
    projects() {
      return this.$store.state.projects;
    },
  },
  created() {

  },
  methods: {
    remove(item) {
      const index = this.projects.indexOf(item);
      this.projects.splice(index, 1);
      this.save();
    },
    save() {
      this.$store.dispatch('SAVE_PROJECTS', this.projects);
    },
  },
};
</script>

<style scoped>

</style>
