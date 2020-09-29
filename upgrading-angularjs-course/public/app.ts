import * as angular from 'angular';
import 'angular-route';

import { HomeComponent } from './home/home';

angular.module('app', ['ngRoute']).component('home', HomeComponent);
