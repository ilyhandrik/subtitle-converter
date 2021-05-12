<template>
  <v-container>
    <v-data-table
        :headers="headers"
        :items="actorsList"
        :items-per-page="999"
        class="elevation-1"
        hide-default-footer
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            @click="openEditDialog(item)"
            class="mr-3"
        >
          mdi-pencil
        </v-icon>
        <v-icon
            small
            @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:footer>
      </template>
    </v-data-table>
    <v-container>
      <v-row
          v-if="isNewActorActive"
      >
        <v-col cols="4">
          <v-text-field
              v-model="newActor"
              label="Добавить актера"
              single-line
              autofocus
              dense
              solo
              @blur="toggleNewActorInput"
          >
            <template v-slot:append>
              <v-btn
                  right
                  icon
                  small
                  color="primary"
                  @click="addNewActor"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="4"></v-col>
      </v-row>
      <v-btn
          v-else
          class="mx-2"
          fab
          dark
          small
          right
          color="primary"
          @click="toggleNewActorInput"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
    </v-container>
    <v-row justify="center">
      <v-dialog
          v-model="editDialog"
          max-width="290"
      >
        <v-card>
          <v-card-text>
            <v-container>
              <v-text-field v-model="dirtyName">
              </v-text-field>
              <v-btn
                  @click="applyEdit"
              >
                применить
              </v-btn>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ActorsList',
  data() {
    return {
      isNewActorActive: false,
      dirtyName: '',
      editedName: '',
      editDialog: false,
      actorsList: [],
      newActor: '',
      headers: [
        {
          text: 'Имя актера',
          value: 'name',
        },
        {
          text: '',
          value: 'actions',
          align: 'end',
        },
      ],
    };
  },
  computed: {
    actors() {
      return this.$store.state.actors;
    },
  },
  mounted() {
    this.updateActorList();
    document.addEventListener('keyup', this.keyUpHandler);
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.keyUpHandler);
  },
  methods: {
    deleteItem(item) {
      const index = this.actorsList.indexOf(item);
      if (index + 1) {
        this.actorsList.splice(index, 1);
      }
      this.$store.commit('SET_ACTORS', this.actorsList.map((actor) => (actor.name)));
    },
    save() {
      this.$store.commit('SET_ACTORS', this.actorsList.map((actor) => (actor.name)));
    },
    toggleNewActorInput() {
      this.isNewActorActive = !this.isNewActorActive;
    },

    // TODO: Сделать нормально
    keyUpHandler(e) {
      if (e.code === 'Enter') {
        if (this.editDialog) {
          this.applyEdit();
        } else if (this.isNewActorActive) {
          this.addNewActor();
        } else {
          this.isNewActorActive = true;
        }
      }
    },
    addNewActor() {
      if (this.newActor) {
        this.$store.dispatch('ADD_ACTOR', this.newActor);
        this.newActor = '';
        this.isNewActorActive = false;
        this.updateActorList();
      }
    },
    updateActorList() {
      this.actorsList = this.actors.map((actor) => ({
        name: actor,
        selected: false,
      }));
    },
    openEditDialog(item) {
      this.editDialog = true;
      this.editedName = item.name;
      this.dirtyName = item.name;
    },
    applyEdit() {
      const newName = this.dirtyName;
      const oldName = this.editedName;
      if (this.dirtyName && !(this.actors.indexOf(this.dirtyName) + 1)) {
        this.$store.dispatch('EDIT_ACTOR', { oldName, newName });
        this.updateActorList();
        this.editDialog = false;
      }
    },
  },
};
</script>

<style scoped>

</style>
