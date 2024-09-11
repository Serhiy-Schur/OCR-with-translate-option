// var fileInput = document.getElementById('file-input');
// var langSelect = document.getElementById('lang-select');
// var recognizeBtn = document.getElementById('recognize-btn');
// var imagePreview = document.getElementById('image-preview');
// var resultDiv = document.getElementById('result');
// var progressAnimation = document.getElementById('progress-container')
// var selectedFile, selectedLang;
//
// fileInput.addEventListener('change', function(e) {
//     selectedFile = e.target.files[0];
//     displayImage(selectedFile);
// });
//
// function displayImage(file) {
//     var reader = new FileReader();
//     reader.onload = function(event) {
//         var img = document.createElement('img');
//         img.src = event.target.result;
//         imagePreview.innerHTML = '';
//         imagePreview.appendChild(img);
//     };
//     reader.readAsDataURL(file);
// }
//
// // Обробка вставки з буфера обміну
// window.addEventListener('paste', function(e) {
//     var items = e.clipboardData.items;
//     for (var i = 0; i < items.length; i++) {
//         if (items[i].type.indexOf('image') !== -1) {
//             var file = items[i].getAsFile();
//             displayImage(file);
//             selectedFile = file;
//             break;
//         }
//     }
// });
//
// langSelect.addEventListener('change', function(e) {
//     selectedLang = e.target.value;
// });
//
// recognizeBtn.addEventListener('click', function () {
//     if (!selectedFile) {
//         alert('Будь ласка, виберіть зображення');
//         return;
//     }
//     if (!selectedLang) {
//         alert('Будь ласка, виберіть мову');
//         return;
//     }
//
//     var progressBar = document.querySelector('progress');
//     progressBar.setAttribute('max', '1');
//     progressBar.setAttribute('value', '0');
//     progressAnimation.appendChild(progressBar);
//
//     Tesseract.recognize(selectedFile, { lang: selectedLang })
//         .progress(function (message) {
//             progressBar.setAttribute('value', message.progress);
//             console.log(message);
//         })
//         .catch(function (error) {
//             console.error(error);
//         })
//         .then(function (result) {
//             resultDiv.textContent = result.text;
//             resultDiv.removeAttribute("readonly");
//         });
// });
//
// function copyTextFunction() {
//     var copyText = document.getElementById("result");
//     copyText.select();
//     document.execCommand("copy");
//     alert("Скопійований текст: " + copyText.value);
// }
//
// // Додайте цей код, щоб очищати локальне сховище при перезавантаженні сторінки перекладу
// window.addEventListener('load', () => {
//     const inputTextElem = document.querySelector("#input-text");
//     const ocrText = localStorage.getItem('ocrText');
//     if (ocrText) {
//         setTimeout(() => {
//             inputTextElem.value = ocrText;
//             localStorage.removeItem('ocrText'); // Очистити локальне сховище після вставлення тексту
//             translate(); // Запустити переклад після вставлення тексту
//         }, 500);
//     }
// });



document.addEventListener('DOMContentLoaded', function () {
    const selectContainer = document.querySelector('.select-container');
    const selectToggle = selectContainer.querySelector('.select-toggle');
    const selectMenu = selectContainer.querySelector('.select-menu');
    const selectedOption = selectContainer.querySelector('#selected-option');
    const selectElement = selectContainer.querySelector('#lang-select');

    let selectedLang;

    // Show/Hide menu
    selectToggle.addEventListener('click', function () {
        selectContainer.classList.toggle('active');
    });

    // Select option
    selectMenu.addEventListener('click', function (e) {
        if (e.target.tagName === 'LI') {
            const value = e.target.getAttribute('data-value');
            const text = e.target.textContent;
            selectedOption.textContent = text;
            selectElement.value = value; // Set value of hidden select element
            selectedLang = value; // Update selectedLang with the chosen value
            selectMenu.querySelectorAll('li').forEach(li => li.classList.remove('active'));
            e.target.classList.add('active');
            selectContainer.classList.remove('active');
        }
    });

    // Update selected option from the native select
    selectElement.addEventListener('change', function () {
        const value = this.value;
        const text = selectElement.options[selectElement.selectedIndex].text;
        selectedOption.textContent = text;
        selectMenu.querySelectorAll('li').forEach(li => {
            if (li.getAttribute('data-value') === value) {
                li.classList.add('active');
            } else {
                li.classList.remove('active');
            }
        });
    });

    // Ваш існуючий код
    var fileInput = document.getElementById('file-input');
    var recognizeBtn = document.getElementById('recognize-btn');
    var imagePreview = document.getElementById('image-preview');
    var resultDiv = document.getElementById('result');
    var progressAnimation = document.getElementById('progress-container');
    var selectedFile;

    fileInput.addEventListener('change', function(e) {
        selectedFile = e.target.files[0];
        displayImage(selectedFile);
    });

    function displayImage(file) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var img = document.createElement('img');
            img.src = event.target.result;
            imagePreview.innerHTML = '';
            imagePreview.appendChild(img);
        };
        reader.readAsDataURL(file);
    }

    window.addEventListener('paste', function(e) {
        var items = e.clipboardData.items;
        for (var i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                var file = items[i].getAsFile();
                displayImage(file);
                selectedFile = file;
                break;
            }
        }
    });

    recognizeBtn.addEventListener('click', function () {
        if (!selectedFile) {
            alert('Будь ласка, виберіть зображення');
            return;
        }
        if (!selectedLang) {
            alert('Будь ласка, виберіть мову');
            return;
        }

        var progressBar = document.querySelector('progress');
        progressBar.setAttribute('max', '1');
        progressBar.setAttribute('value', '0');
        progressAnimation.appendChild(progressBar);

        Tesseract.recognize(selectedFile, { lang: selectedLang })
            .progress(function (message) {
                progressBar.setAttribute('value', message.progress);
                console.log(message);
            })
            .catch(function (error) {
                console.error(error);
            })
            .then(function (result) {
                resultDiv.textContent = result.text;
                resultDiv.removeAttribute("readonly");
            });
    });

    function copyTextFunction() {
        var copyText = document.getElementById("result");
        copyText.select();
        document.execCommand("copy");
        alert("Скопійований текст: " + copyText.value);
    }

    window.addEventListener('load', () => {
        const inputTextElem = document.querySelector("#input-text");
        const ocrText = localStorage.getItem('ocrText');
        if (ocrText) {
            setTimeout(() => {
                inputTextElem.value = ocrText;
                localStorage.removeItem('ocrText');
                translate();
            }, 500);
        }
    });
});


