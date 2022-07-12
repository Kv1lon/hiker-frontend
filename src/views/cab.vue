<template>
  <div class="b">
    <table  class="table table-dark"><thead><tr>
      <th scope="col">Id</th>
      <th scope="col">Дата створення</th>
      <th scope="col">Назва</th>
      <th scope="col">Автор</th>
      <th scope="col">Змінити</th>
      <th scope="col">Видалити</th>
    </tr>
    </thead>


      <tbody>
      <tr data-aos="fade-in" data-aos-delay="300" v-for="post in listPosts">
        <th scope="row">{{post.id}}</th>
        <td>{{post.date}}</td>
        <td>{{post.title}}</td>
        <td>{{post.author}}</td>
        <td><a><button @click.prevent="goTo(post.slug)" class=" btn btn-dark">Змінити</button></a></td>

        <td><a><button @click.prevent="delete_p(post.slug)" class=" btn btn-dark" >Видалити</button></a></td>
      </tr>

      </tbody>


</table>
           <div class="no_a" data-aos="fade-in" data-aos-delay="300" v-if="listPosts.length === 0">
У Вас ще немає статей
      </div>
    <Pagination :next="next" :prev="prev" :searchq="search"  @page-changed="loadListPosts"/>
</div>
</template>

<script>
  import axios from "axios";
    import Pagination from "../components/Pagination";
  export default {
    name: "panel",
    props:['slug'],
    components:{Pagination},
    data: () => ({
      listPosts:[],
      next:``,
      prev:``,
      url:``,
      search:"",
    }),created() {
      this.url = `${this.$store.getters.getServerUrl}api/v1/cabinet/${this.$store.state.cuser.slug}?limit=10&search=`, this.loadListPosts(this.url)
    },
    methods: {
      async loadListPosts(url) {
        axios({url: url, method: 'GET',headers: {'Content-type': 'application/json',}}).then(response => {this.listPosts  = response.data.results,this.total = response.data.count,this.prev = response.data.previous,this.next = response.data.next})
        console.log(this.listPosts)
      },
      goTo(slug) {
        this.$router.push({ name: 'panel_change', params: {slug: slug}})
      },
      delete_p(slug_p){
        axios({url:  this.$store.state.backendUrl+`api/v1/delete/${slug_p}`, method: 'DELETE',}).then(resp =>{console.log(resp)} ).then(() => this.$router.go())
      },
    },}
</script>

<style scoped>
.no_a{
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: space-around;
}
.b{margin-bottom: 30%;
}
</style>

