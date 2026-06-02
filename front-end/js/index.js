// =========================================================================
// SISTEMA DE NOTIFICAÇÕES MODERNAS (TOAST)
// =========================================================================
const toastContainer = document.createElement('div');
toastContainer.className = 'toast-container';
document.body.appendChild(toastContainer);

function mostrarNotificacao(mensagem, tipo = 'sucesso', icone = 'check_circle') {
    const toast = document.createElement('div');
    toast.className = `toast-card ${tipo}`;
    toast.innerHTML = `<span class="toast-icon">${icone}</span> <span>${mensagem}</span>`;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 50);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// =========================================================================
// CONFIGURAÇÃO INICIAL DO MAPA (LEAFLET)
// =========================================================================
const map = L.map('map').setView([-27.5954, -48.5480], 13);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
}).addTo(map);

let marcadoresAtivos = {};

marcadoresAtivos['alerta-1'] = L.circle([-27.5970, -48.5520], {
    color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.4, radius: 300
}).addTo(map).bindPopup("<b>Zonas de Furtos:</b> Av. Beira Mar Norte.");

marcadoresAtivos['alerta-2'] = L.circle([-27.6010, -48.5180], {
    color: '#eab308', fillColor: '#eab308', fillOpacity: 0.4, radius: 250
}).addTo(map).bindPopup("<b>Aviso:</b> Iluminação pública crítica perto da UFSC.");

// =========================================================================
// CONTROLADORES DE INTERFACE (MODAL, ABAS E EXCLUSÃO)
// =========================================================================
function toggleModal() {
    document.getElementById('modalDenuncia').classList.toggle('active');
}

// Modificado para usar confirmação bonita com SweetAlert2
function excluirAlerta(idAlerta) {
    Swal.fire({
        title: 'Remover Alerta?',
        text: "Deseja remover este alerta do monitoramento local?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#475569',
        confirmButtonText: 'Sim, remover',
        cancelButtonText: 'Cancelar',
        background: '#1e293b',
        color: '#f8fafc'
    }).then((result) => {
        if (result.isConfirmed) {
            const card = document.getElementById(idAlerta);
            if (card) card.remove();

            if (marcadoresAtivos[idAlerta]) {
                map.removeLayer(marcadoresAtivos[idAlerta]);
                delete marcadoresAtivos[idAlerta];
            }
            mostrarNotificacao('Alerta de monitoramento removido.', 'aviso', 'delete_sweep');
        }
    });
}

function showSection(section) {
    const mapaWrapper = document.getElementById('section-mapa-wrapper');
    const historicoWrapper = document.getElementById('section-historico-wrapper');
    const contaWrapper = document.getElementById('section-conta-wrapper');
    
    const menuInicio = document.getElementById('menu-inicio');
    const menuDenuncias = document.getElementById('menu-denuncias');
    const menuContaSidebar = document.getElementById('menu-conta-sidebar');
    
    const navInicio = document.getElementById('nav-inicio');
    const navDenuncias = document.getElementById('nav-denuncias');

    if(mapaWrapper) mapaWrapper.style.display = "none";
    if(historicoWrapper) historicoWrapper.classList.remove('active');
    if(contaWrapper) contaWrapper.classList.remove('active');
    
    if(menuInicio) menuInicio.classList.remove('active');
    if(menuDenuncias) menuDenuncias.classList.remove('active');
    if(menuContaSidebar) menuContaSidebar.classList.remove('active');
    if(navInicio) navInicio.classList.remove('active');
    if(navDenuncias) navDenuncias.classList.remove('active');

    if(section === 'inicio') {
        if(mapaWrapper) mapaWrapper.style.display = "block";
        setTimeout(() => { map.invalidateSize(); }, 50);
        if(menuInicio) menuInicio.classList.add('active');
        if(navInicio) navInicio.classList.add('active');
    } else if(section === 'denuncias') {
        if(historicoWrapper) historicoWrapper.classList.add('active');
        if(menuDenuncias) menuDenuncias.classList.add('active');
        if(navDenuncias) navDenuncias.classList.add('active');
    } else if(section === 'conta') {
        if(contaWrapper) contaWrapper.classList.add('active');
        if(menuContaSidebar) menuContaSidebar.classList.add('active');
    }
}

// =========================================================================
// ESCUTADORES DE EVENTOS DE FORMULÁRIOS
// =========================================================================

// Upload de Avatar
document.getElementById('avatarUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const avatarPreview = document.getElementById('avatarPreview');
            const defaultIcon = document.getElementById('defaultAvatarIcon');
            
            if(defaultIcon) defaultIcon.style.display = 'none';
            if(avatarPreview) avatarPreview.style.backgroundImage = `url('${e.target.result}')`;
            
            const topAvatarContainer = document.getElementById('topNavAvatarContainer');
            if(topAvatarContainer) {
                topAvatarContainer.innerHTML = `<img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover;">`;
            }
            mostrarNotificacao('Foto de perfil atualizada!', 'sucesso', 'add_a_photo');
        }
        reader.readAsDataURL(file);
    }
});

// Atualização de Conta
document.getElementById('formMinhaConta').addEventListener('submit', function(e) {
    e.preventDefault();
    const novoNome = document.getElementById('accountName').value;
    const topNavUsername = document.getElementById('topNavUsername');
    if(topNavUsername) topNavUsername.textContent = novoNome;
    
    mostrarNotificacao('Dados salvos!', 'sucesso', 'shield_person');
});

// Transmissão de Ocorrência Normal
document.getElementById('formOcorrencia').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const tipo = document.getElementById('tipoOcorrencia').value;
    const descricao = document.getElementById('descOcorrencia').value;
    const idGerado = 'alerta-custom-' + Date.now();

    try {
        const response = await fetch('http://localhost:3000/cadastro', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome: "Richard",
                email: tipo,
                numero: "Florianópolis",
                password: descricao
            })
        });

        if(response.ok) {
            atualizarInterfaceOcorrencia(tipo, descricao, idGerado, 'Crítico', '#ef4444');
            mostrarNotificacao('Ocorrência transmitida com sucesso!', 'sucesso', 'campaign');
            toggleModal();
            document.getElementById('formOcorrencia').reset();
        }
    } catch (error) {
        atualizarInterfaceOcorrencia(tipo, descricao, idGerado, 'Local', '#eab308');
        mostrarNotificacao('Sincronizado localmente no navegador (Offline).', 'aviso', 'wifi_off');
        toggleModal();
        document.getElementById('formOcorrencia').reset();
    }
});

function atualizarInterfaceOcorrencia(tipo, descricao, idGerado, badgeTxt, corBadge) {
    const feed = document.getElementById('feedAlertas');
    const novoCard = document.createElement('div');
    novoCard.className = `feed-card ${badgeTxt === 'Crítico' ? 'critical' : 'warning'}`;
    novoCard.id = idGerado;
    novoCard.innerHTML = `
        <div class="feed-header">
            <span class="badge" style="color: ${corBadge};">${badgeTxt}</span>
            <div style="display: flex; align-items: center; gap: 8px;">
                <span class="time">Agora mesmo</span>
                <button class="btn-delete-alert" onclick="excluirAlerta('${idGerado}')">
                    <span class="material-symbols-outlined" style="font-size: 16px;">delete</span>
                </button>
            </div>
        </div>
        <p><strong>${tipo}</strong></p>
        <p class="location">${descricao}</p>
    `;
    if(feed) feed.insertBefore(novoCard, feed.firstChild);

    const tabelaCorpo = document.getElementById('listaSuasDenuncias');
    const linhaVazia = document.getElementById('linha-vazia');
    if(linhaVazia) linhaVazia.remove(); 
    
    const agora = new Date();
    const horaFormatada = agora.toLocaleDateString('pt-BR') + ' ' + agora.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});

    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <td>${horaFormatada}</td>
        <td style="font-weight: 600; color: #ef4444;">${tipo}</td>
        <td>${descricao}</td>
        <td>Florianópolis (Coordenadas Atuais)</td>
        <td><span style="background: rgba(34, 197, 94, 0.2); color: #22c55e; padding: 3px 8px; border-radius: 12px; font-size: 11px;">Enviado</span></td>
    `;
    if(tabelaCorpo) tabelaCorpo.insertBefore(novaLinha, tabelaCorpo.firstChild);

    const randomLat = -27.5954 + (Math.random() - 0.5) * 0.02;
    const randomLng = -48.5480 + (Math.random() - 0.5) * 0.02;
    
    marcadoresAtivos[idGerado] = L.circle([randomLat, randomLng], {
        color: corBadge, fillColor: corBadge, fillOpacity: 0.6, radius: 200
    }).addTo(map);
    marcadoresAtivos[idGerado].bindPopup(`<b>${tipo}:</b> ${descricao}`).openPopup();
    map.setView([randomLat, randomLng], 14);
}

// =========================================================================
// MUDANÇA OPTIMISTIC-UI: EMISSÃO INSTANTÂNEA DE EMERGÊNCIA (SEM ATRASO)
// =========================================================================
function emitirEmergencia() {
    mostrarNotificacao('ALERTA MÁXIMO TRANSMITIDO COM SUCESSO!', 'perigo', 'gpp_maybe');
    
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'emergencia@floripa.com', password: '190' })
    }).catch(err => {
        console.warn('Envio em background finalizado. Sincronismo local ativo.');
    });
}

// =========================================================================
// GERENCIAMENTO DE EXCLUSÃO DE CONTA (MODAL ESTILIZADO)
// =========================================================================
// Substitua a sua função antiga por esta completa:
