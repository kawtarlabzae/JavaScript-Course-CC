<template>
  <div>
    <h2>Add a New Post</h2>
    <form @submit.prevent="submitPost">
      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="post.title" required>
      </div>
      <div class="form-group">
        <label for="tags">Tags (comma separated):</label>
        <input type="text" id="tags" v-model="tagInput">
      </div>
      <div class="form-group">
        <label for="article">Article:</label>
        <textarea id="article" v-model="post.article" rows="6" required></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { projectFirestore } from '../Firebase/Config';

export default {
  data() {
    return {
      post: {
        title: '',
        tags: [],
        article: '',
      },
      tagInput: '',
    };
  },
  methods: {
    async submitPost() {
      // Splitting the comma-separated tags and trimming extra spaces
      this.post.tags = this.tagInput.split(',').map(tag => tag.trim());

      try {
        // Add the post data to Firestore (replace 'articles' with your collection name)
        const docRef = await projectFirestore.collection('posts').add(this.post);
        console.log("Post added successfully with ID: ", docRef.id);

        // Redirect to the home page or any other page after successful submission
        this.$router.push('/');
      } catch (error) {
        console.error("Error adding post to Firestore: ", error);
        // Handle error here, show error message to the user, etc.
      } finally {
        // Reset the form fields regardless of success or failure
        this.post.title = '';
        this.tagInput = '';
        this.post.article = '';
      }
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
.form-group {
  margin-bottom: 1rem;
}
</style>
