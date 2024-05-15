<template>
    <div>

        <div v-for="post in posts" :key="post.id">
        <SinglePost :post="post" @delete="handleDelete" />
        </div>
      
    </div>
  </template>
  
  <script>
  import { ref, watch } from 'vue';
  import { projectFirestore } from '../Firebase/Config'; // Import your Firestore configuration
  import SinglePost from '@/components/SinglePost.vue'
  export default {
    name: 'TagCloud',
    components: { SinglePost },
    props: ['tag'],
    handleDelete(id) {
      // Remove post with the given id from the posts array
      this.posts = this.posts.filter(post => {
        return post.id !== id
      })},
    setup(props) {
      const posts = ref([]);
  
      // Fetch posts with the selected tag
      const fetchPosts = async () => {
        try {
          const snapshot = await projectFirestore.collection('posts').where('tags', 'array-contains', props.tag).get();
          posts.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
          console.error('Error fetching posts:', error.message);
        }
      };
  
      // Watch for changes in the selected tag and fetch posts accordingly
      watch(() => props.tag, fetchPosts, { immediate: true });
  
      return {
        posts
      };
    }
  };
  </script>
  
  <style scoped>
  /* Styles for your tag cloud */
  </style>