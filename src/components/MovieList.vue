//Instead of use looping through the "movie in movies" we will //instead loop
through the filtered movies. Which is to be obtained //from the computed
properties. Notice that when the app first loads the filteredMovies is empty and
thus it flushes the no result then loads the data
<template>
    <div id="movie-list">
        <div v-if="filteredMovies.length">
            <!--
                <div v-for="movie in filteredMovies" class="movie" :key="movie.id">
                    {{ movie.movie.Title }}
                </div>
                Instead of the above code we use the MovieItem as below:
            -->
            <movie-item 
                v-for="movie in filteredMovies" 
                :key="movie.id" 
                v-bind:movie="movie.movie" 
                >
                
                <div class="movie-sessions">
                <!-- Create a class tooltip-wrapper for the tooltip directive.
                Note that on hovering over the sessions the number of seats
                remail the same because vue sees it as an update of the same
                element. To prevent this we use a key for each of the sessions
                so that vue can see them as unique.-->
                    <div 
                    v-for="session in filteredSessions(movie.sessions)" 
                    :key="session.id" class="session-time-wrapper tooltip-wrapper"
                    v-tooltip="{ seats: session.seats }"
                    >
                    <!-- We will then add an event listener to the div below.-->
                        <div class="session-time"> {{ formatSessionTime(session.time) }}</div>
                    </div>
                </div>
                </movie-item>
        </div>
        <div v-else-if="movies.length" class="no-results">
           {{ noResults }}
        </div>
        <div v-else class="no-results">
            Loading...
        </div>
    </div>
</template>
<script>
import genres from '../util/genres';
import times from '../util/times';
import MovieItem from './MovieItem.vue';

    export default {
        //Now that our data is to be received from the API we do not need the
        //data below  
        // data: function() {  
        //     return {  
        //         movies: [  
        //             { title: 'Pulp Fiction', id: 1, genre: genres.CRIME},  
        //             { title: 'Home Alone', id: 2, genre: genres.COMEDY },  
        //             { title: 'Austin Powers', id: 3, genre: genres.COMEDY }  
        //         ]  
        //     };   
        // },  

        props: ['genre', 'time', 'movies', 'day' ],

        //It is a computed property because our props are reactive and
        //we want this property to recalculate whenever the props
        //cha nge.
        methods: {
                //Methods from Movie Item Passed down by slot.
                formatSessionTime(raw) {
                return this.$moment(raw).format('h:mm A');
            },

            filteredSessions(sessions) {
                //session => {  
                //     return this.$moment(session.time).isSame(this.day, 'day');  
                // }  
                //The code above could be used in the filter but since our
                //sessionPassesTimeFilter handles both day and time, we call it aS
                //callback function
                return sessions.filter(this.sessionPassesTimeFilter)
            },

            //It is to receive each and every movie to check if it is in the
            //requested category. If there were no genres selected, then
            //return true else filter as per to the genres.
            moviePassesGenreFilter(movie) {
                if (!this.genre.length) {
                    return true;
                } else {
                    let movieGenre = movie.movie.Genre.split(", ");
                    let matched = true;

                    this.genre.forEach(genre => {
                        if (movieGenre.indexOf(genre) === -1) {
                            matched = false;
                        }
                    });
                    return matched;
                }
            },

            sessionPassesTimeFilter(session) {
                //If session is not today then return false
                if(!this.day.isSame(this.$moment(session.time), 'day')) {
                    return false;
                } else if (this.time.length === 0 || this.time.length === 2) {
                    return true;
                } else if (this.time[0] === times.AFTER_6PM) {
                    return this.$moment(session.time).hour() >= 18;
                } else {
                    return this.$moment(session.time).hour() < 18;
                }
            }
        },

        computed: {
            filteredMovies() {
                //Using the filter method, we pass a callback function in
                //which we write the logic for filtering our movies. We do
                //this by creating a method that is to be our callback
                //function.
                return this.movies
                        .filter(this.moviePassesGenreFilter)
                        .filter(movie => movie.sessions.find(this.sessionPassesTimeFilter))
            },
            noResults() {
                let times = this.time.join(', ');
                let genres = this.genre.join(', ');

                return `No Results for ${times} ${ times.length && genres.length ? ', ' : ''} ${genres}`
            }
        },

        components: {
            MovieItem
        }
    }
</script>