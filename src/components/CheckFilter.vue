<template>
    <div v-bind:class="{ 'check-filter': true, active: checked }" v-on:click="checkFilter">
        <span class="checkbox"></span>
        <span class="check-filter-title"> {{ title }}</span>
    </div>    
</template>
<script>
export default {
    data() {
        return {
            checked: false
        }
    },
    props: ['title','category'],
    methods: {
        //On the parent of the check-filter component we will
        //then have an event listener.
        checkFilter() {
            //Instead of having the checked on the event
            //listener, we move it to the method so that it be
            //called together the emit method.

            this.checked = !this.checked;

            //this.$emit('check-filter', this.category, this.title, this.checked);
            
            //Instead of us using the emit as above, we instead use the bus
            //instance as:

            this.$bus.$emit('check-filter', this.category, this.title, this.checked);

        } 
    } 
}
</script>