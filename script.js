// Função para chamar no WhatsApp com produto específico
function chamarWhatsApp(nomeProduto) {
    // Número do WhatsApp (substitua pelo número real da loja)
    const numeroWhatsApp = '5573991455484'; // Formato: código do país + DDD + número
    
    // Mensagem personalizada com o produto
    const mensagem = `Olá! Gostaria de saber mais sobre o ${nomeProduto} da Manu Multimarcas. Poderia me informar o preço e disponibilidade?`;
    
    // Codifica a mensagem para URL
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    // Cria o link do WhatsApp
    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;
    
    // Abre o WhatsApp em uma nova aba
    window.open(linkWhatsApp, '_blank');
}

// Variáveis do slider
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');

// Função para mostrar slide específico
function showSlide(index) {
    // Remove classe active de todos os slides e indicadores
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Adiciona classe active ao slide e indicador atual
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }
    
    currentSlideIndex = index;
}

// Função para próximo slide
function nextSlide() {
    const nextIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(nextIndex);
}

// Função para slide anterior
function previousSlide() {
    const prevIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
}

// Função para ir para slide específico
function currentSlide(index) {
    showSlide(index - 1); // -1 porque o índice começa em 0
}

// Auto-play do slider
function autoSlide() {
    nextSlide();
}

// Função para criar partículas
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    document.querySelector('.particles-container').appendChild(particle);

    const size = Math.random() * 5 + 2; // Tamanho entre 2px e 7px
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    const startX = Math.random() * window.innerWidth;
    particle.style.left = `${startX}px`;
    particle.style.top = `${window.innerHeight}px`; // Começa na parte inferior

    const animationDuration = Math.random() * 10 + 5; // Duração entre 5s e 15s
    particle.style.animationDuration = `${animationDuration}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`; // Atraso aleatório

    // Remove a partícula após a animação para evitar acúmulo
    particle.addEventListener('animationend', () => {
        particle.remove();
    });
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o slider
    if (slides.length > 0) {
        showSlide(0);
        
        // Auto-play a cada 5 segundos
        setInterval(autoSlide, 5000);
    }

    // Gera partículas em intervalos regulares
    setInterval(createParticle, 300); // Cria uma nova partícula a cada 300ms

    // Observador para animações ao entrar na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplica animação aos elementos
    const animatedElements = document.querySelectorAll('.produto-card, .section-title, .sobre-descricao');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Efeito de hover nos botões
    const buttons = document.querySelectorAll('.btn-whatsapp, .contato-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Controle de teclado para o slider
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            previousSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Pausa o auto-play quando o mouse está sobre o slider
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        let autoPlayInterval = setInterval(autoSlide, 5000);
        
        sliderContainer.addEventListener('mouseenter', function() {
            clearInterval(autoPlayInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', function() {
            autoPlayInterval = setInterval(autoSlide, 5000);
        });
    }
});

// Função para validar e formatar número de WhatsApp (caso precise ser alterado)
function formatarNumeroWhatsApp(numero) {
    // Remove todos os caracteres não numéricos
    const numeroLimpo = numero.replace(/\D/g, '');
    
    // Verifica se tem o código do país (55 para Brasil)
    if (numeroLimpo.length === 11 && !numeroLimpo.startsWith('55')) {
        return '55' + numeroLimpo;
    }
    
    return numeroLimpo;
}

// Função para detectar dispositivo móvel
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Ajustes específicos para mobile
if (isMobile()) {
    document.addEventListener('DOMContentLoaded', function() {
        // Adiciona classe para dispositivos móveis
        document.body.classList.add('mobile-device');
        
        // Otimiza animações para mobile
        const style = document.createElement('style');
        style.textContent = `
            .mobile-device * {
                animation-duration: 0.3s !important;
                transition-duration: 0.3s !important;
            }
        `;
        document.head.appendChild(style);

        // Adiciona suporte a touch para o slider
        let startX = 0;
        let endX = 0;
        
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('touchstart', function(e) {
                startX = e.touches[0].clientX;
            });
            
            sliderContainer.addEventListener('touchend', function(e) {
                endX = e.changedTouches[0].clientX;
                handleSwipe();
            });
            
            function handleSwipe() {
                const swipeThreshold = 50;
                const diff = startX - endX;
                
                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        nextSlide(); // Swipe left - próximo slide
                    } else {
                        previousSlide(); // Swipe right - slide anterior
                    }
                }
            }
        }
    });
}

// Função para scroll suave até uma seção
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Adiciona funcionalidade aos botões de navegação
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                const sectionId = href.substring(1);
                scrollToSection(sectionId);
            }
        });
    });
});



