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

// Animação suave ao rolar a página
document.addEventListener('DOMContentLoaded', function() {
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
    const animatedElements = document.querySelectorAll('.produto-card, .section-title, .sobre-text');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Efeito de hover nos botões
    const buttons = document.querySelectorAll('.btn-whatsapp, .btn-contato');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Efeito parallax suave no header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Smooth scroll para links internos (se houver)
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
    });
}

