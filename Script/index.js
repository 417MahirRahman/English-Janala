const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(json => displayLesson(json.data))
};

const loadlvlword = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaylvlword(data.data));
}

const displaylvlword = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    words.forEach((word) => {
        const wordDiv = document.createElement("div");
        wordDiv.innerHTML = `<div class="bg-white shadow-sm rounded-xl text-center py-5 px-5">
        <h2 class="font-bold text-2xl">${word.word}</h2>
        <p class="font-semibold text-sm md:text-lg">Meaning/Pronounciation</p>
        <div class="text-2xl font-medium font-Bangla
        mb-3">
          ${word.meaning} / ${word.pronounciation}
        </div>
        <div class="flex justify-between items-center">
          <button class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>`;

        wordContainer.append(wordDiv);
    });
} 

const displayLesson = (lessons) => {
    const lvlContainer = document.getElementById("lvl-container");
    lvlContainer.innerHTML = "";

    for(let lesson  of lessons){
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = ` <button onclick="loadlvlword(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}</button>`;

        lvlContainer.append(btnDiv);

    };
};

loadLesson()