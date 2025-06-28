# Sistema CRUD - Gerenciamento de Usuários

Uma aplicação CRUD completa desenvolvida em JavaScript com frontend moderno e backend Node.js, conectada ao PostgreSQL.

## 🚀 Funcionalidades

- ✅ **CRUD Completo**: Criar, Ler, Atualizar e Deletar usuários
- 🎨 **Interface Moderna**: Design responsivo com animações suaves
- 🔍 **Busca em Tempo Real**: Filtro por nome, email ou telefone
- 📱 **Responsivo**: Funciona perfeitamente em dispositivos móveis
- 🔔 **Notificações**: Sistema de toast notifications
- ⚡ **Validações**: Validação de formulários e dados
- 🛡️ **Segurança**: Proteção contra XSS e validação de entrada

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **PostgreSQL** - Banco de dados
- **pg** - Driver PostgreSQL para Node.js
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Gerenciamento de variáveis de ambiente

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização moderna com Grid e Flexbox
- **JavaScript ES6+** - Lógica da aplicação
- **Font Awesome** - Ícones
- **Responsive Design** - Mobile-first approach

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- PostgreSQL (versão 12 ou superior)
- npm ou yarn

## 🚀 Instalação

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd crud
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o banco de dados PostgreSQL

Crie um banco de dados PostgreSQL:
```sql
CREATE DATABASE crud_app;
```

### 4. Configure as variáveis de ambiente

Edite o arquivo `config.env`:
```env
# Configurações do Banco de Dados PostgreSQL
DATABASE_URL=postgresql://username:password@localhost:5432/crud_app

# Configurações do Servidor
PORT=3000
NODE_ENV=development

# Chave secreta para JWT
JWT_SECRET=sua_chave_secreta_muito_segura_aqui
```

**Substitua:**
- `username`: Seu usuário PostgreSQL
- `password`: Sua senha PostgreSQL
- `localhost:5432`: Host e porta do PostgreSQL

### 5. Execute a aplicação

**Desenvolvimento:**
```bash
npm run dev
```

**Produção:**
```bash
npm start
```

### 6. Acesse a aplicação

Abra seu navegador e acesse: `http://localhost:3000`

## 🌐 Hospedagem Gratuita

### Backend - Render

1. **Crie uma conta no [Render](https://render.com)**

2. **Conecte seu repositório GitHub**

3. **Crie um novo Web Service**
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     ```
     DATABASE_URL=sua_url_do_postgresql
     NODE_ENV=production
     JWT_SECRET=sua_chave_secreta
     ```

4. **Configure o banco PostgreSQL**
   - Use o PostgreSQL gratuito do Render ou
   - Use [Neon](https://neon.tech) (PostgreSQL gratuito)

### Frontend - Netlify

1. **Crie uma conta no [Netlify](https://netlify.com)**

2. **Faça deploy da pasta `public`**
   - Arraste a pasta `public` para o Netlify, ou
   - Conecte seu repositório e configure o build

3. **Configure as variáveis de ambiente**
   - Vá em Site settings > Environment variables
   - Adicione: `REACT_APP_API_URL=https://seu-backend.onrender.com`

## 📁 Estrutura do Projeto

```
crud/
├── public/                 # Frontend
│   ├── index.html         # Página principal
│   ├── styles.css         # Estilos CSS
│   └── script.js          # Lógica JavaScript
├── server.js              # Servidor Express
├── package.json           # Dependências e scripts
├── config.env             # Variáveis de ambiente
└── README.md              # Documentação
```

## 🔧 API Endpoints

### Usuários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/usuarios` | Lista todos os usuários |
| GET | `/api/usuarios/:id` | Busca usuário por ID |
| POST | `/api/usuarios` | Cria novo usuário |
| PUT | `/api/usuarios/:id` | Atualiza usuário |
| DELETE | `/api/usuarios/:id` | Deleta usuário |

### Exemplo de uso da API

```javascript
// Criar usuário
const response = await fetch('/api/usuarios', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        nome: 'João Silva',
        email: 'joao@email.com',
        telefone: '(11) 99999-9999'
    })
});

// Listar usuários
const usuarios = await fetch('/api/usuarios').then(res => res.json());
```

## 🎨 Interface

A aplicação possui uma interface moderna e intuitiva:

- **Formulário de Cadastro**: Lado esquerdo para adicionar/editar usuários
- **Lista de Usuários**: Lado direito com tabela responsiva
- **Busca**: Campo de busca em tempo real
- **Ações**: Botões de editar e excluir para cada usuário
- **Notificações**: Toast notifications para feedback
- **Modal**: Confirmação para exclusão

## 🔒 Segurança

- **Validação de entrada**: Todos os dados são validados
- **Proteção XSS**: Escape de HTML no frontend
- **CORS**: Configurado para permitir requisições
- **SQL Injection**: Uso de prepared statements
- **Validação de email**: Regex para validar formato

## 🚀 Deploy Rápido

### Usando Render (Backend) + Netlify (Frontend)

1. **Backend no Render:**
   ```bash
   # No Render, configure:
   Build Command: npm install
   Start Command: npm start
   Environment: Node.js
   ```

2. **Frontend no Netlify:**
   - Faça upload da pasta `public`
   - Configure o domínio personalizado (opcional)

3. **Atualize a URL da API:**
   - No arquivo `public/script.js`, linha 2:
   ```javascript
   const API_BASE_URL = 'https://seu-backend.onrender.com';
   ```

## 🐛 Solução de Problemas

### Erro de conexão com banco
- Verifique se o PostgreSQL está rodando
- Confirme as credenciais no `config.env`
- Teste a conexão: `psql -h localhost -U username -d crud_app`

### Erro de CORS
- Verifique se o CORS está configurado no backend
- Confirme se a URL da API está correta no frontend

### Erro de porta
- Verifique se a porta 3000 está livre
- Altere a porta no `config.env` se necessário

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique a seção de [Solução de Problemas](#-solução-de-problemas)
2. Abra uma [Issue](https://github.com/seu-usuario/crud/issues)
3. Entre em contato: seu-email@exemplo.com

---

**Desenvolvido com ❤️ por [Seu Nome]** 