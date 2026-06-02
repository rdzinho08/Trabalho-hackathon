document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const password = document.getElementById('password').value;

        if (nome && email && telefone && password) {
            // Salva os dados reais na memória do navegador
            localStorage.setItem('usuario_nome', nome);
            localStorage.setItem('usuario_email', email);
           
            window.location.href = 'index.html'; // Caminho para o seu Dashboard
        }
    });
});