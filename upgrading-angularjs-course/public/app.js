import { HomeComponent } from './home/home';

angular.module('app', ['ngRoute']).component('home', HomeComponent);

angular.module('app').config([
    '$locationProvider',
    function ($locationProvider) {
        $locationProvider.hashPrefix('');
    },
]);
