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
      <template v-slot:header.name="{ header }">
        {{ header.text.toUpperCase() }}
      </template>
      <template v-slot:item.character="props" class="temp">
        <v-edit-dialog
            class="edit"
            :return-value.sync="props.item.character"
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close"
        >
          {{ props.item.character }}
          <template v-slot:input>
<!--            <v-text-field-->
<!--                v-model="props.item.actor"-->
<!--                label="Edit"-->
<!--                single-line-->
<!--                counter-->
<!--            ></v-text-field>-->
            <v-list
                width="280px"
                max-height="300px"
                dense
            >
              <v-list-item-group
                  v-model="ac"
                  color="primary"
              >
                <v-list-item
                    v-for="(item, i) in characters"
                    :key="i"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="item"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.isActive="{ item }">
        <v-simple-checkbox
            v-model="item.isActive"
            :ripple="false"
        ></v-simple-checkbox>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: 'MainTable',
  data() {
    return {
      temp: true,
      ac: 'Депп',
      footerOptions: {
        'items-per-page-all-text': 'Всего',
        'items-per-page-text': 'Показывать на странице',
      },
      headers: [
        {
          text: 'Актер',
          align: 'start',
          value: 'actor',
        },
        {
          text: 'Персонаж',
          align: 'start',
          value: 'character',
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
      return this.$store.state.characters.map((character) => ({
        character,
        actor: 'Безруков',
        isActive: true,
      }));
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
    open() {
      console.log('open');
    },
    close() {
      console.log('close');
    },
  },
};
</script>

<style scoped>
.edit {
  position: absolute;
  bottom: 0 !important;
  left: 0 !important;
}
.temp {
  position: relative;
}
</style>
