import './bootstrap';

import './Core/Classes';
Vue.component('image-cropper', require('./components/ImageCropper.vue'));

new Vue({
    el: '#app'
});