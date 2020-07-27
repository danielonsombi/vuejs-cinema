//From the helper in util import the add class then use it to add a class to our tooltip span.
import { addClass, removeClass } from './helpers';

//We create the call back functions which will have argument event. Not that we
//have a div that is listening to the mouse events and a span that we want to
//add or remove the tooltip class.
let mouseOverHandler = function(event) {
    //If you console.log(event.target) it will show you the parent element that
    //listens to the event but we are interested on the child to this.
    let span = event.target.parentNode.getElementsByTagName('SPAN')[0]

    //Now add class to our class as:
    addClass(span, 'tooltip-show');
};

let mouseOutHandler = function(event) {
    let span = event.target.parentNode.getElementsByTagName('SPAN')[0];

    removeClass(span, 'tooltip-show');
};


export default {
    install(Vue) {        
        Vue.directive('tooltip', {
            //We will use the bind life cycle hook that takes two arguments, the element
            //and any bindings(any values to be passed down.) let text =
            //document.createTextNode('Seats Available: 200'); Instead of this we use
            //the back ticks to define the numbe rof seats and other details.
            
            bind(el, bindings) {
                // If you log the el, it will show all the logged sessions
                // console.log(el);
                // Create a span element using plain web API 
                let span = document.createElement('SPAN');
                let text = document.createTextNode(`Seats Available: ${bindings.value.seats}`);
                span.appendChild(text);
                //we will then add a class to our tool tip after importing the functions
                //from the helper. The tooltip class will hide the span then on hover
                //the tooltip-show will show the class.
                addClass(span, 'tooltip'); 
                el.appendChild(span);

                //We then add an event listener to the session-time class div.
                let div = el.getElementsByTagName('DIV')[0];
                div.addEventListener('mouseover', mouseOverHandler);

                //We also need an event Listener for the mouseout event.
                div.addEventListener('mouseout', mouseOutHandler);

                //But in mobile view port there is no mouseover and mouseout events but there
                //instead the user touches the session for the session to show. are
                //other events that can be used.
                div.addEventListener('touchstart', mouseOverHandler);
                div.addEventListener('touchend', mouseOutHandler);

            },
            //Note that with the filters, the items will be added and removed from the
            //filters depending on which filters are selected. Therefore, there is need to
            //remove the event listners on removal of a session from the dom otherwise
            //you'll have the event listener active and hanging around taking cpu memory
            //while doing nothing. so use the unbind method to remove the event listener.
            unbind(el) {
                let div = el.getElementsByTagName('DIV')[0];
                div.removeEventListener('mouseover', mouseOverHandler);
                div.removeEventListener('mouseout', mouseOutHandler);        
                div.removeEventListener('touchstart', mouseOverHandler);
                div.removeEventListener('touchend', mouseOutHandler);
            }
        });

    }
}