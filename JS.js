// O script aguarda o carregamento completo do DOM antes de sua execução
document.addEventListener('DOMContentLoaded', function() {
    
    // Realiza a seleção do Formulário e da Área de Mensagem
    const form = document.getElementById('contatoForm');
    const formMessage = document.getElementById('form-message');

    // Adiciona um 'event listener' para interceptar o envio do formulário
    form.addEventListener('submit', function(event) {
        
        // Previne o comportamento padrão de envio do formulário (recarregar a página)
        event.preventDefault();

        // Executa a validação dos campos
        if (validarFormulario()) {
            
            // Simula o envio bem-sucedido após a validação
            simularEnvio();
            
            // Limpa os campos após a simulação de envio
            form.reset();
        }
    });

    /**
     * Define a Função de Validação do Formulário.
     * Esta função verifica se os campos 'nome', 'email' e 'mensagem' estão preenchidos.
     * @returns {boolean} A função retorna true se todos os campos forem válidos, e false caso contrário.
     */
    function validarFormulario() {
        // Seleciona os valores dos campos
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        // Limpa mensagens anteriores
        formMessage.textContent = '';
        formMessage.className = 'form-message'; 

        // Executa a Validação Obrigatória
        if (nome === '' || email === '' || mensagem === '') {
            formMessage.classList.add('error');
            formMessage.textContent = 'Erro: Todos os campos (Nome, E-mail e Mensagem) são obrigatórios.';
            return false;
        }

        // Executa a Validação Simples de E-mail (Verifica a presença de '@' e '.')
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formMessage.classList.add('error');
            formMessage.textContent = 'Erro: Por favor, insira um endereço de e-mail válido.';
            return false;
        }

        // Confirma que a validação foi bem-sucedida
        return true;
    }

    /**
     * Define a Função de Simulação de Envio.
     * Esta função simula o que ocorreria após um envio real, exibindo uma mensagem de sucesso.
     */
    function simularEnvio() {
        // Exibe a mensagem de sucesso
        formMessage.classList.remove('error');
        formMessage.classList.add('success');
        formMessage.textContent = 'Mensagem enviada com sucesso! (Simulação)';

        // Opcional: Remove a mensagem de sucesso após 5 segundos
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'form-message'; 
        }, 5000);
    }
});

/* --- Adições: funcionalidades sugeridas (sem alterar o código acima) --- */
document.addEventListener('DOMContentLoaded', function() {
    // Menu responsivo (menu-toggle / nav-menu)
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
    }

    // Tema claro/escuro
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;

    function updateThemeIcon() {
        if (!themeToggle) return;
        const isDark = root.classList.contains('dark-theme');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        themeToggle.setAttribute('aria-label', isDark ? 'Ativar tema claro' : 'Ativar tema escuro');
    }

    function applyTheme(theme) {
        if (theme === 'dark') root.classList.add('dark-theme'); else root.classList.remove('dark-theme');
        try { localStorage.setItem('site-theme', theme); } catch (e) { }
        updateThemeIcon();
    }

    const saved = (function(){ try { return localStorage.getItem('site-theme'); } catch(e){ return null; } })() || 'light';
    applyTheme(saved);
    if (themeToggle) themeToggle.addEventListener('click', () => {
        const isDark = root.classList.contains('dark-theme');
        const next = isDark ? 'light' : 'dark';
        applyTheme(next);
        showToast('Tema alterado para ' + next);
    });

    // Toast simples
    function showToast(message, duration = 3000) {
        const t = document.createElement('div');
        t.className = 'js-toast';
        t.textContent = message;
        Object.assign(t.style, { position: 'fixed', right: '20px', bottom: '20px', background: 'rgba(0,0,0,0.75)', color:'#fff', padding:'10px 14px', borderRadius:'6px', zIndex:12000, opacity: '0', transition:'opacity 200ms' });
        document.body.appendChild(t);
        // show
        requestAnimationFrame(()=> t.style.opacity = '1');
        setTimeout(()=> { t.style.opacity = '0'; setTimeout(()=> t.remove(), 300); }, duration);
    }

    // Modal simples
    function showModal(title, message) {
        const overlay = document.createElement('div');
        Object.assign(overlay.style, { position:'fixed', left:0,top:0,right:0,bottom:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:13000 });
        const box = document.createElement('div');
        Object.assign(box.style, { background:'#fff', padding:'18px', borderRadius:'8px', maxWidth:'480px', width:'90%', boxSizing:'border-box', boxShadow:'0 10px 40px rgba(0,0,0,0.2)'});
        const h = document.createElement('h3'); h.textContent = title; h.style.margin = '0 0 8px 0';
        const p = document.createElement('p'); p.textContent = message; p.style.margin = '0 0 12px 0';
        const btn = document.createElement('button'); btn.textContent = 'Fechar'; btn.style.padding = '8px 12px'; btn.style.cursor = 'pointer';
        btn.addEventListener('click', ()=> overlay.remove());
        box.appendChild(h); box.appendChild(p); box.appendChild(btn); overlay.appendChild(box); document.body.appendChild(overlay);
    }

    // Observador para detectar sucesso/erro em formMessage
    // Evita múltiplos disparos usando um guard que compara estado anterior
    const formMessage = document.getElementById('form-message');
    if (formMessage) {
        let _lastKey = '';
        const mo = new MutationObserver(() => {
            // chave simples que representa o estado atual da mensagem
            const key = (formMessage.className || '') + '|' + (formMessage.textContent || '').trim();
            if (key === _lastKey) return; // já processado
            _lastKey = key;

            if (formMessage.classList.contains('success')) {
                showModal('Sucesso', formMessage.textContent || 'Mensagem enviada com sucesso!');
                showToast(formMessage.textContent || 'Mensagem enviada com sucesso!');
            } else if (formMessage.classList.contains('error')) {
                showToast(formMessage.textContent || 'Erro no envio', 4000);
            }
        });
        mo.observe(formMessage, { attributes:true, childList:true, subtree:true, characterData:true });
    }
});
