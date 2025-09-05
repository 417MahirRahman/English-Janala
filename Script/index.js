const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return (htmlElements.join(" "));
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const spinner = (status) => {
  if(status == true){
    document.getElementById("spinner").classList.remove("hidden")
    document.getElementById("spinner").classList.add("flex")
    document.getElementById("word-container").classList.add("hidden")
  }else{
    document.getElementById("word-container").classList.remove("hidden")
    document.getElementById("spinner").classList.add("hidden")
    document.getElementById("spinner").classList.add("flex")
  }
}

const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const removeActive = () => {
  const allBtn = document.querySelectorAll(".lesson-btn");
  allBtn.forEach((btn) => btn.classList.remove("active"));
};

const loadlvlword = (id) => {
  spinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      displaylvlword(data.data);
    });
};

const loadwordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  await fetch(url)
    .then((res) => res.json())
    .then((data) => displaywordDetails(data.data));
};

const displaywordDetails = (word) => {
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
          <div>
            <h2 class="text-2xl font-bold"> ${word.word} (<i class="fa-solid fa-microphone-lines"></i>: ${word.pronounciation})</h2>
          </div>
          <div>
            <h2 class="text-2xl font-bold">Meaning</h2>
            <p>${word.meaning}</p>
          </div>
          <div>
            <h2 class="text-2xl font-bold">Example</h2>
            <p>${word.sentence}</p>
          </div>
          <div>
            <h2 class="font-bold">Synonym</h2>
            <div class="">${createElements(word.synonyms)}</div>
          </div>
  `;
  document.getElementById("my_modal_5").showModal();
};

const displaylvlword = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `<div class="text-center col-span-full py-10 space-y-6 font-Bangla">
        <img class="mx-auto" src="./assets/alert-error.png" alt="">
        <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।     </p>
        <h2 class="text-4xl font-bold">নেক্সট Lesson এ যান।</h2>
      </div>`;
      spinner(false);
      return;
  }

  words.forEach((word) => {
    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = `<div class="bg-white shadow-sm rounded-xl text-center py-5 px-5 mt-3">
        <h2 class="font-bold text-2xl">${
          word.word ? word.word : "শব্দ পাওয়া যায়নি"
        }</h2>
        <p class="font-semibold text-sm md:text-lg">Meaning/Pronounciation</p>
        <div class="text-2xl font-medium font-Bangla
        mb-3">
          ${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${
          word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি"
    }
        </div>
        <div class="flex justify-between items-center">
          <button onclick="loadwordDetail(${
            word.id
          })" class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
          <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>`;

    wordContainer.append(wordDiv);
    spinner(false);
  });
};

const displayLesson = (lessons) => {
  const lvlContainer = document.getElementById("lvl-container");
  lvlContainer.innerHTML = "";

  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = ` <button id="lesson-btn-${lesson.level_no}" onclick="loadlvlword(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}</button>`;

    lvlContainer.append(btnDiv);
  }
};

loadLesson();

document.getElementById("btn-search").addEventListener("click",()=>{
  removeActive();
  const input = document.getElementById("input-search")
  const searchValue = input.value.trim().toLowerCase();
  
  fetch("https://openapi.programming-hero.com/api/words/all")
  .then(res => res.json())
  .then(data => {
    const allWord = data.data;
    const filterWords = allWord.filter(word=>word.word.toLowerCase().includes(searchValue));
    displaylvlword(filterWords);
  })
})