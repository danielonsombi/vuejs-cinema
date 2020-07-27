/**************** PROPS **************
 *
 * Are used to pass data from a parent to the children through html properties.
 *
 *  Say, in our DOM we have a template:     
 *      <div id="exmple"> //That calls our component:  
 *          <my-component somedata="From the Parent"></my-component> </div>
 *
 * //Then the vue instance:  
 *   new Vue({ el: '#example' });
 *
 * The child component can use the somedata data if it registers it as a prop.
 * as:
 *
 * Vue.component('my-component', {template: `<div> {{ somedata }} </div>`,
 *  props: ['somedata']
 * })
 *
 * For dynamic data we use the v-bind directive which allows for child data
 * update when the parent data is changed as  
 * <my-component v-bind:somedata = "parentdata"></my-component>
 *
 * Having the span of class checkbox is not checkable and we have therefore to
 * implement it in a way to make it so.
 *
 * Can do this by first having a data function, with the checked initially set
 * to false then toggle it on click. When checked a class active is added to the
 * "<div class="check-filter" v-on:click="checked = !checked">" div. Implying
 * that we need to make our class reactive using the v-bind directive.
 *
 * Our new class is then defined as an object with the active class set to the
 * checked value becomes: <div v-bind:class="{ 'check-filter': true, active: checked }" v-on:click="checked =
 * !checked">
 *
 *
 */

/****************** Custom Events ******************************
 *
 * We may also want the child to send or rather the parent to receive data from
 * the child then we emit a custom event from the child and have the parent
 * listen to it.
 *
 * on the child we create an event say calling a method within the same instance
 * called emitEvent. The emit event then using the $emit method sends the
 * request to the parent component.
 *
 * The first parameter of the $emit method being the name of the event and this
 * is very important to note. as:  
 *  Vue.component('my-component', {  
 *      template: `<div v-on:click = "emitEvent"></div>`, methods: {  
 *          emitEvent() {  
 *              this.$emit('customevent', 'From Child');
 *          }
 *      }
 *  });  
 *
 * On the root component, we then create an event listener to listen to our
 * custom event, also have an event handler. This is created/registered the same
 * way we created a prop. as:  
 *
 *  <div id="example">
 *      <my-component v-on:customevent="eventHandler"></my-component>
 *  </div>
 *
 *  new Vue({el: '#example', methods: { eventHandler(msg) { //do some stuff }}
 *  })
 *
 * From Our DFD for us to select the moview then we select a filter from the
 * check filters, this emitsa event that is sent back to the movie filter ->
 * Overview -> MovieList components then selects all the movies related to our
 * checked filters.
 *
 * We therefore emit a custom event from our checkfilter component which is then
 * received in our movie filter event, and we now need our root event to receive
 * it. Unfortunately you cannot go directly from the check-filter to the movie
 * instance cause it does not work that way. We therefore have our movie filter
 * to emit an event too which is to be received by our root instance.
 *
 * If you go to the devtools, under the event section, you'll notice that there
 * are two events that are logged there in whenever one of the check filters are
 * clicked. The first is from the checkFilter component, the second is emitted
 * by the moviefilter component which is the parent component of the checkfilter
 * component.
 *
 * Note: We need to send some information in our custom events. This is done by
 * adding a payload to our custom event. This is done by having a number of
 * arbitrary arguments within our emit method after the first being the name of
 * the event.
 *
 * For our example, first we can pass the kind of filter it was, then pass the
 * name of the filter then the state of the checkbox.
 *
 * The arguments from the child component will automatically be passed to the
 * event handler. Once the arguments are passed to the root components through
 * the payloads, then our components have all it takes in order to filter the
 * movie list.
 *
 * We do this by basically having two arrays one for genre and the other for
 * time. This corresponds to the two filters that we have got.
 *
 * The way the check filter event works, is when a new event is triggered and
 * this event called, it checks if checked then add it to an array else remove
 * it.
 *
 * All the filtering is to be done in the MovieList component and therefore all
 * the data received from the filters and updated to the data filters, is then
 * to be passed down to the movieList component. This therefore calls for
 * creation of props in the movieList component.
 *
 * Once done we then have to bind the data to the components in the DOM/template
 * with the data in our data property in our root component 
 *
 * Note that whenever the checkfilters are clicked, since they are reactively
 * linked to the root instance, they will automaticall be populated with data
 * whenever an item is selected from the filters.
 *
 * With this we find the child component emitting an event that is sent way up
 * to the root component then down to the movie list component.
 *
*/



/********************* Single File Components:  **************************
 *
 * They are a type of file more like html. They have a template a script and
 * style. The difference from having to use it directly is when using single
 * file component, you have to first import it in the main js or on the parent
 * component before you use it.
 *
 * One Limitation is that you have to use the webpack or any other compiler
 * since the normal browsers cannot directly intepret this files.
 *
 * In the webpack config file, you'll notice a set of rules, included is a test
 * for the .vue extension files that use the vue loader to have them compiled
 * and loaded. They vue loader, is a webpack loader created by the vue team It
 * extract the html from the template, the javascript and the css then loads it
 * through the other loaders the script through the Babel, the css through css
 * loader etc.
 *
 * We can change the type of loaders it uses depending on you preferences.
 *
 * We have the Api_sample.json file which has a listing of all the movies and
 * the sessions attached to each one of them. Included is a poster property that
 * has a link to the movie image/poster.
 *
 * We will use the vue resource library. It used to be a file maintained by the
 * vue team. Note that to use the vue resource's $http method, you must be
 * within the vue instance scope. the vue resource is promise based so it
 * returns a promise and we append a then to it. In our server.js you'll notice
 * that our api is http.get and using the /api url.
 *
 *
*/

/********************* *************************
 *
 * The vue.use() API Method installs the vue-resource module to be an instance
 * method of our main vue instance object. To test if it is working, we can use
 * the created life cycle hook to print out to the console ->
 * console.log(this.$http); Vue.use(VueResource);
 *
 * As Opposed to the vue resource, moment library is not set to directly
 * integrate with vue thus it has to be installed globally using the vue
 * prototype.
 *
 * The Code below creates a public api $moment which is similar to the $http
 * method. And since every component has access to the vue instance root, we can
 * //then call the moment data Object.defineProperty(Vue.prototype, '$moment',
 * { get() {return this.$root.moment }});
 *
 * Using the moment library we can then set our time zone. The time zone should
 * be equal to that set in the server.js. Using the moment.tz.setDefault()
 * method overrides the browsers default time zone.
 *
 *
 * We then have to sort our movies by date. We therefore need a static date
 * which we can generate using the moment() method as day: moment(). This
 * generates todays date as the defualt.
*/

/**********************  Vue Essentials Event Bus. ****************
 *
 *                        Root Instance
 *
 *
 *              Overview                 Detail
 *
 *
 * DaySelect    MovieFilter    MovieList
 *
 *
 *              CheckFilter             MovieItem
 *
 * From the flow diagram if we want to pass the data from the checkfilter to
 * Movie Item, then we pass data to the MovieFilter then to overview then down
 * to MovieList then to MovieItem.
 *
 * There is a solution to avoid this prop event kind of system for bigger apps.
 * This is by use of a global event bus with the concept being, you create an
 * instance of vue which is assigned to a constant bus and to it no
 * configuration is passed nor is it passed to the DOM. But as long as all our
 * components have access to our bus, they can use the instance of vue to emit
 * and receive events. as:  
 *
 * const bus = new Vue();  
 *
 * Vue.component('my-component', {  
 *      template: '<div>This is a component.</div>',  
 *      methods: {  
 *          emitEvent() {bus.$emit('customEvent');}  
 *  }  
 * });
 *
 *
 * Once this is done, any other component that has access to the bus component,
 * inside the created hook can use:
 *
 * new Vue({el: '#example', methods: {eventHandler() { //do some stuff }},
 *      created() {bus.$on('customevent', eventhandler);
 *      }
 * })
 *
 * On the created hook it subscribes to the event earlier created.
 *
 *
*/

/*************************** Vue Router  ******************************  
 * In a traditional website we have different pages loading at different routes
 * and when the user goes to the different urls the server shows them different
 * pages.
 *
 * But with JS framework like vue, the server only loads one page, and it is the
 * framework that makes all the alterations and no need for different routes.
 *
 * For instance if the user wanted to access the details page, then the vue
 * router comes in handy. The Vue router allows you to put in different urls and
 * simulate changing pages.
 *
 * The Vue Router works by mapping different routes to different components.
 * Anything you want to display as a different page is handled by this library.
 * e.g:  
 *
 * const router = new VueRouter({    
 *      routes: [  
 *          {path: '/foo', component: Foo},  
 *          {path: '.bar', component: Bar}  
 *      ]  
 * });    
 *
 * new Vue({  
 *      el: '#app',  
 *      router: router  
 * })  
 *
 * We create it by first creating a new instance of it. Then we pass the
 * configuration opject with the main property being the routes. It defines the
 * path  and the component you want to load/display when the path is accessed. 
 *
 * Then the configuration is included in your vue instance.
 *
 * Now that we have different routes for different components, we use the
 * <router-view></router-view> component which is a custom component that comes
 * with the vue router.
 *
 * Vue router also offers another component <router-link></router-link> that
 * renders to the DOM as an anchor tag but it is handy for it is able to link to
 * the named paths rather than to the exact urls. 
 *
 *
 *For our application, we have to cut out some of the main.js content and have
 *it on the overview component to allow us setup the vue-router functionality.
 *
 *In order for vue Router to work, we need the router-view component in our
 *application. This works by having the router view in our index page and as the
 *application changes, router vue will populate that component with whatever
 *path that matches the component you've got.
 *
 * Therefore change our index file component from overview to router-view.
 *
 * On changing to the use of the router-view component, our projects route url
 * is changed to /#/ from /. On accessing the vue devtools, you'll also notice
 * that the keyword router-view is appended to the currently loaded path.
 *
 * With the vue router in place, we don't need to import the overview file in
 * our main.js file since won't be used there anymore..
 *
 * The hash that is appended to our url, if i were to change the url from /#/ to
 * /test, this tells the browser to go the the new url test. But anything you
 * put after a hash it ignores. This is a special trick that vue-router uses to
 * integrate a router and to get the front end to take care of the urls and not
 * relay this info back to the server and not reload the page.
 *
 *  When we use the /test we get a 404 since we don't have the page. But if we
 *  use /#/test we dont get a 404 cause the page doesn't reload. We can see a
 *  change to our page since vue router is currently working and is trying to
 *  render the test router that does not exist but never reloads the page. Vue
 *  router can as well work without a hash only that it is a complicated
 *  process.
 *
*/

/******************Creating a Detail Page ***********************************
 *
 * We then create a Detail.vue component that we will include in our routes. If
 * we change the url to whichever the path we assign it, it will display the
 * content of the route. We then create the router link on our movie item
 * component that will make it possible to change the url whenever someone
 * clicks on it
 *
 * We can then create a capture all route that redirects the user to a 404 page
 * or for our case, to the home page using the redirect key word
 * 
*/

/************************* Passing movie ID to detail page ***************
 *
 * On clicking the title we not only need to redirect to the /movie but to the
 * /movie/imdbID. We will achieve this using the Detail component and appending
 * the ID of the clicked movie to its url.
 *
 * Therefore we modify our url from /movie to /movie/:id. The colon indicates
 * that the second part of our path is a parameter.
 *
 *
*/

/************************** Displaying movie-item in detail page
 * ****************
 *
 * To display the movie content, we have to pass the full array of movies into
 * our detail.vue component as a prop.
 *
 * Note that the router-view component either loads the Overview or the Detail
 * component depending on the clicked path. And therefore the passed down
 * properties can include ones for the detail and overview component. Since the
 * overview component had the movies property, there is no need to recreate it
 * in the router-view props. So we only have to register it in our detail.vue
 * component. Note that it is not important or mandatory to register all the
 * props passed down from the parent on the child component. Just register the
 * ones you are to use.
 * 
 *
*/

/*********************** Displaying movie-item in detail *****************
 *
 * Now that we have access to the correct movie id, we can filter the movie list
 * and get the info to our display.
 *
*/



/***************************** Slots **************************************
 *
 * <slot> elemets can be used whenever one wants to interweave the parents
 * content in with the child component. Thus can be used to serve as
 * distribution outlet for the parent content.
 *
 * As:  
 *
 * <div id="example">  
 *    <my-component>  
 *      <p>Content from the Parent</p>
 *    </my-component>  
 * </div>  
 *
 *Using slots as:
 *
 * vue.component('my-component', {  
 *  template: `<div>  
 *               <p>Content From the child Componet </p>  
 *               <slot></slot>  
 *             </div>`  
 * });  
 *
 *
 * This renders as:
 *
 * <div id="Example">  
 *  <p>Content from the child component</p>  
 *  <p>Content from Parent</p>  
 * </div>  
 *
 *
 *
*/

/************* Creating day-select component. *********
 *
 * It is a child of the overview component. and will be showing all the movies
 * for the days of the week. 
 * The structure of our day-select component is an in-line unordered list 
 * 
 * */
/******************************* DIRECTIVES: **********************************
 *
 * While working with directives, we can get the error [Vue warn]: You may have
 * an infinite update loop in a component render function.(found in component
 * <DaySelect> at
 * C:\DEVELOPMENT\JS\Workspace\vuejs-cinema\src\components\DaySelect.vue)
 *
 * Which can ba as a result of writing the :click="" instead of using the
 * v-on:click=""
 *
 * Note that we will use the day select to filter our movies and therefore has
 * to be passed down to our movie items.
 *
 * Therefore we need to set it in a way that whenever one clicks the  <li> it is
 * to emit a custom event received at our root instance.
 *
 * To do this we need to pass day down from the root instance, as a prop.
 * Therefore from root, pass down the day as a prop to the overview component,
 * which we did already. Then pass it to the day-select component from the overview component.
 *
 *
*/


/**********************Custom Directives *******************************
 *
 * Vue offere directives out of the box e.g v-if, v-for, v-on etc. You can also
 * create your own using the vue.directive('mydirective', {});
 *
 * Then in your template you must prefix it with a v- as v-mydirective. It
 * provides several hook functions like bind - called when the directive is
 * first bound, Update - called when the containing component is updated.
 *
 * We do such directives because of maybe some low level dom operations that are
 * not easily done by the existing directives. The hook functions are passes
 * arguments that allow you to manipulate the element in question. An example is
 * the bind that can be used as:
 *
 *  vue.directive('mydirective', {  
 *      bind(el) {  
 *          el.innerHTML = 'changed by mydirective'  
 *      }  
 *  })  
 * 
*/



/******************* Adding tooltip custom directive *********************
 *
 * We will use custom directive to add this tool tipes from the movie.sessions
 * object in our API.
 *
 * We do this by adding an additional span to our session time markup. it is
 * going to add and remove items on hover and this a perfect scenario for us to
 * us custom events.
 *
 * We will capture the custom directive with a seats object as v-tooltip="{
 * seats: session.seats }"
 *
 * Once the above code is created under the movie list sessions, under the
 * main.js we create the directive, which can also be created in its own file.
 *
*/


/***********************  Plugins *****************************
 *
 * If you want to create a vue library that you can use on multiple projects one
 * way to do this is through vue plugins. Plugins allow you to have global level
 * functionality on your vue instance.
 *
 * Like the vue-router, how the plugins work:
 *
 * import MyPlugin from 'myplugin';  
 * Vue.use(MyPlugin);  
 *
 * The only way you can call the Vue.use() method is if the polugin exports with
 * an install(Vue) within which you can take the vue object and make any changes
 * that you may want to make the plugin available for whichever function it is
 * meant for.
 *
 * export default {  
 *  install(Vue) {  
 *      Vue.directive('my-directive', { })  
 *  }  
 * }  
 *
 * We will therefore make use of the plugins to make our tooltip to work. Not
 * that we started off with hard coded number of seats. The bindings arguments
 * in the vue directive, if logged to the console, shows the number of seats
 * available.
 *
 * Instead of us having the vue.directive in  the main js we can extract it to a
 * olugin that we can use.
 *
*/

/******* Adding Keep Alive to router to maintain filter state ***********
 *
 * On filtering, the movies are correctly filtered but if one selects one of the
 * movies then clicks the go back to result option, the filter functionality
 * remains but the initially marked/checked filters are unchecked.
 *
 * To keep them checked, we use the keep-alive functionality.
 *
 * Note that the genre and time data is captured on the root as can be seen in
 * the vue devtools. Whe one clicks on the movie to view the details, the filter
 * section together with the movie list are taken out of the DOM as the movie
 * details component is loaded. and since the vue-router is lower in hierachy as
 * compared to the root instance the genre and time data is retained.
 *
 * We can keep our filters active by using the keep-alive wrapper around the
 * router-view. The keep-alive tell the router that incase it removes the child
 * elements don't destroy them then recreate later, instead, keep them in
 * memory. 
 *
*/

/************************** How v-cloak works alongside webpack *********
 *
 * For better loading of our website v-cloak is very essential. To have it
 * incoporated, we wont be having it in our scss file which more of like a js
 * version of css for loaded in our main.js as import './style.scss', webpack
 * processes it into a javascript module. The concequence is, it does not
 * actually load until JS loads.
 *
 * Therefore, if we had our v-cloak rule, it won;'t actually load until our JS
 * has loaded. Thus, v-cloak has to be defined in the head for it to work.
 *
 * The other alternative is to use the extract text plugin for webpack which
 * will extract the css to a different file then load it to the head of the
 * document
 *
*/

/*********************** Building for production ********************
 *
 * In our package.json we have the build script. what it does, webpack will
 * create the build files, in our file system. We will now run the npm run build
 * command.
 *
 * The difference from before is that webpack was initially serving our files
 * from the webpack development server which runs in memory.
 *
 * Once it is done building it creates the dist folder which is minified and
 * optimized.
 *
 * We then change our env file from development to production.
 *
 * Now if we run the npm run start it will serve from the build file. You'll
 * notice as per to the server.js, the development option runs from the
 * webpack-dev-middleware whereas the production it serves the files statically
 * from the dist folder.  
 *
*/


/*************************** Introduction:  *******************************
 *
 * In this course we will consider the tools and techniques for building highly
 * optimized, and highly performing web user interfaces. 
 *
 * First we cover the vuex state management a special method to store data in
 * our app which essential for bigger and more complex apps.
 *
 * We then setup server side rendering from scratch - Where we compile and
 * render our app on the server, in order to basically improve page load time.
 *
 * The Case study project for this course is the google calender clone called
 * vuejs cinema that utilizes vuex, server side rendering, and host of other
 * optimizations.
 *
 * The secret behind server side rending is that we have the site rendered in
 * our server before we have it rendered to our page.
 *
 * The calender will give a clear complexion for the dates before today and a
 * greyed out complexion for the dates not within the current month. Also
 * provides a navigation  to the various months .  
 * Note that even if for this APP JS is turned off, and we refresh the page, we
 * still see something that is like a complete application but we cannot
 * interact with the page in any way cause JS is off but we can see the loaded
 * events thanks to server side rendering.
 *
 *
 *
 *
*/