document.getElementById('loginButton').addEventListener('click', function() {

    const password = document.getElementById('password').value;

    const correctPassword = 'yourPassword'; // Set your password here


    if (password === correctPassword) {

        document.querySelector('.login-container').style.display = 'none';

        const animationContainer = document.getElementById('animationContainer');

        animationContainer.style.display = 'block';


        // Create spaceship animation

        for (let i = 0; i < 100; i++) {

            const star = document.createElement('div');

            star.className = 'star';

            star.style.left = Math.random() * 100 + 'vw';

            star.style.top = Math.random() * 100 + 'vh';

            animationContainer.appendChild(star);

        }


        // Trigger the blooming heart animation

        setTimeout(() => {

            const heart = document.createElement('div');

            heart.className = 'blooming-heart';

            animationContainer.appendChild(heart);

        }, 2000);

    } else {

        alert('Incorrect password. Please try again.');

    }

});

