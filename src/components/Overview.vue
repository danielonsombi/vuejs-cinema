//Code formally in the main.js that held the components will be transfered to
our template section.
<template>
    <div id="overview">
        <day-select v-bind:selected="day"></day-select>
        <div class="main">
            <movie-list 
                v-bind:genre="genre" 
                v-bind:time="time" 
                :movies="movies"
                :day="day"
                ></movie-list>

                <!-- No need for  v-on:check-filter="checkFilter" too since
                already handled by the $bus -->
            <movie-filter></movie-filter>
        </div>
    </div>
</template>
<script>
    import MovieList from './MovieList.vue';
    import MovieFilter from './MovieFilter.vue';
    import DaySelect from './DaySelect.vue';

    export default {
        props: ['genre', 'time', 'movies', 'day' ],
        components: {
            MovieList,

            //To Load our filters we will not hard code them but instead we will
            //load them from an external file in this case the genres.js
            MovieFilter,
            DaySelect
        },
    }
</script>