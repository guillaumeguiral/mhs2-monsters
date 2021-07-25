<template>
  <div class="container mx-auto py-4">
    <div class="px-7 py-2">
      <input
        type="text"
        v-model="search"
        placeholder="Rechercher ..."
        class="
          w-full
          px-4
          py-2
          text-xl
          bg-transparent
          border border-gray-300
          rounded-lg
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-600
          focus:border-indigo-600
        "
      />
    </div>
    <div class="flex flex-wrap p-4 items-stretch">
      <div
        v-for="(monster, index) in filteredMonsters"
        :key="index"
        class="w-full md:w-1/2 lg:w-1/3 p-3"
      >
        <div class="h-full bg-white rounded-lg shadow-md">
          <!-- Name -->
          <div class="px-4 pt-4 text-xl">
            <AppHighlight :content="monster.name.fr" :keyword="search" />
          </div>
          <!-- Location -->
          <div class="px-4 mt-2 text-gray-400">
            Location : {{ monster.location.fr || 'Inconnue' }}
          </div>
          <!-- Weakness -->
          <div class="flex items-center px-4 mt-1">
            <span class="mr-1">Faiblesse :</span>
            <img
              v-if="monster.elementWeakness"
              :src="`/images/icon-${monster.elementWeakness}.png`"
              class="inline-block w-5 mr-1"
              :alt="monster.elementWeakness || 'Inconnue'"
            />
            <span>{{ monster.elementWeakness || 'Inconnue' }}</span>
          </div>
          <!-- Attack Types -->
          <div
            v-if="monster.attackTypes"
            class="
              mt-4
              p-4
              flex flex-wrap
              items-end
              gap-2
              bg-gray-50
              border-gray-300 border-t border-b
            "
          >
            <div
              v-for="(type, attack) in monster.attackTypes"
              class="flex-1 text-center"
            >
              <div class="text-sm text-gray-600">
                {{ attacks[attack] }}
              </div>
              <div
                class="mt-1 font-semibold"
                :class="{
                  'text-red-600': type === 'power',
                  'text-blue-600': type === 'speed',
                  'text-green-600': type === 'technical',
                }"
              >
                {{ types[type] || 'Inconnu' }}
              </div>
            </div>
          </div>
          <!-- Parts -->
          <div
            v-if="monster.partsWeakness"
            class="mt-4 px-4 py-2 flex flex-wrap items-end gap-2"
          >
            <div
              v-for="(weakness, part) in monster.partsWeakness"
              class="flex-1 text-center p-2"
            >
              <div class="text-sm text-indigo-400">
                {{ parts[part] }}
              </div>
              <div>{{ weaknessTypes[weakness] }}</div>
            </div>
          </div>
          <!-- Retreat -->
          <div
            v-if="monster.retreat && monster.retreat.fr"
            class="p-4 italic text-sm"
          >
            {{ monster.retreat.fr }}
          </div>
        </div>
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

    const attacks = {
      beforeMoltenUppercut: 'Avant uppercut',
      afterMoltenUppercut: 'Après uppercut',
      enraged: 'Enragé',
      initial: 'Initial',
      iceArmor: 'Armure de glace',
      electrify: 'Eléctrifié',
      flyingEnraged: 'Vol enragé',
      coveredInMud: 'Couvert de boue',
      coveredInSnow: 'Couvert de neige',
      snowSlurp: 'Gorgé de neige',
      blaze: 'Flamboyant',
      afterFireChakram: 'Après chakram',
      charged: 'Chargé',
      holdingARock: 'Avec un rocher',
      flying: 'En vol',
      whiteSpiked: 'Pointes blanches',
      powerAura: 'Aura puissance',
      speedAura: 'Aura vitesse',
      technicalAura: 'Aura technique',
      combined: 'Combiné(s)',
      overcharge: 'Surcharge',
      iceMantle: 'Manteau de glace',
      iceCovered: 'Couvert de glace',
      inflated: 'Gonflé',
      supercharged: 'Suralimenté',
    };

    const types = {
      power: 'Puissance',
      speed: 'Vitesse',
      technical: 'Technique',
    };

    const parts = {
      head: 'Tête',
      body: 'Corps',
      tail: 'Queue',
      iceHead: 'iceHead',
      iceBody: 'iceBody',
      iceTail: 'iceTail',
      nose: 'Nez',
      stomach: 'Estomac',
      legs: 'legs',
      wings: 'Ailes',
      spikes: 'Piques',
      fists: 'Poings',
      back: 'Dos',
      horn: 'Corne',
      shell: 'Coquille',
      claws: 'Griffes',
      rock: 'Rocher',
      needle: 'Aiguille',
      chest: 'Torse',
      neckpouch: 'neckpouch',
      seltas: 'seltas',
      frostScale: 'frostScale',
    };

    const weaknessTypes = {
      blunt: 'Blunt',
      slash: 'Entailler',
      pierce: 'Transpercer',
    };

    const getAttacks = () => {
      return new Set(monsters.map((m) => Object.keys(m.attackTypes)).flat());
    };

    const getParts = () => {
      return new Set(
        monsters.map((m) => Object.keys(m.partsWeakness || {})).flat()
      );
    };

    return {
      search,
      filteredMonsters,
      attacks,
      types,
      parts,
      weaknessTypes,
    };
  },
};
</script>

<style lang="scss"></style>
