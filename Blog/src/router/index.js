import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddPost from '@/views/AddPost.vue'
import EditPost from '@/views/EditPost.vue'
import PostDetails from '@/views/PostDetails.vue'
import TagCloud from '@/views/TagCloud.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/add',
    name: 'AddPost',
    component: AddPost
  },
  {
    path: '/posts/:id',
    name: 'EditPost',
    component: EditPost,
    props: true
  },
  {
    path: '/tags/:tag',
    name: 'TagCloud',
    component: TagCloud,
    props: true
  },
  {
    path: '/posts/:id',
    name: 'PostDetails',
    component: PostDetails,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
