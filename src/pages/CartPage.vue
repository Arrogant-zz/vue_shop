<template>
  <main class="content container" v-if="loading" style="text-align: center;">
    <pulse-loader :size="15" :margin="'20px'" :sizeUnit="'px'" :color="'#bada55'"/>
  </main>
  <main class="content container" v-else-if="loadingFailed" style="text-align: center;">
    Ошибка при загрузки корзины
  </main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ products.length }} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in products" :key="item.productId" :item="item"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import CartItem from '@/components/CartItem.vue';
import numberFormat from '@/filters/numberFormat';
import { PulseLoader } from '@saeris/vue-spinners';

export default {
  components: { CartItem, PulseLoader },
  filters: { numberFormat },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
      loading: 'cartProductsLoading',
      loadingFailed: 'cartProductsLoadingFailed',
    }),
  },
};
</script>
