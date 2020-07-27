import Vue from 'vue';
import './style.scss';

//No need to import the Overview once the routerview is in place cause the
//component is to be loaded in our routes..

//import Overview from './components/Overview.vue';

import VueResource from 'vue-resource';
import { checkFilter, setDay } from './util/bus';

//The vue.use() API Method installs the vue-resource module to be an instance
//method of our main vue instance object. To test if it is working, we can use
//the created life cycle hook to print out to the console ->
//console.log(this.$http);
Vue.use(VueResource);

import moment from 'moment-timezone';
//Set the time zone:
moment.tz.setDefault('UTC');


//As Opposed to the vue resource, moment library is not set to directly
//integrate with vue thus it has to be installed globally using the vue
//prototype.

//The Code below creates a public api $moment which is similar to the $http
//method. And since every component has access to the vue instance root, we can
//then call the moment data
Object.defineProperty(Vue.prototype, '$moment', { get() {return this.$root.moment }});

const bus = new Vue();

Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus }});

//Implement the vue router:
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//Create an Instance of Vue Router; The creates a path and the related
//component. This is the reason for us moving the MovieList and MovieFilter into
//the Overview component Then we need to add our vue router to the vue instance
//object which is done by assigning our vuerouter instance to a variable.
//To keep things nit, we keep our routs file in a separate file:

// const router = new VueRouter({
//     routes: [
//         { path: '/', component: Overview }
//     ]
// })  

//Our router becomes:
import routes from './util/routes';
const router = new VueRouter({ routes });

//Tooltip code initially captured in the Main.js transferred to util
import Tooltip from './util/tooltip';
Vue.use(Tooltip);

new Vue({
    el: '#app',
    router,

    data: {
        genre: [],
        time: [],
        movies:[],
        moment,
        day: moment(),
        bus        
    },

    //methods: {  
        //These code can then be transfered to a bus utility that is to handle
        // all our globally accessed methods.  
        // checkFilter(category, title,
        // checked) {  
        //     if (checked) {  
        //         this[category].push(title)  
        //     } else {  
        //         let index = this[category].indexOf(title);  
        //         if (index = -1) {  
        //             this[category].splice(index, 1);  
        //         }  
        //     }  
        // }    
    //},

    //Replaced on loading the router-view on our DOM.
    // components: {
    //     Overview
    // },

    created() {
        this.$http.get('/api').then(response => {
            //console.log(response); The response from our callback function
            //returns lots of data and objects. But we are interested in the
            //data object which is an array of movies. So we create a new data
            //property called movies to which we will push the returned movie
            //array to. From our template we then need to pass the movies from
            //the root to the movie list component
            this.movies = response.data;
        });

        //We then load our bus here: And since calling the imported function, we
        //use the bind method to bind our current instance to the function
        this.$bus.$on('check-filter', checkFilter.bind(this));

        //this.$bus.$on('set-day', (day)=> {this.day = day}); The call back will
        //be put in the bus util file to keep it clean. 
        this.$bus.$on('set-day',setDay.bind(this));
    }
});