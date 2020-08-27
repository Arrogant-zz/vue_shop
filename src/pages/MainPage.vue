<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{ products.length }} товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        v-bind.sync="filter"
        @filter-change="setFirstPage"
      />
      <section class="catalog">
        <ProductList
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

export default {
  components: {
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
    };
  },
  methods: {
    setFirstPage() {
      this.page = 1;
    },
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products;

      if (this.filter.priceFrom > 0) {
        filteredProducts = filteredProducts.filter((product) => product.price >= this.filter.priceFrom);
      }

      if (this.filter.priceTo > 0) {
        filteredProducts = filteredProducts.filter((product) => product.price <= this.filter.priceTo);
      }

      if (this.filter.categoryId) {
        filteredProducts = filteredProducts.filter((product) => product.categoryId === this.filter.categoryId);
      }

      if (this.filter.colorId) {
        filteredProducts = filteredProducts.filter((product) => product.colors.includes(this.filter.colorId));
      }

      if (this.filter.sizes.length > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.sizes && product.sizes.filter(
            (size) => this.filter.sizes.includes(size),
          ).length > 0,
        );
      }

      return filteredProducts;
    },
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    },
  },
};
</script>
