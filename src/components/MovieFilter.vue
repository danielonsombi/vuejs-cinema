//One could think the best way to print out the genre is by printing
//<check-filter v-for="genre in genres">{{ genre }}</check-filter>
//directly in the child component as  but this won't work since the
//system wont know whether to use whatever is set in the template of
//the child component or the passed in string. Instead pass into the
//child component a property say title and for our case since we
//want to bind the genre we use v-bind as below:

//With the $bus there is also no need for the  v-on:check-filter="checkFilter"
on the check-filter component references


<template>
    <div id="movie-filter">
        <h2>Filter Results</h2>
        <h3> By Time of Day</h3>
        <div class="filter-group">
            <check-filter v-for="time in times" category="time" v-bind:title="time" :key="time.id"></check-filter>
        </div>
        <h3>By Genre</h3>
        <div class="filter-group">
            <check-filter v-for="genre in genres" category="genre" v-bind:title="genre" :key="genre.id"></check-filter>
        </div>
    </div>
</template>
<script>
import genres from '../util/genres';
import times from '../util/times';
import CheckFilter from './CheckFilter.vue'

export default {
     data(){
        return {
            genres,
            times
        }
    },
    
    //We then create an event handler that will be called on clicking
    //the checkFilter check boxes.

    //With the bus, there is therefore no need for the checkFilter Method on
    //subsequent parent components. 

    // methods: {  
    //     checkFilter(category, title, checked) {  
    //         //Emit the event to root.  
    //         this.$emit('check-filter', category, title, checked);  
    //     }  
    // },  
    
    //For components that are not to be
    //used outside the current component, you create a component
    //property inside the current component. They will only be available
    //within the movie-filter component
    components:{
        CheckFilter
    }
}
</script>




