<template>
  <div class="app">
    <div class="">
      <input
        type="text"
        v-model="search"
        placeholder="Rechercher ..."
        class="app-input"
      />
    </div>
    <div class="app-items">
      <div
        v-for="(monster, index) in filteredMonsters"
        :key="index"
        class="app-item"
      >
        <AppHighlight :content="monster.name.fr" :keyword="search" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import json from './data.json';
import AppHighlight from './components/AppHighlight.vue';

export default {
  components: {
    AppHighlight,
  },
  setup() {
    const search = ref('');
    const monsters = json.sort((a, b) => a.name.fr.localeCompare(b.name.fr));
    const filteredMonsters = computed(() => {
      return search.value
        ? monsters.filter(
            (m) =>
              m.name.fr.toLowerCase().indexOf(search.value.toLowerCase()) > -1
          )
        : monsters;
    });

    return {
      search,
      filteredMonsters,
    };
  },
};
</script>

<style lang="scss"></style>
