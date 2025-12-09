document.addEventListener("DOMContentLoaded", () => {

    const interestBtn = document.getElementById("interestBtn");
    if (!interestBtn) return;

    interestBtn.addEventListener("click", openAdoptionFlow);
});

function openAdoptionFlow() {
    const modalArea = document.getElementById("modalArea");

    modalArea.innerHTML = `
        <!-- FORM -->
        <div id="modal-form" class="modal">
            <div class="modal-content">
                <span class="close-button" data-modal="modal-form">&times;</span>
                <h2>Formulário de Adoção</h2>
                <form id="form-adocao">
                    <input type="text" placeholder="Nome completo" required>
                    <input type="email" placeholder="Email" required>
                    <textarea rows="4" placeholder="Por que deseja adotar?"></textarea>
                    <button type="submit">Salvar</button>
                </form>
            </div>
        </div>

        <!-- DOCUMENTOS -->
        <div id="modal-docs" class="modal">
            <div class="modal-content">
                <span class="close-button" data-modal="modal-docs">&times;</span>
                <h2>Enviar Documentos</h2>
                <input type="file" multiple>
                <button id="upload-btn">Enviar</button>
            </div>
        </div>

        <!-- TERMO -->
        <div id="modal-term" class="modal">
            <div class="modal-content">
                <span class="close-button" data-modal="modal-term">&times;</span>
                <h2>Termo de responsabilidade</h2>
                <p>Ao adotar, você concorda em garantir segurança, carinho e cuidados veterinários.</p>
                <button id="sign-term-btn">Assinar Termo</button>
            </div>
        </div>

        <!-- CONFIRMAÇÃO FINAL -->
        <div id="modal-confirm" class="modal">
            <div class="modal-content">
                <span class="close-button" data-modal="modal-confirm">&times;</span>
                <h2>Confirmação Final</h2>
                <button id="final-confirm-btn">Enviar Solicitação</button>
            </div>
        </div>
    `;

    initModals();
}

function initModals() {

    document.querySelectorAll(".close-button").forEach(btn => {
        btn.addEventListener("click", () => {
            document.getElementById(btn.dataset.modal).style.display = "none";
        });
    });

    // formulário
    document.getElementById("form-adocao").addEventListener("submit", e => {
        e.preventDefault();
        document.getElementById("modal-form").style.display = "none";
        document.getElementById("modal-docs").style.display = "block";
    });

    // documentos
    document.getElementById("upload-btn").addEventListener("click", () => {
        document.getElementById("modal-docs").style.display = "none";
        document.getElementById("modal-term").style.display = "block";
    });

    // termo
    document.getElementById("sign-term-btn").addEventListener("click", () => {
        document.getElementById("modal-term").style.display = "none";
        document.getElementById("modal-confirm").style.display = "block";
    });

    // final
    document.getElementById("final-confirm-btn").addEventListener("click", () => {
        alert("Solicitação enviada com sucesso!");
        location.href = "candidaturas.html";
    });
}
