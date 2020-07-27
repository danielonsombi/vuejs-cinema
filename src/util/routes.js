//We import all the components that we are to refer to while in this file.
import Overview from '../components/Overview.vue';
import Detail from '../components/Detail.vue';

export default [
    { path: '/', component: Overview, name: 'home' },
    { path: '/movie/:id', component: Detail, name: 'movie' },
];