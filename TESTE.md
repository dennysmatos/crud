# 🧪 Guia de Teste - Sistema CRUD

Este guia te ajudará a testar todas as funcionalidades da aplicação CRUD.

## 🚀 Teste Local

### 1. Configurar Banco de Dados

**Opção A: PostgreSQL Local**
```bash
# Instalar PostgreSQL (macOS)
brew install postgresql
brew services start postgresql

# Criar banco de dados
createdb crud_app

# Executar script SQL
psql crud_app < database.sql
```

**Opção B: Docker**
```bash
# Executar PostgreSQL em container
docker run --name postgres-crud -e POSTGRES_PASSWORD=password -e POSTGRES_DB=crud_app -p 5432:5432 -d postgres

# Executar script SQL
docker exec -i postgres-crud psql -U postgres -d crud_app < database.sql
```

### 2. Configurar Variáveis de Ambiente

Edite o arquivo `config.env`:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/crud_app
PORT=3000
NODE_ENV=development
JWT_SECRET=chave_secreta_para_teste
```

### 3. Iniciar Aplicação

```bash
# Desenvolvimento (com auto-reload)
npm run dev

# Produção
npm start
```

### 4. Acessar Aplicação

Abra o navegador e acesse: `http://localhost:3000`

## 🧪 Testes de Funcionalidade

### ✅ Teste 1: Carregamento da Página
- [ ] Página carrega sem erros
- [ ] Interface está responsiva
- [ ] Formulário está visível
- [ ] Tabela está visível

### ✅ Teste 2: Listagem de Usuários
- [ ] Lista de usuários é carregada
- [ ] Dados são exibidos corretamente
- [ ] Data de criação está formatada
- [ ] Telefone vazio mostra "-"

### ✅ Teste 3: Criação de Usuário
- [ ] Preencher formulário com dados válidos
- [ ] Clicar em "Salvar"
- [ ] Usuário aparece na lista
- [ ] Notificação de sucesso aparece
- [ ] Formulário é limpo

### ✅ Teste 4: Validação de Formulário
- [ ] Tentar salvar sem nome → erro
- [ ] Tentar salvar sem email → erro
- [ ] Tentar salvar com email inválido → erro
- [ ] Tentar salvar com email duplicado → erro

### ✅ Teste 5: Edição de Usuário
- [ ] Clicar no botão "Editar"
- [ ] Formulário é preenchido com dados
- [ ] Título muda para "Editar Usuário"
- [ ] Botão "Cancelar" aparece
- [ ] Alterar dados e salvar
- [ ] Dados são atualizados na lista

### ✅ Teste 6: Exclusão de Usuário
- [ ] Clicar no botão "Excluir"
- [ ] Modal de confirmação aparece
- [ ] Clicar "Cancelar" → modal fecha
- [ ] Clicar "Sim, Excluir" → usuário é removido
- [ ] Notificação de sucesso aparece

### ✅ Teste 7: Busca
- [ ] Digitar no campo de busca
- [ ] Resultados são filtrados em tempo real
- [ ] Busca por nome funciona
- [ ] Busca por email funciona
- [ ] Busca por telefone funciona
- [ ] Limpar busca mostra todos os usuários

### ✅ Teste 8: Responsividade
- [ ] Testar em desktop (1920x1080)
- [ ] Testar em tablet (768x1024)
- [ ] Testar em mobile (375x667)
- [ ] Menu e botões funcionam em todas as telas

### ✅ Teste 9: Atalhos de Teclado
- [ ] ESC cancela edição
- [ ] Ctrl+Enter salva formulário
- [ ] Tab navega pelos campos

### ✅ Teste 10: Notificações
- [ ] Toast notifications aparecem
- [ ] Notificações desaparecem automaticamente
- [ ] Clicar na notificação a fecha
- [ ] Diferentes tipos de notificação (success, error, info)

## 🔧 Testes da API

### Teste via cURL

```bash
# Listar usuários
curl http://localhost:3000/api/usuarios

# Criar usuário
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","email":"teste@email.com","telefone":"(11) 99999-9999"}'

# Buscar usuário por ID
curl http://localhost:3000/api/usuarios/1

# Atualizar usuário
curl -X PUT http://localhost:3000/api/usuarios/1 \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste Atualizado","email":"teste@email.com","telefone":"(11) 88888-8888"}'

# Deletar usuário
curl -X DELETE http://localhost:3000/api/usuarios/1
```

### Teste via Postman/Insomnia

1. **GET** `http://localhost:3000/api/usuarios`
2. **POST** `http://localhost:3000/api/usuarios`
   ```json
   {
     "nome": "João Silva",
     "email": "joao@email.com",
     "telefone": "(11) 99999-9999"
   }
   ```
3. **GET** `http://localhost:3000/api/usuarios/1`
4. **PUT** `http://localhost:3000/api/usuarios/1`
5. **DELETE** `http://localhost:3000/api/usuarios/1`

## 🐛 Testes de Erro

### Teste de Conectividade
- [ ] Desconectar banco de dados → erro 500
- [ ] Parar servidor → erro de conexão
- [ ] URL da API incorreta → erro de CORS

### Teste de Validação
- [ ] Email duplicado → erro 400
- [ ] Dados obrigatórios faltando → erro 400
- [ ] ID inexistente → erro 404

### Teste de Performance
- [ ] Muitos usuários na lista → scroll funciona
- [ ] Busca com muitos resultados → performance ok
- [ ] Formulário com dados grandes → validação funciona

## 📱 Testes de Dispositivos

### Desktop
- [ ] Chrome (última versão)
- [ ] Firefox (última versão)
- [ ] Safari (última versão)
- [ ] Edge (última versão)

### Mobile
- [ ] iPhone Safari
- [ ] Android Chrome
- [ ] Tablet iPad
- [ ] Tablet Android

## 🔍 Testes de Acessibilidade

- [ ] Navegação por teclado funciona
- [ ] Contraste de cores adequado
- [ ] Textos alternativos em ícones
- [ ] Estrutura semântica HTML

## 📊 Checklist Final

### Frontend
- [ ] Interface carrega corretamente
- [ ] Todas as funcionalidades CRUD funcionam
- [ ] Busca em tempo real funciona
- [ ] Responsividade em todos os dispositivos
- [ ] Notificações aparecem corretamente
- [ ] Validações de formulário funcionam

### Backend
- [ ] API responde corretamente
- [ ] Conexão com banco funciona
- [ ] Validações de dados funcionam
- [ ] Tratamento de erros funciona
- [ ] CORS está configurado
- [ ] Logs aparecem no console

### Banco de Dados
- [ ] Tabela foi criada corretamente
- [ ] Dados de exemplo foram inseridos
- [ ] Índices foram criados
- [ ] Constraints funcionam (email único)
- [ ] Timestamps são gerados automaticamente

## 🎯 Resultado Esperado

Após todos os testes, você deve ter:
- ✅ Aplicação funcionando localmente
- ✅ Todas as funcionalidades CRUD operacionais
- ✅ Interface responsiva e moderna
- ✅ Validações e tratamento de erros
- ✅ Pronto para deploy em produção

## 🚀 Próximos Passos

1. **Deploy**: Siga o guia `DEPLOY.md`
2. **Monitoramento**: Configure logs e métricas
3. **Backup**: Configure backup do banco de dados
4. **Segurança**: Implemente autenticação se necessário
5. **Melhorias**: Adicione novas funcionalidades

---

**🎉 Se todos os testes passaram, sua aplicação está pronta para produção!** 