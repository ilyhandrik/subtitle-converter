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
    >
      <template v-slot:header.name="{ header }">
        {{ header.text.toUpperCase() }}
      </template>
      <template v-slot:item.actor="props">
        <v-edit-dialog
            :return-value.sync="props.item.actor"
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close"
        >
          {{ props.item.actor }}
          <template v-slot:input>
<!--            <v-text-field-->
<!--                v-model="props.item.actor"-->
<!--                label="Edit"-->
<!--                single-line-->
<!--                counter-->
<!--            ></v-text-field>-->
            <v-select
                :items="items"
                label="Solo field"
                solo
            ></v-select>
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
      footerOptions: {
        'items-per-page-all-text': 'Всего',
        'items-per-page-text': 'Показывать на странице',
      },
      headers: [
        {
          text: 'Персонаж',
          align: 'start',
          value: 'character',
        },
        {
          text: 'Актер',
          align: 'start',
          value: 'actor',
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
        actor: 'Джонни Депп',
        isActive: true,
      }));
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

</style>
