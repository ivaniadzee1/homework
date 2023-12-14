listFonts = document.querySelector(".fonts-selector");
const textFonts = document.querySelector(".text-fonts");
const arrowSelect = document.querySelector(".arrow-selection");
const screenModeSelection = document.querySelector(".toggle-selector");
const circle1 = document.querySelector(".circle-1");
const circle2 = document.querySelector(".circle-2");
const font1 = document.querySelector(".font-1");
const font2 = document.querySelector(".font-2");
const font3 = document.querySelector(".font-3");
const text = document.querySelector(".input");
const textLogoBox = document.querySelector(".tx-log-box");
const btnSearch  = document.querySelector(".logo-src");
const errorMsg  = document.querySelector(".error");
const borderErrorMsg  = document.querySelector(".reserch-bar-container");
const path = document.querySelector(".pat");
const resultsContainer = document.querySelector(".content-container");

let word = document.querySelector(".word");
let phonetic = document.querySelector(".phonetic");
let logoPlayContainer = document.querySelector(".logo-play-container");
let logoPlay = document.querySelector(".logo-play");
let myAudio = document.querySelector(".myAudio");

let verbNoun = document.querySelectorAll(".verb-noum");
let lines = document.querySelectorAll(".line");
let insertion = document.querySelector(".insertion");

let linkName = document.querySelector(".link-name");


//////////////////////////////////////////////////////////////////////////////



const setHTMLword = function(data) {

  let link;
  for(let i = 0; i < data[0].phonetics.length; i++) {

     if(data[0].phonetics[i].audio !== "") {
      link = data[0].phonetics[i].audio;
      break;
     } 
  }
  
  const html = `
        <div class="container-word">
          <div>
            <div class="word">${data[0].word}</div>
            <div class="phonetic">${data[0].phonetics[0].text}</div>
          </div>
          
          
            <audio class="myAudio" src="${link}"></audio>
            <div class="logo-play-container">
              <object class="logo-play" title="play" type="image/svg+xml" data="./images/icon-play.svg"></object>
            </div>
          
        </div>
      `;

  resultsContainer.insertAdjacentHTML("beforeend", html);

  word = document.querySelector(".word");
  phonetic = document.querySelector(".phonetic");
  logoPlayContainer = document.querySelector(".logo-play-container");
  logoPlay = document.querySelector(".logo-play");
  myAudio = document.querySelector(".myAudio");
}


const setHTMLcontent = function(data, index) {

  const arrHTMLdefinitons = [];
  const partOfspech = data[0].meanings[index].partOfSpeech;
  const arrOfDefinitions = data[0].meanings[index].definitions;

  arrOfDefinitions.forEach( (el) => {

      let html = `<li class="line">${el.definition}</li>`;
      arrHTMLdefinitons.push(html);
  });

  const li_Html = arrHTMLdefinitons.join("");

  const html = `
      <div class="verb-noum-container">
          <div class="verb-noum">${partOfspech}</div>
        <div class="row"></div>
      </div>

      <div class="container-meaning">
        <span class="meaning">Meaning</span>
        <ul class="insertion">${li_Html}</ul>
      </div>
      `;

  resultsContainer.insertAdjacentHTML("beforeend", html);

  verbNoun = document.querySelectorAll(".verb-noum");
  lines = document.querySelectorAll(".line");
  insertion = document.querySelector(".insertion");
}


const setHTMLsynonyms = function(data, index) {
  
  const arrHTMLsynonyms = [];
  const arrOfSynonyms = data[0].meanings[index].synonyms;
  arrOfSynonyms.forEach( (el) => {

    let htmlSynonyms = `<span class="link-synonyms">${el}</span>`;
    arrHTMLsynonyms.push(htmlSynonyms);
  });

  const html = `
        <div class="synonyms-container">
          <div class="syn-title">Synonyms</div>
          <div class="synonyms">${arrHTMLsynonyms.join(", ")}</div>
        </div>
      `;

  resultsContainer.insertAdjacentHTML("beforeend", html);
}


const setHTMLfooter = function(data) {


  const html = `
      <div class="footer-container">
        <div class="row-footer"></div>
        <div class="source-container">
          <div class="source">Source</div>
          <div>
           <a class="link-container" href="${data[0].sourceUrls[0]}" target="_blank">
             <div class="link-name">${data[0].sourceUrls[0]}</div>
             <object class="logo-new-window" title="new window" type="image/svg+xml" data="./images/icon-new-window.svg"></object>
           </a>
          </div>
        </div>
      </div>
      `;

      resultsContainer.insertAdjacentHTML("beforeend", html);

      linkName = document.querySelector(".link-name");

}


const setHTMLnotFoundWord = function() {

  const html = `
      <div class="not-found-container">
        <div class="emojy">&#x1F615;</div>
        <div class="not-found-title">No Definitions Found</div>
        <div class="not-found-text">Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead.</div>
      </div>
      `;

  resultsContainer.insertAdjacentHTML("beforeend", html);

  notFoundTitle = document.querySelector(".not-found-title");
}


const setPage = async function() {

  try {

    const resWord = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${text.value}`);

    if(!resWord.ok) throw new Error("Problem fatching data from the link https://api.dictionaryapi.dev/api/v2/entries/en/");

    const data  = await resWord.json();

    setHTMLword(data);
      
    for(let i = 0; i < data[0].meanings.length; i++) {
      setHTMLcontent(data, i);
      if(data[0].meanings[i].synonyms.length > 0) setHTMLsynonyms(data, i);
    }

    setHTMLfooter(data);

    const check = window.getComputedStyle(circle1).getPropertyValue("opacity");
    if(check === "0") {
      word.classList.add("word-dark");
      verbNoun.forEach(el => el.classList.add("verb-noum-dark"));
      lines.forEach(el => el.classList.add("line-dark"));
      linkName.classList.add("link-name-dark");
    }

  } catch(err) {
    setHTMLnotFoundWord();
    console.log(err);
  } 
   
}


const loadPage = function() {
  resultsContainer.innerHTML = "";

  if(text.value === "") {
    errorMsg.style.display = "block";
    borderErrorMsg.classList.add("error-border");

  } else {
    errorMsg.style.display = "none";
    borderErrorMsg.classList.remove("error-border");
    setPage();
  }
}


////////////////////////////////////////////////////////////////////////////



listFonts.addEventListener("click", function(e) {
  e.preventDefault();

  const elements = document.body.querySelectorAll("*");

  if(e.target === font1) {
    elements.forEach( el => el.style.fontFamily = "Inter");
    textFonts.innerHTML = "Sans Serif";
  };
  if(e.target === font2) {
    elements.forEach( el => el.style.fontFamily = "Lora");
    textFonts.innerHTML = "Serif";
  };
  if(e.target === font3) {
    elements.forEach( el => el.style.fontFamily = "Inconsolata");
    textFonts.innerHTML = "Mono";
  };

  font1.style.fontFamily = "Inter";
  font2.style.fontFamily = "Lora";
  font3.style.fontFamily = "Inconsolata";
})



textLogoBox.addEventListener("click" , function(e) {
    e.preventDefault();
    listFonts.classList.toggle("show");
})



document.body.addEventListener("click", function(e) {

  check_1 = e.target === textFonts;
  check_2 = e.target === arrowSelect;
  if(!(check_1 || check_2)) listFonts.classList.remove("show");

  if(e.target === logoPlayContainer) {
     myAudio.play();
  }

  if(e.target.className === "link-synonyms") {
     const value = e.target.innerHTML;
     text.value = value;
     loadPage();
  }
});



document.body.addEventListener("mouseover", function(e) {
   e.preventDefault();

   if(e.target === logoPlayContainer) {
    logoPlay.style.backgroundColor = "yellow";
    logoPlay.style.borderRadius = "60px";
  }

})



document.body.addEventListener("mouseout", function(e) {
  e.preventDefault();

  if(e.target === logoPlayContainer) {
   logoPlay.style.backgroundColor = "rgba(164, 69, 237, 0.05)";
   logoPlay.style.borderRadius = "60px";
 }

})



screenModeSelection.addEventListener("click", function(e) {
  e.preventDefault();

  document.body.classList.toggle("body-dark");
  textFonts.classList.toggle("text-fonts-dark");
  listFonts.classList.toggle("fonts-selector-dark");
  circle1.classList.toggle("hidden-c1");
  circle2.classList.toggle("hidden-c2");
  borderErrorMsg.classList.toggle("reserch-bar-container-dark");
  text.classList.toggle("input-dark");

  const toggle = window.getComputedStyle(circle1).getPropertyValue("opacity");
  if(toggle === "0") path.setAttribute("stroke", "var(--a-445-ed, #A445ED)");
  if(toggle === "1") path.setAttribute("stroke", "#838383");

  if(!!word) {
    word.classList.toggle("word-dark");
    verbNoun.forEach(el => el.classList.toggle("verb-noum-dark"));
    lines.forEach(el => el.classList.toggle("line-dark"));
    linkName.classList.toggle("link-name-dark");
  }
  
});



btnSearch.addEventListener("click", function(e) {
  e.preventDefault();

  loadPage();

})



text.addEventListener("keydown", function(e) {
  
  if(e.key === "Enter") loadPage();
  
});


/////////////////////////


screenModeSelection.addEventListener("touchstart", function(e) {
  screenModeSelection.style.backgroundColor = "rgba(164, 69, 237, 1)";
})

screenModeSelection.addEventListener("touchend", function(e) {
  screenModeSelection.style.backgroundColor = "rgba(117, 117, 117, 1)";
})

const searchPress = [borderErrorMsg, btnSearch];
searchPress.forEach( (el) => {

  el.addEventListener("touchstart", function(e) {
    borderErrorMsg.style.borderColor = "rgba(164, 69, 237, 1)";
  })
  
  el.addEventListener("touchend", function(e) {
    borderErrorMsg.style.borderColor = "var(--f-4-f-4-f-4, #F4F4F4)";
  })

})


  document.body.addEventListener('touchmove', (e) => { 
  
     document.body.style.overscrollBehavior = "none"; 
     document.body.style.overflow = "auto"; 
  
   }, { passive: false });