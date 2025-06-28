# 🚀 Guia de Deploy - Sistema CRUD

Este guia te ajudará a hospedar sua aplicação CRUD gratuitamente usando Render (backend) e Netlify (frontend).

## 📋 Pré-requisitos

- Conta no GitHub
- Conta no [Render](https://render.com) (gratuita)
- Conta no [Netlify](https://netlify.com) (gratuita)
- Conta no [Neon](https://neon.tech) (PostgreSQL gratuito)

## 🗄️ Passo 1: Configurar Banco de Dados (Neon)

### 1.1 Criar conta no Neon
1. Acesse [neon.tech](https://neon.tech)
2. Faça login com GitHub
3. Clique em "Create New Project"

### 1.2 Configurar projeto
1. **Nome do projeto**: `crud-app`
2. **Database name**: `crud_app`
3. **Region**: Escolha a mais próxima
4. Clique em "Create Project"

### 1.3 Obter string de conexão
1. No dashboard, clique em "Connection Details"
2. Copie a **Connection string**
3. Formato: `postgresql://user:password@host:port/database`

## 🌐 Passo 2: Deploy do Backend (Render)

### 2.1 Preparar repositório
1. Faça push do código para o GitHub
2. Certifique-se que todos os arquivos estão commitados

### 2.2 Criar Web Service no Render
1. Acesse [render.com](https://render.com)
2. Faça login com GitHub
3. Clique em "New +" → "Web Service"
4. Conecte seu repositório GitHub

### 2.3 Configurar o serviço
```
Name: crud-backend
Environment: Node
Region: Escolha a mais próxima
Branch: main
Build Command: npm install
Start Command: npm start
```

### 2.4 Configurar variáveis de ambiente
Clique em "Environment" e adicione:

```
NODE_ENV = production
DATABASE_URL = postgresql://user:password@host:port/database
JWT_SECRET = sua_chave_secreta_muito_longa_e_segura
```

### 2.5 Deploy
1. Clique em "Create Web Service"
2. Aguarde o build (pode demorar alguns minutos)
3. Anote a URL gerada: `https://seu-app.onrender.com`

## 🎨 Passo 3: Deploy do Frontend (Netlify)

### 3.1 Preparar frontend
1. No arquivo `public/script.js`, linha 2, altere:
```javascript
const API_BASE_URL = 'https://seu-app.onrender.com';
```

### 3.2 Deploy no Netlify
**Opção A: Drag & Drop**
1. Acesse [netlify.com](https://netlify.com)
2. Faça login com GitHub
3. Arraste a pasta `public` para a área de deploy

**Opção B: Git Integration**
1. Conecte seu repositório GitHub
2. Configure:
   - **Build command**: (deixe vazio)
   - **Publish directory**: `public`

### 3.3 Configurar domínio
1. Netlify gerará uma URL automática
2. Você pode personalizar em "Site settings" → "Domain management"

## 🔧 Passo 4: Testar a Aplicação

### 4.1 Testar Backend
```bash
# Testar se a API está funcionando
curl https://seu-app.onrender.com/api/usuarios
```

### 4.2 Testar Frontend
1. Acesse a URL do Netlify
2. Teste todas as funcionalidades CRUD
3. Verifique se a busca funciona
4. Teste em dispositivos móveis

## 🐛 Solução de Problemas Comuns

### Erro de CORS
**Sintoma**: Erro no console do navegador sobre CORS
**Solução**: Verifique se o CORS está configurado no `server.js`

### Erro de conexão com banco
**Sintoma**: Erro 500 no backend
**Solução**: 
1. Verifique a `DATABASE_URL` no Render
2. Teste a conexão no Neon
3. Verifique se o banco está ativo

### Frontend não carrega dados
**Sintoma**: Lista vazia ou erro de conexão
**Solução**:
1. Verifique se a `API_BASE_URL` está correta
2. Teste a API diretamente
3. Verifique o console do navegador

### Deploy falha no Render
**Sintoma**: Build failed
**Solução**:
1. Verifique os logs no Render
2. Teste localmente: `npm install && npm start`
3. Verifique se todas as dependências estão no `package.json`

## 📊 Monitoramento

### Render Dashboard
- Acesse o dashboard do Render
- Monitore logs em tempo real
- Verifique métricas de performance

### Netlify Analytics
- Acesse o dashboard do Netlify
- Veja estatísticas de visitantes
- Monitore performance

## 🔄 Atualizações

### Atualizar Backend
1. Faça push para o GitHub
2. Render fará deploy automático
3. Monitore os logs

### Atualizar Frontend
1. Altere os arquivos em `public/`
2. Faça push para o GitHub
3. Netlify fará deploy automático

## 💰 Custos

### Gratuito (Plano Free)
- **Render**: 750 horas/mês
- **Netlify**: 100GB bandwidth/mês
- **Neon**: 0.5GB storage, 10GB transfer

### Limitações
- Render: Sleep após 15 min de inatividade
- Netlify: Sem custom domain no plano free
- Neon: Limite de conexões simultâneas

## 🔒 Segurança

### Variáveis de Ambiente
- Nunca commite senhas no código
- Use variáveis de ambiente no Render
- Rotacione chaves regularmente

### HTTPS
- Render e Netlify fornecem HTTPS automático
- Sempre use HTTPS em produção

### Banco de Dados
- Neon oferece SSL por padrão
- Use prepared statements (já implementado)
- Valide todas as entradas

## 📞 Suporte

### Render
- [Documentação](https://render.com/docs)
- [Status](https://status.render.com)

### Netlify
- [Documentação](https://docs.netlify.com)
- [Status](https://status.netlify.com)

### Neon
- [Documentação](https://neon.tech/docs)
- [Status](https://status.neon.tech)

---

**🎉 Parabéns! Sua aplicação CRUD está online!**

Acesse sua URL do Netlify e comece a usar o sistema. 