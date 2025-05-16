const translations = {
    'en': {
        'title': 'Atbash Cipher',
        'input-label': 'Text:',
        'encrypt-btn': 'Encrypt',
        'decrypt-btn': 'Decrypt',
        'result-label': 'Result:',
        'placeholder': 'Enter text here...',
        'copy-btn-text': 'Copy',
        'copied-notification': 'Copied to clipboard!',
        'empty-text-warning': 'Please enter some text!',
        'empty-output-warning': 'No result to copy!'
    },
    'ru': {
        'title': 'Шифр Атбаш',
        'input-label': 'Текст:',
        'encrypt-btn': 'Зашифровать',
        'decrypt-btn': 'Расшифровать',
        'result-label': 'Результат:',
        'placeholder': 'Введите текст здесь...',
        'copy-btn-text': 'Копировать',
        'copied-notification': 'Скопировано в буфер обмена!',
        'empty-text-warning': 'Пожалуйста, введите текст!',
        'empty-output-warning': 'Нет результата для копирования!'
    },
    'kk': {
        'title': 'Атбаш шифры',
        'input-label': 'Мәтін:',
        'encrypt-btn': 'Шифрлеу',
        'decrypt-btn': 'Дешифрлеу',
        'result-label': 'Нәтиже:',
        'placeholder': 'Мәтінді енгізіңіз...',
        'copy-btn-text': 'Көшіру',
        'copied-notification': 'Көшірілді!',
        'empty-text-warning': 'Мәтінді енгізіңіз!',
        'empty-output-warning': 'Көшіру үшін нәтиже жоқ!'
    }
};

let currentLang = localStorage.getItem('language') || 'kk';

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    updateUI();
}

function updateUI() {
    document.getElementById('title').textContent = translations[currentLang]['title'];
    document.getElementById('input-label').textContent = translations[currentLang]['input-label'];
    document.getElementById('encrypt-btn').innerHTML = `<i class="fas fa-lock"></i><span>${translations[currentLang]['encrypt-btn']}</span>`;
    document.getElementById('decrypt-btn').innerHTML = `<i class="fas fa-unlock"></i><span>${translations[currentLang]['decrypt-btn']}</span>`;
    document.getElementById('result-label').textContent = translations[currentLang]['result-label'];
    document.getElementById('input-text').placeholder = translations[currentLang]['placeholder'];
    document.getElementById('copy-btn-text').textContent = translations[currentLang]['copy-btn-text'];

    document.querySelectorAll('.language-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${currentLang}-btn`).classList.add('active');
}

// Atbash шифрын қолдану функциясы
function atbashCipher(text) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const reverseAlphabet = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';
    let result = '';

    for (let char of text.toUpperCase()) {
        if (alphabet.includes(char)) {
            let index = alphabet.indexOf(char);
            result += reverseAlphabet[index];
        } else {
            result += char; // Басқа таңбаларды өзгертпейміз
        }
    }

    return result;
}

function encrypt() {
    const text = document.getElementById('input-text').value.trim();
    if (!text) {
        alert(translations[currentLang]['empty-text-warning']);
        return;
    }
    const result = atbashCipher(text);
    document.getElementById('output').textContent = result;
}

function decrypt() {
    encrypt(); // Атбаш шифры симметриялы болғандықтан, шифрлеу мен дешифрлеу бірдей
}

function copyResult() {
    const output = document.getElementById('output').textContent.trim();
    if (!output) {
        alert(translations[currentLang]['empty-output-warning']);
        return;
    }
    navigator.clipboard.writeText(output).then(() => {
        showNotification();
    });
}

function showNotification() {
    const notification = document.getElementById('notification');
    notification.textContent = translations[currentLang]['copied-notification'];
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

// Бетті жүктеген кезде тілді орнату
window.onload = function() {
    updateUI();
};
