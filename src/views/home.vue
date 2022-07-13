<template>
        <div v-if="loading" class="preloader">
    <div class="preloader__image">
    </div></div>
  <div  id="headerwrap">
    <div class="container">
      <div class="row">
        <div data-aos="fade-in" data-aos-delay="300" class="col-lg-8 col-lg-offset-2">
          <h3>Все потрібне в одному місці</h3>
          <h1>Hiker</h1>
          <h5>Дізнайся. Мандруй. Розкажи</h5>
        </div>

      </div>
    </div>
  </div>

  <div data-aos="flip-up"  data-aos-delay="300" id="service">
    <div class="container">
      <div class="row centered">
        <div class="col-md-4">
          <i class="fa fa-lightbulb-o"></i>
          <h4>Дізнайся</h4>
          <p>Прочитайте статті інших користувачів про цікаві для Вас країни.</p>
          <p><br/><button @click="goTo('blog',{})" href="#" class="btn btn-theme">Дізнатися більше</button></p>
        </div>
        <div class="col-md-4">
          <i class="fa fa-map-marker"></i>
          <h4>Мандруй</h4>
          <p>Прямо на нашму сайті купіть білети для своєї мандрівки</p>
          <p><br/><button @click="goTo('tickets',{slug:'none'})" href="#" class="btn btn-theme">Дізнатися більше</button></p>
        </div>
        <div class="col-md-4">
<i class="fa fa-pencil"></i>
          <h4>Розкажи</h4>
          <p>Поділись своїми мандрами з іншими, створивши карту подорожі</p>
          <p><br/><button @click="goTo('panel',null)" href="#" class="btn btn-theme">Дізнатися більше</button></p>
        </div>
      </div>
    </div>
  </div>

  <div v-if="popular[0]" id="portfoliowrap">
    <h3>Популярне</h3>
    <div class="portfolio-centered">
      <div class="recentitems portfolio">
        <div  v-for="post in popular" :key="post.id"  class="portfolio-item graphic-design">
          <div class="he-wrap tpl6">
            <div class="he-view">
              <div  class="bg a0">
                <div data-aos="fade-in" data-aos-delay="300">
                <h3 class="a1" data-animate="fadeInDown">{{post.title}}</h3>
                <img style="max-height: 25vh" :src="post.img" alt="">
                <a data-rel="prettyPhoto" href="" @click.prevent="goTo('post',{slug:post.slug})" class="dmbutton a2" data-animate="fadeInUp">
                  <div style="font-weight: bold">Перейти</div>
                  <div> <font-awesome-icon :icon="['far', 'clock']" />  {{post.date }}
                    <font-awesome-icon :icon="['far', 'user']" />{{post.author}}
                    <font-awesome-icon :icon="['far', 'comment']" />{{post.comments.length}}
                    <font-awesome-icon :icon="['far', 'heart']" />{{post.likes.length}}
                    <font-awesome-icon :icon="['far', 'eye']" />{{post.views}}</div></a>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="twrap">
    <div class="container centered">
      <div class="row">
        <div data-aos="zoom-in" data-aos-delay="300" class="col-lg-8 col-lg-offset-2">
          <h3>Пошук білетів</h3>
          <div class="hline"></div>
          <h4>Звідки</h4>
            <div class="form-group">
              <div class="form-group">
                   <Multiselect :close-on-select="true" :searchable="true" v-model="orl" :options="op" >       <template v-slot:tag="{ option, handleTagRemove, disabled }">
                        <div class="multiselect-tag is-user">
                            {{ option.value }}
                            <i v-if="!disabled" @click.prevent @mousedown.prevent.stop="handleTagRemove(option, $event)"></i>
                        </div>
                    </template>
                    </Multiselect></div>
</div>
    <h4>Куди</h4>
            <div class="form-group">
                   <Multiselect :close-on-select="true" :searchable="true" v-model="del" :options="op" >       <template v-slot:tag="{ option, handleTagRemove, disabled }">
                        <div class="multiselect-tag is-user">
                            {{ option.value }}
                            <i v-if="!disabled" @click.prevent @mousedown.prevent.stop="handleTagRemove(option, $event)"></i>
                        </div>
                    </template>
                    </Multiselect></div>
        <h4>Коли</h4>


                <v-date-picker mode="dateTime" :is24hr="true" :timezone="timezone" :minute-increment="5"  :model-config="modelConfig"  class="btn" v-model="forward"  > <template v-slot="{ inputValue, togglePopover }">
      <div class="form-group">
        <button
          @click="togglePopover()"
                    class="form-control "

        >
          <font-awesome-icon :icon="['far', 'calendar-alt']" />

        </button>
        <input
          :value="inputValue"
                    class="form-control "

          readonly
        />
      </div>
    </template></v-date-picker>
    <h4>Назад(Не обовязково)</h4>


                <v-date-picker mode="dateTime" :is24hr="true" :timezone="timezone"  :minute-increment="5" :model-config="modelConfig"  class="btn " v-model="back" ><template v-slot="{ inputValue, togglePopover }">
      <div class="form-group">
        <button
          @click="togglePopover()"
          class="form-control "
        >
          <font-awesome-icon :icon="['far', 'calendar-alt']" />
        </button>
        <input
          :value="inputValue"
          readonly
          class="form-control"
        />
      </div>
    </template></v-date-picker>
          <h4>Пасажири</h4>
          <div class="btn btn-theme">Дорослі
              <vue-number-input class="form-control" v-model="adult" :min="1" :max="9-teen"  controls></vue-number-input>
</div>
          <div class="btn btn-theme" >Діти
              <vue-number-input class="form-control" v-model="teen" :min="0" :max="9-adult"  controls></vue-number-input></div>
              <div class="btn btn-theme" >Немовля
              <vue-number-input class="form-control" v-model="baby" :min="0" :max="adult"  controls></vue-number-input>
</div>
                   <h4>Клас</h4>
          <div class="btn btn-theme">Эконом <input type="radio" v-model="trip_class " name="popular" value="E"/></div>
          <div class="btn btn-theme">Преміум-эконом <input type="radio" v-model="trip_class " name="popular" value="PE"/></div>
          <div class="btn btn-theme" >Бізнес <input type="radio" name="popular"  v-model="trip_class " value="B"/></div>
          <div class="btn btn-theme" >Перший <input type="radio" name="popular"  v-model="trip_class " value="F"/></div>
          <div><button @click.prevent="searchTickets"  class="btn btn-block btn-success">Знайти білети</button></div>
          <div class="hline"></div>
        </div>

      </div>
    </div>
  </div>

  <div id="cwrap">
    <div class="container">
      <div class="row centered">
        <h3>Топ авторів</h3>
        <div data-aos="zoom-in" data-aos-delay="300"  v-for="author in popular_authors" :key="author.id" class="col-lg-3 col-md-3 co l-sm-3" @click.prevent="goTo('profile',{slug:author.slug})">
          <img v-if="author.profile_img" :src="author.profile_img" style="border-radius: 100px;" alt="Admin" class="rounded-circle" width="150">
          <img v-else src="https://secure.gravatar.com/avatar/c9877cc06c704dbe1dd3d4f305cb22d6?s=650&d=mm&r=g" style="border-radius: 100px;" alt="Admin" class="rounded-circle" width="150">
          <div class="btn btn-theme" >{{author.username}} <br/>Бали:{{author.points}}<br/>Підписники:{{author.followers.length}}</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import axios from "axios";
    import Pagination from "../components/Pagination";
    import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
  import Multiselect from "@vueform/multiselect";
import VueNumberInput from '@chenfengyuan/vue-number-input';
  import f from "./airport.csv"
  import md from "./flightsearch.md"
  import {useToast} from "vue-toastification";

  export default {
    name: 'home',
    components:{Pagination,'font-awesome-icon': FontAwesomeIcon,Multiselect,VueNumberInput,},

    data: () => ({
      popular: [],
      popular_authors: [],
      followers_count:null,
      cur_user:{},
        adult:1,
        teen:0,
        baby:0,
        forward:"",
        back:"",
      trip_class :'',
        timezone:"UTC",
              modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD hh:mm:ss',
                        timeAdjust: '24:00:00',

      },
      orl:"",
      del:"",
        op:{},
        arar:{},
                    toast : useToast(),
                  loading:false,



    }),
    created() {
      this.loadPopularPosts()
      this.loadPopularAuthors()
      this.cur_user = this.$store.state.cuser

        var data_airports = this.loadCsv(f);
      this.arar, this.op = data_airports

    },
    methods: {
    loadCsv(allText){
        var mdd=md.join("")

var ops = []
    for (var i=1; i<allText.length; i++) {
        if(mdd.includes(allText[i][0])){
            var st ="";
            for (var j=0; j<allText[i].length-2; j++) {
                st+=allText[i][j]+" "
            }
            allText[i].push(st);
            ops.push(st)
    }}
    return allText, ops
    },
      async loadPopularPosts() {
        axios({url:  this.$store.state.backendUrl+`api/v1/blog?limit=5&search=&date=month&ordering=descending`, method: 'GET',headers: {'Content-type': 'application/json',}}).then(response => {this.popular  = response.data.results})
      },
      async loadPopularAuthors() {
        axios({url:  this.$store.state.backendUrl+`api/v1/popular_authors`, method: 'GET',headers: {'Content-type': 'application/json',}}).then(response => {this.popular_authors  = response.data
        })
      },
      goTo(name,params) {
        let r = this.$router.resolve({
          name: name,params: params// put your route information in
        })
        window.location.assign(r.href)
      },
      async searchTickets(){
        var data= "grant_type=client_credentials&client_id=JuRerxA5g2sFoOvNZDgKnQeHkfw72NXo&client_secret=oziTz6ma2cghwzwl"
        var token;
var access = localStorage.getItem('access')
if (access) {
delete axios.defaults.headers.common["Authorization"];
    }
    this.loading = true
        await axios({url: 'https://test.api.amadeus.com/v1/security/oauth2/token', data: data, method: 'POST', headers:{"Content-type":"application/x-www-form-urlencoded"} }).then(response => {console.log(response), token = response.data.token_type+" "+response.data.access_token
})
        this.orl = this.orl.slice(0,3)
       this.del= this.del.slice(0,3)
          var date = this.forward.toString().slice(10)
                    var data1 = {"id":1,
                            "originLocationCode":this.orl,
                            "destinationLocationCode":this.del,
                            "departureDateTimeRange": {
                                "date": this.forward.slice(0,10),
                                "time": this.forward.slice(11)
                              }}

                    var data2 = {"id":2,
                            "originLocationCode":this.del,
                            "destinationLocationCode":this.orl,
                            "departureDateTimeRange": {
                                "date": this.back.slice(0,10),
                                "time": this.back.slice(11)
                              }}
var travelers =[]
                    var c =0;
                    for(var i =0;i<this.adult;i++){
                        c++;
                        travelers.push({"id":c,"travelerType": "ADULT"})
                    }
                    for(var i =0;i<this.teen;i++){
                        c++;
                        travelers.push({"id":c,"travelerType": "CHILD"})
                    }
                    for(var i =0;i<this.baby;i++){
                        c++;
                        if(i<this.adult) {
                            travelers.push({"id": c, "travelerType": "HELD_INFANT", "associatedAdultId": i+1})
                        }

                    }
var cabin= ""
if(this.trip_class === "E"){
    cabin= "ECONOMY"
}
else if(this.trip_class ==="PE"){
        cabin= "PREMIUM_ECONOMY"

}
else if(this.trip_class ==="B"){
        cabin= "BUSINESS"

}
else if(this.trip_class ==="F"){
        cabin= "FIRST"

}
          var d = {
  "currencyCode": "USD",
  "originDestinations": [
    data1,
      data2,
  ],
  "travelers": travelers,
  "sources": [
    "GDS"
  ],
  "searchCriteria": {
    "maxFlightOffers": 20,
    "flightFilters": {
      "cabinRestrictions": [
        {
          "cabin": cabin,
          "coverage": "MOST_SEGMENTS",
          "originDestinationIds": [
            "1"
          ]
        }
      ],
      "carrierRestrictions": {
        "excludedCarrierCodes": [
          "AA",
          "TP",
          "AZ"
        ]
      }
    }
  }
}
var that = this
await axios({url: 'https://test.api.amadeus.com/v2/shopping/flight-offers',data:d,  method: 'POST' ,headers:{"Authorization":token}}).then(res=>{
    if(res.data.data[0]){
        data = res.data.data
    this.loading=false,
        this.$store.dispatch('tickets', { data })
         console.log(this.$store.state)
         ,this.goTo("tickets",)
    }
    else {
        that.toast.error("Немає білетів"),this.loading = false
    }
})
    .catch(err => {console.log(err), that.toast.error("Введіть валідні дання або спробйте пізніше"),this.loading = false})
        console.log(this.$store.state.tickets)

          access = localStorage.getItem('access')
if (access) {
  axios.defaults.headers.common['Authorization'] = "JWT " + access
    }
                    },
        async SearchAirport(loc){
                  var data= "grant_type=client_credentials&client_id=JuRerxA5g2sFoOvNZDgKnQeHkfw72NXo&client_secret=oziTz6ma2cghwzwl"
        var token;
var access = localStorage.getItem('access')
if (access) {
delete axios.defaults.headers.common["Authorization"];
    }
        await axios({url: 'https://test.api.amadeus.com/v1/security/oauth2/token', data: data, method: 'POST', headers:{"Content-type":"application/x-www-form-urlencoded"} }).then(response => {console.log(response), token = response.data.token_type+" "+response.data.access_token
})
                if(loc === "origin"){
                    await axios({url: 'https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword='+this.orl,  method: 'GET' ,headers:{"Authorization":token}}).then(res=>console.log(res))
                }
                else if(loc==="destination"){
                    await axios({url: 'https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword='+this.del,  method: 'GET' ,headers:{"Authorization":token}}).then(res=>console.log(res))						.catch(err => {console.log(err), that.toast.error("Введите валидные данные или попробуйте позже")})

                }
                          access = localStorage.getItem('access')
if (access) {
  axios.defaults.headers.common['Authorization'] = "JWT " + access
    }
        },

    }

  ,}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>

<style  scoped>
    #upload_pr {
   opacity: 0;
   position: absolute;
   z-index: -1;
}
.btn{
  margin: 1%;
}
  .preloader {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background: #fff;
    z-index: 1001;
  }

  .preloader__image {
    position: relative;
    top: 50%;
    left: 50%;
    width: 64px;
    height: 64px;
    margin-top: -32px;
    margin-left: -32px;
    background: url('../assets/Walk.gif') no-repeat 50% 50%;
    /*расположение (url) изображения gif и др. параметры*/
  }

  .loaded_hiding .preloader {
    transition: 0.3s opacity;
    opacity: 0;
  }

  .loaded .preloader {
    opacity: 50%;
  }
</style>єхїж