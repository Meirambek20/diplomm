const translations = {
    'en': {
        'title': 'Morse Code Translator',
        'input-label': 'Text:',
        'to-morse-btn': 'To Morse',
        'from-morse-btn': 'From Morse',
        'result-label': 'Result:',
        'placeholder': 'Enter text here...',
        'copy-btn-text': 'Copy',
        'copied-notification': 'Copied to clipboard!'
    },
    'ru': {
        'title': 'Переводчик Морзе кода',
        'input-label': 'Текст:',
        'to-morse-btn': 'В Морзе',
        'from-morse-btn': 'Из Морзе',
        'result-label': 'Результат:',
        'placeholder': 'Введите текст здесь...',
        'copy-btn-text': 'Копировать',
        'copied-notification': 'Скопировано в буфер обмена!'
    },
    'kk': {
        'title': 'Морзе коды көшірмеші',
        'input-label': 'Мәтін:',
        'to-morse-btn': 'Морзе кодына',
        'from-morse-btn': 'Морзе кодынан',
        'result-label': 'Нәтиже:',
        'placeholder': 'Мәтінді енгізіңіз...',
        'copy-btn-text': 'Көшіру',
        'copied-notification': 'Көшірілді!'
    }
};

const kazakhMorseCode = {
    'А': '.-', 'Ә': '.-.-', 'Б': '-...', 'В': '.--', 'Г': '--.', 'Ғ': '--._',
    'Д': '-..', 'Е': '.', 'Ё': '._.', 'Ж': '...-', 'З': '--..', 'И': '..',
    'Й': '.---', 'К': '-.-', 'Қ': '-.-_', 'Л': '.-..', 'М': '--', 'Н': '-.',
    'Ң': '--.--', 'О': '---', 'Ө': '---_', 'П': '.--.', 'Р': '.-.', 'С': '...',
    'Т': '-', 'У': '..-', 'Ұ': '.._', 'Ү': '_..', 'Ф': '..-.', 'Х': '....',
    'Һ': '....', 'Ц': '-.-.', 'Ч': '---.', 'Ш': '----', 'Щ': '--.-', 'Ъ': '-..-',
    'Ы': '-.--', 'І': '..', 'Ь': '-..-', 'Э': '..-..', 'Ю': '..--', 'Я':  '.-.-.',
    '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
    '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.'
};

const russianMorseCode = {
    'А': '.-', 'Б': '-...', 'В': '.--', 'Г': '--.', 'Д': '-..',
    'Е': '.', 'Ё': '._.', 'Ж': '...-', 'З': '--..', 'И': '..',
    'Й': '.---', 'К': '-.-', 'Л': '.-..', 'М': '--', 'Н': '-.',
    'О': '---', 'П': '.--.', 'Р': '.-.', 'С': '...', 'Т': '-',
    'У': '..-', 'Ф': '..-.', 'Х': '....', 'Ц': '-.-.', 'Ч': '---.',
    'Ш': '----', 'Щ': '--.-', 'Ъ': '-..-', 'Ы': '-.--', 'Ь': '-..-',
    'Э': '..-..', 'Ю': '..--', 'Я': '.-.-',
    '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
    '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.'
};

const englishMorseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..',
    '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
    '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.'
};

let currentLang = 'kk';

function changeLanguage(lang) {
    currentLang = lang;
    document.getElementById('title').textContent = translations[lang]['title'];
    document.getElementById('input-label').textContent = translations[lang]['input-label'];
    document.getElementById('to-morse-btn').innerHTML = `<i class="fas fa-arrow-right"></i><span>${translations[lang]['to-morse-btn']}</span>`;
    document.getElementById('from-morse-btn').innerHTML = `<i class="fas fa-arrow-left"></i><span>${translations[lang]['from-morse-btn']}</span>`;
    document.getElementById('result-label').textContent = translations[lang]['result-label'];
    document.getElementById('input-text').placeholder = translations[lang]['placeholder'];
    document.getElementById('copy-btn-text').textContent = translations[lang]['copy-btn-text'];
    document.querySelectorAll('.language-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${lang}-btn`).classList.add('active');
}

function toMorse() {
    const text = document.getElementById('input-text').value.toUpperCase();
    let result = '';
    const morseCode = getCurrentMorseCode();
    for (let i = 0; i < text.length; i++) {
        if (morseCode[text[i]]) {
            result += morseCode[text[i]] + ' ';
        } else if (text[i] === ' ') {
            result += '   ';
        }
    }
    document.getElementById('output').textContent = result.trim();
}

function fromMorse() {
    const morse = document.getElementById('input-text').value;
    const words = morse.split('   ');
    let result = '';
    const reverseMorse = getReverseMorseCode();
    for (let i = 0; i < words.length; i++) {
        const characters = words[i].trim().split(' ');
        for (let j = 0; j < characters.length; j++) {
            if (reverseMorse[characters[j]]) {
                result += reverseMorse[characters[j]];
            }
        }
        if (i < words.length - 1) {
            result += ' ';
        }
    }
    document.getElementById('output').textContent = result;
}

function getCurrentMorseCode() {
    if (currentLang === 'kk') {
        return kazakhMorseCode;
    } else if (currentLang === 'ru') {
        return russianMorseCode;
    } else {
        return englishMorseCode;
    }
}

function getReverseMorseCode() {
    if (currentLang === 'kk') {
        const reverse = {};
        for (let key in kazakhMorseCode) {
            reverse[kazakhMorseCode[key]] = key;
        }
        return reverse;
    } else if (currentLang === 'ru') {
        const reverse = {};
        for (let key in russianMorseCode) {
            reverse[russianMorseCode[key]] = key;
        }
        return reverse;
    } else {
        const reverse = {};
        for (let key in englishMorseCode) {
            reverse[englishMorseCode[key]] = key;
        }
        return reverse;
    }
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