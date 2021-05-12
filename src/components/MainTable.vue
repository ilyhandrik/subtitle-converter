<template>
  <v-container v-if="file">
    <v-card class="pa-0" elevation="2">
      <v-card-title class="pr-4 pb-2 pt-2 d-flex justify-end">
        <v-menu
            bottom
            left
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                elevation="2"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list class="menu pa-0">
            <v-list-item-group
                color="primary"
                dense
            >
              <v-list-item
                  @click="createSheet"
                  link
              >
                Общий монтажный лист
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item
                  @click="createSheet({isClear: true})"
                  link
              >
                Чистый монтажный лист
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item
                  @click="saveToJson"
                  link
              >
                Сохранить в json
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item
                  @click="openJson"
                  link
              >
                Загрузить json
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-divider></v-divider>
      <v-data-table
          :headers="headers"
          :items="tableData"
          :items-per-page="10"
          fixed-header
          height="100%"
          :footer-props="footerOptions"
          no-data-text="актеры не добавлены"
          sort-by="character"
          :multi-sort="false"
      >
        <template
            v-slot:header.name="{ header }"
        >
          {{ header.text.toUpperCase() }}
        </template>
        <template
            v-slot:item.characters="props"
        >
          <div
              class="characters"
              @click="open(props.item.actor)"
              v-if="!(editingRow === props.item.actor)"
          >
            {{ formatCharactersColumn(props.item.characters) }}
          </div>
          <characters-select
              v-if="editingRow === props.item.actor"
              @select="assignCharactersToActor"
              :actor="props.item.actor"
              @close="closeSelect"
          />
        </template>
        <template
            v-slot:item.isActive="{ item }"
        >
          <v-btn
              icon
              @click="createSheet({ actor: item.actor })"
          >
            <v-icon>mdi-playlist-play</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <input
        type="file"
        hidden
        ref="fileInput"
        accept=".json"
        @input="openJsonHandler"
    >
  </v-container>
</template>

<script>
import CharactersSelect from '@/components/CharactersSelect.vue';
import fileExport from '@/utils/fileExport';
import importFile from '@/utils/importFile';
import docx from '@/utils/docx';

export default {
  name: 'MainTable',
  components: {
    CharactersSelect,
  },
  data() {
    return {
      temp: true,
      ac: 'Депп',
      editingRow: null,
      footerOptions: {
        'items-per-page-all-text': 'Все',
        'items-per-page-text': 'Показывать на странице',
      },
      headers: [
        {
          text: 'Актер',
          align: 'start',
          value: 'actor',
          width: '160px',
        },
        {
          text: 'Персонаж',
          align: 'start',
          value: 'characters',
        },
        {
          text: '',
          align: 'end',
          value: 'isActive',
        },
      ],
    };
  },
  computed: {
    tableData() {
      return this.$store.getters.actorToCharacters;
    },
    actors() {
      return this.$store.state.actors;
    },
    characters() {
      return this.$store.state.characters;
    },
    characterToActor() {
      return this.$store.getters.characterToActor;
    },
    actorToCharacters() {
      return this.$store.getters.actorToCharacters;
    },
    file() {
      return this.$store.state.assFile;
    },
  },
  methods: {
    saveToJson() {
      fileExport.jsonExport(JSON.stringify(this.characterToActor, null, '    '), this.$store.state.fileName);
    },
    openJson() {
      this.$refs.fileInput.click();
    },
    async openJsonHandler(e) {
      const string = await importFile.readFile(e.target.files[0]);
      await this.$store.dispatch('FILL_FROM_JSON', JSON.parse(string));
    },
    open(actor) {
      this.editingRow = actor;
    },
    assignCharactersToActor(character) {
      this.$store.commit('ASSIGN_CHARACTERS_TO_ACTOR', {
        character,
        actor: this.editingRow,
      });
    },
    formatCharactersColumn(characters) {
      if (characters.length) {
        return characters.join(', ');
      }
      return '-';
    },
    closeSelect() {
      this.editingRow = null;
    },
    createSheet({ actor, isClear }) {
      docx.createSheet({
        dialogs: this.$store.state.dialogs,
        actorToChars: this.actorToCharacters,
        isClear,
        actor,
        fileName: this.$store.state.fileName,
      });
    },
  },
};
</script>

<style scoped lang="scss">
  .menu {
    font-size: 14px;
  }
 .characters {
   cursor: pointer;
   //background-color: white;

   &:hover {
    // background-color: #6fdd12;
   }
 }
</style>
