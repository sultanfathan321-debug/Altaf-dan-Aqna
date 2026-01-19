let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'VBg94eFBqEE',
        playerVars: {
            'autoplay': 1,
            'mute': 1,
            'controls': 0,
            'loop': 1,
            'playlist': 'VBg94eFBqEE',
            'modestbranding': 1,
            'rel': 0
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    // Player is ready
}

document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('custom-cursor');
    const overlay = document.getElementById('invitation-overlay');
    const openBtn = document.getElementById('open-invitation');
    const mainContent = document.getElementById('main-content');
    const musicBtn = document.getElementById('music-btn');
    const greetingForm = document.getElementById('greeting-form');
    const greetingsWall = document.getElementById('greetings-wall');

    // 1. Custom Cursor Logic (Desktop Only)
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

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

        // Start YouTube Music (Unmute and Play)
        if (player && player.unMute) {
            player.unMute();
            player.playVideo();
            musicBtn.classList.add('playing');
        }

        // Initial Confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        animateSections();
    });

    // 3. Music Control
    musicBtn.addEventListener('click', () => {
        if (player && player.getPlayerState) {
            const state = player.getPlayerState();
            if (state === YT.PlayerState.PLAYING) {
                player.pauseVideo();
                musicBtn.classList.remove('playing');
            } else {
                player.playVideo();
                musicBtn.classList.add('playing');
            }
        }
    });

    // 4. Greeting Form & Emoji Blast
    greetingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;

        const card = document.createElement('div');
        card.className = 'greeting-card';
        card.innerHTML = `
            <span class="sender">Dari: ${name}</span>
            <p>${message}</p>
        `;

        greetingsWall.prepend(card);

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

        greetingForm.reset();
    });

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
