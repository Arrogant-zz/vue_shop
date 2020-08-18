<template>
  <ul class="catalog__list">
    <ProductItem v-for="(product, key)  in products" :key="key" :product="product"/>
  </ul>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue';

export default {
  components: {
    ProductItem,
  },
  props: ['products'],
};
</script>

<style scoped>

</style>
