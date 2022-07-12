<template>
  <div class="b">
    <table  class="table table-dark"><thead><tr>
      <th scope="col">Id</th>
      <th scope="col">Дата створення</th>
      <th scope="col">Назва</th>
      <th scope="col">Користувач</th>
      <th scope="col">Детальніше</th>
      <th scope="col">Видалити</th>
    </tr>
    </thead>


      <tbody>
      <tr data-aos="fade-in" data-aos-delay="300" v-for="ticket in listTickets">
        <th scope="row">{{ticket.id}}</th>
        <td>{{ticket.date}}</td>
        <td>{{ticket.text_id}}</td>
        <td>{{ticket.user}}</td>
        <td><a><button @click.prevent="goTo(ticket.slug)" class=" btn btn-dark">Детальніше</button></a></td>

        <td><a><button @click.prevent="delete_p(ticket.slug)" class=" btn btn-dark" >Видалити</button></a></td>
      </tr>

      </tbody>


</table>
           <div class="no_a" data-aos="fade-in" data-aos-delay="300" v-if="listTickets.length === 0">
У Вас ще немає білетів
      </div>
    <Pagination :next="next" :prev="prev" :searchq="search"  @page-changed="loadListTickets"/>
</div>
</template>

<script>
  import axios from "axios";
    import Pagination from "../components/Pagination";
  export default {
    name: "tickets_cab",
    props:['slug'],
    components:{Pagination},
    data: () => ({
      listTickets:[],
      next:``,
      prev:``,
      url:``,
      search:"",
    }),created() {
      this.url = `${this.$store.getters.getServerUrl}api/v1/list_tickets/${this.$store.state.cuser.slug}?limit=10`, this.loadListTickets(this.url)
    },
    methods: {
      async loadListTickets(url) {
        axios({url: url, method: 'GET',headers: {'Content-type': 'application/json',}}).then(response => {this.listTickets  = response.data.results,this.total = response.data.count,this.prev = response.data.previous,this.next = response.data.next})
        console.log(this.listTickets)
      },
      goTo(slug) {
        this.$router.push({ name: 'tickets_cab_single', params: {slug: slug}})
      },
      delete_p(slug_p){
        axios({url: this.$store.state.backendUrl+`api/v1/delete_ticket/${slug_p}`, method: 'DELETE',}).then(resp =>{console.log(resp)} ).then(() => this.$router.go())
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

