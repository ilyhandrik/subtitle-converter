<template>
  <v-container>
    <v-row>
      <v-col cols="md-6 lg-6 sm-12">
        <v-card class="pa-0" elevation="2">
          <v-card-title class="pa-2">
            <v-text-field
                class="ratio pt-2"
                label="Коэффицент"
                dense
                v-model="ratio"
                type="number"
                @input="calculate"
            >
            </v-text-field>
            <v-spacer></v-spacer>
            <v-btn
                small
                color="primary"
                @click="exportToCsv"
            >
              Экспорт в .csv
              <v-icon
                  right
                  dark
              >
                mdi-application-export
              </v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-data-table
              :headers="headers"
              :items="tableData"
              hide-default-footer
          >
            <template v-slot:item.time="{ item }">
              <span>{{ item.time | timeToMinutes }} </span>
            </template>
            <template
                v-slot:footer
            >
              <v-divider>
              </v-divider>
              <div class="pl-4 pr-4 pt-3 pb-3 font-weight-bold total">
                <div class="total__text">
                  Всего
                </div>
                <div>
                  {{ total | timeToMinutes }}
                </div>
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import parser from '@/parser';
import formatter from '@/formatter';
import fileExport from '@/utils/fileExport';

export default {
  name: 'TimeCalc',
  data() {
    return {
      actorsTime: {},
      ratio: 1.5,
      headers: [
        {
          text: 'Актер',
          align: 'start',
          value: 'actor',
          width: '160px',
        },
        {
          text: 'Суммарное время (минуты)',
          align: 'end',
          value: 'time',
        },
      ],
    };
  },
  created() {
    this.calculate();
  },
  computed: {
    actors() {
      return this.$store.state.actors;
    },
    dialogs() {
      return this.$store.state.dialogs;
    },
    characterToActorMap() {
      return this.$store.state.characterToActorMap;
    },
    tableData() {
      return Object.keys(this.actorsTime).map((key) => ({
        actor: key,
        time: this.actorsTime[key],
      }));
    },
    total() {
      return this.tableData.reduce((acc, curr) => (acc + curr.time), 0);
    },
  },
  methods: {
    calculate() {
      this.fillActors();
      this.dialogs.forEach((dialog) => {
        const time = (parser.getTime(dialog.end) - parser.getTime(dialog.start)) * this.ratio;
        dialog.name.forEach((name) => {
          if (this.actorsTime[this.characterToActorMap[name]] !== undefined) {
            this.actorsTime[this.characterToActorMap[name]] += time;
          }
        });
      });
    },
    fillActors() {
      this.actorsTime = {};
      this.actors.forEach((actor) => {
        this.actorsTime[actor] = 0;
      });
    },
    exportToCsv() {
      let data = this.tableData
        .map((row) => (`${row.actor};${this.$options.filters.timeToMinutes(row.time)}`))
        .join('\n');
      data += `\nСумма;${this.$options.filters.timeToMinutes(this.total)}`;
      fileExport.csvExport(data, this.$store.state.fileName);
    },
  },
  filters: {
    timeToMinutes(time) {
      return formatter.hundredthToMinutes(time);
    },
  },
};
</script>

<style scoped lang="scss">
  .total {
    display: flex;
    justify-content: space-between;

    &__text {
      width: 160px;
    }
  }

  .ratio {
    max-width: 76px;
    width: 76px;
  }
</style>
