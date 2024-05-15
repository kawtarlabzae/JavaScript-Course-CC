<template>
  <form @submit.prevent="handleSubmit">
    <label for="jobTitle">Title:</label>
    <input type="text" v-model="postData.title" id="jobTitle" required>

    <label for="tags">Tags (comma separated):</label>
    <input type="text" v-model="tagInput" id="tags">

    <label for="article">Article:</label>
    <textarea v-model="postData.article" id="article" rows="4"></textarea>

    <button>Update Post</button>
  </form>
</template>

<script>
import { projectFirestore } from '../Firebase/Config'

export default {
  props: ['id'],
  data() {
    return {
      tagInput: '',
      postData: {
        title: "",
        tags: [],
        article: ""
      }
    };
  },
  async mounted() {
    try {
      let res = await projectFirestore.collection('posts').doc(this.id).get()
      if (!res.exists) {
        throw Error('That post does not exist')
      }
      const postData = { ...res.data(), id: res.id }
      this.postData = postData // Assign fetched data to postData
      this.tagInput = this.postData.tags.join(', '); // Populate tag input with existing tags
    } catch (err) {
      console.error(err.message)
    }
  },
  methods: {
    async handleSubmit() {
      // Split the comma-separated tags and trim extra spaces
      this.postData.tags = this.tagInput.split(',').map(tag => tag.trim())
      
      const postUpdate = {
        title: this.postData.title,
        tags: this.postData.tags,
        article: this.postData.article
      }
      
      try {
        await projectFirestore.collection('posts').doc(this.id).update(postUpdate)
        this.$router.push('/') // Redirect to home page after updating
      } catch (err) {
        console.error(err.message)
      }
    }
  }
};
</script>

<style>
/* Add your component-specific styles here */
form {
  max-width: 420px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input, textarea {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
button {
  background: #0b6dff;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
  cursor: pointer;
}
textarea {
  resize: vertical;
}
</style>

