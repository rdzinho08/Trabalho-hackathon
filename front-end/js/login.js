document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (email && password) {
            const nomeProvisorio = email.split('@')[0];

            localStorage.setItem('usuario_nome', nomeProvisorio);
            localStorage.setItem('usuario_email', email);
          
            window.location.href = 'index.html';
        }
    });
});