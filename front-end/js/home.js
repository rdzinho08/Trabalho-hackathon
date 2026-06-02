const track = document.getElementById('carouselTrack');
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        const indicators = document.querySelectorAll('#carouselIndicators .indicator');

        let index = 0;

        function updateCarousel() {
           
            const firstCard = document.querySelector('.feature-card');
            if (!firstCard) return;
            
            const cardWidth = firstCard.offsetWidth + 30; 
            track.style.transform = `translateX(-${index * cardWidth}px)`;
            
            
            indicators.forEach((ind, i) => {
                if(i === index) ind.classList.add('active');
                else ind.classList.remove('active');
            });
        }

        nextBtn.addEventListener('click', () => {
            
            if (index < 1) { 
                index++;
                updateCarousel();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (index > 0) {
                index--;
                updateCarousel();
            }
        });

        window.addEventListener('resize', updateCarousel);