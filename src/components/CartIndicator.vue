<template>
  <div v-if="loading">
    <clip-loader :size="25" :sizeUnit="'px'" :color="'#bada55'"/>
  </div>
  <router-link v-else class="header__cart" :to="{name: 'cart'}" aria-label="Корзина с товарами">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">{{ $store.state.cartProducts.length }}</span>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex';
import { ClipLoader } from '@saeris/vue-spinners';

export default {
  components: { ClipLoader },
  computed: {
    ...mapGetters({
      loading: 'cartProductsLoading',
      loadingFailed: 'cartProductsLoadingFailed',
    }),
  },
};
</script>
