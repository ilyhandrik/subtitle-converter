<template>
  <v-container class="pa-0 mb-2 mt-2 container">
    <v-card max-width="290px" elevation="0">
      <v-card-text class="pa-0">
        <v-container class="pa-0">
          <v-toolbar
              dense
              elevation="0"
              flat
              class="pa-0 pl-0 toolbar"
          >
            <v-btn
                small
                icon
                class="mr-2"
                :dark="isCheckedAll"
                :class="{'primary': isCheckedAll}"
                @click="checkAll"
            >
              <v-icon>mdi-check-all</v-icon>
            </v-btn>
            <v-text-field
                dense
                autofocus
                hide-details
                hint=""
                v-model="searchText"
                class="white"
                @keydown="keydown"
            ></v-text-field>
            <v-icon
                class="rollup"
                @click="rollUp"
            >
              mdi-chevron-up
            </v-icon>
          </v-toolbar>
          <v-list
              class="character-list pa-0"
              max-height="300px"
          >
            <v-list-item-group
                v-model="settings"
                multiple
                active-class=""
                class="pa-0"
            >
              <v-list-item
                  class="character-list__item pl-1"
                  v-for="(item, index) in characters"
                  :key="index"
                  @click="select(index)"
                  :disabled="disabledCheck(item)"
                  v-show="searchQuery(searchText, item)"
              >
                <template v-slot:default="{ active }">
                  <v-list-item-action>
                    <v-checkbox
                        :input-value="active"
                        color="primary"
                        :disabled="disabledCheck(item)"
                    ></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    {{ item }}
                  </v-list-item-content>
                </template>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'CharactersSelect',
  data() {
    return {
      settings: [],
      searchText: '',
    };
  },
  props: {
    actor: String,
  },
  created() {
    this.characters.forEach((character, index) => {
      if (this.characterToActorMap[character] === this.actor) {
        this.settings.push(index);
      }
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.$nextTick(() => {
        document.addEventListener('mousedown', this.outsideClickHandler);
      });
    });
  },
  beforeDestroy() {
    document.removeEventListener('mousedown', this.outsideClickHandler);
  },
  computed: {
    characters() {
      return this.$store.state.characters;
    },
    characterToActorMap() {
      return this.$store.state.characterToActorMap;
    },
    charactersItems() {
      return this.characters.map((ch) => ({
        text: ch,
        disabled: true,
      }));
    },
    searchRegexp() {
      return `^${this.searchText.toUpperCase()}`;
    },
    isCheckedAll() {
      let disabled = 0;
      Object.keys(this.characterToActorMap).forEach((char) => {
        if (this.disabledCheck(char)) disabled += 1;
      });
      return (disabled === this.characters.length - this.settings.length);
    },
  },
  methods: {
    select(index) {
      this.$emit('select', this.characters[index]);
    },
    disabledCheck(character) {
      return (this.characterToActorMap[character]
          && this.characterToActorMap[character] !== this.actor);
    },
    outsideClickHandler(event) {
      if (!this.$el.contains(event.target)) {
        this.$emit('close');
      }
    },
    searchQuery(searchText, item) {
      return item.toUpperCase().match(this.searchRegexp);
    },
    checkAll() {
      if (this.isCheckedAll) {
        this.settings = [];
        this.$emit('remove-all', this.actor);
      } else {
        this.settings = [];
        this.characters.forEach((character, index) => {
          if (!this.disabledCheck(character)) {
            this.settings.push(index);
          }
        });
        this.$emit('select-all', this.actor);
      }
    },
    rollUp() {
      this.$emit('close');
    },
    keydown(e) {
      console.log(e);
    },
  },
};
</script>

<style scoped lang="scss">
  .character-list {
    overflow-y: auto;

    &__item {
      min-height: 28px;
      height: 28px;
      white-space: nowrap;
    }
  }
  .toolbar {
    position: relative;
  }
  .rollup {
    position: absolute;
    top: 12px;
    right: -28px;
    z-index: 999;
    cursor: pointer;
  }
</style>
