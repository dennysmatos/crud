// Configuração da API
const API_BASE_URL = window.location.origin;

// Estado da aplicação
let users = [];
let editingUserId = null;
let filteredUsers = [];

// Elementos do DOM
const userForm = document.getElementById('user-form');
const usersTable = document.getElementById('users-table');
const usersTbody = document.getElementById('users-tbody');
const searchInput = document.getElementById('search-input');
const refreshBtn = document.getElementById('refresh-btn');
const loadingDiv = document.getElementById('loading');
const noDataDiv = document.getElementById('no-data');
const confirmModal = document.getElementById('confirm-modal');
const confirmYes = document.getElementById('confirm-yes');
const confirmNo = document.getElementById('confirm-no');
const toastContainer = document.getElementById('toast-container');

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    setupEventListeners();
});

// Configuração dos event listeners
function setupEventListeners() {
    // Formulário
    userForm.addEventListener('submit', handleFormSubmit);
    
    // Busca
    searchInput.addEventListener('input', handleSearch);
    
    // Botão de atualizar
    refreshBtn.addEventListener('click', loadUsers);
    
    // Modal de confirmação
    confirmYes.addEventListener('click', confirmDelete);
    confirmNo.addEventListener('click', closeModal);
    
    // Fechar modal ao clicar fora
    confirmModal.addEventListener('click', (e) => {
        if (e.target === confirmModal) {
            closeModal();
        }
    });
}

// Funções da API
async function apiRequest(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}/api${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro na requisição');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erro na API:', error);
        throw error;
    }
}

// Carregar usuários
async function loadUsers() {
    try {
        showLoading(true);
        users = await apiRequest('/usuarios');
        filteredUsers = [...users];
        renderUsers();
        showToast('Usuários carregados com sucesso!', 'success');
    } catch (error) {
        showToast(`Erro ao carregar usuários: ${error.message}`, 'error');
    } finally {
        showLoading(false);
    }
}

// Criar usuário
async function createUser(userData) {
    try {
        const newUser = await apiRequest('/usuarios', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
        
        users.unshift(newUser);
        filteredUsers = [...users];
        renderUsers();
        showToast('Usuário criado com sucesso!', 'success');
        return newUser;
    } catch (error) {
        showToast(`Erro ao criar usuário: ${error.message}`, 'error');
        throw error;
    }
}

// Atualizar usuário
async function updateUser(id, userData) {
    try {
        const updatedUser = await apiRequest(`/usuarios/${id}`, {
            method: 'PUT',
            body: JSON.stringify(userData)
        });
        
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            users[index] = updatedUser;
            filteredUsers = [...users];
            renderUsers();
        }
        
        showToast('Usuário atualizado com sucesso!', 'success');
        return updatedUser;
    } catch (error) {
        showToast(`Erro ao atualizar usuário: ${error.message}`, 'error');
        throw error;
    }
}

// Deletar usuário
async function deleteUser(id) {
    try {
        await apiRequest(`/usuarios/${id}`, {
            method: 'DELETE'
        });
        
        users = users.filter(user => user.id !== id);
        filteredUsers = [...users];
        renderUsers();
        showToast('Usuário deletado com sucesso!', 'success');
    } catch (error) {
        showToast(`Erro ao deletar usuário: ${error.message}`, 'error');
        throw error;
    }
}

// Buscar usuário por ID
async function getUserById(id) {
    try {
        return await apiRequest(`/usuarios/${id}`);
    } catch (error) {
        showToast(`Erro ao buscar usuário: ${error.message}`, 'error');
        throw error;
    }
}

// Manipulação do formulário
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(userForm);
    const userData = {
        nome: formData.get('nome').trim(),
        email: formData.get('email').trim(),
        telefone: formData.get('telefone').trim()
    };
    
    // Validação
    if (!userData.nome || !userData.email) {
        showToast('Nome e email são obrigatórios!', 'error');
        return;
    }
    
    if (!isValidEmail(userData.email)) {
        showToast('Email inválido!', 'error');
        return;
    }
    
    try {
        if (editingUserId) {
            await updateUser(editingUserId, userData);
            cancelEdit();
        } else {
            await createUser(userData);
            userForm.reset();
        }
    } catch (error) {
        // Erro já tratado nas funções da API
    }
}

// Validação de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Editar usuário
async function editUser(id) {
    try {
        const user = await getUserById(id);
        if (user) {
            editingUserId = id;
            fillForm(user);
            updateFormTitle('Editar Usuário');
            showCancelButton(true);
            showToast('Modo de edição ativado', 'info');
        }
    } catch (error) {
        // Erro já tratado na função getUserById
    }
}

// Preencher formulário
function fillForm(user) {
    document.getElementById('user-id').value = user.id;
    document.getElementById('nome').value = user.nome;
    document.getElementById('email').value = user.email;
    document.getElementById('telefone').value = user.telefone || '';
}

// Cancelar edição
function cancelEdit() {
    editingUserId = null;
    userForm.reset();
    updateFormTitle('Cadastrar Novo Usuário');
    showCancelButton(false);
    showToast('Edição cancelada', 'info');
}

// Atualizar título do formulário
function updateFormTitle(title) {
    document.getElementById('form-title-text').textContent = title;
}

// Mostrar/ocultar botão cancelar
function showCancelButton(show) {
    const cancelBtn = document.getElementById('cancel-btn');
    cancelBtn.style.display = show ? 'flex' : 'none';
}

// Busca
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (!searchTerm) {
        filteredUsers = [...users];
    } else {
        filteredUsers = users.filter(user => 
            user.nome.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm) ||
            (user.telefone && user.telefone.toLowerCase().includes(searchTerm))
        );
    }
    
    renderUsers();
}

// Renderizar usuários
function renderUsers() {
    if (filteredUsers.length === 0) {
        usersTable.style.display = 'none';
        noDataDiv.style.display = 'block';
        return;
    }
    
    usersTable.style.display = 'table';
    noDataDiv.style.display = 'none';
    
    usersTbody.innerHTML = filteredUsers.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${escapeHtml(user.nome)}</td>
            <td>${escapeHtml(user.email)}</td>
            <td>${escapeHtml(user.telefone || '-')}</td>
            <td>${formatDate(user.data_criacao)}</td>
            <td class="actions">
                <button onclick="editUser(${user.id})" class="btn btn-outline btn-sm" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="showDeleteConfirmation(${user.id})" class="btn btn-danger btn-sm" title="Excluir">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Escape HTML para prevenir XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Formatar data
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Mostrar/ocultar loading
function showLoading(show) {
    loadingDiv.style.display = show ? 'block' : 'none';
    if (show) {
        usersTable.style.display = 'none';
        noDataDiv.style.display = 'none';
    }
}

// Modal de confirmação de exclusão
let userToDelete = null;

function showDeleteConfirmation(userId) {
    userToDelete = userId;
    const user = users.find(u => u.id === userId);
    document.getElementById('confirm-message').textContent = 
        `Tem certeza que deseja excluir o usuário "${user.nome}"?`;
    confirmModal.style.display = 'block';
}

async function confirmDelete() {
    if (userToDelete) {
        try {
            await deleteUser(userToDelete);
            userToDelete = null;
            closeModal();
        } catch (error) {
            // Erro já tratado na função deleteUser
        }
    }
}

function closeModal() {
    confirmModal.style.display = 'none';
    userToDelete = null;
}

// Sistema de notificações Toast
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'fas fa-check-circle' :
                 type === 'error' ? 'fas fa-exclamation-circle' :
                 'fas fa-info-circle';
    
    toast.innerHTML = `
        <i class="${icon}"></i>
        <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto-remover após 5 segundos
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 5000);
    
    // Remover ao clicar
    toast.addEventListener('click', () => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    });
}

// Adicionar botão cancelar ao formulário
document.getElementById('cancel-btn').addEventListener('click', cancelEdit);

// Melhorias de UX
document.addEventListener('keydown', (e) => {
    // ESC para cancelar edição
    if (e.key === 'Escape' && editingUserId) {
        cancelEdit();
    }
    
    // Ctrl/Cmd + Enter para salvar
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        userForm.dispatchEvent(new Event('submit'));
    }
});

// Foco automático no primeiro campo
document.getElementById('nome').focus();

// Verificar conexão com a API
async function checkApiConnection() {
    try {
        await apiRequest('/usuarios');
        return true;
    } catch (error) {
        showToast('Erro de conexão com o servidor. Verifique se o backend está rodando.', 'error');
        return false;
    }
}

// Verificar conexão ao carregar a página
checkApiConnection(); 