import Vue from 'vue';
import axios from 'axios';
import Dropzone from 'dropzone';
import Cropper from 'cropperjs';

window.axios = axios;

window.Vue = Vue;
window.Dropzone = Dropzone;

axios.defaults.headers.common['X-CSRF-TOKEN'] = Laravel.csrfToken;
axios.interceptors.request.use(function(config){
    config.headers['X-CSRF-TOKEN'] = Laravel.csrfToken;
    return config;
});


Dropzone.options.myAwesomeDropzone = {
    headers: { "X-CSRF-TOKEN": Laravel.csrfToken },
};


window._ = require('lodash');
window.$ = window.jQuery = require('jquery');
require('bootstrap-sass');