<template>
    <div id="day-select">
        <ul class="days">
            <!-- We then change the selected data property depending on the
            clicked date. Then using css make a visual representation to
            indicate whether the day is selected or not. Instead of us doing a
            class="day", we use the v-bind directive with day always set to true
            and active class with method selecting the active day.  Since
            receiving the date from root, on select we will call a method
            selectDay(day) instead of selected = day.-->
            <li v-bind:class="{ day: true, active: isActive(day)}" v-for="day in days" :key="day.id" v-on:click="selectDay(day)">
                {{ formatDay(day) }}
            </li>
            <!-- with the mobile view we will have a different view since they
            won't all fit to the mobile in the state above. With the class and
            span below, the css has been set to only show in the mobile view
            port. The spans will be set to listed to a click event that is gonna
            trigger a method called change day-->
            <li class="day-selector">
                <span class="dec" v-on:click="changeDay(-1)"></span>
                <span class="inc" v-on:click="changeDay(1)"></span>
            </li>
        </ul>
    </div> 
</template>

//We then need to have an <li></li> for each of the coming days which happen to
be arbitrary and therefore, cannot be hard coded. hence captured in the script
as below:

<script>
export default {
    props: [ 'selected' ],
    data() {
        return {
            //to the days data property we will assign an array. A number for
            //each of the coming days of the current week. Then using the map
            //function, it will act on each oif the numbers and and generate new
            //values depending on the defined call back function.  
            //We will alias each one as num, then using the moment constructor
            //we will create a new date on todays date. thus pass nothing to the
            //constructor. Using the add method, that takes in two argument, i.e
            //how much you want to add, and the granularity which in this case
            //is days.  This returns 7 running objects one for each of the
            //numbers, starting with todays date. We then have to make our dates
            //selectable.  By first creating a data property selectable and set
            //it to the current date. It will then be updated on change.

            //selected: this.$moment(), //Do away with this since the day
            //selected will be passed down from the root.
            days: [0, 1, 2, 3, 4, 5, 6].map(num => this.$moment().add(num, 'days')            )
        };
    },
    methods: {
        //For a better UX we will format todays date to TODAY instead of showing
        //the date else let the date be formatted to a User redable date. 
        formatDay(raw) {            
            if (raw.isSame(this.$moment(), 'day')) {
                return 'Today'
            } else {
                return raw.format('ddd DD/MM');
            }
        },
        isActive(day) {
            return day.isSame(this.selected, 'day');
        },

        selectDay(day) {
            //If a different date is selected, a new event is emitted in this
            //case set-day with a payload of the selected date. Which we then
            //listed to in our root instance.
            this.$bus.$emit('set-day', day);
        },

        changeDay(change) {
            //from the selected day add or subtract one day. let newDay =
            //this.selected.add(change, 'days'); This will update the payload
            //but not update the dates. We therefore pass the date into the
            //moment.js  then do the update. To prevent going too low or too
            //high, we ensure it is in the days array.
            let newDay = this.$moment(this.selected).add(change, 'days');
            if (this.days.find(day => newDay.isSame(day, 'day'))) {
                this.selectDay(newDay);
            }
        }
    }
}
</script>