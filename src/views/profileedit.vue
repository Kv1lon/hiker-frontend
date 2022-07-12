<template>
        <div v-if="loading" class="preloader">
    <div class="preloader__image">
    </div></div>
<div  :style="{'background-image': 'url(' + user_region.background_img + ')',backgroundSize:'100%',}">
    <section  data-aos="fade-in" data-aos-delay="300" class="edit-profile">
        <div class="container">
            <div class="section-header">
                <h2 class="profile_text">Зміна профіля</h2>
            </div>
            <div class="container">
                <div class="main-body">
                    <div class="row gutters-sm">
                        <div class="col-md-4 mb-3">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-flex flex-column align-items-center text-center">
                <img v-if="user.profile_img" :src="user.profile_img" style="border-radius: 100px;" alt="Admin" class="rounded-circle" width="150">
                <img v-else src="https://secure.gravatar.com/avatar/c9877cc06c704dbe1dd3d4f305cb22d6?s=650&d=mm&r=g" style="border-radius: 100px;" alt="Admin" class="rounded-circle" width="150">

                                        <div class="mt-3">
                                            <h4 class="profile_text"> {{user.username}}</h4>
                                            <p v-if="user.bio" class="text-secondary mb-1 profile_text" v-html="user.bio"></p>
                                            <p class="text-muted font-size-sm profile_text">{{city}}</p>
                                          <div><button class="btn btn-dark" @click="resetPassword">Змінити пароль</button> </div>
                                            <div><label for="upload_pr" class="btn btn-success">Завантажити фото</label></div>
                                            <input
                                                    ref="input"
                                                    type="file"
                                                    name="image"
                                                    accept="image/*"
                                                    @change="setImage"
                                                    id="upload_pr"
                                            />
                                            <div v-if='imgSrc !== ""' class="content" >
                                                <section  class="cropper-area">
                                                    <div class="img-cropper">
                                                        <vue-cropper style="max-height: 40vh; display: block"
                                                                     ref="cropper"
                                                                     :aspect-ratio="1"
                                                                     :src="imgSrc"
                                                                     preview=".preview"/>
                                                    </div>
                                                    <div>
                                                        <a
                                                                href="#"
                                                                role="button"
                                                                class="btn btn-theme"
                                                                @click.prevent="rotate(-90)">
                                                            Повернути
                            </a>
                                                        <a
                                                                ref="flipX"
                                                                href="#"
                                                                role="button"
                                                                class="btn btn-theme"
                                                                @click.prevent="flipX">
                                                            Відзеркалити по горизонгталі
                            </a>
                                                        <a
                                                                ref="flipY"
                                                                href="#"
                                                                role="button"
                                                                class="btn btn-theme"
                                                                @click.prevent="flipY">
                                                            Відзеркилити по вертикалі
                            </a>
                                                        <a
                                                                href="#"
                                                                role="button"
                                                                class="btn btn-theme"

                                                                @click.prevent="cropImage">
                                                            Обрізати
                            </a>
                                                        <a
                                                                href="#"
                                                                role="button"
                                                                class="btn btn-theme"

                                                                @click.prevent="reset">
                                                            Скасувати
                            </a>
                                                    </div>
                                                </section>
                                                <section class="preview-area">
                                                    <label>Обрізати фото</label>
                                                    <div class="cropped-image" >
                                                        <img style="max-height: 40vh; display: block; border-style: groove;"
                                                             v-if="selected_file"
                                                             :src="selected_file"
                                                             alt="Cropped Image"/>
                                                        <div v-else class="crop-placeholder" />
                                                    </div>
                                                </section>
                                            </div>                <button @click="update" class="btn btn-primary">Зберегти</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="card mb-3">
                                <div class="card-body">
                                    <div class="row profile_text">
                                        <div class="col-sm-3 ">
                                            <h6  lass="mb-0">Імя</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary p">
                                            <input type="text" v-model="first_name" class="form-control" placeholder="Имя пользователя" required/>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row profile_text">
                                        <div class="col-sm-3 ">
                                            <h6 class=" mb-0">Email</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            <input type="email" v-model="email" class="form-control" placeholder="email"  required/>
                                                                <span v-if="msg.email">{{msg.email}}</span>

                                        </div>
                                    </div>
                                    <hr>

                                    <div  class="row profile_text">
                                        <div class="col-sm-3"><h6 class="mb-0">Адреса</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            <Multiselect :searchable="true" v-model="city" :options="opt_cities" required></Multiselect>
                                        </div>
                                    </div>
                                    <hr>
                                    <div  class="row profile_text">
                                        <div class="col-sm-3"><h6 class="mb-0">Улюблене</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            <Multiselect :searchable="true" v-model="region" :options="opt_regions" required></Multiselect>
                                        </div>
                                    </div>
                                    <hr>
                                    <div  class="row profile_text">
                                        <div class="col-sm-3"><h6 class="mb-0" >Біо</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            <ckeditor class="input-text" :editor="editor" v-model="bio" :config="editorConfig"></ckeditor>
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
    </section>
        </div>
</template>
<script>
    import axios from "axios";
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
    import CKEditor from "@ckeditor/ckeditor5-vue";
import Editor from '@ckeditor/ckeditor5-simple-build';
    import Multiselect from "@vueform/multiselect";
    import {useToast} from "vue-toastification";

    export default {
        components: {
            ckeditor: CKEditor.component,
            VueCropper,Multiselect
        },
        name: "panel_change",
        props:['slug'],
        data: () => ({
            user:{},
            cur_user:{},
            username:"",
            password:"",
            email:"",
            selected_file: null,
            imgSrc:"",
            first_name:"",
            city:"",
            bio:"",
            error:"",
            cities:[],
            opt_cities:[],
            region:'',
            regions:[],
            user_region:{},
            opt_regions:[],
                    msg:[],
          oldpas:'',
          newpas:'',
          loading:false,
			toast : useToast(),
    editorConfig: {
            toolbar: {
                items: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'link',
                        'bulletedList',
                        'numberedList',
                        '|',
                        'outdent',
                        'indent',
                        '|',
                        'imageUpload',
                        'blockQuote',
                        'insertTable',
                        'mediaEmbed',
                        'undo',
                        'redo']},
                language: 'ru',
                image: {    toolbar: [
                               'imageTextAlternative',
                         'imageStyle:alignLeft',
                        'imageStyle:inLine',
                        'imageStyle:alignRight',
                        'toggleImageCaption',
                        'imageStyle:alignCenter',
                        'imageStyle:centeredImage',
                    ]
                },
                table: {contentToolbar: [
                        'tableColumn',
                        'tableRow',
                        'mergeTableCells'
                    ]
                },
                simpleUpload: {// The URL that the images are uploaded to.
                    uploadUrl: 'http://localhost:8000/api/v1/upload_img/none/',
                    // Enable the XMLHttpRequest.withCredentials property.withCredentials: false,
                }
            },
            editor:Editor
        }),
        watch: {
            email(value){
                // binding this to the data value in the email input
                this.email = value;
                this.validateEmail(value);
            },
},
        created() {
            this.loadUser()
            this.loadListCities()
            this.loadListRegions()
        },

      methods: {cropImage() {
            this.selected_file = this.$refs.cropper.getCroppedCanvas().toDataURL();
            },
    flipX() {
      const dom = this.$refs.flipX;
      let scale = dom.getAttribute('data-scale');
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleX(scale);
      dom.setAttribute('data-scale', scale);
    },
    flipY() {
      const dom = this.$refs.flipY;
      let scale = dom.getAttribute('data-scale');
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleY(scale);
      dom.setAttribute('data-scale', scale);
    },
    reset() {
      this.$refs.cropper.reset();
    },
    rotate(deg) {
      this.$refs.cropper.rotate(deg);
    },
    setImage(e) {
      const file = e.target.files[0];
      if (file.type.indexOf('image/') === -1) {
        this.toast.error('Выберите файл с фото');
        return;
      }
      if (typeof FileReader === 'function') {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imgSrc = event.target.result;
          this.$refs.cropper.replace(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        this.toast.error('Простите, FileReader API не поддерживаеться');
      }
      },
    showFileChooser() {
      this.$refs.input.click();
    },
    zoom(percent) {
      this.$refs.cropper.relativeZoom(percent);
      },
            onFileSelected(event){
                this.selected_file= event.target.files[0]
            },

             async loadUser() {

                const response = await fetch( this.$store.state.backendUrl+`api/v1/${this.slug}/`,{ method: 'GET',headers: {'Content-type': 'application/json',}}).then(response=>response.json()).catch(err =>{
                            let r = this.$router.resolve({
								name: '404',
							})
							window.location.assign(r.href)
                })
               this.user  = response
                    this.username = response.username
                    this.first_name = response.first_name
                    this.email= response.email
                    this.city= response.city.title
                    this.region= response.region.title
                    this.user_region = response.region
                    this.bio= response.bio
                       this.cur_user = this.$store.state.cuser
                 if(this.user.email !== this.cur_user.email){
                                let r = this.$router.resolve({
								name: '404',
							})
							window.location.assign(r.href)
                 }
                },

             loadListCities() {
                axios({url: this.$store.state.backendUrl+`api/v1/city`, method: 'GET',headers: {'Content-type': 'application/json',}}).then(response => {this.cities = response.data
                    for(var el in response.data){
                        this.opt_cities.push(response.data[el].title)
                    }
                })
            },
             loadListRegions() {
                axios({url: this.$store.state.backendUrl+`api/v1/regions`, method: 'GET',headers: {'Content-type': 'application/json',}}).then(response => {this.regions  = response.data
                    for(var el in response.data){
                        this.opt_regions.push(response.data[el].title)
                    }
                })
            },
            update: function () {if(!this.msg['email'] && this.user.email == this.cur_user.email){
                const formData = new FormData();
                if(this.region){
                this.region = this.regions.find(x=>x.title===this.region).slug}
                formData.append("first_name", this.first_name);
                formData.append("email", this.email);
                if(this.selected_file != null){
                    formData.append("profile_img", this.selected_file);}
                if (this.city){
                                this.city = this.cities.find(x=>x.title===this.city).slug}

                if(this.city != null){
                    formData.append("city", this.city);
                }
                if(this.region != null){
                    formData.append("region", this.region);
                }

                formData.append("bio", this.bio);
                this.loading = true
                axios({url: this.$store.state.backendUrl+`api/v1/profile_edit/${this.user.slug}/`, data:formData, method: 'PUT' }).then(resp =>{console.log(resp), this.loading =false
							let r = this.$router.resolve({
								name: 'home', // put your route information in
							})
							window.location.assign(r.href)
							})
             .catch(err => {this.toast.error(" Произошла ошибка. Введите валидные данные или попробуйте позже "),  this.loading =false})}
                             else {
                this.toast.error(" Произошла ошибка. Введите валидные данные или попробуйте позже ")
                }

        },
            validateEmail(value){
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
  {
    this.msg['email'] = '';
  } else{
    this.msg['email'] = 'Это не похоже на email';
  }
    },
        resetPassword(){
                  const formData = new FormData();
                  this.loading = true
                    formData.append('email', this.user.email);
                                    axios({url: this.$store.state.backendUrl+`auth/users/reset_password/`, data:formData, method: 'POST' }).then(resp => {
                                      this.loading =false
                                      this.toast.success('На Вашу почту была выслана ссылка для смены пароля')
                                      console.log(resp)}
                                    )
        }

    }}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>

<style scoped>
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
  }   .profile_text{
    background-color:mintcream ;
    border-radius: 5px;
    color: #384452;
    padding: 1%;
  }
</style>
