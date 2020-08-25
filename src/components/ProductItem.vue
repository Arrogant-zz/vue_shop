<template>
  <li class="catalog__item">
    <a
      class="catalog__pic"
      href="#"
      @click.prevent="gotoPage('product', {id: product.id})"
    >
      <img :src="product.image" :alt="product.title">
    </a>

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
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';
import getColorsByIds from '@/helpers/getColorsByIds';

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
  methods: {
    gotoPage,
  },
  computed: {
    colors() {
      return getColorsByIds(this.product.colors);
    },
  },
};
</script>
