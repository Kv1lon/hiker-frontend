<template>
<div  :style="{'background-image': 'url(' + region.background_img + ')',backgroundSize:'100%',}">
  <div  data-aos="fade-in"  data-aos-delay="300" class="container">
    <div class="main-body">
      <div class="row gutters-sm">
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <img v-if="user.profile_img" :src="user.profile_img" style="border-radius: 100px;" alt="Admin" class="rounded-circle" width="150">
                <img v-else src="https://secure.gravatar.com/avatar/c9877cc06c704dbe1dd3d4f305cb22d6?s=650&d=mm&r=g" style="border-radius: 100px;" alt="Admin" class="rounded-circle" width="150">

                <div class="mt-3">
                  <h4 class="profile_text">{{user.username}}</h4>
                  <p v-if="user.bio" class="text-secondary mb-1 profile_text"  v-html="user.bio "></p>
                  <p v-if="city" class="text-muted font-size-sm profile_text">{{city.title}}</p>
                  <div v-if="user.username !== cur_user.username && cur_user.username">
                    <button v-if="sub_status === 'unfollow'" class="btn btn-primary" @click="Follow">Підписатися</button>
                    <button v-if="sub_status === 'follow'" class="btn btn-primary" @click="Unfollow">Відписатися</button>
                  </div>
                  <button v-else-if="cur_user.username" @click.prevent="goTo(user.slug)" class="btn btn-primary">Змінити профіль</button>
                  <p class="text-muted profile_text">
                    Підписників:{{followers_count}}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card mb-3">
            <div class="card-body">
              <div v-if="user.first_name" class="row profile_text">
                <div class="col-sm-3 ">
                  <h6  lass="mb-0">Імя</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{user.first_name}}
                    </div>
              </div>
              <hr  v-if="user.first_name" >
              <div class="row profile_text">
                <div class="col-sm-3">
                  <h6 class="mb-0">Email</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{user.email}}
                    </div>
              </div>
              <hr>
              <div class="row profile_text">
                <div class="col-sm-3">
                  <h6 class="mb-0">Дата реєстрації</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{user.date_joined}}
                    </div>
              </div>
              <hr>
              <hr>
              <div v-if="city.title" class="row profile_text">
                <div class="col-sm-3">
                  <h6 class="mb-0">Адреса</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{city.title}}
                    </div>
              </div>
              <hr  v-if="city.title">
              <div v-if="region.title" class="row profile_text">
                <div class="col-sm-3">
                  <h6 class="mb-0">Улюблене</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{region.title}}
                    </div>
              </div>
              <hr  v-if="region.title">
              <div class="row profile_text">
                <div class="col-sm-3">
                  <h6 class="mb-0">Бали</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{user.points}}
                    </div>
              </div>
              <hr>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "profile",
    props:['slug'],
    data: () => ({
      user: {},
      cur_user:{},
      backend: this.$store.state.backendUrl+`auth/users/me/`,
      sub_status:"",
      followers_count:"",
      region:{},
      city:""
    }),

    created() {
      this.cur_user = this.$store.state.cuser
      this.loadUser()

    },
    methods: {
      async loadUser() {
        axios({url: this.$store.state.backendUrl+`api/v1/${this.slug}/`, method: 'GET',headers: {'Content-type': 'application/json',}}).then(response => {this.user  = response.data
          this.followers_count = response.data.followers.length
          this.region = response.data.region
          this.city = response.data.city

          if(response.data.followers.includes(this.$store.state.cuser.id)){
            this.sub_status = "follow"
          }
          else {
            this.sub_status = "unfollow"
          }}).catch(err =>{
          let r = this.$router.resolve({
            name: '404',
          })
          window.location.assign(r.href)
        })
      },

      async Follow(){
        const formData = new FormData();
        formData.append("id", this.$store.state.cuser.id);
        axios({url: this.$store.state.backendUrl+`api/v1/follow/${this.user.id}`, data:formData, method: 'POST'}).then(resp =>{console.log(resp),this.loadUser()} )
      },

      async Unfollow(){
        const formData = new FormData();
        formData.append("id", this.$store.state.cuser.id);
        axios({url: this.$store.state.backendUrl+`api/v1/unfollow/${this.user.id}`, data:formData, method: 'POST'})
                .then(resp =>{console.log(resp),this.loadUser()} )
      },

      goTo(slug_u) {
        let r = this.$router.resolve({
          name: 'profile_edit',params: {slug: slug_u} // put your route information in
        })
        window.location.assign(r.href)
      },
    },
  }

</script>

<style scoped>
  .profile_text{
    background-color: mintcream;
    border-radius: 5px;
    color: #384452;
    padding: 1%;
  }
</style>