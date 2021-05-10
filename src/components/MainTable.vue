<template>
  <v-container>
    <v-data-table
        :headers="headers"
        :items="tableData"
        class="elevation-1"
        :items-per-page="10"
        fixed-header
        height="100%"
        :footer-props="footerOptions"
        no-data-text="Файл субтитров не загружен"
        sort-by="character"
        :multi-sort="false"
        :single-select="true"
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
        <v-simple-checkbox
            v-model="item.isActive"
            :ripple="false"
        ></v-simple-checkbox>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import CharactersSelect from '@/components/CharactersSelect.vue';

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
        'items-per-page-all-text': 'Всего',
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
          text: 'Включить в монтажный лист',
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
  },
  methods: {
    save() {
      console.log('save');
    },
    cancel() {
      console.log('cancel');
    },
    open(actor) {
      this.editingRow = actor;
      console.log(actor);
      console.log('open');
    },
    close() {
      console.log('close');
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
  },
};
</script>

<style scoped lang="scss">
 .characters {
   cursor: pointer;
   //background-color: white;

   &:hover {
     //background-color: red;
   }
 }
</style>
