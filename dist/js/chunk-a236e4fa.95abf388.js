(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a236e4fa"],{"06f2":function(e,t,a){"use strict";a("72ef")},1713:function(e,t,a){"use strict";a.r(t);var o=a("7a23");const c=e=>(Object(o["pushScopeId"])("data-v-07df4c70"),e=e(),Object(o["popScopeId"])(),e),s={class:"container mtb",id:"page"},n={class:"row"},r={"data-aos":"fade-in","data-aos-delay":"300",class:"col-lg-10"},l=["src"],i={class:"ctitle"},d={key:0},m=Object(o["createTextVNode"])("Не подобається "),b=Object(o["createTextVNode"])("Подобається "),p=Object(o["createTextVNode"])(" | "),u=["innerHTML"],h=Object(o["createStaticVNode"])('<div class="spacing" data-v-07df4c70></div><h6 data-v-07df4c70>SHARE:</h6><p class="share" data-v-07df4c70><a href="#" data-v-07df4c70><i class="fa fa-twitter" data-v-07df4c70></i></a><a href="#" data-v-07df4c70><i class="fa fa-facebook" data-v-07df4c70></i></a><a href="#" data-v-07df4c70><i class="fa fa-tumblr" data-v-07df4c70></i></a><a href="#" data-v-07df4c70><i class="fa fa-google-plus" data-v-07df4c70></i></a></p>',3),g={"data-aos":"slide-right","data-aos-delay":"100",class:"col-lg-2"},O={class:"blog_right_sidebar"},j={key:0,class:"single_sidebar_widget author_widget"},f=["src"],v=c(()=>Object(o["createElementVNode"])("div",{class:"br"},null,-1)),N=c(()=>Object(o["createElementVNode"])("div",{class:"hline"},null,-1)),V=c(()=>Object(o["createElementVNode"])("h4",null,"Популярні пости",-1)),k={class:"popular-posts"},y=["onClick"],E=["src"],w={href:""},_=Object(o["createTextVNode"])(),S=c(()=>Object(o["createElementVNode"])("div",{class:"hline"},null,-1)),D={"data-aos":"zoom-in","data-aos-delay":"500",ref:"googleMap",class:"google-map"},P={key:0,"data-aos":"zoom-in","data-aos-delay":"500",class:"row"},T={class:"col-md-4"},x=c(()=>Object(o["createElementVNode"])("h4",null,"Залиште коментар",-1)),B=c(()=>Object(o["createElementVNode"])("div",{class:"form-group form-inline"},null,-1)),C={class:"form-group"},L=c(()=>Object(o["createElementVNode"])("button",{type:"submit",class:"btn btn-info"},"Відправити",-1)),R={class:"title-comments"},M={"data-aos":"fade-in","data-aos-delay":"500",class:"media-list"},$={class:"media"},z=["src"],U={class:"media-body"},A={class:"media-heading"},I={class:"author"},H={class:"metadata"},F={class:"date"},G={class:"media-text text-justify"};function W(e,t,a,c,W,J){const K=Object(o["resolveComponent"])("font-awesome-icon"),Y=Object(o["resolveComponent"])("csmall"),Z=Object(o["resolveComponent"])("csmall2");return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",s,[Object(o["createElementVNode"])("div",n,[Object(o["createElementVNode"])("div",r,[Object(o["createElementVNode"])("p",null,[Object(o["createElementVNode"])("img",{class:"img-responsive",style:{width:"100%"},src:e.Post.img},null,8,l)]),Object(o["createElementVNode"])("h3",i,Object(o["toDisplayString"])(e.Post.title),1),e.user.username?(Object(o["openBlock"])(),Object(o["createElementBlock"])("div",d,["like"===e.like_status?(Object(o["openBlock"])(),Object(o["createElementBlock"])("div",{key:0,style:{cursor:"pointer",color:"#ffffff","font-weight":"bold"},class:"btn btn-danger",onClick:t[0]||(t[0]=(...e)=>J.Unlike&&J.Unlike(...e))},[m,Object(o["createVNode"])(K,{size:"x",icon:["fas","heart"]})])):Object(o["createCommentVNode"])("",!0),"unlike"===e.like_status?(Object(o["openBlock"])(),Object(o["createElementBlock"])("div",{key:1,style:{cursor:"pointer",color:"#ffffff","font-weight":"bold"},class:"btn btn-primary",onClick:t[1]||(t[1]=(...e)=>J.Like&&J.Like(...e))},[b,Object(o["createVNode"])(K,{size:"  x",icon:["far","heart"]})])):Object(o["createCommentVNode"])("",!0)])):Object(o["createCommentVNode"])("",!0),Object(o["createElementVNode"])("p",null,[Object(o["createVNode"])(Y,null,{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(K,{icon:["far","clock"]}),Object(o["createTextVNode"])(" "+Object(o["toDisplayString"])(e.Post.date),1)]),_:1}),p,Object(o["createVNode"])(Z,null,{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(K,{icon:["far","user"]}),Object(o["createTextVNode"])(Object(o["toDisplayString"])(e.Post.author)+" ",1),Object(o["createVNode"])(K,{icon:["far","comment"]}),Object(o["createTextVNode"])(Object(o["toDisplayString"])(e.comments_count)+" ",1),Object(o["createVNode"])(K,{icon:["far","heart"]}),Object(o["createTextVNode"])(Object(o["toDisplayString"])(e.likes_count)+" ",1),Object(o["createVNode"])(K,{icon:["far","eye"]}),Object(o["createTextVNode"])(Object(o["toDisplayString"])(e.Post.views),1)]),_:1})]),Object(o["createElementVNode"])("div",{class:"post-content",innerHTML:e.Post.content},null,8,u),h]),Object(o["createElementVNode"])("div",g,[Object(o["createElementVNode"])("div",O,[e.user.username?(Object(o["openBlock"])(),Object(o["createElementBlock"])("aside",j,[Object(o["createElementVNode"])("img",{src:e.user.profile_img,alt:"Admin",class:"rounded-circle profile_img"},null,8,f),Object(o["createElementVNode"])("h4",null,Object(o["toDisplayString"])(e.user.username),1),Object(o["createElementVNode"])("p",null,Object(o["toDisplayString"])(e.user.email),1),v])):Object(o["createCommentVNode"])("",!0)]),N,V,Object(o["createElementVNode"])("ul",k,[(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(e.popular,e=>(Object(o["openBlock"])(),Object(o["createElementBlock"])("li",{class:"popular-post","data-aos":"zoom-in",key:e.id,onClick:t=>J.goTo(e.slug)},[Object(o["createElementVNode"])("a",null,[Object(o["createElementVNode"])("img",{style:{height:"9vh"},src:e.img},null,8,E)]),Object(o["createElementVNode"])("p",null,[Object(o["createElementVNode"])("a",w,Object(o["toDisplayString"])(e.title),1)]),Object(o["createElementVNode"])("em",null,[Object(o["createVNode"])(K,{icon:["far","clock"]}),Object(o["createTextVNode"])(" "+Object(o["toDisplayString"])(e.date)+" ",1),Object(o["createElementVNode"])("div",null,[Object(o["createVNode"])(K,{icon:["far","user"]}),Object(o["createTextVNode"])(Object(o["toDisplayString"])(e.author),1)]),_,Object(o["createVNode"])(K,{icon:["far","comment"]}),Object(o["createTextVNode"])(Object(o["toDisplayString"])(e.comments.length)+" ",1),Object(o["createVNode"])(K,{icon:["far","heart"]}),Object(o["createTextVNode"])(Object(o["toDisplayString"])(e.likes.length)+" ",1),Object(o["createVNode"])(K,{icon:["far","eye"]}),Object(o["createTextVNode"])(Object(o["toDisplayString"])(e.views),1)])],8,y))),128))]),S])]),Object(o["withDirectives"])(Object(o["createElementVNode"])("div",D,null,512),[[o["vShow"],e.map]]),e.user.username?(Object(o["openBlock"])(),Object(o["createElementBlock"])("div",P,[Object(o["createElementVNode"])("div",T,[x,Object(o["createElementVNode"])("form",{onSubmit:t[3]||(t[3]=Object(o["withModifiers"])((...e)=>J.create&&J.create(...e),["prevent"])),class:"comment-form"},[B,Object(o["createElementVNode"])("div",C,[Object(o["withDirectives"])(Object(o["createElementVNode"])("textarea",{"onUpdate:modelValue":t[2]||(t[2]=t=>e.content=t),class:"form-control mb-10",rows:"5",name:"text",placeholder:"Комментарий",onfocus:"this.placeholder = ''",onblur:"this.placeholder = 'Комментарий'"},null,512),[[o["vModelText"],e.content]])]),L],32)])])):Object(o["createCommentVNode"])("",!0),Object(o["createElementVNode"])("h3",R,"Комментарі ("+Object(o["toDisplayString"])(e.comments_count)+")",1),(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(e.Post.comments,e=>(Object(o["openBlock"])(),Object(o["createElementBlock"])("ul",M,[Object(o["createElementVNode"])("li",$,[Object(o["createElementVNode"])("img",{class:"media-object img-rounded",src:"http://127.0.0.1:8000"+e.author.profile_img,alt:""},null,8,z),Object(o["createElementVNode"])("div",U,[Object(o["createElementVNode"])("div",A,[Object(o["createElementVNode"])("div",I,Object(o["toDisplayString"])(e.author.username),1),Object(o["createElementVNode"])("div",H,[Object(o["createElementVNode"])("span",F,Object(o["toDisplayString"])(e.created_date),1)])]),Object(o["createElementVNode"])("div",G,Object(o["toDisplayString"])(e.text),1)])])]))),256))])}var J=a("bc3a"),K=a.n(J),Y=a("ad3d"),Z=a("c074"),q=a("ecee"),Q=a("0180");q["c"].add(Z["c"]);var X={name:"post_page",props:["slug"],components:{"font-awesome-icon":Y["a"]},data:()=>({Post:[],user:{},content:"",like_status:"",comments_count:"",selected_file:null,tags_count:"",likes_count:"",popular:[],toast:Object(Q["c"])(),markers:[],marker_id:1,latLang:[],LegPoints:[],map:null,directionsService:new google.maps.DirectionsService,_directionsRenderer:new google.maps.DirectionsRenderer,bounds:new google.maps.LatLngBounds,mapOptions:{center:{lat:35,lng:100.644},zoomControl:!0,zoom:3,gestureHandling:"auto"},status:"ok"}),created(){this.loadPost(),this.loadPopularPosts(),this.user=this.$store.state.cuser,window.addEventListener("scroll",this.handleScroll)},destroyed(){window.removeEventListener("scroll",this.handleScroll)},methods:{async loadPost(){K()({url:`${this.$store.getters.getServerUrl}api/v1/blog/${this.slug}`,method:"GET",headers:{"Content-type":"application/json"}}).then(e=>{this.Post=e.data,this.comments_count=e.data.comments.length,this.tags_count=e.data.tags.length,this.likes_count=e.data.likes.length,e.data.likes.includes(this.$store.state.cuser.username)?this.like_status="like":this.like_status="unlike",0!==e.data.waypoints.length&&(this.map=new google.maps.Map(this.$refs.googleMap,{center:{lat:35,lng:100.644},zoomControl:!0,zoom:3,gestureHandling:"auto"}),this.initMap(e))}).catch(e=>{console.log(e)})},async Like(){const e=new FormData;e.append("id",this.$store.state.cuser.id),K()({url:this.$store.state.backendUrl+"api/v1/like/"+this.Post.id,data:e,method:"POST"}).then(e=>{this.loadPost()})},async Unlike(){const e=new FormData;e.append("id",this.$store.state.cuser.id),K()({url:this.$store.state.backendUrl+"api/v1/unlike/"+this.Post.id,data:e,method:"POST"}).then(e=>{this.loadPost()})},create:function(){const e=new FormData;e.append("author_id",this.user.id),e.append("text",this.content),K()({url:this.$store.state.backendUrl+"api/v1/comment_create/"+this.slug,data:e,method:"POST"}).then(e=>{this.content="",this.toast.success("Комментарий создан и отправлен на рассмотрение")}).catch(e=>this.toast.error("Произошла ошибка: "+e))},async loadPopularPosts(){K()({url:this.$store.state.backendUrl+"api/v1/blog?limit=3&search=&date=month&ordering=descending",method:"GET",headers:{"Content-type":"application/json"}}).then(e=>{this.popular=e.data.results})},goTo(e){this.$router.push({name:"post",params:{slug:e}})},getRoutePointsAndWaypoints(e){this.drawRoutePointsAndWaypoints(e)},drawRoute(e,t,a){var o="";o=a.length>0?{origin:e,destination:t,waypoints:a,optimizeWaypoints:!0,travelMode:google.maps.DirectionsTravelMode.DRIVING}:{origin:e,destination:t,travelMode:google.maps.DirectionsTravelMode.DRIVING};var c=this;this.directionsService.route(o,(function(e,t){t==google.maps.DirectionsStatus.OK&&c._directionsRenderer.setDirections(e)}))},drawRoutePointsAndWaypoints(e){var t=new Array;if(e.length>2){for(var a=1;a<e.length-1;a++){var o=e[a];""!==o&&t.push({location:o,stopover:!0})}this.drawRoute(e[0],e[e.length-1],t)}else e.length>1?this.drawRoute(e[this.latLang.length-2],e[e.length-1],t):this.drawRoute(e[this.latLang.length-1],e[e.length-1],t)},placeMarker(e,t){return t.id=this.marker_id,this.marker_id++,this.markers.push(t),t},initMap(e){this._directionsRenderer.setMap(this.map),this._directionsRenderer.setOptions({draggable:!0,suppressMarkers:!0});var t=this;for(var a in e.data.waypoints){var o={lat:Number(e.data.waypoints[a].lat),lng:Number(e.data.waypoints[a].lng)};let c=new google.maps.Marker({position:o,map:this.map});t.latLang.push(o),t.LegPoints.push(""),t.getRoutePointsAndWaypoints(t.latLang),t.placeMarker(this.map,c);c.id}google.maps.event.addListener(this._directionsRenderer,"directions_changed",(function(){var e=this._directionsRenderer.directions.routes[0];CreateRoute(e),t.map.getZoom()}))},handleScroll(){document.body.scrollHeight/2<window.pageYOffset&&"sent"!==this.status&&K()({url:this.$store.state.backendUrl+"api/v1/add_view/"+this.Post.slug,method:"GET"}).then(this.status="sent")}}},ee=(a("06f2"),a("d959")),te=a.n(ee);const ae=te()(X,[["render",W],["__scopeId","data-v-07df4c70"]]);t["default"]=ae},"72ef":function(e,t,a){}}]);
//# sourceMappingURL=chunk-a236e4fa.95abf388.js.map