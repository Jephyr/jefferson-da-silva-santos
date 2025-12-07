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