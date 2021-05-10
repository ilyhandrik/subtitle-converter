<template>
  <v-container class="pa-0 mb-2 mt-2 container">
    <v-card max-width="290px" elevation="0">
      <v-card-text class="pa-0">
        <v-container class="pa-0">
          <v-list
              class="character-list"
              max-height="300px"
          >
            <v-list-item-group
                v-model="settings"
                multiple
                active-class=""
            >
              <v-list-item
                  class="character-list__item"
                  v-for="(item, index) in characters"
                  :key="index"
                  @click="select(index)"
                  :disabled="disabledCheck(item)"
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
      console.log('mounted');
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
  },
};
</script>

<style scoped lang="scss">
  .character-list {
    overflow-y: scroll;

    &__item {
      min-height: 28px;
      height: 28px;
    }
  }
</style>
