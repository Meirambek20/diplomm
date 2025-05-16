const translations = {
    'en': {
        'title': 'Caesar Cipher',
        'input-label': 'Text:',
        'shift-label': 'Shift amount (0-32):',
        'encrypt-btn': 'Encrypt',
        'decrypt-btn': 'Decrypt',
        'result-label': 'Result:',
        'placeholder': 'Enter text here...',
        'copy-btn-text': 'Copy',
        'copied-notification': 'Copied to clipboard!',
        'empty-text-warning': 'Please enter some text!',
        'empty-output-warning': 'No result to copy!',
        'invalid-shift-warning': 'Shift must be between 1 and 32!'
    },
    'ru': {
        'title': 'Шифр Цезаря',
        'input-label': 'Текст:',
        'shift-label': 'Сдвиг (0-32):',
        'encrypt-btn': 'Зашифровать',
        'decrypt-btn': 'Расшифровать',
        'result-label': 'Результат:',
        'placeholder': 'Введите текст здесь...',
        'copy-btn-text': 'Копировать',
        'copied-notification': 'Скопировано в буфер обмена!',
        'empty-text-warning': 'Пожалуйста, введите текст!',
        'empty-output-warning': 'Нет результата для копирования!',
        'invalid-shift-warning': 'Сдвиг должен быть от 1 до 32!'
    },
    'kk': {
        'title': 'Цезар шифры',
        'input-label': 'Мәтін:',
        'shift-label': 'Жылжыту саны (0-32):',
        'encrypt-btn': 'Шифрлау',
        'decrypt-btn': 'Дешифрлау',
        'result-label': 'Нәтиже:',
        'placeholder': 'Мәтінді енгізіңіз...',
        'copy-btn-text': 'Көшіру',
        'copied-notification': 'Көшірілді!',
        'empty-text-warning': 'Мәтінді енгізіңіз!',
        'empty-output-warning': 'Көшіру үшін нәтиже жоқ!',
        'invalid-shift-warning': 'Жылжыту саны 1-ден 32-ге дейін болуы керек!'
    }
};

let currentLang = 'kk';

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    updateUI();
}

function updateUI() {
    document.getElementById('title').textContent = translations[currentLang]['title'];
    document.getElementById('input-label').textContent = translations[currentLang]['input-label'];
    document.getElementById('shift-label').textContent = translations[currentLang]['shift-label'];
    document.getElementById('encrypt-btn').innerHTML = `<i class="fas fa-lock"></i><span>${translations[currentLang]['encrypt-btn']}</span>`;
    document.getElementById('decrypt-btn').innerHTML = `<i class="fas fa-unlock"></i><span>${translations[currentLang]['decrypt-btn']}</span>`;
    document.getElementById('result-label').textContent = translations[currentLang]['result-label'];
    document.getElementById('input-text').placeholder = translations[currentLang]['placeholder'];
    document.getElementById('copy-btn-text').textContent = translations[currentLang]['copy-btn-text'];

    document.querySelectorAll('.language-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${currentLang}-btn`).classList.add('active');
}

function caesarCipher(text, shift, encrypt = true) {
    let result = '';
    if (!encrypt) {
        shift = -shift;
    }
    
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let code = text.charCodeAt(i);
        
        if (code >= 65 && code <= 90) {
            char = String.fromCharCode(((code - 65 + shift) % 26 + 26) % 26 + 65);
        }
        else if (code >= 97 && code <= 122) {
            char = String.fromCharCode(((code - 97 + shift) % 26 + 26) % 26 + 97);
        }
        else if (code >= 1040 && code <= 1071) {
            char = String.fromCharCode(((code - 1040 + shift) % 32 + 32) % 32 + 1040);
        }
        else if (code >= 1072 && code <= 1103) {
            char = String.fromCharCode(((code - 1072 + shift) % 32 + 32) % 32 + 1072);
        }
        
        result += char;
    }
    
    return result;
}

function validateShift() {
    const shiftInput = document.getElementById('shift');
    let shift = parseInt(shiftInput.value);
    if (shift < 1 || shift > 32) {
        alert(translations[currentLang]['invalid-shift-warning']);
        shiftInput.value = 3;
        return false;
    }
    return true;
}

function encrypt() {
    const text = document.getElementById('input-text').value.trim();
    if (!text) {
        alert(translations[currentLang]['empty-text-warning']);
        return;
    }
    if (!validateShift()) return;
    const shift = parseInt(document.getElementById('shift').value);
    const result = caesarCipher(text, shift, true);
    document.getElementById('output').textContent = result;
}

function decrypt() {
    const text = document.getElementById('input-text').value.trim();
    if (!text) {
        alert(translations[currentLang]['empty-text-warning']);
        return;
    }
    if (!validateShift()) return;
    const shift = parseInt(document.getElementById('shift').value);
    const result = caesarCipher(text, shift, false);
    document.getElementById('output').textContent = result;
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

// Sayt жүктелгенде тілді қалпына келтіру
window.onload = function() {
    const savedLang = localStorage.getItem('language') || 'kk';
    changeLanguage(savedLang);
};