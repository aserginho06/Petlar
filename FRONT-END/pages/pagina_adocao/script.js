document.addEventListener('DOMContentLoaded', () => {
    // Mapeamento de botões para os IDs dos modais correspondentes
    const buttonToModalMap = {
        'btn-form': 'modal-form',
        'btn-docs': 'modal-docs',
        'btn-term': 'modal-term',
        'btn-confirm': 'modal-confirm'
    };

    // Adiciona evento de clique a todos os botões de ação
    Object.keys(buttonToModalMap).forEach(buttonId => {
        const button = document.getElementById(buttonId);
        const modalId = buttonToModalMap[buttonId];
        
        button.addEventListener('click', () => {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });

    // Adiciona evento de clique a todos os botões de fechar
    const closeButtons = document.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Fecha o modal se o usuário clicar fora do conteúdo do modal
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });

    // Simula ações dos botões dentro dos modais
    document.querySelector('#modal-form form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Formulário salvo com sucesso!');
        document.getElementById('modal-form').style.display = 'none';
    });

    document.getElementById('upload-btn').addEventListener('click', () => {
        alert('Documentos enviados para análise!');
        document.getElementById('modal-docs').style.display = 'none';
    });

    document.getElementById('sign-term-btn').addEventListener('click', () => {
        alert('Termo de responsabilidade assinado digitalmente!');
        document.getElementById('modal-term').style.display = 'none';
    });

    document.getElementById('final-confirm-btn').addEventListener('click', () => {
        alert('Sua solicitação de adoção foi enviada com sucesso! Entraremos em contato em breve.');
        document.getElementById('modal-confirm').style.display = 'none';
    });
});