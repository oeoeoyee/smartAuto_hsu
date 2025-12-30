<script setup>
const target = ref(null) // 無限滾動的目標元素
const observer = ref(null)
const isLoading = ref(false)
const isError = ref(false)
const page = ref(1) // 分頁
const dataList = ref([])
const fetchData = async () => {
  isError.value = false
  isLoading.value = true
  try {
    const data = await $fetch(`https://api.github.com/search/repositories?q=stars:>1000&sort=stars&order=desc&per_page=10&page=${page.value}`)
    // return data.items
    dataList.value.push(...data.items)
  }
  catch (error) {
    console.error('Error fetching data:', error)
    isError.value = true
  }
  finally {
    isLoading.value = false
  }
}

// TODO: 無限滾動功能，想用 IntersectionObserver'
// observerInstance在停止觀察時可以使用
const setObserver = () => {
  observer.value = new IntersectionObserver(async (entries) => {
    // 確認TARGET有進入範圍要動作
    if (entries[0].isIntersecting) {
      page.value++
      await fetchData()
    }
  })

  // 調用 observe() 以開始觀察
  if (target.value) {
    observer.value.observe(target.value)
  }
}

onMounted(async () => {
  await fetchData()
  setObserver()
})

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect()
  }
})
</script>

<template>
  <div>
    <div class="infinite-scroll-header">
      <h1>無限滾動功能實作</h1>
      <p>每頁 10 筆，至少 30 筆資料</p>
    </div>
    <div class="infinite-scroll-container">
      <div
        v-for="item in dataList"
        :key="item.id"
        class="infinite-scroll-item"
      >
        <a
          class="item-title"
          :href="item.html_url"
          target="_blank"
        >{{ item.name }}</a>
        <span class="item-description">{{ item.description }}</span>
      </div>
      <!-- 用於觸發無限滾動的目標元素 -->
      <div
        ref="target"
        class="infinite-scroll-target"
      />
      <div
        v-if="isLoading"
        class="infinite-scroll-loading"
      >
        <p>Loading...</p>
      </div>
      <div
        v-if="isError"
        class="infinite-scroll-error"
      >
        <p>載入資料失敗，請稍後 1 分鐘再試</p>
        <button @click="fetchData">
          請點按以重試
        </button>
      </div>
    </div>
    <div class="source">
      資料來源：<a
        target="_blank"
        href="https://api.github.com/search/repositories?sort=stars&order=desc&per_page=10&page=1"
      >GitHub API</a>
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
  max-height: 650px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #aaaaaa #ffffff;
}
.infinite-scroll-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-bottom: 1px solid #dbdbdb;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.infinite-scroll-loading {
  text-align: center;
  padding: 1rem;
  color: #666;
}
.infinite-scroll-error {
  text-align: center;
  padding: 1rem;
  color: rgb(180, 0, 0);
  font-weight: bold;
}
.infinite-scroll-error button {
  background-color: #5894d8;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}
.source {
  text-align: center;
  padding: 20px;
  color: #586069;
  font-size: 14px;
}
.source a {
  color: #3a3a3a;
  text-decoration: none;
}
</style>
