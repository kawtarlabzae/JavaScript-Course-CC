<template>
  <div class="home">
    <div class="tags">
      <div v-for="tag in tags" :key="tag" class="tag" @click="handleTagClick(tag)">{{ tag }}</div>
    </div>
    <div v-for="post in posts" :key="post.id">
      <SinglePost :post="post" @delete="handleDelete" />
    </div>
  </div>
</template>

<script>
import { projectFirestore } from '../Firebase/Config.js'
import SinglePost from '@/components/SinglePost.vue'
import TagCloud from '@/views/TagCloud.vue'
export default {
  name: 'Home',
  components: { SinglePost },
  data() {
    return {
      posts: [], // Array to store posts
      tags: [], // Array to store unique tags
      selectedTag: null // Variable to store the selected tag
    };
  },
  async mounted() {
    // Fetch posts from Firestore or wherever you store them
    try {
      // Assuming projectFirestore is properly imported and set up
      let res = await projectFirestore.collection('posts').get()
      this.posts = res.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      })
      this.computeUniqueTags(); // Compute unique tags after fetching posts
    } catch (err) {
      console.error(err.message)
    }
  },
  methods: {
    handleDelete(id) {
      // Remove post with the given id from the posts array
      this.posts = this.posts.filter(post => {
        return post.id !== id
      })
      this.computeUniqueTags(); // Recompute unique tags after deleting post
    },
    computeUniqueTags() {
      // Compute unique tags from all posts
      let tags = [];
      this.posts.forEach(post => {
        tags = tags.concat(post.tags.filter(tag => !tags.includes(tag)));
      });
      this.tags = tags;
    },
    handleTagClick(tag) {
      // Update the selectedTag variable with the clicked tag
      this.selectedTag = tag;
      this.$router.push({ name: 'TagCloud', params: { tag: tag } });
    }
  }
}
</script>

<style scoped>
/* Add your component-specific styles here */
.tags {
  margin-bottom: 20px;
}
.tag {
  display: inline-block;
  margin-right: 5px;
  padding: 5px 10px;
  background-color: #eee;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  color: #777;
  cursor: pointer; /* Add cursor pointer to indicate clickability */
}
.tag:hover {
  background-color: #ccc; /* Add hover effect to indicate interaction */
}
</style>
