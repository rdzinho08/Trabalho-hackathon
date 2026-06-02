 const Usuario = require('../models/Usuario');

const cadastrarUsuario = async (req, res) => {
    try {
        const { nome, email, numero, password } = req.body;

        if (!nome || !email || !numero || !password) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Por favor, preencha todos os campos obrigatórios.'
            });
        }

        
        const usuarioExiste = await Usuario.findOne({ email });
        if (usuarioExiste) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Este e-mail já está cadastrado no sistema.'
            });
        }

        const novoUsuario = new Usuario({
            nome,
            email,
            numero,
            password 
        });

        await novoUsuario.save();

        console.log(`✨ [Banco de Dados] Novo usuário cadastrado: ${email}`);

        return res.status(201).json({ 
            sucesso: true,
            mensagem: 'Usuário registrado com sucesso no sistema!',
            usuario: {
                id: novoUsuario._id,
                nome: novoUsuario.nome,
                email: novoUsuario.email
            }
        });

    } catch (error) {
        console.error('❌ Erro no cadastro:', error);
        return res.status(500).json({
            sucesso: false,
            mensagem: 'Erro interno ao salvar o usuário.'
        });
    }
};

const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Preencha e-mail e senha.'
            });
        }

    
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'E-mail ou senha inválidos.'
            });
        }

    
        if (usuario.password !== password) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'E-mail ou senha inválidos.'
            });
        }

        console.log(`🔓 [Acesso] Login efetuado com sucesso por: ${email}`);

        return res.status(200).json({ 
            sucesso: true,
            mensagem: 'Acesso liberado!',
            token: 'auth_token_cidade_segura_2026',
            usuario: {
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email
            }
        });

    } catch (error) {
        console.error('❌ Erro no login:', error);
        return res.status(500).json({
            sucesso: false,
            mensagem: 'Erro interno ao realizar o login.'
        });
    }
};

module.exports = {
    cadastrarUsuario,
    loginUsuario
};