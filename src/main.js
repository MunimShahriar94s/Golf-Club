gsap.registerPlugin(ScrollTrigger) 

// // GSAP


// Select the scroller element
const scroller = document.querySelector('.scroller2');

// Clone the text to create a seamless scrolling effect
const scrollerContainer = scroller.parentElement;
const clone = scroller.cloneNode(true);
scrollerContainer.appendChild(clone);

// Calculate animation properties
const textWidth = scroller.offsetWidth;
const containerWidth = scrollerContainer.offsetWidth;
const totalWidth = textWidth + containerWidth;

// Create the GSAP animation
gsap.to(".scroller2", {
  x: `-${textWidth}px`, // Scroll the entire width of the text
  duration: 25, // Adjust speed by changing duration
  repeat: -1, // Infinite loop
  ease: "none", // Smooth continuous animation
});

let trailOffset = 15/2



const followDiv = document.querySelector('.follow-div');
        const trailDiv = document.querySelector('.trail-div');
        trailDiv.style.width = 15 + "px"
        trailDiv.style.height = 15 + "px"

        
        // Set up initial positions
        gsap.set(followDiv, { x: 0, y: 0 });
        gsap.set(trailDiv, { x: 0, y: 0 });

        // Add mousemove event listener
        document.addEventListener('mousemove', (e) => {
            // Big red circle follows cursor directly
            gsap.to(followDiv, {
                x: e.x - 250,
                y: e.y - 250,
                duration: 0.8,
                delay: 0.17,
                ease: 'power3.out',
            });

            // Small yellow circle follows cursor with a delay
            gsap.to(trailDiv, {
                x: e.x - trailOffset,
                y: e.y  - trailOffset,
                duration: 0.5,
                delay: 0.025,
                ease: 'power3.out',
            });
        });

// Vid fade in bg
console.log(trailOffset)
gsap.to("video", {
  scrollTrigger: {
    trigger: "video",
    start: "20% 20%",
    end: "100% 20%",
    scrub: true,
    pin: true,
    ease: "power1.out"
  },
  scale: 1.25,
  opacity: 0

})

//Quote
gsap.from(".quote-left", {
  scrollTrigger: {
    trigger: ".quote-left",
    toggleActions: "restart none none none",
    ease: "power1.out"
  },
  duration: 1,
  left: "15vw",
  top: "-12vw"

})

gsap.from(".quote-right", {
  scrollTrigger: {
    trigger: ".quote-right",
    toggleActions: "restart none none none",
    ease: "power1.out",
    start: "-800% 100%",
  },
  duration: 1,
  right: "14vw",
  bottom: "-2.5vw"
})



//DOM


//No pointer on touch devices

function detectMouseMove(event) {
    if (event.pointerType === 'mouse') {
        followDiv.style.opacity = "1";
        trailDiv.style.opacity = "1";
    }
  }

  if (window.PointerEvent) {
    document.addEventListener('pointermove', detectMouseMove);
  } else {
    // Fallback for browsers without PointerEvent
    document.addEventListener('mousemove', () => {
      console.log('Mouse movement detected (no pointer type)!');
    });
  }

//PointerChangeOnHover




//navbar change on scroll

const navbar = document.querySelector(".navbar");
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    console.log("Scrolling down");
    navbar.style.height = "7vw"
    navbar.style.backgroundColor = "black"
    document.querySelector(".links").style.gap = "4vw"
    
  } else if (currentScroll <= 100) {
    console.log("Scrolling up");
    navbar.style.height = "8vw"
    navbar.style.backgroundColor = "transparent"
    document.querySelector(".links").style.gap = "3vw"
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
});


document.addEventListener('mousemove', (event) => {
  const { clientX: mouseX, clientY: mouseY } = event;

  // Get the center of the viewport
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // Calculate the opposite rotation values based on mouse position relative to the center
  const deltaX = mouseX - centerX;
  const deltaY = mouseY - centerY;

  const rotateXBase = -(deltaY / centerY) * 10; // Opposite rotation on Y axis
  const rotateYBase = (deltaX / centerX) * 10;  // Opposite rotation on X axis

  // Apply the same rotation to all cards
  document.querySelectorAll('.card').forEach(card => {
    const rotateX = Math.max(-15, Math.min(rotateXBase, 15)); // Clamp between -15 and 15 degrees
    const rotateY = Math.max(-15, Math.min(rotateYBase, 15)); // Clamp between -15 and 15 degrees

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
});

// Reset cards to neutral position when the mouse leaves the window
document.addEventListener('mouseleave', () => {
  document.querySelectorAll('.card').forEach(card => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
});





//Others

//Card Caption Opacity = 0

// Select all cards
const cards = document.querySelectorAll('.card');

// Add hover event listeners to each card
for (let i = 0; i < cards.length; i++) {
  const card = cards[i];
  const caption = card.querySelector('.caption');

  // Scale the caption on hover
  card.addEventListener('mouseenter', () => {
    caption.style.opacity = '0';
  });

  // Reset the caption scale when hover ends
  card.addEventListener('mouseleave', () => {
    caption.style.opacity = '1';
  });
}

//Slider

const images = document.querySelectorAll('.slider img');
  const dots = document.querySelectorAll('.dot');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');

  let currentIndex = 0;

  function showImage(index) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
      
    });
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

  function showPrevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      showImage(currentIndex);
    });
  });





  setInterval(showNextImage, 5000);


//Quote movement


const card2 = document.querySelector('.card-quote');

        document.addEventListener('mousemove', (event) => {
            const { clientX, clientY } = event;
            const { left, top, width, height } = card2.getBoundingClientRect();

            // Calculate the center of the card
            const centerX = left + width / 2;
            const centerY = top + height / 2;

            // Calculate the rotation angles
            let rotateX = (clientY - centerY) / height * 0;
            let rotateY = (clientX - centerX) / width * - 5;

            // Limit the rotation angles
            const maxRotation = 2.5; // Maximum rotation in degrees
            rotateX = Math.max(Math.min(rotateX, maxRotation), -maxRotation);
            rotateY = Math.max(Math.min(rotateY, maxRotation), -maxRotation);

            // Apply the rotation to the card
            card2.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        document.addEventListener('mouseleave', () => {
            card2.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });


//Image Links Event-listener
// Select all elements with the class 'image-link'
// Select all elements with the class 'image-link'
const imageLinks = document.querySelectorAll('.image-link');

// Add event listeners to each .image-link
imageLinks.forEach(link => {
  // On mouse enter
  link.addEventListener('mouseenter', () => {
    const wrapper = link.querySelector('.image-wrapper');
    const img = link.querySelector('img');
    const caption = link.querySelector('.image-link-caption');
    
    document.querySelector(".image-links-container > span").style.textShadow = "1px 1px 0 #95C11E, -1px 1px 0 #95C11E, 1px -1px 0 #95C11E, -1px -1px 0 #95C11E"

    if (wrapper) {
      wrapper.style.opacity = '1'; // Adjust the opacity value as needed
    }
    if (caption) {
      caption.style.color = 'white'; // Change caption color to white
    }
    if (img) {
      img.style.transform = 'scale(1)'; // Scale up the image by 10%
    }
  });

  // On mouse leave
  link.addEventListener('mouseleave', () => {
    const wrapper = link.querySelector('.image-wrapper');
    const img = link.querySelector('img');
    const caption = link.querySelector('.image-link-caption');
    
     document.querySelector(".image-links-container > span").style.textShadow = "1px 1px 0 white, -1px 1px 0 white, 1px -1px 0 white, -1px -1px 0 white"

    if (wrapper) {
      wrapper.style.opacity = '0'; // Reset opacity to full
    }
    if (caption) {
      caption.style.color = 'black'; // Reset caption color to black
    }
    if (img) {
      img.style.transform = 'scale(1.1)'; // Reset image scale to its normal size
    }
  });
});


//Responsive Navbar

const menuIco = document.querySelector(".menu-ico")
const menu = document.querySelector(".menu")
const closeTrigger = document.querySelector(".trigger-element")


closeTrigger.addEventListener("click", function(){
  menu.style.transform = "translate(100%)"
  closeTrigger.style.transform = "translate(100%)"
})

menuIco.addEventListener("click", function(){
    menu.style.transform = "translate(0)";
    closeTrigger.style.transform = "translate(-100%)"
})

// Select all elements with the .hoverable class
const hoverableElements = document.querySelectorAll('.hoverable');

// Loop through each element and add an event listener
hoverableElements.forEach(element => {
  element.addEventListener('mouseenter', function() {
    // Code to execute when the mouse enters the element
    console.log(`${element.textContent} hovered`);
    trailDiv.style.backgroundColor = 'transparent';
    trailDiv.style.borderColor = "white"
    trailDiv.style.width = "60px"
    trailDiv.style.height = "60px"
    trailDiv.style.borderWidth = "2px"
    trailOffset = 60/2
     // Example action (change text color)
  });

  element.addEventListener('mouseleave', function() {
    // Code to execute when the mouse leaves the element
    trailOffset = 15/2
    trailDiv.style.backgroundColor = '';
    trailDiv.style.borderColor = ""  
    trailDiv.style.scale = "" 
    trailDiv.style.width = "15px"
    trailDiv.style.height = "15px"
    trailDiv.style.borderWidth = "0px"
    
  });
});