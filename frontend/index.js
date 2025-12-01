const heroImages = [
  "/images/mosque.jpeg",
  "/images/housing.jpeg",
  "/images/health.jpeg",
  "/images/education.jpeg",
  "/images/drug.jpeg",
  "/images/releif.jpeg",
  "/images/social.jpeg",
  "/images/water.jpeg"
];

const heroTexts = [
  {
    heading: "HELP US BUILD HOMES OF WORSHIP",
    paragraph: "Your support helps construct and restore mosques where communities come together in faith, unity, and hope."
  },
  {
    heading: "A SAFE HOME CHANGES EVERYTHING",
    paragraph: "Your generosity provides shelter, dignity, and comfort to families who have nowhere else to turn."
  },
  {
    heading: "HEALTHCARE IS A HUMAN RIGHT",
    paragraph: "Support life-saving medical aid and ensure every person—young or old—gets the care they deserve."
  },
  {
    heading: "EDUCATION OPENS DOORS TO A BETTER FUTURE",
    paragraph: "With your help, children gain access to quality learning, brighter opportunities, and lifelong hope."
  },
  {
    heading: "PROTECTING YOUTH THROUGH AWARENESS",
    paragraph: "Your support helps educate communities, guide the youth, and prevent drug abuse before it destroys lives."
  },
  {
    heading: "BE A LIFELINE IN TIMES OF CRISIS",
    paragraph: "Whether hunger, drought, floods, or emergencies—your donation brings immediate relief to struggling families."
  },
  {
    heading: "BUILDING STRONGER COMMUNITIES TOGETHER",
    paragraph: "From empowerment programs to community support, your kindness strengthens families and transforms lives."
  },
  {
    heading: "BRING CLEAN WATER TO A THIRSTY WORLD",
    paragraph: "Every drop you give brings hope, health, and dignity to communities struggling to survive."
  }
];

let index = 0;
const sliderImg = document.getElementById("hero-image");
const sliderTxt = document.querySelector(".slider-txt");

function updateSlide(){
  sliderImg.style.opacity = 0;
  sliderTxt.style.opacity = 0;

  sliderImg.src = heroImages[index];
  sliderTxt.innerHTML = `
    <h1>${heroTexts[index].heading}</h1>
    <p>${heroTexts[index].paragraph}</p>
    <div class = "slider-btns">
      <button class = "donate-btn">Donate Now</button>
      <button class = "login-btn">Join Us Now</button>
    </div>  
  `

  sliderImg.style.opacity = 1;
  sliderTxt.style.opacity = 1;
}

document.getElementById("next-btn").addEventListener("click", () => {
  index = (index + 1) % heroImages.length;
  updateSlide();
})
document.getElementById("prev-btn").addEventListener("click", () => {
  index = (index - 1) % heroImages.length;
  updateSlide();
})
