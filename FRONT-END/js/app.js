const API = 'https://petlar-298o.onrender.com'; // BACKEND ONLINE 🚀🔥




/* -----------------------------
      AUTH BASICO
----------------------------- */
function saveToken(t){ localStorage.setItem('petlar_token', t); }
function getToken(){ return localStorage.getItem('petlar_token'); }
function logout(){ localStorage.removeItem('petlar_token'); location.href = 'login.html'; }

/* -----------------------------
      AUTO-INIT
----------------------------- */
document.addEventListener('DOMContentLoaded', () => {

  const path = location.pathname;

  if (path.includes('login')) initLogin();
  if (path.includes('cadastro')) initRegister();
  if (path.includes('home')) initHome();
  if (path.includes('pet')) initPetPage();
  if (path.includes('candidaturas')) initCandidaturas();
  if (path.includes('perfil')) initPerfil();

  markActiveNav();
});

/* -----------------------------
      LOGIN
----------------------------- */
function initLogin(){
  const form = document.getElementById('loginForm');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    saveToken("demo-token");
    location.href = 'home.html';
  });
}

/* -----------------------------
      REGISTER
----------------------------- */
function initRegister(){
  const form = document.getElementById('registerForm');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    saveToken("demo-token");
    location.href = 'home.html';
  });
}

/* -----------------------------
      HOME (LISTA)
----------------------------- */
async function initHome(){
  const res = await fetch(API + '/pets');
  const pets = await res.json();

  renderPetCards(pets);

  // busca
  const q = document.getElementById('q');
  q.addEventListener('input', () => {
    const term = q.value.toLowerCase();
    document.querySelectorAll('.pet-card').forEach(card => {
      const name = card.dataset.name;
      const breed = card.dataset.breed;
      if(name.includes(term) || breed.includes(term)){
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });

  // filtros
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter;

      document.querySelectorAll('.chip').forEach(x => x.classList.remove('active'));
      chip.classList.add('active');

      document.querySelectorAll('.pet-card').forEach(card => {
        const type = card.dataset.type;
        
        if(filter === 'all') card.style.display = '';
        else if(filter === 'favorites'){
          const id = card.dataset.id;
          const liked = localStorage.getItem('fav_'+id) === '1';
          card.style.display = liked ? '' : 'none';
        }
        else card.style.display = (type === filter) ? '' : 'none';
      });

    });
  });
}

function renderPetCards(list){
  const tpl = document.getElementById('petTpl');
  const container = document.getElementById('cards');
  container.innerHTML = '';

  list.forEach(p => {
    const c = tpl.content.cloneNode(true);

    const a = c.querySelector('.pet-card');
    a.dataset.id = p.id;
    a.dataset.name = p.name.toLowerCase();
    a.dataset.breed = (p.breed || "").toLowerCase();
    a.dataset.type = p.type;

    c.querySelector('.pet-name').textContent = p.name;
    c.querySelector('.pet-meta').textContent = `${p.age} · ${p.city}`;
    c.querySelector('.pet-photo').style.backgroundImage = `url(${p.photo})`;

    const favBtn = c.querySelector('.fav-btn');
    const liked = localStorage.getItem('fav_'+p.id) === '1';
    if(liked){ favBtn.classList.add('liked'); favBtn.textContent = '♥'; }

    favBtn.addEventListener('click', e => {
      e.stopPropagation();
      const isLiked = favBtn.classList.toggle('liked');
      favBtn.textContent = isLiked ? '♥' : '♡';
      localStorage.setItem('fav_'+p.id, isLiked ? '1' : '0');
    });

    a.addEventListener('click', () => {
      location.href = `pet.html?id=${p.id}`;
    });

    container.appendChild(c);
  });
}

/* -----------------------------
      PET PAGE
----------------------------- */
async function initPetPage(){
  const id = new URLSearchParams(location.search).get('id');

  const res = await fetch(API + '/pets');
  const pets = await res.json();
  const pet = pets.find(x => x.id == id);

  if(!pet) return alert("Pet não encontrado");

  document.getElementById('petPhoto').src = pet.photo;
  document.getElementById('petName').textContent = pet.name;
  document.getElementById('petBreed').textContent = pet.breed;
  document.getElementById('petGender').textContent = pet.gender;
  document.getElementById('petAge').textContent = pet.age;
  document.getElementById('petWeight').textContent = pet.weight;

  document.getElementById('instName').textContent = pet.institution.name;
  document.getElementById('instLocation').textContent = pet.institution.location;

  document.getElementById('petBio').textContent = pet.bio;

  const interestBtn = document.getElementById('interestBtn');
  interestBtn.addEventListener('click', openAdoptionFlow);
}

/* -----------------------------
      FLUXO DE ADOÇÃO (MODAIS)
----------------------------- */
function openAdoptionFlow(){
  const modalArea = document.getElementById('modalArea');

  modalArea.innerHTML = `

    <!-- MODAL FORM -->
    <div id="modal-form" class="modal">
      <div class="modal-content">
        <span class="close-button" data-modal="modal-form">&times;</span>
        <h2>Formulário de Adoção</h2>
        <form>
          <input type="text" placeholder="Nome completo" required>
          <input type="email" placeholder="Email" required>
          <textarea rows="4" placeholder="Por que deseja adotar?"></textarea>
          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>

    <!-- MODAL DOCUMENTOS -->
    <div id="modal-docs" class="modal">
      <div class="modal-content">
        <span class="close-button" data-modal="modal-docs">&times;</span>
        <h2>Enviar Documentos</h2>
        <div class="file-upload-area">
          <input type="file" id="file-input" multiple hidden>
          <label for="file-input">Clique ou arraste aqui</label>
        </div>
        <button id="upload-btn">Enviar</button>
      </div>
    </div>

    <!-- MODAL TERMO -->
    <div id="modal-term" class="modal">
      <div class="modal-content">
        <span class="close-button" data-modal="modal-term">&times;</span>
        <h2>Termo de responsabilidade</h2>
        <div class="term-content">
          <p>Ao adotar você concorda em cuidar com amor...</p>
        </div>
        <button id="sign-term-btn">Assinar Termo</button>
      </div>
    </div>

    <!-- MODAL CONFIRMAÇÃO -->
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

function initModals(){

  const map = {
    'btn-form': 'modal-form',
    'btn-docs': 'modal-docs',
    'btn-term': 'modal-term',
    'btn-confirm': 'modal-confirm'
  };

  // abrir modal clicando no botão
  Object.keys(map).forEach(btn => {
    const b = document.getElementById(btn);
    const modalId = map[btn];
    if(b){
      b.onclick = () => document.getElementById(modalId).style.display = "block";
    }
  });

  // fechar modal
  document.querySelectorAll('.close-button').forEach(btn => {
    btn.onclick = () => {
      const id = btn.dataset.modal;
      document.getElementById(id).style.display = 'none';
    };
  });

  // envio simulado
  document.getElementById('final-confirm-btn').onclick = () => {
    alert("Solicitação enviada!");
    location.href = "candidaturas.html";
  };
}

/* -----------------------------
      CANDIDATURAS
----------------------------- */
async function initCandidaturas(){
  const res = await fetch(API + '/pets');
  const pets = await res.json();

  const candList = document.getElementById('candList');
  const cands = JSON.parse(localStorage.getItem('cands') || "[]");

  candList.innerHTML = '';

  cands.forEach(id => {
    const p = pets.find(x => x.id == id);
    if(!p) return;

    const div = document.createElement('div');
    div.className = 'card pet-card';
    div.innerHTML = `
      <div class="pet-photo" style="background-image:url('${p.photo}')"></div>
      <div class="pet-body">
        <h3>${p.name}</h3>
        <p>${p.breed} — ${p.age}</p>
      </div>
    `;
    candList.appendChild(div);
  });
}

/* -----------------------------
      PERFIL
----------------------------- */
function initPerfil(){
  document.getElementById('pName').textContent = "Usuário Exemplo";
  document.getElementById('pEmail').textContent = "usuario@email.com";
}

/* -----------------------------
      NAV ACTIVA
----------------------------- */
function markActiveNav(){
  const items = document.querySelectorAll('.bb-item');
  const page = location.pathname.split('/').pop().replace('.html','');

  items.forEach(i => {
    if(i.dataset.page === page) i.classList.add('active');
  });
}
