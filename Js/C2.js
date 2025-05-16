const translations = {
    'en': {
        'title': 'Vigenère Cipher',
        'input-label': 'Text:',
        'key-label': 'Key:',
        'encrypt-btn': 'Encrypt',
        'decrypt-btn': 'Decrypt',
        'result-label': 'Result:',
        'placeholder-text': 'Enter text here...',
        'placeholder-key': 'Enter key...',
        'copy-btn-text': 'Copy',
        'copied-notification': 'Copied to clipboard!',
        'empty-text-warning': 'Please enter some text!',
        'empty-key-warning': 'Please enter a key!',
        'empty-output-warning': 'No result to copy!'
    },
    'ru': {
        'title': 'Шифр Виженера',
        'input-label': 'Текст:',
        'key-label': 'Ключ:',
        'encrypt-btn': 'Зашифровать',
        'decrypt-btn': 'Расшифровать',
        'result-label': 'Результат:',
        'placeholder-text': 'Введите текст здесь...',
        'placeholder-key': 'Введите ключ...',
        'copy-btn-text': 'Копировать',
        'copied-notification': 'Скопировано в буфер обмена!',
        'empty-text-warning': 'Пожалуйста, введите текст!',
        'empty-key-warning': 'Пожалуйста, введите ключ!',
        'empty-output-warning': 'Нет результата для копирования!'
    },
    'kk': {
        'title': 'Виженер шифры',
        'input-label': 'Мәтін:',
        'key-label': 'Кілт:',
        'encrypt-btn': 'Шифрлау',
        'decrypt-btn': 'Дешифрлау',
        'result-label': 'Нәтиже:',
        'placeholder-text': 'Мәтінді енгізіңіз...',
        'placeholder-key': 'Кілтті енгізіңіз...',
        'copy-btn-text': 'Көшіру',
        'copied-notification': 'Көшірілді!',
        'empty-text-warning': 'Мәтінді енгізіңіз!',
        'empty-key-warning': 'Кілтті енгізіңіз!',
        'empty-output-warning': 'Көшіру үшін нәтиже жоқ!'
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
    document.getElementById('input-text').placeholder = translations[currentLang]['placeholder-text'];
    document.getElementById('key').placeholder = translations[currentLang]['placeholder-key'];
    document.getElementById('copy-btn-text').textContent = translations[currentLang]['copy-btn-text'];

    document.querySelectorAll('.language-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${currentLang}-btn`).classList.add('active');
}

function vigenereCipher(text, key, encrypt = true) {
    if (!text || !key) return '';
    
    let result = '';
    let keyIndex = 0;
    
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let code = text.charCodeAt(i);
        
        // Process only letters
        if ((code >= 65 && code <= 90) || // Latin uppercase
            (code >= 97 && code <= 122) || // Latin lowercase
            (code >= 1040 && code <= 1071) || // Cyrillic uppercase
            (code >= 1072 && code <= 1103)) { // Cyrillic lowercase
            
            let keyChar = key[keyIndex % key.length];
            let keyCode = keyChar.charCodeAt(0);
            let shift;
            
            // Determine the shift based on the key character
            if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 1040 && keyCode <= 1071)) {
                shift = keyCode - (keyCode >= 1040 ? 1040 : 65);
            } else {
                shift = keyCode - (keyCode >= 1072 ? 1072 : 97);
            }
            
            if (!encrypt) shift = -shift;
            
            // Apply the shift based on the alphabet
            if (code >= 65 && code <= 90) { // Latin uppercase
                char = String.fromCharCode(((code - 65 + shift) % 26 + 26) % 26 + 65);
            } else if (code >= 97 && code <= 122) { // Latin lowercase
                char = String.fromCharCode(((code - 97 + shift) % 26 + 26) % 26 + 97);
            } else if (code >= 1040 && code <= 1071) { // Cyrillic uppercase
                char = String.fromCharCode(((code - 1040 + shift) % 32 + 32) % 32 + 1040);
            } else if (code >= 1072 && code <= 1103) { // Cyrillic lowercase
                char = String.fromCharCode(((code - 1072 + shift) % 32 + 32) % 32 + 1072);
            }
            
            keyIndex++;
        }
        
        result += char;
    }
    
    return result;
}

function encrypt() {
    const text = document.getElementById('input-text').value.trim();
    const key = document.getElementById('key').value.trim();
    if (!text) {
        alert(translations[currentLang]['empty-text-warning']);
        return;
    }
    if (!key) {
        alert(translations[currentLang]['empty-key-warning']);
        return;
    }
    const result = vigenereCipher(text, key, true);
    document.getElementById('output').textContent = result;
}

function decrypt() {
    const text = document.getElementById('input-text').value.trim();
    const key = document.getElementById('key').value.trim();
    if (!text) {
        alert(translations[currentLang]['empty-text-warning']);
        return;
    }
    if (!key) {
        alert(translations[currentLang]['empty-key-warning']);
        return;
    }
    const result = vigenereCipher(text, key, false);
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

// Set default language
window.onload = function() {
    const savedLang = localStorage.getItem('language') || 'kk';
    changeLanguage(savedLang);
};