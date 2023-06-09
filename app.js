const flag = document.querySelector(".flag");
const resetBtn = document.getElementById("reset");
const answersElement = document.querySelector(".answers");
const score = document.getElementById("score");
const correct = new Audio("/sounds/correct.mp3");
const wrong = new Audio("/sounds/wrong.mp3");
let country = null;
let scoreCount = 0;
let countries = [];
let allow = true;
const getCountries = async () => {
  countries = await fetch("https://restcountries.com/v3.1/all").then((a) =>
    a.json()
  );
};
const createExam = () => {
  allow = true;
  [...answersElement.querySelectorAll("li")].map((a) => {
    a.style.background = "#fff";
  });
  const randomIndex = Math.floor(Math.random() * countries.length);
  country = countries[randomIndex];
  const answers = [country.name.common];
  for (let i = 0; i < 3; i++) {
    let r1 = Math.floor(Math.random() * countries.length);
    while (r1 === randomIndex) {
      r1 = Math.floor(Math.random() * countries.length);
    }
    answers.push(countries[r1].name.common);
  }
  answers.sort(() => 0.5 - Math.random());
  flag.setAttribute("src", country.coatOfArms.png);
  answers.map((a, b) => {
    answersElement.querySelectorAll("li")[b].textContent = a;
  });
};
answersElement.addEventListener("click", (e) => {
  if (e.target.tagName !== "LI" || !allow) {
    return;
  }
  allow = false;
  if (e.target.textContent === country.name.common) {
    score.textContent = ++scoreCount;
    correct.play();
  } else {
    wrong.play();
  }
  [...answersElement.querySelectorAll("li")].map((a) => {
    if (a.textContent === country.name.common) {
      a.style.background = "greenyellow";
    } else {
      a.style.background = "orangered";
    }
  });
  setTimeout(createExam, 2300);
});
resetBtn.addEventListener("click", () => {
  scoreCount = 0;
  score.textContent = 0;
  createExam();
});
getCountries().then(createExam);
