// index.js - Play Zone Bot FINAL
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');

// Número do dono
const DONO = '81985982655';

// OpenAI API Key (variável de ambiente)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Inicializa WhatsApp
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }
});

// Configuração Play ZONE
let config = {
    boasvindas: '🎮 Seja bem-vindo à **PLAY ZONE**! 🔥 Divirta-se e siga as regras! 😉',
    regras: '📌 **Regras do grupo PLAY ZONE**:\n1️⃣ Respeito\n2️⃣ Vendas via admin (5 R$)\n3️⃣ Nada de spam\n4️⃣ Siga sempre a mensagem fixa',
    aviso: '⚠️ Aviso do grupo PLAY ZONE!',
    pix: '81985982655',
    assinatura: '🎮 **PLAY ZONE – Qualidade e confiança!** 🔥'
};

// QR Code
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('🖼️ Escaneie o QR Code com WhatsApp Web');
});

// Bot pronto
client.on('ready', () => console.log('🔥 PLAY ZONE BOT está online!'));

// Verifica dono
function isDono(number) { return number === DONO; }

// Função de IA
async function chatGPTResponse(prompt) {
    try {
        const res = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: prompt}]
        }, { headers: { "Authorization": `Bearer ${OPENAI_API_KEY}` }});
        return res.data.choices[0].message.content;
    } catch(e) { return '❌ Erro ao acessar IA'; }
}

// ------------------ COMANDOS ------------------
client.on('message', async message => {
    if (!message.body.startsWith('/')) return;
    const args = message.body.slice(1).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const from = message.from.replace(/\D/g, '');

    // ------------------------ ADMIN ------------------------
    if (cmd === 'ban' && isDono(from)) {
        const chat = await message.getChat();
        const contact = args[0] ? await client.getContactById(args[0]+'@c.us') : null;
        if(contact) await chat.removeParticipants([contact.id]);
        return message.reply(`✅ ${args[0]} banido!`);
    }
    if (cmd === 'desban' && isDono(from)) return message.reply(`✅ ${args[0]} desbanido!`);
    if (cmd === 'add' && isDono(from)) {
        const chat = await message.getChat();
        const contact = args[0] ? await client.getContactById(args[0]+'@c.us') : null;
        if(contact) await chat.addParticipants([contact.id]);
        return message.reply(`✅ ${args[0]} adicionado!`);
    }
    if (cmd === 'remover' && isDono(from)) {
        const chat = await message.getChat();
        const contact = args[0] ? await client.getContactById(args[0]+'@c.us') : null;
        if(contact) await chat.removeParticipants([contact.id]);
        return message.reply(`✅ ${args[0]} removido!`);
    }

    // ---------------------- GRUPO ------------------------
    if (cmd === 'fechargrupo' && isDono(from)) return message.reply('🔒 Grupo fechado (apenas admins podem falar)');
    if (cmd === 'abrirgrupo' && isDono(from)) return message.reply('🔓 Grupo aberto');
    if (cmd === 'mutar' && isDono(from)) return message.reply('🔇 Grupo silenciado');
    if (cmd === 'desmutar' && isDono(from)) return message.reply('🔊 Grupo liberado');

    // ---------------------- LIMPEZA ---------------------
    if (cmd === 'limpar' && isDono(from)) {
        const chat = await message.getChat();
        const quantidade = parseInt(args[0]) || 5;
        let mensagens = await chat.fetchMessages({ limit: quantidade });
        for(const m of mensagens) await m.delete(true);
        return message.reply(`🧹 ${quantidade} mensagens limpas!`);
    }

    // ------------------ BOAS-VINDAS & REGRAS ------------------
    if (cmd === 'boasvindas') return message.reply(config.boasvindas);
    if (cmd === 'configboasvindas' && isDono(from)) { config.boasvindas = args.join(' '); return message.reply('✅ Boas-vindas configurada!'); }
    if (cmd === 'regras') return message.reply(config.regras);
    if (cmd === 'configregras' && isDono(from)) { config.regras = args.join(' '); return message.reply('✅ Regras configuradas!'); }

    // ------------------- AVISOS -------------------
    if (cmd === 'aviso') return message.reply(config.aviso);
    if (cmd === 'configaviso' && isDono(from)) { config.aviso = args.join(' '); return message.reply('✅ Aviso configurado!'); }

    // ------------------- PIX -------------------
    if (cmd === 'pix') return message.reply(`💰 PIX: ${config.pix}`);
    if (cmd === 'configpix' && isDono(from)) { config.pix = args.join(' '); return message.reply('✅ PIX configurado!'); }

    // ------------------- SERVIÇOS -------------------
    if (cmd === 'recarga') return message.reply('💳 Info Recarga: Entre em contato com admin.');
    if (cmd === 'iptv') return message.reply('📺 Info IPTV: Entre em contato com admin.');
    if (cmd === 'seguidores') return message.reply('👥 Info Seguidores: Entre em contato com admin.');

    // ------------------- IA MANUAL (só dono) -------------------
    if (isDono(from)) {
        if (cmd === 'ia') {
            const prompt = args.join(' ');
            if(!prompt) return message.reply('❌ Digite algo para a IA responder!');
            const resposta = await chatGPTResponse(prompt);
            return message.reply(`🤖 IA respondeu: ${resposta}`);
        }
        if (cmd === 'imgia') {
            const prompt = args.join(' ');
            if(!prompt) return message.reply('❌ Digite descrição da imagem!');
            // Exemplo placeholder, precisa integrar DALL·E real
            return message.reply(`🖼️ IA gerou imagem: ${prompt} (placeholder)`);
        }
    }

    // ------------------- GRUPO / ENTRETENIMENTO -------------------
    if (cmd === 'ativos') return message.reply('📊 Membros ativos: ...');
    if (cmd === 'ranking') return message.reply('🏆 Ranking de mensagens: ...');
    if (cmd === 'sorteio') return message.reply('🎲 Sorteio realizado!');
    if (cmd === 'enquete') return message.reply('📋 Enquete criada!');

    // ------------------- ASSINATURA -------------------
    if (cmd === 'assinatura') return message.reply(config.assinatura);
    if (cmd === 'configassinatura' && isDono(from)) { config.assinatura = args.join(' '); return message.reply('✅ Assinatura configurada!'); }

    // ------------------- DONO / SISTEMA -------------------
    if (cmd === 'statusbot') return message.reply('🔥 PLAY ZONE BOT online!');
    if (cmd === 'reiniciar' && isDono(from)) return message.reply('🔄 Reiniciando bot...');
    if (cmd === 'logs' && isDono(from)) return message.reply('📜 Exibindo logs...');
    if (cmd === 'backup' && isDono(from)) return message.reply('💾 Backup realizado!');
    if (cmd === 'restaurar' && isDono(from)) return message.reply('♻️ Configurações restauradas!');
});

// Inicializa
client.initialize();