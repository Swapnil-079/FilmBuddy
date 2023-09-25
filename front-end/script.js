'use strict';
const buttons =document.querySelectorAll(".button");
const cardContainer1 = document.querySelector("#card-container-1");
const cardContainer2 = document.querySelector("#card-container-2");
const form = document.querySelector(".form");
const searchbar = document.querySelector(".searchbar");
const showError = document.querySelector(".Error");






// eventlistner for searchbar
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let input = searchbar.value;
    let genre = input.toLowerCase().trim()

    if(genre === `action`||genre === `adventure` ||genre === `animation` ||genre === `comedy` ||genre === `crime` ||genre === `drama` ||  genre ===`horror` ||genre === `romance` || genre === `space` ||genre === `sci-fi` ||genre === `thriller` ||genre === `war`){
        location.href = `recommendation.html?${genre}`;
    }
    else{
        showError.textContent = `Try other genre`;
    }
})

const originalText =['Action','Adventure','Animation','Comedy','Crime','Drama','Horror','Romance','Space','Sci-Fi','Thriller','War'];
const genreMessages = [
    "Explosions Await!",
    "You!",
    "Enter a Cartoon World",
    "Have a Giggle Fest!",
    "Solve the Mystery",
    "Feel the Emotions",
    "Prepare to Scream",
    "Heartfelt Moments",
    "Explore the Cosmos",
    "Future Awaits!",
    "Get Ready to Thrill",
    "Engage in Battle"
];

// adding eventlisteners to buttons
buttons.forEach((button, index) => {
    const h3 = button.querySelector("h3");
    const originalButtonText = originalText[index]; // Store the original text

    button.addEventListener("mouseenter", () => {
        h3.innerText = genreMessages[index];
    });

    button.addEventListener("mouseleave", () => {
        h3.innerText = originalButtonText; // Restore the original text
    });

    button.addEventListener("click", () => {
        // Use the originalButtonText when navigating to recommendation.html
        console.log(originalButtonText);
        location.href = `recommendation.html?${originalButtonText}`;
    });
});


const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMWJmNDMwNDIyODkwMTBjYWUzYTE2MmMwN2Q1Zjc5NSIsInN1YiI6IjY1MGRlZDc4ZDM0ZWIzMDBhZDA2MDRjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UGLrdJNdLs_ZfIMC31n1BCanS1Vw49v1m4c253vUdHE'
    }
};


const getData1= async function(options){
    const res = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=IN', options);
    const data = await res.json();
    console.log(data);
    updateCardConatiner1(data);
    
}

const getData2= async function(options){
    const res = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&region=IN', options);
    const data = await res.json();
    console.log(data);
    updateCardConatiner2(data);
    
}

// initializing swipper after getting the data
Promise.all([getData1(options), getData2(options)])
    .then(([data1, data2]) => {
       initializeSwipper();
});



const updateCardConatiner1 = function(data){   
    data.results.forEach((item,i)=>{
        let str;
       str = `<div class="swiper-slide card">
                    <div class="card-content">
                        <div class="image">                    
                        <img src="${item['poster_path']==null? `blank.png` :`https://image.tmdb.org/t/p/w185${item['poster_path']}`}" alt="Image not Found" class="card-img">
                        </div>
                        <div class="details">
                        <p class="year">${item['release_date'].slice(0,4)}</p>
                        <div class="title-container">
                            <h3 class="movie-name">${item.title}</h3>
                        </div>
                        <button class="watch-trailer-1" id="${i}">Overview</button> 
                        </div>
                    </div>
                 </div>` ;
        
       
        cardContainer1.insertAdjacentHTML('beforeend', str);
    });
    const container1Buttons = document.querySelectorAll(".watch-trailer-1");
    container1Buttons.forEach(function(b) {
        b.addEventListener("click", function(event) {
          const index = event.target.id;
          localStorage.setItem('title',`${data.results[index]['title']}`);
          localStorage.setItem('description',`${data.results[index]['overview']}`);
           window.open('overview.html');
        });
      });
 
}

const updateCardConatiner2 = function(data){  
    data.results.forEach((item,i)=>{
        let str;
       str = `<div class="swiper-slide card">
                    <div class="card-content">
                        <div class="image">
                        <img src="${item['poster_path']==null? `blank.png` :`https://image.tmdb.org/t/p/w185${item['poster_path']}`}" alt="Image not Found" class="card-img">
                        </div>
                        <div class="details">
                        <p class="year">${item['release_date'].slice(0,4)}</p>
                        <div class="title-container">
                            <h3 class="movie-name">${item.title}</h3>
                        </div>
                        <button class="watch-trailer-2" id="${i}">Overview</button> 
                        </div>
                    </div>
                 </div>`;
        cardContainer2.insertAdjacentHTML('beforeend', str);
    });
    const container2Buttons = document.querySelectorAll(".watch-trailer-2");
    container2Buttons.forEach(function(b) {
        b.addEventListener("click", function(event) {
          const index = event.target.id;
          localStorage.setItem('title',`${data.results[index]['title']}`);
          localStorage.setItem('description',`${data.results[index]['overview']}`);
          window.open('overview.html');
        });
      });
}


const initializeSwipper = function(){
    var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    centeredSlides: false,
    slidesPerGroupSkip: 3,
    grabCursor: true,
    keyboard: {
      enabled: true,
    },
    breakpoints: {
      869: {
        slidesPerView: 6,
        slidesPerGroup: 5,
      },
    },
    scrollbar: {
      el: ".swiper-scrollbar",
    },
    navigation: {
      nextEl: null,
      prevEl: null,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}