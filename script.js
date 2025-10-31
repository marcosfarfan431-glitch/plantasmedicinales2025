document.addEventListener('DOMContentLoaded', () => {
    // Animación de aparición para secciones
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 1s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Desplazamiento suave para los enlaces de navegación
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Desplazamiento suave para el botón CTA
    document.querySelector('.cta-button').addEventListener('click', function() {
        document.getElementById('plantas').scrollIntoView({
            behavior: 'smooth'
        });
    });


    // Animación "shaking" al hacer clic en cualquier elemento interactivo
    document.body.addEventListener('click', (e) => {
        const target = e.target;
        if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.classList.contains('plant-card') || target.classList.contains('faq-question')) {
            target.classList.add('shake-animation');
            target.addEventListener('animationend', () => {
                target.classList.remove('shake-animation');
            }, { once: true });
        }
    });

    // Añadir estilo de animación "shake"
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
        }
        .shake-animation {
            animation: shake 0.3s ease-in-out;
        }
    `;
    document.head.appendChild(style);


    // Funcionalidad de Preguntas Frecuentes (FAQ)
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Cierra otras preguntas si están abiertas (efecto acordeón)
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });

    // Datos de las plantas para el detalle
    const plantData = {
        coca: {
            title: "Hoja de Coca",
            image: "img/coca.jpeg",
            description: "La Hoja de Coca es una planta ancestral de los Andes con una rica historia cultural y medicinal. Tradicionalmente usada por comunidades indígenas para combatir la fatiga, el hambre y el mal de altura. Contiene alcaloides, vitaminas y minerales que le otorgan propiedades estimulantes y digestivas. Es importante destacar que su uso y legalidad varían según la región."
        },
        sabila: {
            title: "Sábila",
            image: "img/sabila.jpeg",
            description: "La Sábila, también conocida como Aloe Vera, es una planta suculenta famosa por su gel mucilaginoso. Este gel es un potente cicatrizante, antiinflamatorio, hidratante y antibacteriano. Se utiliza tópicamente para quemaduras, cortes, irritaciones de la piel y internamente para problemas digestivos como el estreñimiento y la acidez. Un verdadero botiquín natural."
        },
        manzanilla: {
            title: "Manzanilla",
            image: "img/manzanilla.jpeg",
            description: "La Manzanilla es una de las hierbas medicinales más populares y versátiles. Sus flores se utilizan para preparar infusiones que alivian la ansiedad, el estrés y el insomnio gracias a sus propiedades sedantes y relajantes. También es muy eficaz para calmar problemas digestivos como cólicos, indigestión y gases, actuando como un suave antiinflamatorio."
        },
        menta: {
            title: "Menta",
            image: "img/menta.jpeg",
            description: "La Menta es una hierba aromática y medicinal con un aroma y sabor refrescantes debido a su contenido de mentol. Es excelente para aliviar malestares estomacales, náuseas, indigestión y gases. También tiene propiedades descongestionantes que la hacen útil para resfriados y congestión nasal, y puede tener efectos analgésicos leves."
        },
        eucalipto: {
            title: "Eucalipto",
            image: "img/eucalipto.jpeg",
            description: "El Eucalipto es un árbol conocido por sus hojas aromáticas y su aceite esencial. Es ampliamente utilizado para tratar afecciones respiratorias como resfriados, gripe, bronquitis, asma y sinusitis. Sus propiedades expectorantes y descongestionantes ayudan a limpiar las vías respiratorias. Se usa en inhalaciones, ungüentos y también en infusiones."
        }
    };

    const plantCards = document.querySelectorAll('.plant-card');
    const plantDetailOverlay = document.getElementById('plant-detail');
    const closeButton = document.querySelector('.close-button');
    const detailTitle = document.getElementById('detail-title');
    const detailImage = document.getElementById('detail-image');
    const detailDescription = document.getElementById('detail-description');

    plantCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const plantKey = card.dataset.plant;
            const plant = plantData[plantKey];

            if (plant) {
                detailTitle.textContent = plant.title;
                detailImage.src = plant.image;
                detailImage.alt = plant.title;
                detailDescription.textContent = plant.description;
                plantDetailOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Evita scroll en el fondo
            }
        });
    });

    closeButton.addEventListener('click', () => {
        plantDetailOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restaura scroll
    });

    // Cerrar overlay al hacer clic fuera del contenido
    plantDetailOverlay.addEventListener('click', (e) => {
        if (e.target === plantDetailOverlay) {
            plantDetailOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});