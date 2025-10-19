// Footer year
document.getElementById("y").textContent = new Date().getFullYear();

// Demo content
const cards = [
  { tag:"wbDES", title:"Water as co‑architect", text:"Modulates H‑bond network and solubility." },
  { tag:"Type‑V DES", title:"Rational design", text:"Carvacrol + HB acceptors (DMSO, TMU, DMC…)." },
  { tag:"IL & mixtures", title:"From micro‑segregation to properties", text:"Linking CDF/RDF/S(q) to transport." }
];
document.getElementById("cards").innerHTML = cards.map(c => `
  <article class="card">
    <div style="font-size:12px;color:#047857;text-transform:uppercase">${c.tag}</div>
    <h3>${c.title}</h3>
    <p>${c.text}</p>
  </article>
`).join("");

const pubs = [
  { year:2025, title:"Type‑V DES for selective polymer dissolution", venue:"ACS SusChemEng (in prep)", link:"#"},
  { year:2024, title:"S=O orientation and transport in DMSO–Carvacrol", venue:"J. Chem. Phys.", link:"#"},
];
document.getElementById("pubs").innerHTML = pubs.map(p => `
  <li class="card"><div>${p.year} • ${p.venue}</div><strong>${p.title}</strong>
  <div><a href="${p.link}">DOI / PDF</a></div></li>
`).join("");

document.getElementById("news-list").innerHTML = `
  <div class="card">2025‑09‑12 — Best Poster at ILMAT (wbDES).</div>
  <div class="card">2025‑07‑01 — University funds for scattering & MD.</div>
`;

document.getElementById("events-list").innerHTML = `
  <div class="card"><strong>ILMAT2025 — CNR, Rome</strong><br>2025‑09‑08 → 2025‑09‑12</div>
`;

// ---- Mailto helper ----
const MAIL_TO = "alessandro.triolo20081970@gmail.com";
const MAIL_SUBJECT = "Message from Liquid State Lab website";

function composeMailto(e){
  e.preventDefault();
  const f = e.target;
  const body = [
    "Name: " + (f.nome?.value || ""),
    "Email: " + (f.reply?.value || ""),
    "",
    (f.msg?.value || "")
  ].join("\r\n");
  const url = "mailto:" + encodeURIComponent(MAIL_TO)
            + "?subject=" + encodeURIComponent(MAIL_SUBJECT)
            + "&body=" + encodeURIComponent(body);
  window.location.href = url;
  return false;
}

// ---- Obfuscated email + Gmail fallback ----
function mountObfuscatedEmail(elId, user, domain){
  const el = document.getElementById(elId);
  if(!el) return;
  const addr = user + "@" + domain;
  el.href = "mailto:" + addr;
  el.textContent = addr;
}

// Dropdown toggle
(function () {
  const dd = document.querySelector('.dropdown');
  if (!dd) return;
  const btn = dd.querySelector('.dropbtn');

  const setOpen = (state) => {
    dd.classList.toggle('open', state);
    btn.setAttribute('aria-expanded', String(state));
  };

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    setOpen(!dd.classList.contains('open'));
  });

  document.addEventListener('click', (e) => {
    if (!dd.contains(e.target)) setOpen(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });

  btn.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      setOpen(!dd.classList.contains('open'));
    }
  });
})();
