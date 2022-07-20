<template>
<body>
        <div v-if="loading" class="preloader">
    <div class="preloader__image">
    </div></div>
  <div class="container mtb">
    <div class="row">
      <div class="col-lg-8">
        <div class="buy" data-aos="zoom-in" data-aos-delay="300">
            <button @click.prevent="buy()" class="btn btn-warning">Купить за {{ticket.price.total}}$</button>
            <div  v-for="segm in ticket.itineraries[0].segments" :key="ticket.id">
            <div class="ticket">Тривалість: {{format_date(segm.duration)}}</div>
            <div class="ticket">Звідки: {{segm.departure.iataCode}}</div>
            <h4 class="ticket">Відїзд: {{format_date(segm.departure.at)}}</h4>
            <div class="ticket">Куди: {{segm.arrival.iataCode}}</div>
            <h4 class="ticket">Прибуття: {{format_date(segm.arrival.at)}}</h4>
                </div>
             <hr v-if="ticket.itineraries[1]">
             <div v-if="ticket.itineraries[1]" v-for="segm in ticket.itineraries[1].segments" :key="ticket.id">

            <div class="ticket">Тривалість: {{format_date(segm.duration)}}</div>
            <div class="ticket">Звідки: {{segm.departure.iataCode}}</div>
            <h4 class="ticket">Відїзд: {{format_date(segm.departure.at)}}</h4>
            <div class="ticket">Куди: {{segm.arrival.iataCode}}</div>
            <h4 class="ticket">Прибуття: {{format_date(segm.arrival.at)}}</h4>
        </div>
        </div>


        <div  class="buy" data-aos="zoom-in" data-aos-delay="300">
            <div  >
            <div class="ticket">Тривалість: {{format_date(ticket.itineraries[tickets_i['it']].segments[tickets_i['fl']].duration)}}</div>
            <div class="ticket">Звідки: {{ticket.itineraries[tickets_i['it']].segments[tickets_i['fl']].departure.iataCode}}</div>
            <h4 class="ticket">Відїзд: {{format_date(ticket.itineraries[tickets_i['it']].segments[tickets_i['fl']].departure.at)}}</h4>
            <div class="ticket">Куди: {{ticket.itineraries[tickets_i['it']].segments[tickets_i['fl']].arrival.iataCode}}</div>
            <h4 class="ticket">Прибуття: {{format_date(ticket.itineraries[tickets_i['it']].segments[tickets_i['fl']].arrival.at)}}</h4>
                </div>
                        <button v-if="tickets_i['fl']>0 || tickets_i['it']>0" class="btn btn-theme" @click.prevent="prev_flight(ticket)">Минулий переліт</button>

            <button v-if="tickets_i['fl']<ticket.itineraries[tickets_i['it']].segments.length-1 || tickets_i['it']<ticket.itineraries.length-1  " class="btn btn-theme" @click.prevent="next_flight(ticket)">Наступний переліт</button>
             <hr v-if="ticket.travelerPricings[tickets_i['tr']]">
                <div  >
            <div class="ticket">Id: {{ticket.travelerPricings[tickets_i['tr']].travelerId}}</div>
            <div class="ticket">Білет: {{travalerType[ticket.travelerPricings[tickets_i['tr']].travelerType]}}</div>
            <h4 class="ticket">Ціна: {{ticket.travelerPricings[tickets_i['tr']].price.total}}</h4>
            <div class="ticket">Тариф: {{fareType[ticket.travelerPricings[tickets_i['tr']].fareOption]}}</div>
                </div>                        <button v-if="tickets_i['tr']>0" class="btn btn-theme" @click.prevent="tickets_i['tr']--">Минулий пасажир</button>

                        <button v-if="tickets_i['tr']<ticket.travelerPricings.length-1" class="btn btn-theme" @click.prevent="tickets_i['tr']++">Наступний пассажир</button>

                      <button v-if="seatmaps[tickets_i['fl']+tickets_i['it']*  ticket.itineraries[tickets_i['it']].segments.length]" class="btn btn-success" @click="show_s=true">Выбрать билеты</button>
                      <button v-else-if="seatmaps.length===0" class="btn btn-warning" >Завантаження...</button>
            <div class="btn btn-danger" style="cursor: default" v-else>Неможливо вибрати місця для рейсу</div>
<hr>
                <form class="form-detail">
                    <h3 class="btn btn-warning" style="cursor: default">Усі данні повинні бути введені на <b>англійскій </b>мові</h3>
				<div v-if="reqs['emailAddressRequired']===true && travelers_info[tickets_i['tr']]" class="form-row">
					<label for="email">Email</label>
					<input type="email" v-model="travelers_info[tickets_i['tr']].email" name="email" id="email" class="input-text" placeholder="Email" required>
				</div>            <div v-if="reqs['emailAddressRequired']===true && travelers_info[tickets_i['tr']]" class="form-row">
					<label for="full_name">Імя</label>
					<input v-model="travelers_info[tickets_i['tr']].full_name" type="text" name="full_name" id="full_name" class="input-text" placeholder="Імя" required>
				</div>
      <div v-if="reqs['emailAddressRequired']===true && travelers_info[tickets_i['tr']]" class="form-row">
					<label for="address">Адреса</label>
					<input v-model="travelers_info[tickets_i['tr']].address" type="text" name="address" id="address" class="input-text" placeholder="Вулиця, будинок" required>
				</div>

      <div v-if="reqs['emailAddressRequired']===true && travelers_info[tickets_i['tr']]" class="form-row">
					<label for="cityName">Місто</label>
					<input v-model="travelers_info[tickets_i['tr']].cityName" type="text" name="cityName" id="cityName" class="input-text" placeholder="Місто" required>
				</div>
      <div v-if="reqs['emailAddressRequired']===true && travelers_info[tickets_i['tr']]" class="form-row">
					<label for="countryCode">Код країни</label>
					<input v-model="travelers_info[tickets_i['tr']].countryCode" type="text" name="countryCode" id="countryCode" class="input-text" placeholder="Наприклад: UA" required>
				</div>

				<div v-if="reqs['mobilePhoneNumberRequired']===true && travelers_info[tickets_i['tr']]" class="form-row">
					<label for="phone">Телефон</label>
					<input v-model="travelers_info[tickets_i['tr']].phone" type="text" name="phone" id="phone" class="input-text" placeholder="Номер телефона" required>
				</div>
				<div v-if="reqs['phoneCountryCodeRequired']===true" class="form-row">
					<label for="pc">Код телефону країни</label>
					<input v-model="travelers_info[tickets_i['tr']].pc" type="text" name="pc" id="pc" class="input-text" placeholder="Код телефона країни" required>
				</div>
				<div v-if="reqs['emailAddressRequired']===true && travelers_info[tickets_i['tr']]" class="form-row">
					<label for="pcode">Поштовый індекс</label>
					<input v-model="travelers_info[tickets_i['tr']].pcode" type="number" name="pcode" id="pcode" class="input-text" placeholder="Номер телефона" required>
				</div>
				<div v-if="reqs['documentIssuanceCityRequired']===true && travelers_info[tickets_i['tr']]" class="form-row">
					<label for="phone">Місто  видачі документів</label>
					<input v-model="travelers_info[tickets_i['tr']].city" type="text" name="city" id="city" class="input-text" placeholder="Місто видачі документів" required>
				</div>
				<div v-if="reqs['documentRequired']===true && travelers_info[tickets_i['tr']]" class="form-row">
					<label for="phone">Документи</label>
					<input v-model="travelers_info[tickets_i['tr']].doc" type="text" name="docs" id="docs" class="input-text" placeholder="Документи" required>
				</div>
				<div v-if="reqs['dateOfBirthRequired']===true && travelers_info[tickets_i['tr']]" class="form-row">
					<label for="birth">Дата нарождення</label>
					<input v-model="travelers_info[tickets_i['tr']].birth" type="date" name="birth" id="birth" class="input-text" placeholder="Дата народження" required>
				</div>
				<div v-if="reqs['genderRequired']===true && travelers_info[tickets_i['tr']]" class="form-row">
					<label for="genderf">Стать</label>
					<div>Жіноча <input type="radio" name="gender" v-model="travelers_info[tickets_i['tr']].gender" id="genderF" class="input-text" placeholder="Стать" value="MALE" required></div>
					<div>Чоловіча <input type="radio" name="gender" v-model="travelers_info[tickets_i['tr']].gender" id="genderM" class="input-text" placeholder="Стать" value="FEMALE" required></div>
				</div>


			</form></div>


<vue-final-modal v-model="show_s"  :resize="true" :keep-changed-style="true" :esc-to-close="true"  :resize-directions="['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl']"
 classes="modal-container" content-class="modal-content">
<font-awesome-icon  class="modal__close" @click="show_s = false" :icon="['fas', 'times']"  />
        <span class="modal__title"><h3>Обрати білети</h3></span>
      <div class="modal__content">

          <div class="c" v-if="seatmaps[tickets_i['fl']]">
                 <div><h4 class="bold">Напої: <div v-if="seatmaps[tickets_i['fl']].aircraftCabinAmenities.beverage.isChargeable" class="ticket">Платные</div><div v-else class="ticket">Бесплатные</div></h4>{{ beverage[seatmaps[tickets_i['fl']].aircraftCabinAmenities.beverage.beverageType]}} </div><hr>
            <div><h4 class="bold">Їжа: <div v-if="seatmaps[tickets_i['fl']].aircraftCabinAmenities.food.isChargeable" class="ticket">Платные</div><div v-else class="ticket">Бесплатные</div></h4>{{ food[seatmaps[tickets_i['fl']].aircraftCabinAmenities.food.foodType]}} </div><hr>
            <div><h4 class="bold">Зарядки: <div v-if="seatmaps[tickets_i['fl']].aircraftCabinAmenities.power.isChargeable" class="ticket">Платные</div><div v-else class="ticket">Бесплатные</div></h4>{{ power[seatmaps[tickets_i['fl']].aircraftCabinAmenities.power.powerType]}} </div><hr>
            <div><h4 class="bold">Місце для ніг: </h4>{{ seatmaps[tickets_i['fl']].aircraftCabinAmenities.seat.legSpace +' '+  seatmaps[tickets_i['fl']].aircraftCabinAmenities.seat.spaceUnit}} </div><hr>
        <div><h4 class="bold">Розваги: </h4><div v-for="e in seatmaps[tickets_i['fl']].aircraftCabinAmenities.entertainment" :key="seatmaps[tickets_i['fl']].aircraftCabinAmenities.entertainment.id"><div  v-if="e.isChargeables" class="ticket">Платные {{ entertainment[e.entertainmentType]}}</div><div v-else class="ticket">Бесплатные {{ entertainment[e.entertainmentType]}}</div></div> </div><hr>

          <div class="plane">
  <div class="cockpit">
    <h3>________</h3>
    <h3>___________</h3>
    <h4>Літак №{{seatmaps[tickets_i['fl']].number}}</h4>
    <h4>До аеропорта {{seatmaps[tickets_i['fl']].arrival.iataCode}}</h4>
    <h4>Клас {{seatmaps[tickets_i['fl']].class}}</h4>
    <h3>________________</h3>
  </div>
  <div class="exit exit--front fuselage">

  </div>

  <ol class="cabin fuselage ">
    <li v-for="r in seatmaps[tickets_i['fl']].decks[0].deckConfiguration.length"  class="row " :class="'row--'+r">
              <ol class="seats" v-if=" travelers_info[tickets_i['tr']]">
            <li  v-for="c in seatmaps[tickets_i['fl']].decks[0].deckConfiguration.width" class="seat" @click.prevent=" select_seat(r,c)"  >
              <input v-if="seatmaps[tickets_i['fl']].decks[0].seats.find(x=>x.coordinates.x===r-1 && x.coordinates.y ===c-1) && travelers_info[tickets_i['tr']].seats[this.tickets_i['fl']+this.tickets_i['it']*  this.ticket.itineraries[this.tickets_i['it']].segments.length].seat"  type="radio" :checked="travelers_info[tickets_i['tr']].seats[this.tickets_i['fl']+this.tickets_i['it']*  this.ticket.itineraries[this.tickets_i['it']].segments.length].seat.number === seatmaps[tickets_i['fl']].decks[0].seats.find(x=>x.coordinates.x===r-1 && x.coordinates.y ===c-1).number" :id="seatmaps[tickets_i['fl']].decks[0].seats.find(x=>x.coordinates.x===r-1 && x.coordinates.y ===c-1).number +seatmaps[tickets_i['fl']].id" :disabled="validate_seat(seatmaps[tickets_i['fl']].decks[0].seats.find(x=>x.coordinates.x===r-1 && x.coordinates.y ===c-1).number) || ((seatmaps[tickets_i['fl']].decks[0].seats.find(x=>x.coordinates.x===r-1 && x.coordinates.y ===c-1).travelerPricing[0].seatAvailabilityStatus) !=='AVAILABLE' )  "/>
              <input v-if="seatmaps[tickets_i['fl']].decks[0].seats.find(x=>x.coordinates.x===r-1 && x.coordinates.y ===c-1)&& !travelers_info[tickets_i['tr']].seats[this.tickets_i['fl']+this.tickets_i['it']*  this.ticket.itineraries[this.tickets_i['it']].segments.length].seat" type="radio" :id="seatmaps[tickets_i['fl']].decks[0].seats.find(x=>x.coordinates.x===r-1 && x.coordinates.y ===c-1).number +seatmaps[tickets_i['fl']].id" :disabled="validate_seat(seatmaps[tickets_i['fl']].decks[0].seats.find(x=>x.coordinates.x===r-1 && x.coordinates.y ===c-1).number) || ((seatmaps[tickets_i['fl']].decks[0].seats.find(x=>x.coordinates.x===r-1 && x.coordinates.y ===c-1).travelerPricing[tickets_i['tr']].seatAvailabilityStatus) !=='AVAILABLE')  "/>
              <label v-if="seatmaps[tickets_i['fl']].decks[0].seats.find(x=>x.coordinates.x===r-1 && x.coordinates.y ===c-1) && !seatmaps[tickets_i['fl']].decks[0].seats.find(x=>x.coordinates.x===r-1 && x.coordinates.y ===c-1)['s']" @mouseover="seatmaps[tickets_i['fl']].decks[0].seats.find(x=>x.coordinates.x===r-1 && x.coordinates.y ===c-1)['s'] =((seatmaps[tickets_i['fl']].decks[0].seats.find(x=>x.coordinates.x===r-1 && x.coordinates.y ===c-1).travelerPricing[0].seatAvailabilityStatus) ==='AVAILABLE' )"  :for="seatmaps[tickets_i['fl']].decks[0].seats.find(x=>x.coordinates.x===r-1 && x.coordinates.y ===c-1).number+seatmaps[tickets_i['fl']].id" >  {{seatmaps[tickets_i['fl']].decks[0].seats.find(x=>x.coordinates.x===r-1 && x.coordinates.y ===c-1).number }}</label>
              <label v-if="seatmaps[tickets_i['fl']].decks[0].seats.find(x=>x.coordinates.x===r-1 && x.coordinates.y ===c-1) &&  seatmaps[tickets_i['fl']].decks[0].seats.find(x=>x.coordinates.x===r-1 && x.coordinates.y ===c-1).travelerPricing[tickets_i['tr']].price"  @mouseout="seatmaps[tickets_i['fl']].decks[0].seats.find(x=>x.coordinates.x===r-1 && x.coordinates.y ===c-1)['s'] =false"  v-show="seatmaps[tickets_i['fl']].decks[0].seats.find(x=>x.coordinates.x===r-1 && x.coordinates.y ===c-1)['s']" :for="seatmaps[tickets_i['fl']].decks[0].seats.find(x=>x.coordinates.x===r-1 && x.coordinates.y ===c-1).number+seatmaps[tickets_i['fl']].id">  {{seatmaps[tickets_i['fl']].decks[0].seats.find(x=>x.coordinates.x===r-1 && x.coordinates.y ===c-1).travelerPricing[tickets_i['tr']].price.total}}$</label>
      </li>

      </ol>
    </li>

  </ol>
  <div class="exit exit--back fuselage">
  </div>
</div>
         <div >

        </div>
</div>
      </div>
    </vue-final-modal>








  <div>
    <vue-final-modal v-model="show"  :resize="true" :keep-changed-style="true" :esc-to-close="true"  :resize-directions="['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl']"
 classes="modal-container" content-class="modal-content">
<font-awesome-icon  class="modal__close" @click="show = false" :icon="['fas', 'times']"  />
        <span class="modal__title"><h3>Пошук білетів</h3></span>
      <div class="modal__content">
 <div class="hline"></div>
    <div class="">
          <h4>Звідки </h4>
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
          <h4>Пассажиры</h4>
          <div class="btn btn-theme">Дорослі
              <vue-number-input class="form-control" v-model="adult" :min="1" :max="9-teen"  controls></vue-number-input>
</div>
          <div class="btn btn-theme" >Діти
              <vue-number-input class="form-control" v-model="teen" :min="0" :max="9-adult"  controls></vue-number-input></div>
              <div class="btn btn-theme" >Немовлята
              <vue-number-input class="form-control" v-model="baby" :min="0" :max="adult"  controls></vue-number-input>
</div>
                   <h4>Клас</h4>
          <div class="btn btn-theme">Економ <input type="radio" v-model="trip_class " name="popular" value="E"/></div>
          <div class="btn btn-theme">Преміум-економ <input type="radio" v-model="trip_class " name="popular" value="PE"/></div>
          <div class="btn btn-theme" >Бізнес <input type="radio" name="popular"  v-model="trip_class " value="B"/></div>
          <div class="btn btn-theme" >Перший <input type="radio" name="popular"  v-model="trip_class " value="F"/></div>
          <div><button @click="searchTickets"  class="btn btn-block btn-success">Знайти білети</button></div>
      </div></div>
    </vue-final-modal>
  </div>
      </div>
  <div data-aos="slide-right" data-aos-delay="300" class="col-lg-4">
      <button @click.prevent="show=true" class="find-tickets-btn btn btn-primary">Знайти білети</button>

        <aside v-if="user.username" class="single_sidebar_widget author_widget">
                        <img :src="user.profile_img" alt="Admin" class=" img-rounded rounded-circle profile_img">
          <h4>{{user.username}}</h4>
          <p>{{user.email}}</p>

          <div class="br"></div>
        </aside>

        <div class="spacing"></div>


        <h3 v-if="popular[0]">Популярні пости</h3>
        <ul class="popular-posts">
          <li data-aos="zoom-in" class="popular-post" v-for="post_p in popular" :key="post_p.id" @click.prevent = 'goTo("post",{slug:post_p.slug})'><img style="height: 8vh" :src="post_p.img" />
            <p><a href="">{{post_p.title}}</a></p>
            <em> <font-awesome-icon :icon="['far', 'clock']" />  {{post_p.date}}
             <div><font-awesome-icon :icon="['far', 'user']" />{{post_p.author}}</div><font-awesome-icon :icon="['far', 'comment']" />{{post_p.comments.length}} <font-awesome-icon :icon="['far', 'heart']" />{{post_p.likes.length}} <font-awesome-icon :icon="['far', 'eye']" />{{post_p.views}}</em>
          </li>
        </ul>

      </div>
    </div>
  </div>
</body>
</template>

<script>
    import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
    import Multiselect from "@vueform/multiselect";
    import VueNumberInput from "@chenfengyuan/vue-number-input";
    import {useToast} from "vue-toastification";
    import f from "./airport.csv";
    import md from "./flightsearch.md";
    import axios from "axios";

    export default {
        name: "ticket_single",
        inheritAttrs: false,
  emits: ['confirm', 'cancel'],
            components:{'font-awesome-icon': FontAwesomeIcon,Multiselect,VueNumberInput},
            data: () => ({
      listPosts: [],
        popular:[],
      user:{},
      total:0,
      date:"",
        adult:1,
        teen:0,
        baby:0,
        forward:'',
        back:'',
                reqs:[],
                tickets_i:{it:0,fl:0,tr:0},
                trip_class :'',
                food:{  "MEAL":"Їжа",
                "FRESH_MEAL":"Свіжа їжа ",
                "SNACK":"Снеки",
                "FRESH_SNACK":"Свіжі снеки"},
                power:{"PLUG":"Штекер",
                "USB_PORT":"USB",
                "ADAPTOR":"Адаптер",
                "PLUG_OR_USB_PORT":"Штекер або USB"},
                beverage:{
                "ALCOHOLIC":"Алкогольні",
                "NON_ALCOHOLIC":"Безалкогольні",
                "ALCOHOLIC_AND_NON_ALCOHOLIC":"алкогольні і безалкогольні"},
                entertainment:{"LIVE_TV":"TV",
                "MOVIES":"фильмы",
                "AUDIO_VIDEO_ON_DEMAND":"аудіо і відео",
                "TV_SHOWS":"TV шоу",
                "IP_TV":"IP TV"},
                travalerType:{        "ADULT":"Дорослий",
        "CHILD":"Дитина",
        "SENIOR":"Похилого віку",
        "YOUNG":"Молодий",
        "HELD_INFANT":"Немовля",
        "SEATED_INFANT":"Сидяче немовля",
        "STUDENT":"Ученик"},
                fareType:{        "STANDARD":"Стандарт",
        "INCLUSIVE_TOUR":"Інклюзивный тур",
        "ADULT_WITH_COMPANION":"Дорослий із супутником",
        "COMPANION":"Супутник"},
                timezone:"UTC",
                traveler_id:1,
              modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD hh:mm:ss',
                        timeAdjust: '24:00:00',

      },
show:false,
show_s:false,
      orl:"",
      del:"",
        op:{},
        arar:{},
        ticket:{},
                travelers_info:[],
                seatmaps:[],
                    toast : useToast(),
                  loading:false,
            }),
        created() {
      this.loadTicket()
      this.loadPopularPosts()
      this.user = this.$store.state.cuser
                var data_airports = this.loadCsv(f);
      this.arar, this.op = data_airports

    },
      mounted() {
 console.log(this.$store.state)      },

      methods: {

        loadCsv(allText){
var ops = []
                    var mdd=md.join("")

    for (var i=1; i<allText.length; i++) {
        if(mdd.includes(allText[i][0])){


            var st ="";
            for (var j=0; j<allText[i].length-2; j++) {
                st+=allText[i][j]+" "
            }
            allText[i].push(st);
            ops.push(st)}
    }
    allText.shift()
    return allText, ops
    },

        async loadPopularPosts() {
        axios({url: this.$store.state.backendUrl+`api/v1/blog?limit=3&search=&date=month&ordering=descending`, method: 'GET',headers: {'Content-type': 'application/json',}}).then(response => {this.popular  = response.data.results})
      },
        async loadTicket(
        ){
                this.ticket = this.$store.state.ticket
            console.log("ticket = ")
console.log(this.$store.state.ticket)
            this.loading = true
            var data = "grant_type=client_credentials&client_id=JxlnVpGLZUn7fV3UPNYfT2IJc0lL1GbE&client_secret=t965p0PRI1cCBS9h"
            var token;
            var access = localStorage.getItem('access')
            if (access) {
                delete axios.defaults.headers.common["Authorization"];
            }
            await axios({
                url: 'https://test.api.amadeus.com/v1/security/oauth2/token',
                data: data,
                method: 'POST',
                headers: {"Content-type": "application/x-www-form-urlencoded"}
            }).then(response => {
                token = response.data.token_type + " " + response.data.access_token
            })
                var ticket = this.ticket
                data = {
  "data": {
"type":"flight-offers-pricing",
"flightOffers":
[ticket
]
}
}
            axios({
                url: 'https://test.api.amadeus.com/v1/shopping/flight-offers/pricing?forceClass=false',
                method: 'POST',
                data:data,
                headers: {"Authorization": token}
            }).then(res => {
                this.ticket = res.data.data.flightOffers[0], console.log(this.ticket),this.reqs = res.data.data.bookingRequirements, this.loading = false

            }).catch(err => {
                console.log(err), this.toast.error("Произошла ошибка или данный билет уже не доступен."), this.loading = false, localStorage.removeItem('tickets_arr')
                 setTimeout(function () {
      this.goTo('tickets');
  }, 5000);

            })
            access = localStorage.getItem('access')
            if (access) {
                axios.defaults.headers.common['Authorization'] = "JWT " + access
            }
                data = {
  "data":
[ticket
]
}
             await axios({
                url: 'https://test.api.amadeus.com/v1/shopping/seatmaps',
                method: 'POST',
                data:data,
                headers: {"Authorization": token}
            }).then(res=>{
                this.seatmaps = res.data.data
            }
            ).catch(err=>this.seatmaps=err)

                for(var i =0;i<this.ticket.travelerPricings.length;i++){
            this.travelers_info.push({email:"",full_name:"",phone:"",cityName:"",countryCode:"",address:"",pc:"",pcode:"",city:"",doc:"",birth:"",gender:""})
                                    this.travelers_info[i].seats=[]
                    for(var j =0;j<this.seatmaps.length;j++){
                                        this.travelers_info[i].seats.push({})

                                    }

                }

         },
      async searchTickets(){
        var data= "grant_type=client_credentials&client_id=JxlnVpGLZUn7fV3UPNYfT2IJc0lL1GbE&client_secret=t965p0PRI1cCBS9h"
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
if(this.back[0]){
                    var data2 = {"id":2,
                            "originLocationCode":this.del,
                            "destinationLocationCode":this.orl,
                            "departureDateTimeRange": {
                                "date": this.back.slice(0,10),
                                "time": this.back.slice(11)
                              }}
var dd = [data1,data2]
}
else{
    var dd = [data1]
}
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
  "originDestinations": dd,
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
        data = res.data.data,
         console.log(this.$store.state)
                  this.$store.dispatch('tickets_arr', { data })

         ,this.goTo("tickets",)
    }
    else {
        that.toast.error("Нет билетов в наличии"),this.loading = false
    }
})
    .catch(err => {console.log(err), that.toast.error("Введите валидные данные или попробуйте позже"),this.loading = false})
        console.log(this.$store.state.tickets)

          access = localStorage.getItem('access')
if (access) {
  axios.defaults.headers.common['Authorization'] = "JWT " + access
    }
                    },

      goTo(name,params) {
        let r = this.$router.resolve({
          name: name,params: params// put your route information in
        })
        window.location.assign(r.href)
      },
        format_date(data){
            if (data.includes("-")){
        return data.slice(0,10).replaceAll("-",".")+" "+data.slice(11,16)}
            else if(data.includes("P")){
                return data.replaceAll("P","").replaceAll("T","").replaceAll("D"," день(дней) ").replaceAll("H"," час(ов) ").replaceAll("M"," минут(а) ")
            }
        },
next_flight(ticket){if (this.tickets_i['fl']<ticket.itineraries[this.tickets_i['it']].segments.length-1){
    this.tickets_i['fl']++;
}
        else if(this.tickets_i['fl']>=ticket.itineraries[this.tickets_i['it']].segments.length-1 && this.tickets_i['it']<ticket.itineraries.length-1){
                this.tickets_i['it']++;
                this.tickets_i['fl']=0;

}
        },
prev_flight(ticket){if (this.tickets_i['fl']>0){
    this.tickets_i['fl']--;
}
        else if(this.tickets_i['fl']===0 && this.tickets_i['it']>0){
                this.tickets_i['it']--;
                this.tickets_i['fl']=ticket.itineraries[this.tickets_i['it']].segments.length-1;

}
        },
          select_seat(r,c){
            if(this.travelers_info[this.tickets_i['tr']].seats[this.tickets_i['fl']+this.tickets_i['it']*  this.ticket.itineraries[this.tickets_i['it']].segments.length].seat){
                if(                            this.travelers_info[this.tickets_i['tr']].seats[this.tickets_i['fl']+this.tickets_i['it']*  this.ticket.itineraries[this.tickets_i['it']].segments.length].seat.number === this.seatmaps[this.tickets_i['fl']].decks[0].seats.find(x=>x.coordinates.x===r-1 && x.coordinates.y ===c-1).number){
                           this.travelers_info[this.tickets_i['tr']].seats[this.tickets_i['fl']+this.tickets_i['it']*  this.ticket.itineraries[this.tickets_i['it']].segments.length] = {}
                }
                else{
                                                this.travelers_info[this.tickets_i['tr']].seats[this.tickets_i['fl']+this.tickets_i['it']*  this.ticket.itineraries[this.tickets_i['it']].segments.length].seat = this.seatmaps[this.tickets_i['fl']].decks[0].seats.find(x=>x.coordinates.x===r-1 && x.coordinates.y ===c-1)

                }

            }
            else{
                            this.travelers_info[this.tickets_i['tr']].seats[this.tickets_i['fl']+this.tickets_i['it']*  this.ticket.itineraries[this.tickets_i['it']].segments.length].seat = this.seatmaps[this.tickets_i['fl']].decks[0].seats.find(x=>x.coordinates.x===r-1 && x.coordinates.y ===c-1)

            }
            },
          validate_seat(seat){
            var t =false;

            for(var i =0;i<this.ticket.travelerPricings.length;i++){
            if(this.travelers_info[i].seats[this.tickets_i['fl']+this.tickets_i['it']*  this.ticket.itineraries[this.tickets_i['it']].segments.length].seat){

if(this.travelers_info[i].seats[this.tickets_i['fl']+this.tickets_i['it']*  this.ticket.itineraries[this.tickets_i['it']].segments.length].seat.number === seat && this.tickets_i['tr']!==i){
    t = true
            }

            }
                }
            return t

    },
         async buy(){
var p
                this.ticket = this.$store.state.ticket
            this.loading = true
            var data = "grant_type=client_credentials&client_id=JxlnVpGLZUn7fV3UPNYfT2IJc0lL1GbE&client_secret=t965p0PRI1cCBS9h"
            var token;
            var access = localStorage.getItem('access')
            if (access) {
                delete axios.defaults.headers.common["Authorization"];
            }
              await axios({
                url: 'https://test.api.amadeus.com/v1/security/oauth2/token',
                data: data,
                method: 'POST',
                headers: {"Content-type": "application/x-www-form-urlencoded"}
            }).then(response => {
                token = response.data.token_type + " " + response.data.access_token
            })
                var ticket = this.ticket
              for(var i =0;i<ticket.travelerPricings.length;i++){
                                for(var j =0;j<this.travelers_info[i].seats.length;j++){
                                if(this.travelers_info[i].seats[j].seat){
              ticket.travelerPricings[i].fareDetailsBySegment[j]['additionalServices']={             "chargeableSeatNumber":this.travelers_info[i].seats[j].seat.number }}}}
                data = {
  "data": {
"type":"flight-offers-pricing",
"flightOffers":
[ticket
]
}
}
var that =this

            await axios({
                url: 'https://test.api.amadeus.com/v1/shopping/flight-offers/pricing?forceClass=false',
                method: 'POST',
                data:data,
                headers: {"Authorization": token}
            }).then(res => {
                this.ticket = res.data.data.flightOffers[0],this.reqs = res.data.data.bookingRequirements,      p=res.data.data.flightOffers[0]

            }).catch(err => {
                console.log(err), this.toast.error("Произошла ошибка или данный билет уже не доступен."), this.loading = false, localStorage.removeItem('tickets_arr')
                 setTimeout(function () {
      that.goTo('tickets');
  }, 5000);

            })

            var travelers = []
             for(var k=0;k<this.ticket.travelerPricings.length;k++){
                 travelers.push({})
                 travelers[k]['id']=this.ticket.travelerPricings[k].travelerId
                 if(this.travelers_info[k]['birth']!==""){
                 travelers[k]['dateOfBirth']=this.travelers_info[k]['birth']}
                 if(this.travelers_info[k]['gender']!==""){
                 travelers[k]['gender']=this.travelers_info[k]['gender']}
travelers[k]['contact']={}
                 if(this.travelers_info[k]['email']!=="") {
                     travelers[k]['contact']['emailAddress']=this.travelers_info[k]['email']
                 }travelers[k]['contact']['phones']=[]
                                  travelers[k]['contact']['phones'].push({})
                 if(this.travelers_info[k]['pc']!=="") {
                     travelers[k]['contact']['phones'][0]['countryCallingCode']=this.travelers_info[k]['pc']
                 }
                 if(this.travelers_info[k]['phone']!=="") {
                     travelers[k]['contact']['phones'][0]['deviceType'] = "MOBILE"
                     travelers[k]['contact']['phones'][0]['number'] = this.travelers_info[k]['phone']
                 } travelers[k]['address']={}
                 if(this.travelers_info[k]['pcode']!=="") {
                     travelers[k]['address']['postalCode'] = this.travelers_info[k]['pcode']
                 }
travelers[k]['name']={ firstName: this.travelers_info[k]['full_name'].split(' ')[0],
                        lastName: this.travelers_info[k]['full_name'].split(' ')[1],}

             }
                                          var contacts = []
                 contacts.push({})
contacts[0]['address']={}

                 if( this.travelers_info[0]['cityName']!=="") {
                     contacts[0]['address']['cityName'] = this.travelers_info[0]['cityName']
                 }
                 if(this.travelers_info[0] && this.travelers_info[0]['countryCode']!=="") {
                     contacts[0]['address']['countryCode'] = this.travelers_info[0]['countryCode']
                     contacts[0]['address']['postalCode'] = this.travelers_info[0]['pcode']
                 }
                 if(this.travelers_info[0] && this.travelers_info['address']!=="") {
                     contacts[0]['address']['lines'] = [this.travelers_info[0]['address']]
                 }
                 contacts[0]['addresseeName']={ firstName: this.travelers_info[0]['full_name'].split(' ')[0],
                        lastName: this.travelers_info[0]['full_name'].split(' ')[1],}
                 contacts[0]["companyName"]= "AMADEUS"
                 contacts[0]["purpose"]= "STANDART"
                 contacts[0]["emailAddress"]=  this.travelers_info[0]['email']
                 contacts[0]["phones"]= []
                 contacts[0]["phones"].push({})

              if(this.travelers_info[0]['phone']!=="") {
                     contacts[0]["phones"][0]['deviceType'] = "MOBILE"
                     contacts[0]["phones"][0]['number'] = this.travelers_info[0]['phone']
                 }

                 if(this.travelers_info[0]['pc']!=="") {
                     contacts[0]['phones'][0]['countryCallingCode']=this.travelers_info[k]['pc']
                 }
                 console.log(this.ticket===p)
                console.log(this.ticket)
                console.log(p)
                           data = {
  "data": {
"type":"flight-order",
"flightOffers":
[p
],
      "travelers":travelers,
      "contacts":contacts
}}
            await axios({
                url: 'https://test.api.amadeus.com/v1//booking/flight-orders',
                method: 'POST',
                data:data,
                headers: {"Authorization":  token}
            }).then(res => {
                 this.toast.success("Билет забронировн"),  this.loading = false, console.log(res.data)

            var data_ticket = res.data.data.id
             axios({
                url: this.$store.state.backendUrl+'api/v1/create_ticket',
                method: 'POST',
                data: {text_id:data_ticket,user_id:this.$store.state.cuser.id},
                headers: {"Authorization":"JWT " + localStorage.getItem('access')}
            }).then(res=>console.log(res.data.data))
            }).catch(err => {
                console.log(err.response.data.errors.find(e=>e.code===4926)), this.toast.error("Произошла ошибка или Вы ввели не валидные данные."), this.loading = false

                if(err.response.data.errors.find(e=>e.code===4926)){
                     setTimeout(function () {
                         localStorage.removeItem('tickets_arr')
      that.goTo('tickets');
  }, 5000);
                }
               })
             access = localStorage.getItem('access')
            if (access) {
                axios.defaults.headers.common['Authorization'] = "JWT " + access
            }

          }
    }}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>

<style scoped lang="scss">
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
.buy{
border-color: lightgrey;
    border-radius: 5px;
    border-style: solid;
    border-width: 1px;
    padding: 1%;
    margin:2%;
}
.ticket{
    display: inline-block;
    margin: 1%;
}
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
    *,*:before,*:after {
  box-sizing: border-box;
}
html {
  font-size: 16px;
}

.plane {
  width: 350px;
    margin-right:auto;
    margin-left: auto;
}
.close {
  position: absolute;
  right: 32px;
  top: 32px;
  width: 32px;
  height: 32px;
  opacity: 0.3;
}
.close:hover {
  opacity: 1;
}
.close:before, .close:after {
  position: absolute;
  left: 15px;
  content: ' ';
  height: 33px;
  width: 2px;
  background-color: #333;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}
.cockpit {
  height: 250px;
  position: relative;
  overflow: hidden;
  text-align: center;
  border-bottom: 5px solid #d8d8d8;
  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 500px;
    width: 100%;
    border-radius: 50%;
    border-right: 5px solid #d8d8d8;
    border-left: 5px solid #d8d8d8;
  }
  h1 {
    width: 60%;
    margin: 100px auto 35px auto;
  }
}
.exit {
  position: relative;
  height: 50px;
  &:before,
  &:after {
    content: "EXIT";
    font-size: 14px;
    line-height: 18px;
    padding: 0px 2px;
      margin: -20px;
    font-family: "Arial Narrow", Arial, sans-serif;
    display: block;
    position: absolute;
    background: green;
    color: white;
    top: 50%;
    transform: translate(0, -50%);
  }
  &:before {
    left: 0;
  }
  &:after {
    right: 0;
  }
}

.fuselage {
  border-right: 5px solid #d8d8d8;
  border-left: 5px solid #d8d8d8;
}

ol {
  list-style :none;
  padding: 0;
  margin: 0;
}

.row {

}

.find-tickets-btn{
    padding: 10%;
    border-radius: 10px;
    font-weight: bold;
    width: 100%;
}

.plane-desc{    margin-left: 40px;
    margin-top:10px;
    display: inline-block;
    max-width: 400px;
    position: absolute;
}
.c{
    margin-bottom: 10%;
}
.seats {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;

}

.seat {
  display: flex;
  flex: 0 0 14.28571428571429%;
  padding: 5px;
  position: relative;

  input[type=radio] {
    position: absolute;
    opacity: 0;
  }
  input[type=radio]:checked {
    + label {
      background: #F42536;
color: #EBEBEB;
      -webkit-animation-name: rubberBand;
          animation-name: rubberBand;
      animation-duration: 300ms;
      animation-fill-mode: both;
    }
  }
  input[type=radio]:disabled {
    + label {
      background: #dddddd;
        color:white;
      text-indent: -9999px;
      overflow: hidden;
      &:after {
        content: "X";
        text-indent: 0;
        position: absolute;
        top: 4px;
        left: 50%;
        transform: translate(-50%, 0%);
      }
      &:hover {
        box-shadow: none;
        cursor: not-allowed;
      }
    }
  }
  label {
              color:white;

    display: block;
    position: relative;
    width: 100%;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    line-height: 1.5rem;
    padding: 4px 0;
    background: #2e6da4;
    border-radius: 5px;
    animation-duration: 300ms;
    animation-fill-mode: both;

    &:before {
      content: "";
      position: absolute;
      width: 75%;
      height: 75%;
      top: 1px;
      left: 50%;
        color: gray;
      transform: translate(-50%, 0%);
          border-radius: 3px;
    }
    &:hover {
      cursor: pointer;
      box-shadow: 0 0 0px 2px #5C6AFF;
    }

  }
}

@-webkit-keyframes rubberBand {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }

  30% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
            transform: scale3d(1.25, 0.75, 1);
  }

  40% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
            transform: scale3d(0.75, 1.25, 1);
  }

  50% {
    -webkit-transform: scale3d(1.15, 0.85, 1);
            transform: scale3d(1.15, 0.85, 1);
  }

  65% {
    -webkit-transform: scale3d(.95, 1.05, 1);
            transform: scale3d(.95, 1.05, 1);
  }

  75% {
    -webkit-transform: scale3d(1.05, .95, 1);
            transform: scale3d(1.05, .95, 1);
  }

  100% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
}

@keyframes rubberBand {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }

  30% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
            transform: scale3d(1.25, 0.75, 1);
  }

  40% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
            transform: scale3d(0.75, 1.25, 1);
  }

  50% {
    -webkit-transform: scale3d(1.15, 0.85, 1);
            transform: scale3d(1.15, 0.85, 1);
  }

  65% {
    -webkit-transform: scale3d(.95, 1.05, 1);
            transform: scale3d(.95, 1.05, 1);
  }

  75% {
    -webkit-transform: scale3d(1.05, .95, 1);
            transform: scale3d(1.05, .95, 1);
  }

  100% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
}

.rubberBand {
  -webkit-animation-name: rubberBand;
          animation-name: rubberBand;
}
.img-rounded{
  max-height: 9vh;
  float: left;
  margin-right: 1%;
  border-radius: 50%;
}
</style><style scoped>
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 60%;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
    margin-top:auto;
    margin-bottom: auto;
}
.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__content {
  flex-grow: 1;
  overflow-y: auto;
    padding: 3%;
}
.modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
}
.modal__close {
  position: absolute;
  top: 2rem;
  right: 2rem;
    cursor: pointer;
}
</style>

<style scoped>
.dark-mode div::v-deep .modal-content {
  border-color: #2d3748;
  background-color: #1a202c;
}
</style>