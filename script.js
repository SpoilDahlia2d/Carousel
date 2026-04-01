// Configurazione: Qui puoi inserire i 10 link diversi di Throne e i 10 CODICI SEGRETI per ogni immagine corrispondente!

const galleryData = [
    { id: 1, image: "assets/1.png", throneLink: "https://throne.com/dahliastar/item/587CE7A9-BF83-43B3-881B-BB4C15E1D78A", secretCode: "WORSHIP" },
    { id: 2, image: "assets/2.png", throneLink: "https://throne.com/dahliastar/item/587CE7A9-BF83-43B3-881B-BB4C15E1D78A", secretCode: "OBEY" },
    { id: 3, image: "assets/3.png", throneLink: "https://throne.com/dahliastar/item/587CE7A9-BF83-43B3-881B-BB4C15E1D78A", secretCode: "LICK" },
    { id: 4, image: "assets/4.png", throneLink: "https://throne.com/dahliastar/item/587CE7A9-BF83-43B3-881B-BB4C15E1D78A", secretCode: "BEG" },
    { id: 5, image: "assets/5.png", throneLink: "https://throne.com/dahliastar/item/587CE7A9-BF83-43B3-881B-BB4C15E1D78A", secretCode: "LOSER" },
    { id: 6, image: "assets/6.png", throneLink: "https://throne.com/dahliastar/item/587CE7A9-BF83-43B3-881B-BB4C15E1D78A", secretCode: "PATHETIC" },
    { id: 7, image: "assets/7.png", throneLink: "https://throne.com/dahliastar/item/587CE7A9-BF83-43B3-881B-BB4C15E1D78A", secretCode: "PIG" },
    { id: 8, image: "assets/8.png", throneLink: "https://throne.com/dahliastar/item/587CE7A9-BF83-43B3-881B-BB4C15E1D78A", secretCode: "TOY" },
    { id: 9, image: "assets/9.png", throneLink: "https://throne.com/dahliastar/item/587CE7A9-BF83-43B3-881B-BB4C15E1D78A", secretCode: "PET" },
    { id: 10, image: "assets/10.png", throneLink: "https://throne.com/dahliastar/item/587CE7A9-BF83-43B3-881B-BB4C15E1D78A", secretCode: "RUIN" }
];

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carousel');
    
    // Dynamically inject the 10 images into the DOM
    galleryData.forEach(item => {
        const div = document.createElement('div');
        div.className = 'carousel-item';
        div.innerHTML = `
            <img src="${item.image}" alt="Vault Collection ${item.id}" class="vault-image blurred">
            <div class="glass-overlay">
                <div class="lock-icon">
                    <svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
                </div>
                <div class="action-container">
                    <button class="unlock-btn">Unlock Image</button>
                    <div class="code-container" style="display: none;">
                        <input type="text" class="code-input" placeholder="Enter Secret Code">
                        <button class="submit-code-btn" data-id="${item.id}">Verify Code</button>
                        <a href="${item.throneLink}" target="_blank" class="throne-btn">Don't have a code? Get it on Throne</a>
                    </div>
                </div>
            </div>
        `;
        carousel.appendChild(div);
    });

    // Audio Setup
    const unlockSound = new Audio('assets/sound.mp3');
    unlockSound.volume = 0.7; // Volume al 70%

    // Logic for showing the code input form
    const unlockBtns = document.querySelectorAll('.unlock-btn');
    unlockBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const container = e.target.closest('.action-container');
            e.target.style.display = 'none'; // hide unlock button
            container.querySelector('.code-container').style.display = 'flex'; // show input form
        });
    });

    // Logic for verifying the secret code
    const submitBtns = document.querySelectorAll('.submit-code-btn');
    submitBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const btnEl = e.target;
            const itemDiv = btnEl.closest('.carousel-item');
            const inputEl = btnEl.parentElement.querySelector('.code-input');
            const enteredCode = inputEl.value.trim();
            const itemId = parseInt(btnEl.getAttribute('data-id'));
            
            // Find the correct code from galleryData
            const correctData = galleryData.find(g => g.id === itemId);

            if (enteredCode.toUpperCase() === correctData.secretCode.toUpperCase()) {
                // CODE IS CORRECT -> Trigger Unlock Animation
                if (!itemDiv.classList.contains('unlocked') && !itemDiv.classList.contains('unlocking')) {
                    // Play audio!
                    unlockSound.currentTime = 0;
                    unlockSound.play().catch(err => console.log("Browser prevented audio autoplay:", err));

                    // Hide the form and show a verifying message
                    btnEl.parentElement.innerHTML = '<span class="spinner"></span> Verifying...';
                    itemDiv.classList.add('unlocking');

                    // After the intense animation finishes, unblur permanently
                    setTimeout(() => {
                        itemDiv.classList.remove('unlocking');
                        itemDiv.classList.add('unlocked');
                    }, 1500); 
                }
            } else {
                // CODE IS WRONG
                inputEl.classList.add('error');
                setTimeout(() => inputEl.classList.remove('error'), 400); // Remove shaking class after animation
                inputEl.value = '';
                inputEl.placeholder = 'Wrong Code!';
            }
        });
    });

    // Carousel Navigation
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const scrollAmount = window.innerWidth > 768 ? 360 : 310;

    if (prevBtn) prevBtn.addEventListener('click', () => carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
    if (nextBtn) nextBtn.addEventListener('click', () => carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' }));
});
