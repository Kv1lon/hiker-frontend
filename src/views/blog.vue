<template>
<body>
  <div class="container mtb">
    <div class="row">
      <div class="col-lg-8">
        <div data-aos="zoom-in" data-aos-delay="300" v-for="post in listPosts" :key="post.id">
          <p ><img class="img-responsive" style="width: 100%" :src="post.img"></p>
          <h3 class="ctitle">{{post.title}}</h3>
          <p>
            <csmall> <font-awesome-icon :icon="['far', 'clock']" />  {{post.date }}</csmall> |
            <csmall2> <font-awesome-icon :icon="['far', 'user']" />{{post.author}}  <font-awesome-icon :icon="['far', 'comment']" />{{post.comments.length}}  <font-awesome-icon :icon="['far', 'heart']" />{{post.likes.length}} <font-awesome-icon :icon="['far', 'eye']" />{{post.views}}</csmall2>
          </p>
          <p >{{post.description}}</p>
          <p><a @click.prevent="goTo(post.slug)" style="cursor: pointer">Дізнатися більше</a></p>
          <div class="hline"></div>
        </div>
                <div v-if="listPosts.length == 0 ">
              <div data-aos="zoom-in" data-aos-delay="300" >На жаль, по даному запиту немає статей  :(</div>
        </div>
      </div>

      <div data-aos="slide-right" data-aos-delay="300" class="col-lg-4">
        <h4>Пошук статей</h4>
        <div class="hline"></div>
        <form @submit.prevent="loadListPosts()">
          <aside class="single_sidebar_widget search_widget">
            <input v-model="search" type="text" class="form-control" placeholder="Найти...">
            <span class="input-group-btn">
              <button class="btn btn-default hidden" type="submit"><i class="lnr lnr-magnifier"></i></button>
            </span>
          </aside>
        </form>

        <aside v-if="$store.state.cuser.refresh" class="single_sidebar_widget author_widget">
          <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150">
          <h4>{{user.username}}</h4>
          <p>{{user.email}}</p>

          <div class="br"></div>
        </aside>

        <div class="spacing"></div>
        <div class="spacing"></div>

        <form @submit.prevent="loadListPosts()">
          <h3>Фільтр статей</h3>
          <div class="hline"></div>
          <h4>Теги </h4>
                    <label>Оберіть теги</label>
                    <Multiselect mode="tags" :searchable="true" v-model="s_tags" :options="opt_tags" ><template v-slot:tag="{ option, handleTagRemove, disabled }">
                        <div class="multiselect-tag is-user">
                            {{ option.value }}
                            <i v-if="!disabled" @click.prevent @mousedown.prevent.stop="handleTagRemove(option, $event)"></i>
                        </div>
                    </template>
                    </Multiselect>          <h4>Города</h4>
                   <Multiselect mode="tags" :searchable="true" v-model="s_cities" :options="opt_cities" >       <template v-slot:tag="{ option, handleTagRemove, disabled }">
                        <div class="multiselect-tag is-user">
                            {{ option.value }}
                            <i v-if="!disabled" @click.prevent @mousedown.prevent.stop="handleTagRemove(option, $event)"></i>
                        </div>
                    </template>
                    </Multiselect>          <h4>Страны</h4>
                             <Multiselect mode="tags" :searchable="true" v-model="s_countries" :options="opt_countries" ><template v-slot:tag="{ option, handleTagRemove, disabled }">
                        <div class="multiselect-tag is-user">
                            {{ option.value }}
                            <i v-if="!disabled" @click.prevent @mousedown.prevent.stop="handleTagRemove(option, $event)"></i>
                        </div>
                    </template>
                    </Multiselect>
          <h4>Період часу </h4>
          <ul v-for="btn in dates" >
            <div v-for="(value, name) in btn">
              <button v-if="date === name" class="btn btn-primary" @click="chooseDate(name)">За {{value}}</button>
              <button v-else class="btn btn-theme" @click="chooseDate(name)">За {{value}}</button>
            </div>
          </ul>
          <h4>По популярності:</h4>
          <div class="btn btn-theme">По спаданню <font-awesome-icon :icon="['far', 'arrow-alt-circle-down']" /> <input type="radio" v-model="pop_filter" name="popular" value="descending"/></div>
          <div class="btn btn-theme" >По зростанню <font-awesome-icon :icon="['far', 'arrow-alt-circle-up']" /> <input type="radio" name="popular"  v-model="pop_filter" value="ascending"/></div>
          <button type="submit" class="btn btn-theme">Фільтрувати</button>
          <div class="hline"></div>
        </form>
        <h4>Популярні пости</h4>
        <ul class="popular-posts">
          <li data-aos="zoom-in" class="popular-post" v-for="post_p in popular" :key="post_p.id" @click.prevent = 'goTo(post_p.slug)'><img style="height: 8vh" :src="post_p.img" />
            <p><a href="">{{post_p.title}}</a></p>
            <em> <font-awesome-icon :icon="['far', 'clock']" />  {{post_p.date}}
             <div><font-awesome-icon :icon="['far', 'user']" />{{post_p.author}}</div><font-awesome-icon :icon="['far', 'comment']" />{{post_p.comments.length}} <font-awesome-icon :icon="['far', 'heart']" />{{post_p.likes.length}} <font-awesome-icon :icon="['far', 'eye']" />{{post_p.views}}</em>
          </li>
        </ul>

      </div>
    </div>
  </div>
  <Pagination :next="next" :prev="prev"   :searchq="search" @page-changed="loadListPosts"/>
</body>
</template>



<script>
  import Pagination from "../components/Pagination";
  import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
  import axios from "axios";
  import Multiselect from "@vueform/multiselect";

  export default {
    name: 'Home',
    components:{Pagination,'font-awesome-icon': FontAwesomeIcon,Multiselect},
    data: () => ({
      listPosts: [],
      user:{},
      search:"",
      url:``,
      total:0,
      next:``,
      prev:``,
      tags:[],
      cities:[],
      countries:[],
              opt_tags:[],
        opt_cities:[],
        opt_countries:[],
        s_tags:[],
        s_cities:[],
        s_countries:[],
        r_tags:[],
        r_cities:[],
        r_countries:[],
      date:"",
      dates:[{year:'рік'},{month:'місяць'},{week:'недеіля'},{today:'сьогодні'}],
      popular:[],
      pop_filter:'',
    }),
    created() {
      this.loadListPosts()
      this.loadListTags()
      this.loadListCities()
      this.loadListCountries()
      this.loadPopularPosts()
      this.user = this.$store.state.cuser
    },

    methods: {
      async chooseDate(date){
        this.date = date
      },
      async loadListTags() {
        axios({url:  this.$store.state.backendUrl+`api/v1/tags?limit=100&search=`, method: 'GET',headers: {'Content-type': 'application/json',}}).then(response => {this.tags = response.data
                          for(var el in response.data){
                        this.opt_tags.push(response.data[el].name)
                    }})
      },

      async loadListCities() {
        axios({url:  this.$store.state.backendUrl+`api/v1/city?limit=100&search=`, method: 'GET',headers: {'Content-type': 'application/json',}}).then(response => {this.cities = response.data
                          for(var el in response.data){
                        this.opt_cities.push(response.data[el].title)
                    }})
      },

      async loadListCountries() {
        axios({url: this.$store.state.backendUrl+`api/v1/country?limit=100&search=`, method: 'GET',headers: {'Content-type': 'application/json',}}).then(response => {this.countries  = response.data
                          for(var el in response.data){
                        this.opt_countries.push(response.data[el].title)
                    }})
      },
      async loadListPosts(url) {

        let city = ''
        let country = ''
        let tags = ''
        this.r_cities = []
        this.r_tags= []
        this.r_countries = []

                for(var el in this.s_cities){
                    this.r_cities.push(this.cities.find(x=>x.title===this.s_cities[el]).slug)
                }
                for(var el in this.s_countries){
                    this.r_countries.push(this.countries.find(x=>x.title===this.s_countries[el]).slug)
                }
                for(var el in this.s_tags){
                    this.r_tags.push(this.tags.find(x=>x.name===this.s_tags[el]).slug)
                }

        for(var c in this.r_cities){
          city+='&city='+this.r_cities[c]

        }

        for(var co in this.r_countries){
          country+='&country='+ this.r_countries[co]
        }
        for(var t in this.r_tags){
          tags+='&tags='+this.r_tags[t]
        }
        let date = ''
        if(this.date){
          date ="&date="+ this.date}
        let popular = ''
        if(this.pop_filter){
          popular ="&ordering="+ this.pop_filter}
                if(!url){
        url =  this.$store.state.backendUrl+`api/v1/blog?limit=6&search=${this.search}${city}${country}${tags}${popular}${date}`
        }
        axios({url: url, method: 'GET',headers: {'Content-type': 'application/json',}}).then(response => {this.listPosts  = response.data.results,this.total = response.data.count,this.prev = response.data.previous,this.next = response.data.next})
      },
      async loadPopularPosts() {
        axios({url:  this.$store.state.backendUrl+`api/v1/blog?limit=3&search=&date=month&ordering=descending`, method: 'GET',headers: {'Content-type': 'application/json',}}).then(response => {this.popular  = response.data.results})
      },

      goTo(slug) {
        let r = this.$router.resolve({
          name: 'post',params: {slug: slug} // put your route information in
        })
        window.location.assign(r.href)
      },

    }}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>

<style scoped>
    .multiselect-tag.is-user {
        padding: 5px 8px;
        border-radius: 22px;
        background: #35495e;
        margin: 3px 3px 8px;
    }
    .multiselect-tag.is-user i:before {
        color: #ffffff;
        border-radius: 50%;;
    }
</style>




