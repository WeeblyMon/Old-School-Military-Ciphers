// A simple list of common English words
const commonWords = ["THE", "AND", "FOR", "ARE", "BUT", "NOT", "YOU", "ALL", "ANY", "HER", "HIS", "OUT", "USE", "THERE"];

function decodeCaesarCipher(text) {
    let bestShift = -1;
    let bestCount = -1;
    let bestDecodedText = '';

    for (let shift = 0; shift < 26; shift++) {
        const decodedText = caesarShift(text, shift);
        const wordCount = countCommonWords(decodedText);

        if (wordCount > bestCount) {
            bestCount = wordCount;
            bestShift = shift;
            bestDecodedText = decodedText;
        }
    }

    if (bestCount > 1) { // You can adjust this threshold
        return bestDecodedText;
    } else {
        return "No cipher detected.";
    }
}

function caesarShift(text, shift) {
    return text.split('').map(char => {
        if (/[A-Z]/i.test(char)) {
            const isUpperCase = char === char.toUpperCase();
            let shiftedChar = String.fromCharCode((char.toLowerCase().charCodeAt(0) - 97 + shift) % 26 + 97);
            return isUpperCase ? shiftedChar.toUpperCase() : shiftedChar;
        }
        return char;
    }).join('');
}

function countCommonWords(text) {
    let count = 0;
    commonWords.forEach(word => {
        const regex = new RegExp("\\b" + word + "\\b", "gi");
        count += (text.match(regex) || []).length;
    });
    return count;
}

// Event listener for when input changes
document.getElementById('cipherText').addEventListener('input', function() {
    const encodedMessage = this.value.toUpperCase(); // Assuming case-insensitive detection
    const decoded = decodeCaesarCipher(encodedMessage);
    document.getElementById('decodedMessage').innerText = decoded;
});
