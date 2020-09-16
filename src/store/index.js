import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import API_BASE_URL from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userAccessKey: null,
    cartProductsData: [],
    cartProductsLoading: false,
    cartProductsLoadingFailed: false,
  },
  mutations: {
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProductsData.find((i) => i.productId === productId);

      if (item) {
        item.amount = amount;
      }
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    updateCartProductsLoading(state, flag) {
      state.cartProductsLoading = flag;
    },
    updateCartProductsLoadingFailed(state, flag) {
      state.cartProductsLoadingFailed = flag;
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProductsData.map((item) => ({
        amount: item.quantity,
        productId: item.product.id,
        product: {
          ...item.product,
          image: item.product.image.file.url,
        },
      }));
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
    cartProductsLoading(state) {
      return state.cartProductsLoading;
    },
    cartProductsLoadingFailed(state) {
      return state.cartProductsLoadingFailed;
    },
  },
  actions: {
    loadCart(context) {
      context.commit('updateCartProductsLoading', true);
      context.commit('updateCartProductsLoadingFailed', false);

      return axios.get(`${API_BASE_URL}/api/baskets`,
        {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }

          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => { context.commit('updateCartProductsLoadingFailed', true); })
        .then(() => { context.commit('updateCartProductsLoading', false); });
    },
    addProductToCart(context, { productId, amount }) {
      return axios
        .post(`${API_BASE_URL}/api/baskets/products`, {
          productId,
          quantity: amount,
        }, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        });
    },
    updateCartProductAmount(context, { productId, amount }) {
      if (amount < 1) {
        return new Promise();
      }

      return axios
        .put(`${API_BASE_URL}/api/baskets/products`, {
          productId,
          quantity: amount,
        }, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => { context.commit('updateCartProductsData', response.data.items); });
    },
    deleteCartProduct(context, productId) {
      return (new Promise((resolve) => setTimeout(resolve, 3000)))
        .then(() => axios
          .delete(`${API_BASE_URL}/api/baskets/products`, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
            data: {
              productId,
            },
          })
          .then((response) => {
            context.commit('updateCartProductsData', response.data.items);
          }));
    },
  },
});
