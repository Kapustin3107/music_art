document.addEventListener("DOMContentLoaded", function () {
    const topElements = document.querySelectorAll(".animated-top");

    topElements.forEach((element) => {
        element.classList.add("is-visible");
    });
});



//video slider init
var swiper = new Swiper(".mySwiper", {

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

});
// scroll magic init
var controller = new ScrollMagic.Controller();

// reveal element 1
 new ScrollMagic.Scene({
    triggerElement: "#trigger1",
    triggerHook: 0.9, // show, when scrolled 10% into view
    duration: "80%", // hide 10% before exiting view (80% + 10% from bottom)
    offset: 50 // move trigger to center of element
})
.setClassToggle("#reveal1", "visible") // add class to reveal
// .addIndicators() // add indicators (requires plugin)
.addTo(controller);


// reveal element 2
new ScrollMagic.Scene({
    triggerElement: "#trigger2",
    triggerHook: 0.9, // show, when scrolled 10% into view
    duration: "80%", // hide 10% before exiting view (80% + 10% from bottom)
    offset: 50 // move trigger to center of element
})
.setClassToggle("#reveal2", "visible") // add class to reveal
// .addIndicators() // add indicators (requires plugin)
.addTo(controller);