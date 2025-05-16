const translations = {
    'en': {
        'title': 'Gronsfeld Cipher',
        'input-label': 'Text:',
        'key-label': 'Key (numbers only):',
        'encrypt-btn': 'Encrypt',
        'decrypt-btn': 'Decrypt',
        'result-label': 'Result:',
        'placeholder': 'Enter text here...',
        'key-placeholder': 'Example: 123456',
        'copy-btn-text': 'Copy',
        'copied-notification': 'Copied to clipboard!',
        'empty-text-warning': 'Please enter some text!',
        'empty-key-warning': 'Please enter a key!',
        'invalid-key-warning': 'Key must contain only numbers!'
    },
    'ru': {
        'title': 'Шифр Гронсфельда',
        'input-label': 'Текст:',
        'key-label': 'Ключ (только цифры):',
        'encrypt-btn': 'Зашифровать',
        'decrypt-btn': 'Расшифровать',
        'result-label': 'Результат:',
        'placeholder': 'Введите текст здесь...',
        'key-placeholder': 'Пример: 123456',
        'copy-btn-text': 'Копировать',
        'copied-notification': 'Скопировано в буфер обмена!',
        'empty-text-warning': 'Пожалуйста, введите текст!',
        'empty-key-warning': 'Пожалуйста, введите ключ!',
        'invalid-key-warning': 'Ключ должен содержать только цифры!'
    },
    'kk': {
        'title': 'Гронсфельд шифры',
        'input-label': 'Мәтін:',
        'key-label': 'Кілт (тек сандар):',
        'encrypt-btn': 'Шифрлау',
        'decrypt-btn': 'Дешифрлау',
        'result-label': 'Нәтиже:',
        'placeholder': 'Мәтінді енгізіңіз...',
        'key-placeholder': 'Мысалы: 123456',
        'copy-btn-text': 'Көшіру',
        'copied-notification': 'Көшірілді!',
        'empty-text-warning': 'Мәтінді енгізіңіз!',
        'empty-key-warning': 'Кілтті енгізіңіз!',
        'invalid-key-warning': 'Кілт тек сандардан тұруы керек!'
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
    document.getElementById('key-label').textContent = translations[currentLang]['key-label'];
    document.getElementById('encrypt-btn').innerHTML = `<i class="fas fa-lock"></i><span>${translations[currentLang]['encrypt-btn']}</span>`;
    document.getElementById('decrypt-btn').innerHTML = `<i class="fas fa-unlock"></i><span>${translations[currentLang]['decrypt-btn']}</span>`;
    document.getElementById('result-label').textContent = translations[currentLang]['result-label'];
    document.getElementById('input-text').placeholder = translations[currentLang]['placeholder'];
    document.getElementById('key').placeholder = translations[currentLang]['key-placeholder'];
    document.getElementById('copy-btn-text').textContent = translations[currentLang]['copy-btn-text'];

    document.querySelectorAll('.language-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${currentLang}-btn`).classList.add('active');
}

function validateKey(key) {
    return /^\d+$/.test(key);
}

function validateInput(text, key) {
    if (!text.trim()) {
        alert(translations[currentLang]['empty-text-warning']);
        return false;
    }
    if (!key.trim()) {
        alert(translations[currentLang]['empty-key-warning']);
        return false;
    }
    if (!validateKey(key)) {
        alert(translations[currentLang]['invalid-key-warning']);
        return false;
    }
    return true;
}

function gronsfeldCipher(text, key, encrypt = true) {
    let result = '';
    let keyIndex = 0;
    const keyLength = key.length;
    
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let code = text.charCodeAt(i);
        let shift = parseInt(key[keyIndex]);

        if (!encrypt) {
            shift = -shift;
        }
        
        if (code >= 65 && code <= 90) {
            char = String.fromCharCode(((code - 65 + shift) % 26 + 26) % 26 + 65);
            keyIndex = (keyIndex + 1) % keyLength;
        }
        else if (code >= 97 && code <= 122) {
            char = String.fromCharCode(((code - 97 + shift) % 26 + 26) % 26 + 97);
            keyIndex = (keyIndex + 1) % keyLength;
        }
        else if (code >= 1040 && code <= 1071) {
            char = String.fromCharCode(((code - 1040 + shift) % 32 + 32) % 32 + 1040);
            keyIndex = (keyIndex + 1) % keyLength;
        }
        else if (code >= 1072 && code <= 1103) {
            char = String.fromCharCode(((code - 1072 + shift) % 32 + 32) % 32 + 1072);
            keyIndex = (keyIndex + 1) % keyLength;
        }
        
        result += char;
    }
    
    return result;
}

function encrypt() {
    const text = document.getElementById('input-text').value;
    const key = document.getElementById('key').value;
    if (!validateInput(text, key)) return;
    const result = gronsfeldCipher(text, key, true);
    document.getElementById('output').textContent = result;
}

function decrypt() {
    const text = document.getElementById('input-text').value;
    const key = document.getElementById('key').value;
    if (!validateInput(text, key)) return;
    const result = gronsfeldCipher(text, key, false);
    document.getElementById('output').textContent = result;
}

function copyResult() {
    const output = document.getElementById('output').textContent;
    if (!output.trim()) {
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

// Set default language
window.onload = function() {
    const savedLang = localStorage.getItem('language') || 'kk';
    changeLanguage(savedLang);
};