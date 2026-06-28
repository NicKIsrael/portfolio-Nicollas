// ============================================================
//  script.js — Funcionalidades do Portfólio de Nicollas Israel
// ============================================================


// ============================================================
//  1. ALTERNÂNCIA DE TEMA (CLARO / ESCURO)
// ============================================================

const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = themeToggle.querySelector('.theme-icon');
const body        = document.body;

// Verifica se o usuário já tinha uma preferência salva no localStorage
const temaSalvo = localStorage.getItem('tema');
if (temaSalvo) {
  // Aplica o tema salvo
  body.classList.remove('dark', 'light');
  body.classList.add(temaSalvo);
  themeIcon.textContent = temaSalvo === 'dark' ? '☀️' : '🌙';
}

// Ao clicar no botão, alterna entre dark e light
themeToggle.addEventListener('click', () => {
  const isDark = body.classList.contains('dark');

  if (isDark) {
    body.classList.replace('dark', 'light');
    themeIcon.textContent = '🌙';
    localStorage.setItem('tema', 'light'); // Salva preferência
  } else {
    body.classList.replace('light', 'dark');
    themeIcon.textContent = '☀️';
    localStorage.setItem('tema', 'dark');
  }
});


// ============================================================
//  2. MENU HAMBURGUER (MOBILE)
// ============================================================

const menuToggle = document.getElementById('menu-toggle');
const navLinks   = document.getElementById('nav-links');

// Abre/fecha o menu mobile ao clicar no botão hamburguer
menuToggle.addEventListener('click', () => {
  const estaAberto = navLinks.classList.toggle('open');
  menuToggle.classList.toggle('open', estaAberto);
});

// Fecha o menu ao clicar em qualquer link de navegação
navLinks.querySelectorAll('.nav-item').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('open');
  });
});


// ============================================================
//  3. EFEITO DE SCROLL NO HEADER + LINK ATIVO NA NAVEGAÇÃO
// ============================================================

const header    = document.getElementById('header');
const navItems  = document.querySelectorAll('.nav-item');
// Seleciona todas as seções que têm um id correspondente ao menu
const secoes    = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {

  // Adiciona classe "scrolled" ao header após rolar 10px
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Detecta qual seção está visível e marca o link do menu como ativo
  let secaoAtual = '';

  secoes.forEach(secao => {
    const topo    = secao.offsetTop - 80; // 80px de margem pelo header fixo
    const altura  = secao.offsetHeight;

    if (window.scrollY >= topo && window.scrollY < topo + altura) {
      secaoAtual = secao.getAttribute('id');
    }
  });

  // Remove "active" de todos e adiciona apenas ao link da seção atual
  navItems.forEach(item => {
    item.classList.remove('active');
    const href = item.getAttribute('href').replace('#', '');
    if (href === secaoAtual) {
      item.classList.add('active');
    }
  });

});


// ============================================================
//  4. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
// ============================================================

const form          = document.getElementById('contato-form');
const campoNome     = document.getElementById('nome');
const campoEmail    = document.getElementById('email');
const campoMensagem = document.getElementById('mensagem');
const erroNome      = document.getElementById('erro-nome');
const erroEmail     = document.getElementById('erro-email');
const erroMensagem  = document.getElementById('erro-mensagem');

// Função auxiliar: exibe mensagem de erro em um campo
function mostrarErro(campo, spanErro, mensagem) {
  campo.classList.add('erro');
  spanErro.textContent = mensagem;
}

// Função auxiliar: limpa o erro de um campo
function limparErro(campo, spanErro) {
  campo.classList.remove('erro');
  spanErro.textContent = '';
}

// Regex para validar formato de e-mail (usuario@dominio.com)
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validação em tempo real ao sair de cada campo (evento blur)
campoNome.addEventListener('blur', () => {
  if (campoNome.value.trim() === '') {
    mostrarErro(campoNome, erroNome, 'Por favor, informe seu nome.');
  } else {
    limparErro(campoNome, erroNome);
  }
});

campoEmail.addEventListener('blur', () => {
  if (campoEmail.value.trim() === '') {
    mostrarErro(campoEmail, erroEmail, 'Por favor, informe seu e-mail.');
  } else if (!regexEmail.test(campoEmail.value.trim())) {
    mostrarErro(campoEmail, erroEmail, 'Informe um e-mail válido (ex: usuario@dominio.com).');
  } else {
    limparErro(campoEmail, erroEmail);
  }
});

campoMensagem.addEventListener('blur', () => {
  if (campoMensagem.value.trim() === '') {
    mostrarErro(campoMensagem, erroMensagem, 'Por favor, escreva sua mensagem.');
  } else {
    limparErro(campoMensagem, erroMensagem);
  }
});

// Ao submeter o formulário, valida todos os campos antes de "enviar"
form.addEventListener('submit', (evento) => {
  // Previne o comportamento padrão de recarregar a página
  evento.preventDefault();

  let valido = true;

  // Valida nome
  if (campoNome.value.trim() === '') {
    mostrarErro(campoNome, erroNome, 'Por favor, informe seu nome.');
    valido = false;
  } else {
    limparErro(campoNome, erroNome);
  }

  // Valida e-mail
  if (campoEmail.value.trim() === '') {
    mostrarErro(campoEmail, erroEmail, 'Por favor, informe seu e-mail.');
    valido = false;
  } else if (!regexEmail.test(campoEmail.value.trim())) {
    mostrarErro(campoEmail, erroEmail, 'Informe um e-mail válido (ex: usuario@dominio.com).');
    valido = false;
  } else {
    limparErro(campoEmail, erroEmail);
  }

  // Valida mensagem
  if (campoMensagem.value.trim() === '') {
    mostrarErro(campoMensagem, erroMensagem, 'Por favor, escreva sua mensagem.');
    valido = false;
  } else {
    limparErro(campoMensagem, erroMensagem);
  }

  // Se todos os campos forem válidos, simula o envio
  if (valido) {
    // Limpa os campos do formulário após envio simulado
    form.reset();

    // Exibe o modal de confirmação de sucesso
    abrirModal();
  }
});


// ============================================================
//  5. MODAL DE CONFIRMAÇÃO DE ENVIO
// ============================================================

const modal        = document.getElementById('modal-sucesso');
const btnFecharModal = document.getElementById('modal-fechar');

// Abre o modal adicionando a classe "ativo"
function abrirModal() {
  modal.classList.add('ativo');
}

// Fecha o modal ao clicar no botão "Fechar"
btnFecharModal.addEventListener('click', () => {
  modal.classList.remove('ativo');
});

// Fecha o modal ao clicar fora da caixa do modal (no overlay)
modal.addEventListener('click', (evento) => {
  if (evento.target === modal) {
    modal.classList.remove('ativo');
  }
});

// Fecha o modal ao pressionar a tecla Escape
document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape' && modal.classList.contains('ativo')) {
    modal.classList.remove('ativo');
  }
});

