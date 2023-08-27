$(document).ready(function(){
  $(".menu-toggle").click(function(){
      $("body").addClass("toggle");
  });
});

$(document).ready(function(){
  $(".closed-menu").click(function(){
      $("body").removeClass("toggle");
  });
});


gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


var tl = gsap.timeline()


tl.from(".site-header .site-logo a, .site-menu li", {
    y:-80,
    duration: 0.5,
    delay:0.5,
    stagger:"0.2"
  })

tl.from(".banner-content h1, .banner-content p",{
  x:-500,
  opacity:0,
  duration:0.5,
  stagger:0.2
})


 

  gsap.from(".about .grid .items", {
    scale:0,
    opacity:0,
    duration:1,
    stagger:"0.4",
    scrollTrigger:{
      scrub: 2,
      trigger:".grid .items",
      scroller:"#main",
      // markers:true,
      start:"top 80%",
      end: "top 60%"
    }
  })

  gsap.to(".site-header", {
    backgroundColor: "#000",
    duration: 0.5,
    height: "auto",
    scrollTrigger: {
      trigger: ".site-header",
      scroller: "#main",
      // markers:true,
      start: "top -5%",
      end: "top -8%",
      scrub: 2,
    },
  });

  gsap.from("#team .grid .items img", {
    scale:0,
    opacity:0,
    duration:2,
    rotate:360,
    scrollTrigger:{
      scrub: 3,
      trigger:"#team .grid  .items img",
      scroller:"#main",
      // markers:true,
      start:"top 50%",
      end: "top 60%"
    }
  })

  gsap.from(".w-90, .w-85, .w_75", {
    opacity:0,
    width:0,
    duration:2,
    scrollTrigger:{
      scrub: 3,
      trigger:".w-90, .w-85, .w_75",
      scroller:"#main",
      // markers:true,
      start:"top 50%",
      end: "top 70%"
    }
  })