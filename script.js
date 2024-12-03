// script.js
const errorMessages = [
    "Chaman galat hai, try again.",
    "Chumpu galat hai, ache se dhund!",
    "Chitra meri jaan ache se dhundho!",
    "Oops! Password incorrect. Think carefully, my love!",
    "Nope, not quite right. Keep trying!"
];

document.getElementById('submit-button').addEventListener('click', function () {
    const inputPassword = document.getElementById('password-input').value;
    const correctPassword = 'dyanChitr2A15dec'; // Correct password

    if (inputPassword === correctPassword) {
        document.getElementById('login-container').classList.add('hidden');
        document.getElementById('private-content').classList.remove('hidden');
    } else {
        const errorMessage = document.getElementById('error-message');
        const randomMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];
        errorMessage.textContent = randomMessage;
        errorMessage.classList.remove('hidden');
        errorMessage.classList.add('shake');
        
        // Remove shake animation after 500ms
        setTimeout(() => {
            errorMessage.classList.remove('shake');
        }, 500);
    }
});
