<template>
  <div class="container">
      <section id="sidebar">
         <sidebar>
               <ul>
                  <li @click="handleClick(index)" :class="[active[index] === true ? 'active' : '']" :key="index"  v-for="(cat,index) in categories">{{ cat }}</li>
               </ul>
         </sidebar>
      </section>
      <section class="container">
            <div class="search">

            </div>
            <div class="blog-grid">
                  <div class="post" v-for="post in filteredPosts">
                     <div class="box-img">
                        <img :src="`${host}${post.image}`"/>
                     </div>
                     <div class="box-content">
                        <span>{{ post.title }}</span>
                     </div>
                     <span class="created">{{  createdFormat(post.created) }}</span>
                  </div>
            </div>
      </section>
  </div>
</template>
<script setup>
import { onMounted,ref, computed } from "vue";
import { DeliveryApi } from "./api/DeliveryApi.js"

const paramKey = import.meta.env.VITE_APP_DELIVERY_API_PARAM_FETCH
const paramValue = import.meta.env.VITE_APP_DELIVERY_API_BLOGS_ID
const host = import.meta.env.VITE_APP_DELIVERY_API_BASE;
let blogs = ref([])
let categories = ref([])
let blogsLenght = 0
const active = ref()
const activeCat = ref("")

const handleClick = (index) => {
   active.value.fill(false,0,active.value.length)
   active.value[index] = true
   activeCat.value = categories.value[index]
}
const filteredPosts = computed(() => {
   return blogs.value.filter( (post) => post.category === activeCat.value || post.category === "any" || activeCat.value === "any")
})
const createdFormat = (date) => {
      const [dateBase,dateTime] = date.split("T")
      const [hours,rest] = dateTime.split(":")
      return `${dateBase}  ${hours}:${rest.split(":")[0]}`
}
onMounted(async () => {

   const delivery = DeliveryApi({})
   const result = await delivery.query({[paramKey]: paramValue});
   blogs.value = result.items
   .filter((post) => post.contentType === 'oBlogpost')
   .map((post) => {
    return {
        created: post.createDate,
        name: post.name,
        category: post.properties.oCategories || "any",
        description: post.oDescription,
        content: post.properties.oContent,
        image: post.properties.oPreviewImage[0].url,
        title: post.properties.oTitle,
        tags:  post.properties.oTags
   }})
   
   blogsLenght = blogs.length
   categories.value = [...new Set(blogs.value.map((item) => item?.category || "any"))]
   active.value = new Array(categories.value.length).fill(0,0,categories.value.length)
   active.value[0] = true
   activeCat.value = categories.value[0]
   console.log("blogs",blogs.value)

})

</script>
<style scoped>
.container{
   display: flex;
   height: 100%;
   width: 100%;
}
#sidebar{
   background-color: #ebebeb;
   height: 100%;
   padding: 10px 10px;
}
#sidebar ul {
   list-style-type: none;
   margin: 0;
   padding: 0;
   font-size: 18px;
   
}
#sidebar ul li {
   font-weight: 600;
   padding: 10px 20px;
   margin: 10px 0;
   background-color: #cecece;
   cursor: pointer;
   white-space: nowrap;
}
#sidebar ul li.active
{
   background-color: rgb(160, 160, 160);
   color:#fff;
}
#sidebar ul li:hover{
   background-color: rgb(160, 160, 160);
   color:#cecece
}
div.blog-grid{
   background-color: rgba(151, 144, 214, 0.952);
   height: 100%;
   width: 100%;
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   gap: 10px;
   grid-auto-rows: minmax(200px, 300px);
   padding: 10px;
}
.post{
   background-color: #f1efef;
   border-radius: 15px;
   box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
   position: relative;
}
.box-img{
   margin: 10px 10px;
   height: 60%;
   display: flex;
   justify-content: center;
   align-items: center;
}
.box-img img{
   object-position: center;
   object-fit: cover;
   width: 100%;
   height: 100%;
}
.post .box-content{
   width: 100%;
   padding: 10px;
   font-size: 13px;;
   color: #000000;
}
.post .box-content span{
   font-weight: 700;
}
.post .created{
   position: absolute;
   bottom: 5px;
   right: 10px;
}
</style>
