// Configurazione: Qui puoi inserire i 10 link diversi di Throne e i 10 CODICI SEGRETI per ogni immagine corrispondente!

const galleryData = [
    { id: 1, image: "assets/1.png", throneLink: "https://throne.com/tuo_profilo/item1", secretCode: "GATTO" },
    { id: 2, image: "assets/2.png", throneLink: "https://throne.com/tuo_profilo/item2", secretCode: "LUNA" },
    { id: 3, image: "assets/3.png", throneLink: "https://throne.com/tuo_profilo/item3", secretCode: "SOLE" },
    { id: 4, image: "assets/4.png", throneLink: "https://throne.com/tuo_profilo/item4", secretCode: "STELLA" },
    { id: 5, image: "assets/5.png", throneLink: "https://throne.com/tuo_profilo/item5", secretCode: "NOTTE" },
    { id: 6, image: "assets/6.png", throneLink: "https://throne.com/tuo_profilo/item6", secretCode: "MARE" },
    { id: 7, image: "assets/7.png", throneLink: "https://throne.com/tuo_profilo/item7", secretCode: "CIELO" },
    { id: 8, image: "assets/8.png", throneLink: "https://throne.com/tuo_profilo/item8", secretCode: "FUOCO" },
    { id: 9, image: "assets/9.png", throneLink: "https://throne.com/tuo_profilo/item9", secretCode: "NEVE" },
    { id: 10, image: "assets/10.png", throneLink: "https://throne.com/tuo_profilo/item10", secretCode: "VENTO" }
];

document.addEventListener('DOMContentLoaded', () => {
    // Audio Setup (Now acts as Background Audio)
    const bgmSound = new Audio('assets/sound.mp3');
    bgmSound.volume = 0.5; // Volume background track al 50%
    bgmSound.loop = true; // Continua a suonare in loop per creare l'atmosfera

    // Entry Gateway Logic
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainApp = document.getElementById('main-app');
    const enterBtn = document.getElementById('enter-btn');

    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            // L'interazione dell'utente SBLOCCA il permesso audio del browser!
            // Inizia a suonare l'audio:
            bgmSound.play().catch(err => console.log("Audio play prevented:", err));
            
            // Fai sparire la schermata di benvenuto e mostra il carousel
            welcomeScreen.classList.add('fade-out');
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
                mainApp.style.display = 'flex';
                // Piccola animazione di fade-in
                setTimeout(() => {
                    mainApp.classList.add('visible');
                }, 50);
            }, 800);
        });
    }

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

    // Logic for showing the code input form
    const unlockBtns = document.querySelectorAll('.unlock-btn');
    unlockBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const container = e.target.closest('.action-container');
            e.target.style.display = 'none'; 
            container.querySelector('.code-container').style.display = 'flex'; 
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
                setTimeout(() => inputEl.classList.remove('error'), 400); 
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
