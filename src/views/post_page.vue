<template>
    <div class="container mtb" id="page">
        <div class="row">
            <div data-aos="fade-in" data-aos-delay="300" class="col-lg-10">
                <p><img class="img-responsive" style="width: 100%" :src="Post.img"></p>
                <h3 class="ctitle">{{Post.title}}</h3>
                <div v-if="user.username">
                    <div v-if="like_status === 'like'" style="cursor: pointer;color: #ffffff;font-weight: bold"  class="btn btn-danger" @click="Unlike" >Не подобається <font-awesome-icon  size="x" :icon="['fas', 'heart']" /></div>
                    <div  v-if="like_status === 'unlike'" style="cursor: pointer;color: #ffffff;font-weight: bold;" class="btn btn-primary" @click="Like">Подобається <font-awesome-icon size="  x" :icon="['far', 'heart']"  /></div>
                </div>
                <p>
                    <csmall> <font-awesome-icon :icon="['far', 'clock']" /> {{Post.date }}</csmall> |
            <csmall2> <font-awesome-icon :icon="['far', 'user']" />{{Post.author}}  <font-awesome-icon :icon="['far', 'comment']" />{{comments_count}}  <font-awesome-icon :icon="['far', 'heart']" />{{likes_count }} <font-awesome-icon :icon="['far', 'eye']" />{{Post.views}}</csmall2>
                </p>

                <div class="post-content" v-html="Post.content"></div>
                <div class="spacing"></div>
                <h6>SHARE:</h6>
                <p class="share">
                    <a href="#"><i class="fa fa-twitter"></i></a>
                    <a href="#"><i class="fa fa-facebook"></i></a>
                    <a href="#"><i class="fa fa-tumblr"></i></a>
                    <a href="#"><i class="fa fa-google-plus"></i></a>
                </p>
            </div>
            <div  data-aos="slide-right" data-aos-delay="100" class="col-lg-2 ">
                <div class="blog_right_sidebar">
                    <aside v-if="user.username" class="single_sidebar_widget author_widget">
                        <img :src="user.profile_img" alt="Admin" class="rounded-circle profile_img">
                        <h4>{{user.username}}</h4>
                        <p>{{user.email}}</p>

                        <div class="br"></div>
                    </aside>
                </div>
                <div class="hline"></div>
                <h4>Популярні пости</h4>
                <ul class="popular-posts">
                    <li class="popular-post" data-aos="zoom-in" v-for="post_p in popular" :key="post_p.id" @click = 'goTo(post_p.slug)'><a><img  style="height: 9vh" :src="post_p.img" /></a>
                        <p><a href="">{{post_p.title}}</a></p>
                        <em> <font-awesome-icon :icon="['far', 'clock']" />  {{post_p.date }}
                            <div><font-awesome-icon :icon="['far', 'user']" />{{post_p.author}}</div>  <font-awesome-icon :icon="['far', 'comment']" />{{post_p.comments.length}}  <font-awesome-icon :icon="['far', 'heart']" />{{post_p.likes.length}} <font-awesome-icon :icon="['far', 'eye']" />{{post_p.views}}</em>
                    </li>
                </ul>
                <div class="hline"></div>
            </div>
        </div>
          <div v-show="map" data-aos="zoom-in" data-aos-delay="500" ref='googleMap' class='google-map'></div>

        <div data-aos="zoom-in" data-aos-delay="500"  v-if="user.username" class="row">
            <div class="col-md-4">
                <h4>Залиште коментар</h4>
                <form @submit.prevent="create" class="comment-form" >
                    <div class="form-group form-inline">
                    </div>
                    <div class="form-group">
                        <textarea v-model="content" class="form-control mb-10" rows="5" name="text" placeholder="Комментарий"
                                  onfocus="this.placeholder = ''" onblur="this.placeholder = 'Комментарий'"   ></textarea>
                    </div>
                    <button type="submit" class="btn btn-info" >Відправити</button>
                </form>
            </div>
        </div>
        <h3 class="title-comments">Комментарі ({{comments_count}})</h3>
        <ul data-aos="fade-in" data-aos-delay="500"  v-for="comment in Post.comments" class="media-list">
            <li class="media" >
                <img class="media-object img-rounded" :src="'http://127.0.0.1:8000'+comment.author.profile_img" alt="">
                <div class="media-body">
                    <div class="media-heading">
                        <div class="author">{{comment.author.username}}</div>
                        <div class="metadata">
                            <span class="date">{{comment.created_date}}</span>
                        </div>
                    </div>
                    <div class="media-text text-justify">
                        {{comment.text}}
                    </div>
                </div>
            </li>
        </ul>

</div>

</template>

<script>
    import axios from "axios";
    import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
    import { faHeart} from '@fortawesome/free-solid-svg-icons'
    import { library } from '@fortawesome/fontawesome-svg-core'
    import {useToast} from "vue-toastification";

library.add(faHeart)
    export default {
        name: "post_page",
        props:['slug'],
        components:{'font-awesome-icon': FontAwesomeIcon},
        data: () => ({
            Post: [],
            user:{},
            content:"",
            like_status:"",
            comments_count:"",
            selected_file:null,
            tags_count:"",
            likes_count:"",
            popular:[],
            toast : useToast(),
            markers:[],
            marker_id:1,
            latLang:[],
            LegPoints:[],
            map : null,
            directionsService:new google.maps.DirectionsService(),
            _directionsRenderer:new google.maps.DirectionsRenderer(),
            bounds: new google.maps.LatLngBounds(), // Авто масштабирование карты
            mapOptions: {
                center: { lat: 35, lng: 100.644 },
                zoomControl: true,
                zoom: 3,
                gestureHandling: 'auto'},
            status:'ok'
        }),
        created() {
            this.loadPost()
            this.loadPopularPosts()
            this.user = this.$store.state.cuser
            window.addEventListener('scroll', this.handleScroll);
        },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
        methods: {
            async loadPost() {
                axios({url: `${this.$store.getters.getServerUrl}api/v1/blog/${this.slug}`, method: 'GET',headers: {'Content-type': 'application/json',}}).then(response => {
                    this.Post  = response.data
                    this.comments_count =response.data.comments.length
                    this.tags_count = response.data.tags.length
                    this.likes_count = response.data.likes.length
                    if(response.data.likes.includes(this.$store.state.cuser.username)){
                        this.like_status = "like"
                    }
                    else {
                        this.like_status = "unlike"
                    }
                    if(response.data.waypoints.length !==0){
                    this.map = new google.maps.Map(this.$refs.googleMap, {
                        center: { lat: 35, lng: 100.644 },
                        zoomControl: true,
                        zoom: 3,
                        gestureHandling: 'auto'
                    })
                    this.initMap(response)
                    }
                }).catch(err =>{

                    console.log(err)
                })
            },
            async Like(){
                const formData = new FormData();
                formData.append("id", this.$store.state.cuser.id);
                axios({url: this.$store.state.backendUrl+`api/v1/like/${this.Post.id}`, data:formData, method: 'POST'}).then(resp =>{this.loadPost()} )
            },

            async Unlike(){
                const formData = new FormData();
                formData.append("id", this.$store.state.cuser.id);
                axios({url: this.$store.state.backendUrl+`api/v1/unlike/${this.Post.id}`, data:formData, method: 'POST'}).then(resp =>{this.loadPost()} )
            },

            create: function () {
                const formData = new FormData();
                formData.append("author_id",this.user.id);
                formData.append("text", this.content);
                axios({url: this.$store.state.backendUrl+`api/v1/comment_create/${this.slug}`, data:formData, method: 'POST' }).then(resp =>{ this.content= '', this.toast.success('Комментарий создан и отправлен на рассмотрение')} ).catch(err=>this.toast.error('Произошла ошибка: '+err))
            },
            async loadPopularPosts() {
                axios({url: this.$store.state.backendUrl+`api/v1/blog?limit=3&search=&date=month&ordering=descending`, method: 'GET',headers: {'Content-type': 'application/json',}}).then(response => {this.popular  = response.data.results})
            },
            goTo(slug) {
                this.$router.push({ name: 'post', params: {slug: slug}})
            },

                      getRoutePointsAndWaypoints(Points) {
        this.drawRoutePointsAndWaypoints(Points);

},
drawRoute(originAddress, destinationAddress, _waypoints) {
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
        if (_status == google.maps.DirectionsStatus.OK) {
            that._directionsRenderer.setDirections(_response);
        }
    });
} ,

 drawRoutePointsAndWaypoints(Points) {
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
        this.drawRoute(Points[0], Points[Points.length - 1], _waypoints);
    } else if (Points.length > 1) {
        //Call a drawRoute() function only for start and end locations
        this.drawRoute(Points[this.latLang.length - 2], Points[Points.length - 1], _waypoints);
    } else {
        //Call a drawRoute() function only for one point as start and end locations.
        this.drawRoute(Points[this.latLang.length - 1], Points[Points.length - 1], _waypoints);
    }
} ,
           placeMarker(map,marker) {

    marker.id= this.marker_id
             this.marker_id++
    this.markers.push(marker)
               return marker
},

    initMap(response){
var zoom_option = 1;

    this._directionsRenderer.setMap(this.map);
    this._directionsRenderer.setOptions({
        draggable: true,
                                suppressMarkers: true,

    });

      var that =this

                for(var el in response.data.waypoints){
                    var ll = {lat:Number(response.data.waypoints[el].lat),lng:Number(response.data.waypoints[el].lng)}
                          let marker = new google.maps.Marker({
        position: ll,
        map: this.map,
    });
          that.latLang.push(ll)
             that.LegPoints.push('');
        that.getRoutePointsAndWaypoints(that.latLang);
   that.placeMarker(this.map,marker);
   let id = marker.id
                }
          google.maps.event.addListener(this._directionsRenderer, 'directions_changed', function() {
        var myroute = this._directionsRenderer.directions.routes[0];
        CreateRoute(myroute);
        zoom_option = that.map.getZoom();
    });

    },
            handleScroll(){
                if((document.body.scrollHeight/2 < window.pageYOffset ) && this.status!=='sent'){
                        axios({url: this.$store.state.backendUrl+`api/v1/add_view/${this.Post.slug}`,  method: 'GET'}).then(this.status= 'sent')
                }

            }
        },
    }
</script>

<style scoped>
.img-rounded{
  max-height: 9vh;
  float: left;
  margin-right: 1%;
  border-radius: 50%;
}

.author{
  font-weight: bold;
  font-family: Raleway;
}
.profile_img{
  border-radius: 50%;
}
    .google-map {
  width: 100%;
  height: 450px;
}
</style>