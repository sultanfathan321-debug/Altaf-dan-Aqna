document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('custom-cursor');
    const overlay = document.getElementById('invitation-overlay');
    const openBtn = document.getElementById('open-invitation');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    const greetingForm = document.getElementById('greeting-form');
    const greetingsWall = document.getElementById('greetings-wall');

    // 1. Custom Cursor Logic (Desktop Only)
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            // Randomly switch icon occasionally or on click
            if (Math.random() > 0.99) {
                cursor.innerText = Math.random() > 0.5 ? '❤️' : '💍';
            }
        }
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });

    // 2. Open Invitation
    openBtn.addEventListener('click', () => {
        overlay.classList.add('fade-out');
        mainContent.classList.remove('hidden');

        // Start Music
        bgMusic.play().catch(e => console.log("Audio play failed: ", e));
        musicBtn.classList.add('playing');

        // Initial Confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        // Run GSAP Animations
        animateSections();
    });

    // 3. Music Control
    musicBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicBtn.classList.add('playing');
        } else {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
        }
    });

    // 4. Greeting Form & Emoji Blast
    greetingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;

        // Create greeting card
        const card = document.createElement('div');
        card.className = 'greeting-card';
        card.innerHTML = `
            <span class="sender">Dari: ${name}</span>
            <p>${message}</p>
        `;

        greetingsWall.prepend(card);

        // Emoji Blast / Confetti
        const scalar = 4;
        const partyIcon = confetti.shapeFromText({ text: '🎉', scalar });
        const heartIcon = confetti.shapeFromText({ text: '❤️', scalar });
        const sparkleIcon = confetti.shapeFromText({ text: '✨', scalar });

        const defaults = {
            spread: 360,
            ticks: 100,
            gravity: 0.5,
            decay: 0.94,
            startVelocity: 30,
            shapes: [partyIcon, heartIcon, sparkleIcon],
            scalar
        };

        function shoot() {
            confetti({
                ...defaults,
                particleCount: 40,
                origin: { x: 0.5, y: 0.7 }
            });

            confetti({
                ...defaults,
                particleCount: 15,
                scalar: scalar / 2,
                shapes: ['circle']
            });
        }

        setTimeout(shoot, 0);
        setTimeout(shoot, 150);
        setTimeout(shoot, 300);

        // Clear form
        greetingForm.reset();
    });

    // 5. GSAP Animations
    function animateSections() {
        gsap.from('.main-title', {
            duration: 1.5,
            y: 100,
            opacity: 0,
            ease: 'power4.out'
        });

        gsap.from('.subtitle', {
            duration: 1.5,
            y: 50,
            opacity: 0,
            delay: 0.5,
            ease: 'power4.out'
        });

        gsap.from('.glass-card', {
            scrollTrigger: {
                trigger: '.glass-card',
                start: 'top 80%'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power2.out'
        });
    }
});
