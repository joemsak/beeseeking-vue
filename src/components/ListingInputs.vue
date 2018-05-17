<template>
  <ul>
    <li
      v-for="(item, i) in list"
      :key="i"
      :class="item === value ? 'selected' : ''"
    >
      <label>
        <input
          type="radio"
          :name="`radio-group-${_uid}`"
          :value="item"
          @change="$emit('input', $event.target.value)"
          :checked="item === value"
        />
        {{ item }}
      </label>
    </li>

    <li :class="otherChosen ? 'selected' : ''">
      <input
        type="text"
        :placeholder="otherPlaceholder"
        @focus="$emit('input', $event.target.value)"
        @input="$emit('input', $event.target.value)"
      />
    </li>
  </ul>
</template>

<script>
export default {
  props: ['value', 'list', 'otherPlaceholder'],

  computed: {
    otherChosen () {
      return !!this.value.length && !this.list.includes(this.value)
    },
  },
}
</script>

<style lang="scss" scoped>
  ul {
    list-style: none;
    margin: 1rem 0;
    padding: 0;

    li {
      margin: 0.5rem 0;
      padding: 0;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 0.3rem;
      transition: background-color 0.2s;

      &:hover {
        background: rgba(242, 188, 27, 0.2);
      }

      &.selected {
        background: #F2BC1B;
      }

      input {
        margin-right: 1rem;
      }

      label,
      input[type=text] {
        background: none;
        padding: 1rem;
        cursor: pointer;
        display: block;
        width: 100%;
        font-weight: bold;
      }
    }
  }
</style>