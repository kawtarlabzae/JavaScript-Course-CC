<template>
  <nav class="filter-nav">
    <button 
      v-for="tag in tags" 
      :key="tag"
      @click="updateFilter(tag)" 
      :class="{ active: current === tag}"
    >{{ tag }}</button>
  </nav>
</template>

<script>
export default {
  props: ['current', 'tags'],
  methods: {
    updateFilter(tag) {
      this.$emit('filterChange', tag)
    }
  }
}
</script>

<style>
.filter-nav button {
  background: none;
  border: none;
  color: #bbb;
  outline: none;
  font-size: 12px;
  text-transform: uppercase;
  margin-right: 10px;
  letter-spacing: 1px;
  font-weight: bold;
  cursor: pointer;
}
.filter-nav button.active {
  color: #555;
}
</style>
