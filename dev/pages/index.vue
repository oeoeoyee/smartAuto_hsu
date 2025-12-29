<script setup>
const dataList = ref([])
const fetchData = async () => {
  // TODO: 分頁功能
  const response = await fetch('https://api.github.com/search/repositories?q=stars:>1000&sort=stars&order=desc&per_page=10&page=1')
  const data = await response.json()
  dataList.value = data
  console.log(dataList.value)
}

// TODO: 無限滾動功能，想用 IntersectionObserver

onMounted(async () => {
  await fetchData()
  console.log(dataList.value)
})
</script>

<template>
  <div>
    <div class="infinite-scroll-header">
      <h1>無限滾動功能實作</h1>
      <p>每頁 10 筆，總共 50 筆資料</p>
    </div>
    <div class="infinite-scroll-container">
      <div class="infinite-scroll-item" v-for="item in dataList.items" :key="item.id">
        <a class="item-title" :href="item.html_url" target="_blank">{{ item.name }}</a>
        <span class="item-description">{{ item.description }}</span>
      </div>
      <!-- TODO: loading效果和無限滾動 -->
    </div>
  </div>
</template>

<style scoped>
.infinite-scroll-header{
  text-align: center;
}
.infinite-scroll-header h1 {
  font-size: 2rem;
  font-weight: bold;
  color: #000;
  margin-bottom: 0;
}
.infinite-scroll-header p {
  font-size: 1rem;
  color: #666;
  margin-top: 0;
}
.infinite-scroll-container {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid #dbdbdb;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 80%;
  height: 100%;
}
.infinite-scroll-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.item-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #000;
  text-decoration: none;
}
.item-title:hover {
  text-decoration: underline;
}
.item-description {
  font-size: 1rem;
  color: #666;
}
</style>

