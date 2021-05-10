<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-container>
          <v-list>
            <v-list-item-group
                v-model="settings"
                multiple
                active-class=""
            >
              <v-list-item>
                <template v-slot:default="{ active }">
                  <v-list-item-action>
                    <v-checkbox :input-value="active"></v-checkbox>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>Notifications</v-list-item-title>
                    <v-list-item-subtitle>
                      Notify me about updates to apps or games that I downloaded
                    </v-list-item-subtitle>
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
};
</script>

<style scoped>

</style>
