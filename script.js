
// script.js
document.getElementById('submit-button').addEventListener('click', function () {
    const inputPassword = document.getElementById('password-input').value;
    const correctPassword = 'secure123'; // Replace this with secure server-side validation!

    if (inputPassword === correctPassword) {
        document.getElementById('login-container').classList.add('hidden');
        document.getElementById('private-content').classList.remove('hidden');
    } else {
        const errorMessage = document.getElementById('error-message');
        errorMessage.classList.remove('hidden');
        errorMessage.classList.add('shake');

        // Remove shake animation after 500ms
        setTimeout(() => {
            errorMessage.classList.remove('shake');
        }, 500);
    }
});
