
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
// 4. BOTÃO DE EXCLUIR CONTA COM REDIRECIONAMENTO (MODERNO)
// ==========================================
if (deleteAccountBtn) {
    // Mantém a estilização base via JS se necessário (com um vermelho mais moderno e suave)
    deleteAccountBtn.style.backgroundColor = '#ef4444';

    deleteAccountBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Previne o comportamento padrão do link '#'

        // Substitui o 'confirm()' nativo por um modal Dark elegante
        Swal.fire({
            title: '🚨 AVISO CRÍTICO',
            text: 'Tem certeza que deseja excluir sua conta? Esta ação é irreversível!',
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#dc2626', // Vermelho vibrante para ação destrutiva
            cancelButtonColor: '#475569',  // Cinza ardósia elegante para cancelar
            confirmButtonText: 'Sim, excluir minha conta',
            cancelButtonText: 'Cancelar',
            background: '#0f172a',         // Fundo escuro idêntico ao seu dashboard
            color: '#f8fafc',              // Texto claro
            iconColor: '#ef4444',          // Cor do ícone de erro
            customClass: {
                popup: 'border-modal-custom' // Classe opcional para adicionar borda via CSS
            }
        }).then((result) => {
            // Se o usuário confirmou a exclusão
            if (result.isConfirmed) {
                // 1. Limpa os dados do usuário salvos no navegador
                localStorage.removeItem('usuario_nome');
                localStorage.removeItem('usuario_email');
                localStorage.removeItem('usuario_telefone'); 

                // 2. Substitui o 'alert()' nativo por um modal de sucesso antes de redirecionar
                Swal.fire({
                    title: 'Conta Excluída',
                    text: 'Sua conta foi excluída com sucesso.',
                    icon: 'success',
                    confirmButtonColor: '#38bdf8', // Azul neon do seu tema para o botão de fechar
                    background: '#0f172a',
                    color: '#f8fafc',
                    iconColor: '#22c55e'
                }).then(() => {
                    // Redireciona apenas após o usuário clicar em "OK" no modal de sucesso
                    window.location.href = 'home.html';
                });
            }
        });
    });
}