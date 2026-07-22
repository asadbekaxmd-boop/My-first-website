document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.container');
    const navbar = document.querySelector('.main');
    
    // 1. Animatsiya bo'ladigan barcha elementlarni tanlab olamiz
    const animatedElements = document.querySelectorAll(
        '.content h1, .content p, .buy-btn, .ipad-title, .ipad-desc, .narxi2, ' +
        '.sss, .rrr, .sss2, .rrr2, .watch-card, .airpods-item, .nnn'
    );

    // Ularga boshlang'ich animatsiya klassini qo'shib chiqamiz
    animatedElements.forEach(el => el.classList.add('js-reveal'));

    // 2. Intersection Observer - elementlarni skroll bo'lganda tutib olish
    const observerOptions = {
        root: container, // Sizda skroll aynan .container ichida
        threshold: 0.15  // Elementning 15% qismi ko'ringanda ishga tushadi
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Element ko'ringanda biroz kechikish bilan animatsiyani ishga tushirish
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, 100); 
            }
        });
    }, observerOptions);

    // Barcha elementlarni kuzatuvga olamiz
    animatedElements.forEach(el => observer.observe(el));

    // 3. Navbar animatsiyasi (Skroll bo'lganda o'zgarishi)
    container.addEventListener('scroll', () => {
        if (container.scrollTop > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

    // 4. Kartalarga sichqoncha borganda yengil "suzish" effekti (Parallax)
    const cards = document.querySelectorAll('.watch-card, .airpods-item, .sss, .rrr');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = "transform 0.4s ease-out";
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            card.style.transform = `perspective(2000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
        });
    });
});