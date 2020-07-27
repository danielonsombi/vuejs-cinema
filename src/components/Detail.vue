<template>
<!-- We then check if we have the value movie as returned from the movie
computed method.-->
    <div id="detail" v-if="movie">
        <movie-item v-bind:movie="movie">
            <!--Thanks to slots we can pass some content to our movie item. The
            details will come from the movie API.-->
            <div class="movie-details">
                <p class="movie-genre">{{ movie.Genre }}</p>
                <p class="movie-plot">{{ movie.Plot }}</p>
                <table>
                    <tr><td>Release date: </td><td>{{ movie.Released }}</td></tr>
                    <tr><td>Running time: </td><td>{{ movie.Runtime }}</td></tr>
                    <tr><td>Director: </td><td>{{ movie.Director }}</td></tr>
                    <tr><td>Cast: </td><td>{{ movie.Actors }}</td></tr>
                </table>
            </div>
        </movie-item>
        <div class="home">
            <router-link :to="{name: 'home'}">Back to results</router-link>
        </div>
    </div>
</template>
<script>
    import MovieItem from './MovieItem.vue'
    export default {
        //Get the props from the router-view component.
        props: ['movies'],

        //Using the computed property we filter for the receive imdbID parameter.
        computed: {
            movie() {
                //Note that we will return the movie if found by the callback
                //function but if one passes an invalid id, then we will get
                //undefined since it is the default result of the find method
                //when it doesn't find any matches. Therefore instead of us
                //returning the find methods result as return
                //this.movies.find(movie => movie.id ===
                //this.$route.params.id);, we assign it to a variable say movies
                //as shown below:

                let movie = this.movies.find(movie => movie.id === this.$route.params.id);
                return movie ? movie.movie : null;
            }
        },

        //Using the created hook we capture the id.
        // created() {
        //     //Note that, if we console log our $route, under the params method
        //     //exists the id of the object we are currently working with.
        //     //console.log(this.$route);  
        //     //Therefore, we utilize the this.$route.params.id to get the correct
        //     //movie data.

        //     console.log(this.$route.params.id);
        // },
        components: {
            MovieItem
        }
    }
</script>



