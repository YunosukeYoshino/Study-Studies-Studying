import Splide from '@splidejs/splide';

document.addEventListener('DOMContentLoaded', function () {
    new Splide('.splide', {
        type: 'loop',
        perPage: 1,
        autoplay: true,
        pauseOnHover: false,
        arrows: true,
        pagination: true,
    }).mount();
});


