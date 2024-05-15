<template>
  <div class="post">
    <h3>{{ post.title }}</h3>
    <div class="actions">
      <router-link :to="{ name: 'EditPost', params: { id: post.id } }" class="material-icons">edit</router-link>
      <span @click="deletePost" class="material-icons">delete</span>
    </div>
    <p class="article">{{ snippet }}</p>
    <div class="tags">
      <strong>Tags:</strong>
      <span class="tag" v-for="tag in post.tags" :key="tag">{{ tag }}</span>
    </div>
    <router-link :to="{ name: 'PostDetails', params: { id: post.id } }" class="details-link">Details</router-link>
  </div>
</template>

<script>
import { projectFirestore } from '../Firebase/Config'

export default {
  props: ['post'],
  computed: {
    snippet() {
      return this.post.article.substring(0,50);
    }
  },
  methods: {
    async deletePost() {
      const validate = confirm('Do you want to delete the post: ' + this.post.title)
      if (validate) {
        try {
          await projectFirestore.collection('posts').doc(this.post.id).delete()
          this.$emit('delete', this.post.id)
        } catch (err) {
          console.error(err.message)
        }
      }
    }
  }
};
</script>

<style scoped>
.post {
  margin: 20px auto;
  background: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h3 {
  margin-bottom: 10px;
  font-size: 24px;
  color: #333;
}

.actions {
  display: flex;
  justify-content: flex-end;
}

.material-icons {
  font-size: 20px;
  color: #777;
  cursor: pointer;
  margin-left: 10px;
}

.material-icons:hover {
  color: #555;
}

.article {
  margin-bottom: 15px;
  line-height: 1.5;
}

.tags {
  margin-top: 15px;
}

.tag {
  display: inline-block;
  margin-right: 10px;
  padding: 6px 12px;
  background: #eee;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  color: #777;
}

.details-link {
  display: inline-block;
  color: #0b6dff;
  text-decoration: none;
  font-weight: bold;
  margin-top: 10px;
}

.details-link:hover {
  text-decoration: underline;
}
</style>
