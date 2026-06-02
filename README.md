# PROJETO: Cidade Segura

## EQUIPE: SeleNai

---

## 1. Integrantes da Equipe

* Diego
* Elvis
* Kaloa
* Pedro Henrique
* Richard

---

## 2. Escopo do Projeto

### O Problema e o Desafio Abordado

A falta de segurança urbana e a escassez de informações centralizadas em tempo real sobre incidentes locais geram vulnerabilidade para os cidadãos. A ausência de um canal ágil dificulta a prevenção e a tomada de decisões rápidas pela comunidade para evitar áreas de risco.

### A Solução Proposta

O Cidade Segura é uma plataforma de segurança colaborativa que conecta moradores para aumentar a vigilância comunitária. Por meio de um mapa interativo e feed de alertas, o sistema descentraliza a comunicação de incidentes, permitindo que a própria comunidade mapeie ocorrências e previna situações de perigo de forma coletiva.

---

## 3. Arquitetura da Aplicação e Tecnologias Utilizadas

A aplicação adota uma arquitetura desacoplada baseada em serviços (Client-Server), dividida em camadas de apresentação, lógica de negócios e persistência.

### Árvore de Diretórios do Projeto


cidade-segura/
├── back-end/
│   ├── server.js
│   └── package.json
└── front-end/
    ├── css/
    │   ├── login.css
    │   └── style.css
    ├── js/
    │   ├── cadastro.js
    │   ├── dashboard.js
    │   ├── home.js
    │   ├── index.js
    │   └── login.js
    ├── cadastro.html
    ├── home.html
    ├── index.html
    └── login.html

```

### Tecnologias Utilizadas

* **Front-end:** HTML5, CSS3, JavaScript estruturado (Vanilla ES6) para manipulação dinâmica do DOM, consumo de APIs e persistência local.
* **Mapas e Geolocalização:** Leaflet.js API integrada ao provedor CARTO (Dark Matter Basemaps) para renderização do mapa tático sem custos de licenciamento.
* **Back-end:** Node.js com o framework Express.js para criação de rotas HTTP, tratamento de requisições JSON e controle de cabeçalhos CORS.
* **Banco de Dados (Conceitual):** PostgreSQL para persistência estruturada e relacional de longo prazo.

---

## 4. Funcionalidades Implementadas

* **Apresentação Institucional:** Página de introdução (Home) com carrossel dinâmico responsivo apresentando os pilares do ecossistema.
* **Controle de Acesso:** Telas completas de Login e Cadastro com tratamento de eventos e validações no lado do cliente.
* **Dashboard de Monitoramento Interativo:** Mapa integrado em modo escuro com exibição geográfica de raios de risco baseados em incidentes cadastrados.
* **Feed Reativo de Ocorrências:** Painel lateral síncrono que classifica alertas em níveis de criticidade e permite a remoção local de marcadores.
* **Registro Dinâmico de Denúncias:** Formulário em janela modal que envia dados estruturados ao backend via requisições assíncronas (Fetch API) e atualiza o mapa em tempo real.
* **Mecanismo de Emergência:** Botão de pânico de alta prioridade projetado para despachar transmissões instantâneas de alertas graves.
* **Gerenciamento de Perfil:** Atualização de dados cadastrais na interface e upload dinâmico de foto de usuário via API FileReader.

---

## 5. Estrutura do Banco de Dados

### Tabela: Usuarios

* `id` (Chave Primária)
* `nome` (Texto, Opcional)
* `email` (Texto, Único)
* `senha` (Texto, Criptografada)

### Tabela: Denuncias

* `id` (Chave Primária)
* `tipo_incidente` (Texto)
* `descricao` (Texto)
* `latitude` (Decimal)
* `longitude` (Decimal)
* `data_hora` (Timestamp)
* `status` (Texto)

### Tabela: Alertas

* `id` (Chave Primária)
* `denuncia_id` (Chave Estrangeira referenciando Denuncias)
* `raio_alcance` (Inteiro, em metros)
* `data_envio` (Timestamp)

---

## 6. Modelo de Negócio e Monetização

O projeto adota uma estratégia de mercado híbrida com foco social e corporativo:

* **Modelo Freemium e Parcerias B2B:** Acesso integral e gratuito dos recursos para os cidadãos, aliado à oferta de planos corporativos com dashboards de auditoria detalhados e relatórios de métricas preditivas para condomínios residenciais e empresas de segurança privada.
* **Parcerias Governamentais (SaaS):** Licenciamento da plataforma para prefeituras, órgãos de planejamento urbano e secretarias de segurança pública, fornecendo dados analíticos consolidados de criminalidade e manchas de calor para otimização de recursos públicos.

---

## 7. Instruções para Instalação e Execução

### Configuração e Execução do Back-end

1. Navegue até o diretório do servidor: `cd back-end`
2. Instale as dependências declaradas no manifesto: `npm install`
3. Inicie o servidor Node.js: `node server.js`
4. A API estará operacional no endereço: `http://localhost:3000`

### Configuração e Execução do Front-end

1. Certifique-se de manter a estrutura de pastas do front-end com os arquivos HTML na raiz e as pastas `/css` e `/js` nos locais indicados.
2. Inicialize o projeto executando o arquivo `home.html` por meio de um servidor web local (como a extensão Live Server do VS Code).
3. O fluxo de testes pode ser iniciado pela tela institucional, avançando para os formulários de autenticação e acessando o painel de gerenciamento do mapas.