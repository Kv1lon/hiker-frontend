<template>
    <div v-if="loading" class="preloader">
    <div class="preloader__image">
    </div>
</div>
    <div class="page-content">
        <div data-aos="flip-up" data-aos-delay="100"  data-aos-duration="1000" class="form-v5-content">
            <form class="form-detail" @submit.prevent="register">
                <h2>Реєстрація</h2>
                <div class="form-row">
                    <label for="full-name">Імя користувача</label>
                    <input type="text" v-model="username" name="full-name" id="full-name" class="input-text" placeholder="Імя користувача" required>
                </div>
                <div class="form-row">
                    <label for="your-email">Пошта</label>
                    <input readonly    onfocus="this.removeAttribute('readonly')" type="email" v-model="email" name="your-email" id="your-email" class="input-text" placeholder="Email" required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}">
                    <div v-if="msg.email" style="color: #d58512;font-weight: bold">{{msg.email}}</div>
                </div>
                <div class="form-row">
                    <label for="bio">Коротко про собе</label>
                    <input type="text"  v-model="bio" name="bio" id="bio" class="input-text" placeholder="Біо" required>
                </div>
                <div class="form-row">
                    <label for="password">Місто</label>
                    <div class="input-text">
                        <Multiselect  :searchable="true" v-model="city" :options="opt_cities" ></Multiselect>
                    </div>
                </div>
                <div class="form-row">
                    <label for="password">Який відпочинок Ви любите?</label>
                    <div class="input-text">
                        <Multiselect  :searchable="true" v-model="region" :options="opt_regions" ></Multiselect>
                    </div>
                </div>
                <div class="form-row">
                    <label for="password">Пароль</label>
                    <input type="password" readonly    onfocus="this.removeAttribute('readonly')"  v-model="password" name="password" id="password" class="input-text" placeholder="Пароль" required>
                    <div v-if="msg.password" style="color: #d58512;font-weight: bold">{{msg.password}}</div>
                </div>
                <div class="form-row-last">
                    <input v-if="msg['email'] || msg['password']||!password||!email||!username||!city||!region" disabled type="submit" name="register" class="register btn btn-block" value="Реєстрація">
                    <input v-else type="submit" name="register" class="register btn btn-block" value="Реєстрація">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import Multiselect from "@vueform/multiselect";
    import {useToast} from "vue-toastification";

    export default {
        name: "registration",
        components:{Multiselect},
        data: () => ({
            user: {},
            username:'',
            password:'',
            email:'',
            bio:'',
            city:'',
            cities:[],
            opt_cities:[],
            region:'',
            regions:[],
            opt_regions:[],
            msg:[],
            loading:false,
            toast : useToast()

        }),
        created() {
        this.loadListCountries()
        this.loadListRegions()
        },
        watch: {
      email(value){
        // binding this to the data value in the email input
        this.email = value;
        this.validateEmail(value);
      },
          password(value){
      this.password = value;
      this.validatePassword(value);
    }
    },
        methods: {
            register: function () {
                const formData = new FormData();
                if(this.city){
                var city = this.cities.find(x=>x.title===this.city).slug
                                formData.append("city", city);}

                if(this.region){
                var region = this.regions.find(x=>x.title===this.region).slug
                                formData.append("region", region);

                }
                formData.append("username", this.username);
                formData.append("email", this.email);
                formData.append("password", this.password);
                formData.append("bio", this.bio);
                this.loading = true
                this.$store.dispatch('register', formData)
                    .then(() => {
                      this.loading = false
                      this.toast.success('На Вашу пошту був відправлен лист з підтвердженням')
                      this.$router.push('/')
                    })
                    .catch(err => {                      this.loading = false, console.log(err), this.toast.error('Схоже відбулась помилка, можливо користувач з таким імям вже існує ('+err+')')})},


            async loadListCountries() {
                axios({url: this.$store.state.backendUrl+`api/v1/city?limit=100&search=`, method: 'GET',headers: {'Content-type': 'application/json',}}).then(response => {this.cities  = response.data
                    for(var el in response.data){
                        this.opt_cities.push(response.data[el].title)
                    }
                })
            },
            async loadListRegions() {
                axios({url: this.$store.state.backendUrl+`api/v1/regions`, method: 'GET',headers: {'Content-type': 'application/json',}}).then(response => {this.regions  = response.data
                    for(var el in response.data){
                        this.opt_regions.push(response.data[el].title)
                    }
                })
            },
             async loadPopularPosts() {
        axios({url: this.$store.state.backendUrl+`api/v1/blog?limit=3&search=&date=month&popular=descending`, method: 'GET',headers: {'Content-type': 'application/json',}}).then(response => {this.popular  = response.data.results})
      },
validateEmail(value){
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
  {
    this.msg['email'] = '';
  } else{
    this.msg['email'] = 'Це не схоже на email';
  }
    },
      validatePassword(value){
        let difference = 8 - value.length;
        if (value.length<8) {
          this.msg['password'] = 'Повинно бути 8 символів! '+ difference + ' залишилось символів' ;
        } else {
          this.msg['password'] = '';
        }},
        }
    }
</script>
<style src="@vueform/multiselect/themes/default.css"></style>

<style scoped>
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
</style>