const form = document.getElementById('loginForm');
const senhaInput = document.getElementById('senha');
const mensagemDiv = document.getElementById('mensagem');

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = senhaInput.value;

    mensagemDiv.style.display = 'block';
    mensagemDiv.className = '';
    mensagemDiv.textContent = 'Verificando...';

    try {
        const resposta = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        const resultado = await resposta.json();

        if (resposta.ok) {
            mensagemDiv.className = 'sucesso';
            mensagemDiv.textContent = resultado.mensagem;
        } else {
            mensagemDiv.className = 'erro';
            mensagemDiv.textContent = resultado.mensagem;
        }

    } catch (erro) {
        mensagemDiv.className = 'erro';
        mensagemDiv.textContent = 'Erro ao conectar com o servidor.';
    }
});