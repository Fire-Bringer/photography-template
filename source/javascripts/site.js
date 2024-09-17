gsap.from(".text", 0.8, {
  y: 40,
  opacity: 0,
  ease: "power2.inOut",
  delay: 1,
});

gsap.from(".loader", 2, {
  width: 0,
  ease: "power4.inOut",
  delay: 2,
});

gsap.to(".pre-loader", 2, {
  top: "-100%",
  ease: "power4.inOut",
  delay: 4,
});




document.addEventListener('DOMContentLoaded', function() {

  let listTab = document.querySelectorAll('.tab');

  let items = document.querySelectorAll('.slider .list .item');
  let prevBtn = document.getElementById('prev');
  let nextBtn = document.getElementById('next');
  let lastPosition = items.length - 1;
  let firstPosition = 0;

  // Config Param
  let countItem = items.length;
  let active = 0;

  nextBtn.onclick = () => {
      active = active + 1;
      if(active >= countItem){
        active = 0;
      }
      setSlider();
  }
  prevBtn.onclick = () => {
      active = active - 1;
      if(active < 0){
        active = countItem - 1;
      }
      setSlider();
  }

  // Initialize the auto-run slider interval variable
  let refreshInterval;

  // Function to set the slider
  const setSlider = () => {
    // Find the currently active item and remove the 'active' class
    let oldActive = document.querySelector('.slider .list .item.active');
    if (oldActive) oldActive.classList.remove('active');

    // Add the 'active' class to the new active item
    items[active].classList.add('active');

    // Handle the visibility of next and previous buttons
    nextBtn.classList.remove('d-none');
    prevBtn.classList.remove('d-none');
    if (active == lastPosition) nextBtn.classList.add('d-none');
    if (active == firstPosition) prevBtn.classList.add('d-none');

    // Clear the existing interval and set a new one for the slider
    if (refreshInterval) clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
      next.click();
    }, 4000);
  };

  // Initial call to set the slider
  setSlider();

  // set diameter
  const setDiameter = () => {
      let slider = document.querySelector('.slider');
      let widthSlider = slider.offsetWidth;
      let heightSlider = slider.offsetHeight;
      let diameter = Math.sqrt(Math.pow(widthSlider, 2) + Math.pow(heightSlider, 2));
      document.documentElement.style.setProperty('--diameter', diameter+'px');
  }
  setDiameter();
  window.addEventListener('resize', () => {
      setDiameter();
  })

  window.addEventListener("scroll", (event) => {
    /*scrollY is the web scrollbar position (pixel)*/
    let top = window.scrollY;
    listTab.forEach(tab =>{
      if(tab.offsetTop - top < 550){
          tab.classList.add('active');
      }else{
          tab.classList.remove('active');
      }
    })
  });

  // Responsive Navbar
  const menuIcon = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');
  const navbg = document.querySelector('.nav-bg');
  menuIcon.addEventListener('click', () => {
      menuIcon.classList.toggle('bx-x');
      navbar.classList.toggle('active');
      navbg.classList.toggle('active');
  });


  // Close menu when nav-link is clicked
  const navLink = document.querySelectorAll('.nav-link');

  navLink.forEach(n => n.addEventListener('click', closeMenu));

  function closeMenu() {
  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
  navbg.classList.remove('active');
  }

  // Popup Section
  const images = [...document.querySelectorAll('.image')];

  // popup

  const popup = document.querySelector('.popup');
  const closeBtn = document.querySelector('.close-btn');
  const imageName = document.querySelector('.image-name');
  const largeImage = document.querySelector('.large-image');
  const imageIndex = document.querySelector('.index');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');

  let index = 0; // will track our current image;

  images.forEach((item, i) => {
      item.addEventListener('click', () => {
          updateImage(i);
          popup.classList.toggle('active');
      })
  })

  const updateImage = (i) => {
      let path = `images/landscape/landscape${i-2}.jpeg`;
      largeImage.src = path;
      imageName.innerHTML = path;
      imageIndex.innerHTML = `0${i-2}`;
      index = i;
  }

  closeBtn.addEventListener('click', () => {
      popup.classList.toggle('active');
  })

  leftArrow.addEventListener('click', () => {
      if(index > 0){
          updateImage(index - 1);
      }
  })

  rightArrow.addEventListener('click', () => {
      if(index < images.length - 1){
          updateImage(index + 1);
      }
  })

});
