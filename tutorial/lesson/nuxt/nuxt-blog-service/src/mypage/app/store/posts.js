import moment from '~/plugins/moment'

export const state = () => ({
  posts: []
})

export const getters = {
  posts: state => state.posts.map(post => Object.assign({ likes: [] }, post))
}

export const mutations = {
  addPost(state, { post }) {
    state.posts.push(post)
  },
  updatePost(state, { post }) {
    state.posts = state.posts.map(p => (p.id === post.id ? post : p))
  },
  clearPosts(state) {
    state.posts = []
  }
}

export const actions = {
  async fetchPost({ commit }, { id }) {
    const post = await this.$axios.$get(`/mypages/posts/${id}.json`)
    commit('addPost', { post: { ...post, id } })
  },
  async fetchPosts({ commit }) {
    const posts = await this.$axios.$get(`/mypages/posts.json`)
    commit('clearPosts')
    if(posts === null){
      return;
    }
    Object.entries(posts)
      .reverse()
      .forEach(([id, content]) =>
        commit('addPost', {
          post: {
            id,
            ...content
          }
        })
      )
  },
  async publishPost({ commit }, { payload }) {
    const user = await this.$axios.$get(
      `/mypages/users/${payload.user.id}.json`
    )
    // firebaseが割り宛てたランダムな英字の投稿データIDを取得する
    const post_id = (await this.$axios.$post('/mypages/posts.json', payload))
      .name
    const created_at = moment().format()
    const post = { id: post_id, ...payload, created_at }
    const putData = { id: post_id, ...payload, created_at }
    // 以下のdeleteを忘れると、userの下の投稿の下にさらにuserができることとなる。
    delete putData.user
    await this.$axios.$put(`/mypages/users/${user.id}/posts.json`, [
      ...(user.posts || []),
      putData
    ])
    // idとcreated_atを持たせたデータで再度更新
    await this.$axios.$put(`/mypages/posts/${post.id}.json`, post)
    commit('addPost', { post })
  },
  async addLikeToPost({ commit }, { user, post }) {
    post.likes.push({
      created_at: moment().format(),
      user_id: user.id,
      post_id: post.id
    })
    const newPost = await this.$axios.$put(
      `/mypages/posts/${post.id}.json`,
      post
    )
    commit('updatePost', { post: newPost })
  },
  async removeLikeToPost({ commit }, { user, post }) {
    post.likes = post.likes.filter(like => like.user_id !== user.id) || []
    const newPost = await this.$axios.$put(
      `/mypages/posts/${post.id}.json`,
      post
    )
    commit('updatePost', { post: newPost })
  }
}
