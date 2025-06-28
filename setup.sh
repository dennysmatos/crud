#!/bin/bash

echo "🚀 Configurando Sistema CRUD..."
echo "================================"

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js primeiro."
    echo "📥 Download: https://nodejs.org/"
    exit 1
fi

# Verificar se npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado. Por favor, instale o npm primeiro."
    exit 1
fi

echo "✅ Node.js e npm encontrados"

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependências instaladas com sucesso!"
else
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

# Verificar se o arquivo config.env existe
if [ ! -f "config.env" ]; then
    echo "❌ Arquivo config.env não encontrado"
    echo "📝 Crie o arquivo config.env com suas configurações do banco de dados"
    exit 1
fi

echo "✅ Configuração concluída!"
echo ""
echo "🎯 Para iniciar a aplicação:"
echo "   npm run dev    # Desenvolvimento"
echo "   npm start      # Produção"
echo ""
echo "🌐 Acesse: http://localhost:3000"
echo ""
echo "📚 Consulte o README.md para mais informações" 