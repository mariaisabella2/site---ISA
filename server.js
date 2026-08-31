const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;

    // Critérios: Mínimo 8 caracteres, 1 maiúscula, 1 número, 1 caractere especial
    const regexSenha = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!email || !senha) {
        return res.status(400).json({ sucesso: false, mensagem: 'Preencha todos os campos.' });
    }

    if (!regexSenha.test(senha)) {
        return res.status(400).json({ 
            sucesso: false, 
            mensagem: 'A senha precisa ter no mínimo 8 caracteres, 1 letra maiúscula, 1 número e 1 caractere especial.' 
        });
    }

    console.log(`Login bem-sucedido para: ${email}`);
    return res.status(200).json({ 
        sucesso: true, 
        mensagem: 'Login realizado com sucesso!' 
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});