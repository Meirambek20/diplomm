const translations = {
    'en': {
        'title': 'Trithemius Cipher',
        'input-label': 'Text:',
        'encrypt-btn': 'Encrypt',
        'decrypt-btn': 'Decrypt',
        'result-label': 'Result:',
        'placeholder': 'Enter text here...',
        'copy-btn-text': 'Copy',
        'copied-notification': 'Copied to clipboard!'
    },
    'ru': {
        'title': 'Шифр Тритемиуса',
        'input-label': 'Текст:',
        'encrypt-btn': 'Зашифровать',
        'decrypt-btn': 'Расшифровать',
        'result-label': 'Результат:',
        'placeholder': 'Введите текст здесь...',
        'copy-btn-text': 'Копировать',
        'copied-notification': 'Скопировано в буфер обмена!'
    },
    'kk': {
        'title': 'Трисемус шифры',
        'input-label': 'Мәтін:',
        'encrypt-btn': 'Шифрлау',
        'decrypt-btn': 'Дешифрлау',
        'result-label': 'Нәтиже:',
        'placeholder': 'Мәтінді енгізіңіз...',
        'copy-btn-text': 'Көшіру',
        'copied-notification': 'Көшірілді!'
    }
};

let currentLang = 'kk';

function changeLanguage(lang) {
    currentLang = lang;
    document.getElementById('title').textContent = translations[lang]['title'];
    document.getElementById('input-label').textContent = translations[lang]['input-label'];
    document.getElementById('encrypt-btn').innerHTML = `<i class="fas fa-lock"></i><span>${translations[lang]['encrypt-btn']}</span>`;
    document.getElementById('decrypt-btn').innerHTML = `<i class="fas fa-unlock"></i><span>${translations[lang]['decrypt-btn']}</span>`;
    document.getElementById('result-label').textContent = translations[lang]['result-label'];
    document.getElementById('input-text').placeholder = translations[lang]['placeholder'];
    document.getElementById('copy-btn-text').textContent = translations[lang]['copy-btn-text'];
    document.querySelectorAll('.language-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${lang}-btn`).classList.add('active');
}

function encrypt() {
    const text = document.getElementById('input-text').value;
    const shift = getShift();
    const result = trithemiusCipher(text, shift, true);
    document.getElementById('output').textContent = result;
}

function decrypt() {
    const text = document.getElementById('input-text').value;
    const shift = getShift();
    const result = trithemiusCipher(text, shift, false);
    document.getElementById('output').textContent = result;
}

function getShift() {
    // Трисемус шифрі үшін әр әріпке 1-ден бастап әртүрлі сдвиг қолданылады.
    // Бұл функция әр әріпке сдвиг мәнін анықтайды.
    return 1; // Бір қарапайым мысал үшін, сдвиг 1-ден бастап әр әріпке 1-ден артуымен қолданылады.
}

function trithemiusCipher(text, shift, encrypt = true) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let code = text.charCodeAt(i);

        // Ағылшын әріптері үшін
        if (code >= 65 && code <= 90) {
            char = String.fromCharCode(((code - 65 + (encrypt ? shift : -shift)) % 26 + 26) % 26 + 65);
        }
        // Кіші әріптер үшін
        else if (code >= 97 && code <= 122) {
            char = String.fromCharCode(((code - 97 + (encrypt ? shift : -shift)) % 26 + 26) % 26 + 97);
        }
        // Кирилл әріптері үшін
        else if (code >= 1040 && code <= 1071) {
            char = String.fromCharCode(((code - 1040 + (encrypt ? shift : -shift)) % 32 + 32) % 32 + 1040);
        }
        else if (code >= 1072 && code <= 1103) {
            char = String.fromCharCode(((code - 1072 + (encrypt ? shift : -shift)) % 32 + 32) % 32 + 1072);
        }

        result += char;
    }
    return result;
}

function copyResult() {
    const output = document.getElementById('output').textContent;
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

// Set default language
changeLanguage('kk');