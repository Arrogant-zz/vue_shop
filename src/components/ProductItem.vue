<template>
  <li class="catalog__item">
    <router-link
      class="catalog__pic"
      :to="{name: 'product', params: {id: product.id}}"
    >
      <img :src="product.image" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
              {{ product.price | numberFormat }} ₽
        </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in colors" :key="color.id">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :value="color.id" v-model="currentColor">
          <span
            class="colors__value"
            :style="{'background-color': color.value}">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import numberFormat from '@/filters/numberFormat';

export default {
  props: ['product'],
  data() {
    return {
      currentColor: 0,
    };
  },
  filters: {
    numberFormat,
  },
  computed: {
    colors() {
      return this.product.colors.map((color) => ({
        ...color,
        value: color.code,
      }));
    },
  },
};
</script>
