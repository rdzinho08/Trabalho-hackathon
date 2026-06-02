
// ==========================================
// 1. CARREGAR DADOS DO LOGIN/CADASTRO NO PERFIL
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const nomeSalvo = localStorage.getItem('usuario_nome');
    const emailSalvo = localStorage.getItem('usuario_email');

    // Substitui o texto "aura" pelo nome real/provisório
    const topNavUsername = document.getElementById('topNavUsername');
    if (nomeSalvo && topNavUsername) {
        topNavUsername.textContent = nomeSalvo;
    }

    // Preenche automaticamente os inputs da seção "Minha Conta"
    const inputNomeConta = document.getElementById('accountName');
    const inputEmailConta = document.getElementById('accountEmail');

    if (nomeSalvo && inputNomeConta) {
        inputNomeConta.value = nomeSalvo;
    }
    if (emailSalvo && inputEmailConta) {
        inputEmailConta.value = emailSalvo;
    }
});

// ==========================================
// 2. ATUALIZAR FORMULÁRIO DE CONTA (SUBSTITUA O SEU ATUAL)
// ==========================================
document.getElementById('formMinhaConta').addEventListener('submit', function(e) {
    e.preventDefault();
    const novoNome = document.getElementById('accountName').value;
    const topNavUsername = document.getElementById('topNavUsername');
    
    if(topNavUsername) topNavUsername.textContent = novoNome;
    
    // Atualiza na memória para não resetar ao atualizar a página
    localStorage.setItem('usuario_nome', novoNome);
    
    alert('🛡️ Sucesso! Dados cadastrais atualizados localmente.');
});

// ==========================================
// 3. FAZER O MENU DROP-DOWN DA FOTO FUNCIONAR (OPCIONAL)
// ==========================================
const profileTrigger = document.getElementById('profileTrigger');
const profileDropdown = document.getElementById('profileDropdown');

if (profileTrigger && profileDropdown) {
    profileTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle('active');
    });
    
    document.addEventListener('click', () => {
        profileDropdown.classList.remove('active');
    });
}

// ==========================================
// 4. BOTÃO DE EXCLUIR CONTA COM REDIRECIONAMENTO
// ==========================================
// Usamos o IF para garantir que o código só rode se o botão existir na tela atual
if (deleteAccountBtn) {
    // Altera o estilo via JS se necessário
    deleteAccountBtn.style.backgroundColor = '#e74c3c';

    deleteAccountBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Previne o comportamento padrão do link '#'

        const confirmDelete = confirm('⚠️ Tem certeza que deseja excluir sua conta? Esta ação é irreversível!');

        if (confirmDelete) {
            // 1. Limpa os dados do usuário salvos no navegador
            localStorage.removeItem('usuario_nome');
            localStorage.removeItem('usuario_email');
            localStorage.removeItem('usuario_telefone'); 

            alert(' canivete Sua conta foi excluída com sucesso (Simulação local).');
            window.location.href = 'home.html';
        }
    });
}
