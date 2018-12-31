<template>
  <section class="container">
    <div>
      <h2>index page</h2>
      <ul>
          <li>
            <nuxt-link to='login'>ログインページへ</nuxt-link>
          </li>
          <li>
            <nuxt-link to='/authend-route'>認証が必要なページへ </nuxt-link>
          </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  async asyncData({ store }) {
    if (store.getters['items'].length) {
      return;
    }
    await store.dispatch('fetchItems');
  },
  computed: {
    ...mapGetters(['items'])
  }
};
</script>

<style>
.container {
  min-height: 100vh;
  padding: 16px;
}
h3 {
  margin: 16px 0;
  padding: 8px 0;
  border-bottom: solid 1px #e5e5e5;
}
li + li {
  margin: 16px 0;
}
p {
  margin: 8px 0;
}
</style>

