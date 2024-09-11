const dropdowns = document.querySelectorAll(".dropdown-container"),
    inputLanguageDropdown = document.querySelector("#input-language"),
    outputLanguageDropdown = document.querySelector("#output-language");

function populateDropdown(dropdown, options) {
  dropdown.querySelector("ul").innerHTML = "";
  options.forEach((option) => {
    const li = document.createElement("li");
    const title = option.name + " (" + option.native + ")";
    li.innerHTML = title;
    li.dataset.value = option.code;
    li.classList.add("option");
    dropdown.querySelector("ul").appendChild(li);
  });
}

populateDropdown(inputLanguageDropdown, languages);
populateDropdown(outputLanguageDropdown, languages);

dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("click", (e) => {
    dropdown.classList.toggle("active");
  });

  dropdown.querySelectorAll(".option").forEach((item) => {
    item.addEventListener("click", (e) => {
      //remove active class from current dropdowns
      dropdown.querySelectorAll(".option").forEach((item) => {
        item.classList.remove("active");
      });
      item.classList.add("active");
      const selected = dropdown.querySelector(".selected");
      selected.innerHTML = item.innerHTML;
      selected.dataset.value = item.dataset.value;
      translate();
    });
  });
});

document.addEventListener("click", (e) => {
  dropdowns.forEach((dropdown) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });
});

const inputTextElem = document.querySelector("#input-text"),
    outputTextElem = document.querySelector("#output-text");

function translate() {
  const inputText = inputTextElem.value;
  const inputLanguage =
      inputLanguageDropdown.querySelector(".selected").dataset.value;
  const outputLanguage =
      outputLanguageDropdown.querySelector(".selected").dataset.value;
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLanguage}&tl=${outputLanguage}&dt=t&q=${encodeURI(
      inputText
  )}`;
  fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        outputTextElem.value = json[0].map((item) => item[0]).join("");
      })
      .catch((error) => {
        console.log(error);
      });
}

inputTextElem.addEventListener("input", (e) => {
  if (inputTextElem.value.length > 5000) {
    inputTextElem.value = inputTextElem.value.slice(0, 5000);
  }
  translate();
});

const downloadBtn = document.querySelector("#download-btn");

downloadBtn.addEventListener("click", (e) => {
  const outputText = outputTextElem.value;
  const outputLanguage =
      outputLanguageDropdown.querySelector(".selected").dataset.value;
  if (outputText) {
    const blob = new Blob([outputText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = `translated-to-${outputLanguage}.txt`;
    a.href = url;
    a.click();
  }
});


