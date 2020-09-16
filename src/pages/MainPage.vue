<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{ countProducts }} товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        v-bind.sync="filter"
        :memory-stats="memoryStats"
        @filter-change="setFirstPage"
      />
      <section class="catalog">
        <div v-if="productsLoadingFailed">
          Произошла ошибка при загрузке товаров.
          <button @click="loadProducts">Обновить</button>
        </div>
        <div v-if="productsLoading" style="text-align: center;">
          <pulse-loader :size="15" :margin="'20px'" :sizeUnit="'px'" :color="'#bada55'"/>
        </div>
        <ProductList v-else
          :products="products"
        />
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
      </section>
    </div>
  </main>
</template>

<script>
import products from '@/data/products';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';
import API_BASE_URL from '@/config';
import { PulseLoader } from '@saeris/vue-spinners';

export default {
  components: {
    PulseLoader,
    ProductList,
    BasePagination,
    ProductFilter,
  },
  data() {
    return {
      filter: {
        priceFrom: 0,
        priceTo: 0,
        categoryId: 0,
        colorId: 0,
        sizes: [],
      },
      page: 1,
      productsPerPage: 6,

      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  methods: {
    setFirstPage() {
      this.page = 1;
    },
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products`,
          {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filter.categoryId,
              minPrice: this.filter.priceFrom,
              maxPrice: this.filter.priceTo,
              colorId: this.filter.colorId,
            },
          })
          .then((response) => {
            this.productsData = response.data;
          })
          .catch(() => { this.productsLoadingFailed = true; })
          .then(() => { this.productsLoading = false; });
      }, 2000);
    },
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
          ...product,
          image: product.image.file.url,
        }))
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
    memoryStats() {
      return products.filter((product) => product.sizes).reduce(
        (stats, product) => (
          product.sizes.reduce((r, size) => ({ ...r, [size]: (stats[size] || 0) + 1 }), stats)
        ),
        {},
      );
    },
  },
  watch: {
    page: {
      handler() {
        this.loadProducts();
      },
      immediate: true,
    },
    filter: {
      handler() {
        this.loadProducts();
      },
      deep: true,
    },
  },
};
</script>
