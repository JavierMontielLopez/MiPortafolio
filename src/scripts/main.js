document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Cursor de Neón (Solo se activa si el dispositivo soporta ratón)
    const cursor = document.querySelector("#cursor");
    const cursorBlur = document.querySelector("#cursor-blur");
    
    // Detectamos si es pantalla táctil para no ejecutar la lógica del ratón
    const isTouchDevice = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));

    if (!isTouchDevice && cursor && cursorBlur) {
        document.addEventListener("mousemove", (e) => {
            // El cursor principal sigue exactamente al ratón
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            
            // El resplandor (blur) tiene un ligero retraso natural
            cursorBlur.style.left = `${e.clientX}px`;
            cursorBlur.style.top = `${e.clientY}px`;
        });
    }

    // 2. Efecto 3D Tilt (Giro de las tarjetas)
    const cards = document.querySelectorAll(".tilt-card");
    cards.forEach(card => {
        if (!isTouchDevice) {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Calculamos el centro
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Calculamos el ángulo de giro (limitado a 10 grados max)
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        }
    });

    // 3. Scroll Reveal (Aparición al bajar la página)
    const observerOptions = {
        threshold: 0.1, // Se activa cuando el 10% del elemento es visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Opcional: Descomentar la siguiente línea si quieres que la animación ocurra solo 1 vez
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((el) => {
        observer.observe(el);
    });
});