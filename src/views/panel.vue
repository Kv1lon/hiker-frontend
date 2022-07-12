<template>
    <div>

        <div data-aos="fade-in" data-aos-delay="300" class="modal-body">
            <h3>Створити статтю</h3>
            <form @submit.prevent="create" style="margin:1px" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="title">Назва статі</label>
                    <input class="form-control" v-model="title" id="title" required>
                                        <span v-if="msg.title">{{msg.title}}</span>

                </div>
                <div class="form-group">
                    <label>Текст</label>
                    <ckeditor class="form-control" :editor="editor" v-model="content" :config="editorConfig"></ckeditor>
                    <span v-if="msg.content">{{msg.content}}</span>

                </div>
                <div class="form-group">
                    <label>Короткий опис</label>
                    <input class="form-control" v-model="description" >
                    <span v-if="msg.description">{{msg.description}}</span>

                </div>

                <div class="form-group" v-if="opt_cities">
                    <label>Оберіть міста</label>
                    <Multiselect mode="tags" :searchable="true" v-model="s_cities" :options="opt_cities" >       <template v-slot:tag="{ option, handleTagRemove, disabled }">
                        <div class="multiselect-tag is-user">
                            {{ option.value }}
                            <i v-if="!disabled" @click.prevent @mousedown.prevent.stop="handleTagRemove(option, $event)"></i>
                        </div>
                    </template>
                    </Multiselect>
                </div>
                <div class="form-group" v-if="opt_countries">
                    <label>Оберіть країни</label>
                    <Multiselect mode="tags" :searchable="true" v-model="s_countries" :options="opt_countries" ><template v-slot:tag="{ option, handleTagRemove, disabled }">
                        <div class="multiselect-tag is-user">
                            {{ option.value }}
                            <i v-if="!disabled" @click.prevent @mousedown.prevent.stop="handleTagRemove(option, $event)"></i>
                        </div>
                    </template>
                    </Multiselect>
                </div>
                <div class="form-group" v-if="opt_tags">
                    <label>Оберіть теги</label>
                    <Multiselect mode="tags" :searchable="true" v-model="s_tags" :options="opt_tags" ><template v-slot:tag="{ option, handleTagRemove, disabled }">
                        <div class="multiselect-tag is-user">
                            {{ option.value }}
                            <i v-if="!disabled" @click.prevent @mousedown.prevent.stop="handleTagRemove(option, $event)"></i>
                        </div>
                    </template>
                    </Multiselect>
                </div>
                <div class="form-group">
                    <label>Завантажте фото</label>
                    <input
                            ref="input"
                            type="file"
                            name="image"
                            accept="image/*"
                            @change="setImage"
                    />
                </div>
                <div v-if='imgSrc !== ""' class="content" >
                    <section  class="cropper-area">
                        <div class="img-cropper">
                            <vue-cropper style="max-height: 40vh; display: block"
                                         ref="cropper"
                                         :aspect-ratio="2"
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
                                Відзеркалити по горизонталі
                            </a>
                            <a
                                    ref="flipY"
                                    href="#"
                                    role="button"
                                    class="btn btn-theme"
                                    @click.prevent="flipY">
                                Відзеркалити по вертикалі
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
                        <label>Обрізане фото</label>
                        <div class="cropped-image" >
                            <img style="max-height: 40vh; display: block; border-style: groove;"
                                 v-if="selected_file"
                                 :src="selected_file"
                                 alt="Cropped Image"/>
                            <div v-else class="crop-placeholder" />
                        </div>
                    </section>
                </div>

                <div>
                    <button type="submit" style="margin:1px
        " class="btn btn-primary">Створити статтю</button>
                </div>
  <div ref='googleMap' class='google-map'></div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from "axios";

import CKEditor from '@ckeditor/ckeditor5-vue';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import Editor from '@ckeditor/ckeditor5-simple-build';
  import Multiselect from '@vueform/multiselect'
import {useToast} from "vue-toastification";
export default {
    name: "panel",
    components: {
        ckeditor: CKEditor.component, VueCropper,Multiselect
    },
    data: () => ({
        select:null,
        description: "",
        title:"",
        content:"",
        author:"",
        selected_file: null,
        imgSrc:"",
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
        msg:[],
        toast : useToast(),
      markers:[],
      marker_id:1,
      latLang:[],
      LegPoints:[],
      directionsService:new google.maps.DirectionsService(),
      _directionsRenderer:new google.maps.DirectionsRenderer(),
bounds: new google.maps.LatLngBounds(), // Авто масштабирование карты
      mapOptions: {
        center: { lat: 35, lng: 100.644 },
        zoomControl: true,
        zoom: 3,
        gestureHandling: 'auto'
    },
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

                    ],

                },
                table: {contentToolbar: [
                        'tableColumn',
                        'tableRow',
                        'mergeTableCells'
                    ]
                },
                simpleUpload: {// The URL that the images are uploaded to.
                    uploadUrl:  this.$store.state.backendUrl+'api/v1/upload_img/none/',
                    // Enable the XMLHttpRequest.withCredentials property.withCredentials: false,
                }
            },
            editor:Editor
        }),
        created() {
            this.author = this.$store.state.cuser.id;
            this.loadListTags()
            this.loadListCities()
            this.loadListCountries()
        },
  mounted() {
            this.initMap()
      },
  watch: {
      content(value){
        // binding this to the data value in the email input
        this.content = value;
        this.validateContent(value);
      },
        description(value){
        // binding this to the data value in the email input
        this.description = value;
        this.validateDescription(value);
      },
      title(value){
                  this.title = value;
        this.validateTitle(value);
      }
    },
        methods: {
            cropImage() {
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
                    this.toast.warning('Оберіть фото або файл');
                    return;
                }
                if (typeof FileReader === 'function') {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        this.imgSrc = event.target.result;
                        // rebuild cropperjs with the updated source
                        this.$refs.cropper.replace(event.target.result);
                    };
                    reader.readAsDataURL(file);
                } else {
                    this.toast.error('Вибачте, FileReader API не підтримується');
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
            goTo(slug_u) {
                this.$router.push({ name: 'cabinet', params: {slug: slug_u}})
            },
            async loadListTags() {
                axios({url:  this.$store.state.backendUrl+`api/v1/tags?limit=100&search=`, method: 'GET',headers: {'Content-type': 'application/json',}}).then(response => {this.tags = response.data
                    for(var el in response.data){
                        this.opt_tags.push(response.data[el].name)
                    }
                })
            },
            async loadListCities() {
                axios({url: this.$store.state.backendUrl+`api/v1/city?limit=100&search=`, method: 'GET',headers: {'Content-type': 'application/json',}}).then(response => {this.cities = response.data
                    for(var el in response.data){
                        this.opt_cities.push(response.data[el].title)
                    }
                })
            },
            async loadListCountries() {
                axios({url: this.$store.state.backendUrl+`api/v1/country?limit=100&search=`, method: 'GET',headers: {'Content-type': 'application/json',}}).then(response => {this.countries  = response.data
                    for(var el in response.data){
                        this.opt_countries.push(response.data[el].title)
                    }
                })
            },
                  validateContent(value){
        let difference = 500 - value.length;
        if (value.length<500) {
          this.msg['content'] = 'Повинно бути 500 символів! '+ difference + ' залишилось символів' ;
        } else {
          this.msg['content'] = '';
        }},
            validateDescription(value){
        let difference = 100 - value.length;
        let differensb = value.length -255;
        if (value.length<100) {
          this.msg['description'] = 'Повинно бути 100 символів! '+ difference + 'залишилось символів' ;
        } else if(value.length>255){
          this.msg['description'] ='Повинно бути не більше 255 символів! '+ differensb + ' зайвих символів';
        }
        else{
            this.msg['description'] = ''
        }},
            validateTitle(value){
        let difference = value.length-255;
        if(value.length>255){
          this.msg['title'] ='Повинно бути не більше 255 символів! '+ difference + ' зайвих символів';
        }
        else{
            this.msg['title'] = ''
        }},
            create: function () {
                                if(!this.msg['content'] && !this.msg['description']){
                for(var el in this.s_cities){
                    this.r_cities.push(this.cities.find(x=>x.title===this.s_cities[el]).slug)
                }
                for(var el in this.s_countries){
                    this.r_countries.push(this.countries.find(x=>x.title===this.s_countries[el]).slug)
                }
                for(var el in this.s_tags){
                    this.r_tags.push(this.tags.find(x=>x.name===this.s_tags[el]).slug)
                }

                const formData = new FormData();
                formData.append("title", this.title);
                formData.append("author_id", this.author);
                formData.append("content", this.content);
                formData.append("content", this.content);
                for (let i in this.r_cities){
                    formData.append("city", this.r_cities[i]);}
                for (let i in this.r_tags){
                    formData.append("tags", this.r_tags[i]);}
                for (let i in this.r_countries){
                    formData.append("country", this.r_countries[i]);}
                formData.append("description", this.description);
                formData.append("img", this.selected_file);
                axios({url: this.$store.state.backendUrl+'api/v1/create', data:formData, method: 'POST' }).then(resp =>{console.log(resp)

                    for(var marker in this.markers){
                                                            const formData1 = new FormData();
                        formData1.append('lng',Number(String(this.markers[marker].getPosition().lng()).slice(0,15)))
                        formData1.append('lat',Number(String(this.markers[marker].getPosition().lat()).slice(0,15)))
                        axios({url: this.$store.state.backendUrl+`api/v1/add_point/${resp.data.slug}`, data:formData1, method: 'POST' }).then(resp =>{console.log(resp)})
                                            console.log(Number(String(this.markers[marker].getPosition().lng()).slice(0,15)))
                                            console.log(Number(String(this.markers[marker].getPosition().lat()).slice(0,15)))
                    }
                let r = this.$router.resolve({
								name: 'blog', // put your route information in
							})
							window.location.assign(r.href)
                })
             .catch(err => {this.toast.error("Відбулася помилка. Введіть валідні данні або спробуйте пізніше ")})}
                                else {
                this.toast.error("Відбулася помилка. Введіть валідні данні або спробуйте пізніше ")
                }
            },
          getRoutePointsAndWaypoints(Points,marker) {
        this.drawRoutePointsAndWaypoints(Points,marker);

},
drawRoute(originAddress, destinationAddress, _waypoints,marker) {
    //Define a request variable for route .
    var _request = '';

    //This is for more then two locatins
    if (_waypoints.length > 0) {
        _request = {
            origin: originAddress,
            destination: destinationAddress,
            waypoints: _waypoints, //an array of waypoints
            optimizeWaypoints: true, //set to true if you want google to determine the shortest route or false to use the order specified.
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
    } else {
        //This is for one or two locations. Here noway point is used.
        _request = {
            origin: originAddress,
            destination: destinationAddress,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
    }

    //This will take the request and draw the route and return response and status as output
  var that =this
    this.directionsService.route(_request, function(_response, _status) {
        if (_status === google.maps.DirectionsStatus.OK) {
            that._directionsRenderer.setDirections(_response);
        }
        else if(_status === google.maps.DirectionsStatus.ZERO_RESULTS){
            that.toast.error('Неможливо поставити мітку.')

            for (var i = 0; i < that.markers.length; i++) {
            if (that.markers[i].id === marker.id) {
              //Remove the marker from Map
              marker.setMap(null);
              //Remove the marker from array.
              that.markers.splice(i, 1);
              that.latLang.splice(i, 1);
              return;
            }}
        }
    });
} ,

 drawRoutePointsAndWaypoints(Points, marker) {
    //Define a variable for waypoints.
    var _waypoints = new Array();

    if (Points.length > 2) //Waypoints will be come.
    {
        for (var j = 1; j < Points.length - 1; j++) {
            var address = Points[j];
            if (address !== "") {
                _waypoints.push({
                    location: address,
                    stopover: true,  //stopover is used to show marker on map for waypoints

                });
            }
        }
        //Call a drawRoute() function
        this.drawRoute(Points[0], Points[Points.length - 1], _waypoints,marker);
    } else if (Points.length > 1) {
        //Call a drawRoute() function only for start and end locations
        this.drawRoute(Points[this.latLang.length - 2], Points[Points.length - 1], _waypoints, marker);
    } else {
        //Call a drawRoute() function only for one point as start and end locations.
        this.drawRoute(Points[this.latLang.length - 1], Points[Points.length - 1], _waypoints, marker);
    }
} ,
           placeMarker(map,marker) {

    marker.id= this.marker_id
             this.marker_id++
    this.markers.push(marker)
               return marker
},

    initMap(){

var zoom_option = 1;


const map = new google.maps.Map(this.$refs.googleMap, {
      ...this.mapOptions
    })

    this._directionsRenderer.setMap(map);
    this._directionsRenderer.setOptions({
        draggable: true,
                                suppressMarkers: true,

    });

      var that =this
google.maps.event.addListener(map, 'click', function(event) {
      var marker = new google.maps.Marker({
        position: event.latLng,
        map: map,
    });
          that.latLang.push(event.latLng)
             that.LegPoints.push('');
             that.LegPoints.push('');
             that.placeMarker(map,marker);
   var id = marker.id
        that.getRoutePointsAndWaypoints(that.latLang,marker);

                google.maps.event.addListener(marker, "click", function (e) {

                  for (var i = 0; i < that.markers.length; i++) {
            if (that.markers[i].id === marker.id) {
              //Remove the marker from Map
              marker.setMap(null);
              //Remove the marker from array.
              that.markers.splice(i, 1);
              that.latLang.splice(i, 1);
              return;
            }}

                })
});
          google.maps.event.addListener(this._directionsRenderer, 'directions_changed', function() {
        var myroute = this._directionsRenderer.directions.routes[0];
        CreateRoute(myroute);
        zoom_option = map.getZoom();
    });

    },
    }
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>

<style >
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
.google-map {
  width: 100%;
  height: 450px;
}
</style>