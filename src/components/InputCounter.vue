<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click.prevent="change(-1)">
      <svg :width="buttonSize" :height="buttonSize" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="currentCounter">

    <button type="button" aria-label="Добавить один товар" @click.prevent="change(1)">
      <svg :width="buttonSize" :height="buttonSize" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'counter',
    event: 'change',
  },
  props: {
    counter: Number,
    buttonSize: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    currentCounter: {
      get() {
        return this.counter;
      },
      set(value) {
        this.$emit('change', value);
      },
    },
  },
  methods: {
    change(value) {
      if ((this.counter + value) >= 0) {
        this.$emit('change', this.counter + value);
      }
    },
  },
};
</script>
