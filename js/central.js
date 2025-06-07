const formulario = document.querySelector('form');
const iptNome = document.querySelector('#idNome');
const iptEmail = document.querySelector('#idEmail');
const iptTel = document.querySelector('#idTel');
const iptMensagem = document.querySelector('#mensagem');
const btnReset = document.querySelector('#btnReset');
const mensagemFlutuante = document.querySelector('#mensagem-flutuante');

const mensagensSalvas = JSON.parse(localStorage.getItem('mensagens')) || [];

// ========== Validação personalizada ==========

// Cria span de erro acessível
function mostrarErro(input, mensagem) {
    let erro = input.nextElementSibling;
    if (!erro || !erro.classList.contains('erro')) {
        erro = document.createElement('span');
        erro.classList.add('erro');
        erro.setAttribute('aria-live', 'assertive');
        input.after(erro);
    }
    erro.textContent = mensagem;
}

function limparErro(input) {
    const erro = input.nextElementSibling;
    if (erro && erro.classList.contains('erro')) {
        erro.remove();
    }
}

// Validação em tempo real
iptEmail.addEventListener('input', () => {
    limparErro(iptEmail);
    const valor = iptEmail.value;
    if (!valor.includes('@') || (!valor.endsWith('.com') && !valor.includes('.'))) {
        mostrarErro(iptEmail, 'Digite um email válido com "@" e domínio (ex: .com)');
    }
});

iptTel.addEventListener('input', () => {
    limparErro(iptTel);
    const valor = iptTel.value.replace(/\D/g, '');
    if (valor.length < 10 || valor.length > 11) {
        mostrarErro(iptTel, 'O telefone deve conter 10 ou 11 dígitos.');
    }

    // Formatar como (11) 91234-5678
    let formatado = valor;
    if (valor.length >= 2) {
        formatado = `(${valor.substring(0, 2)}) `;
        if (valor.length >= 7) {
            formatado += `${valor.substring(2, 7)}-${valor.substring(7, 11)}`;
        } else {
            formatado += valor.substring(2);
        }
    }
    iptTel.value = formatado;
});

// Botão de reset personalizado
btnReset.addEventListener('click', () => {
    setTimeout(() => {
        [iptNome, iptEmail, iptTel, iptMensagem].forEach((campo) => {
            campo.value = '';
            limparErro(campo);
        });
    }, 0);
});

// Submissão do formulário
formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    // Validação final antes de enviar
    let erro = false;

    if (!iptNome.value.trim()) {
        mostrarErro(iptNome, 'O nome é obrigatório.');
        erro = true;
    }

    if (!iptEmail.value.includes('@') || (!iptEmail.value.includes('.') || !iptEmail.value.endsWith('.com'))) {
        mostrarErro(iptEmail, 'Digite um email válido com "@" e ".com".');
        erro = true;
    }

    const telLimpo = iptTel.value.replace(/\D/g, '');
    if (telLimpo.length < 10 || telLimpo.length > 11) {
        mostrarErro(iptTel, 'Digite um telefone válido com DDD (10 ou 11 dígitos).');
        erro = true;
    }

    if (!iptMensagem.value.trim()) {
        mostrarErro(iptMensagem, 'A mensagem não pode estar vazia.');
        erro = true;
    }

    if (erro) return;

    // Envio e salvamento localStorage
    const dadosFormulario = {
        nome: iptNome.value,
        email: iptEmail.value,
        telefone: iptTel.value,
        mensagem: iptMensagem.value
    };

    console.log(dadosFormulario);
    mensagensSalvas.push(dadosFormulario);
    localStorage.setItem('mensagens', JSON.stringify(mensagensSalvas));

    mensagemFlutuante.classList.add('mostrar');
    setTimeout(() => {
        mensagemFlutuante.classList.remove('mostrar');
    }, 3000);

    formulario.reset();
});






// Controle de acordeon: permite desmarcar a resposta aberta
let lastChecked = null;

document.querySelectorAll('.faq input[type="radio"]').forEach(radio => {
    radio.addEventListener('click', function () {
        const label = this.nextElementSibling;
        const resposta = label.nextElementSibling;

        // Se clicar novamente no mesmo item, desmarca
        if (this === lastChecked) {
            this.checked = false;
            lastChecked = null;

            // Acessibilidade: atualizar aria-expanded para false
            if (label) label.setAttribute('aria-expanded', 'false');
        } else {
            // Atualiza referência para o novo item
            lastChecked = this;

            // Acessibilidade: marcar todos os outros como fechados
            document.querySelectorAll('.faq label').forEach(lbl => lbl.setAttribute('aria-expanded', 'false'));

            // Atualiza o novo label como aberto
            if (label) label.setAttribute('aria-expanded', 'true');
        }
    });
});