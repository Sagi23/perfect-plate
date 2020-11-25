const itemInput = document.querySelector("#item");
const sizeInput = document.querySelector("#size");

const proteinOutput = document.querySelector(".protein");
const calOutput = document.querySelector(".cal");
const fatOutput = document.querySelector(".fat");

const form = document.querySelector(".form1");

const btn = document.querySelector(".btn");
const content = document.querySelector(".content");

const totalProArea = document.querySelector(".total-protein");
const totalCalArea = document.querySelector(".total-cal");
const totalFatArea = document.querySelector(".total-fat");

const newPro = document.createElement("p");
const newCal = document.createElement("p");
const newFat = document.createElement("p");

const totalPro = document.createElement("p");
const totalCal = document.createElement("p");
const totalFat = document.createElement("p");

function reset(a, b, c) {
  a.textContent = "";
  b.textContent = "";
  c.textContent = "";
}

const getDet = async (size, item) => {
  try {
    const headers = {
      headers: { "X-Api-Key": "TRB6Zg6NXcqfDADsPvtaRA==o3CbQWd2rWFQeXef" },
    };
    const res = await axios.get(
      `https://api.calorieninjas.com/v1/nutrition?query=${size}g ${item}`,
      headers
    );
    newCal.textContent = `${res.data.items[0].calories}`;
    newFat.textContent = `${res.data.items[0].fat_total_g}`;
    newPro.textContent = `${res.data.items[0].protein_g}`;
    newCal.classList.add("nums");
    newFat.classList.add("nums");
    newPro.classList.add("nums");
    calOutput.append(newCal);
    fatOutput.append(newFat);
    proteinOutput.append(newPro);
  } catch {
    alert("somthing went wrong please make sure you enter a valid input");
  }
};

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  reset(newFat, newPro, newCal);
  await getDet(sizeInput.value, itemInput.value);
});

btn.addEventListener("click", async function () {
  if ((itemInput.value !== "") & (sizeInput !== "")) {
    let newProEntry = document.createElement("p");
    let newCalEntry = document.createElement("p");
    let newFatEntry = document.createElement("p");
    let newNameEntry = document.createElement("p");
    let newSizeEntry = document.createElement("p");

    newFatEntry.classList.add("fat1");
    newCalEntry.classList.add("cal1");
    newProEntry.classList.add("pro1");

    newNameEntry.textContent = itemInput.value;
    newSizeEntry.textContent = sizeInput.value;
    newProEntry.textContent = newPro.textContent;
    newCalEntry.textContent = newCal.textContent;
    newFatEntry.textContent = newFat.textContent;

    content.append(
      newNameEntry,
      newSizeEntry,
      newProEntry,
      newCalEntry,
      newFatEntry
    );

    let cals = document.querySelectorAll(".cal1");
    let c = 0;
    cals.forEach((e) => {
      c += Number(e.textContent);
    });

    let pros = document.querySelectorAll(".pro1");
    let p = 0;
    pros.forEach((e) => {
      p += Number(e.textContent);
    });

    let fats = document.querySelectorAll(".fat1");
    let f = 0;
    fats.forEach((e) => {
      f += Number(e.textContent);
    });

    reset(totalCal, totalFat, totalPro);

    totalCal.textContent = c.toFixed(1);
    totalPro.textContent = p.toFixed(1);
    totalFat.textContent = f.toFixed(1);

    totalCalArea.append(totalCal);
    totalProArea.append(totalPro);
    totalFatArea.append(totalFat);
  } else {
    alert("please enter a valid input");
  }
});
