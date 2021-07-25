<!-- eslint-disable vue/no-v-html -->
<template>
  <span v-html="highlightedText"></span>
</template>

<script>
import { computed, ref } from 'vue';

export default {
  props: {
    content: {
      type: String,
      default: null,
    },
    keyword: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const highlightedText = computed(() => {
      if (!props.content) return null;

      return props.keyword
        ? props.content.replace(
            new RegExp(props.keyword.trim(), 'ig'),
            (match) =>
              '<span class="text-indigo-600 bg-indigo-50 underline">' +
              match +
              '</span>'
          )
        : props.content;
    });

    return {
      highlightedText,
    };
  },
};
</script>

<style>
.app-highlight {
  text-decoration: underline;
}
</style>
