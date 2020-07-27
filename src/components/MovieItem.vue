<template>
<!-- Instead of us using the movie.movie.Title, when creating the attribute
passed down as a prop to the movie-item template, we can bind the movie to
movie.movie so as to pass only the nested object down to the objects.  
{{ movie.movie.Title }} = {{ movie.Title }}-->
    <div  class="movie">
        <div class="movie-col-left">
            <router-link v-bind:to="{name: 'movie', params: { id: movie.imdbID}}">
                <img v-bind:src="movie.Poster">
            </router-link>
        </div>
        <div class="movie-col-right">
            <div class="movie-title">
                <!--- The router-link for navigation works like the anchor tag.
                  To pass the parameters we use the params property and assign
                  the movie id to it.-->
                <router-link v-bind:to="{name: 'movie', params: { id: movie.imdbID}}">
                    <h2>{{ movie.Title }}</h2>
                </router-link>
                <span class="movie-rating">{{ movie.Rated }}</span>
            </div>
            <slot></slot>
        </div>
    </div>
</template>
<script>

//Loaded from the Movie List
//import times from '../util/times';

export default {
    //Since we are using props, we will not need the initially set props and
    //session methods since they will all be transferred to the parent in this
    //case the MovieList.
     //props: [ 'movie', 'sessions', 'day', 'time' ],
     props: [ 'movie' ],
}
</script>


