// --- Publications via Crossref + ORCID (client-side) ---
(async function loadPubs() {
  const ORCID = "0000-0003-4074-0743";  // your ORCID (normalized)
  const MAILTO = "alessandro.triolo20081970@gmail.com"; // polite contact per Crossref etiquette

  const url = new URL("https://api.crossref.org/works");
  url.searchParams.set("filter", `orcid:${ORCID}`);
  url.searchParams.set("rows", "200");           // raise if needed
  url.searchParams.set("sort", "issued");
  url.searchParams.set("order", "desc");
  url.searchParams.set("mailto", MAILTO);

  const r = await fetch(url.toString(), { headers: { "Accept": "application/json" }});
  if (!r.ok) throw new Error("Crossref error " + r.status);
  const data = await r.json();

  // Normalize items
  const items = (data.message.items || []).map(it => {
    const year = (it.issued?.["date-parts"]?.[0]?.[0])
              ?? (it.created?.["date-parts"]?.[0]?.[0]) ?? "n.d.";
    const title = (it.title && it.title[0]) || "Untitled";
    const journal = (it["container-title"] && it["container-title"][0]) || "";
    const doi = it.DOI ? `https://doi.org/${it.DOI}` : "";
    const authors = (it.author || []).map(a => [a.given, a.family].filter(Boolean).join(" ")).join(", ");
    return { year, title, journal, doi, authors };
  });

  // Group by year
  const byYear = items.reduce((acc, it) => {
    (acc[it.year] ||= []).push(it);
    return acc;
  }, {});

  // Render
  const container = document.getElementById("pubs-container");
  container.innerHTML = Object.keys(byYear)
    .sort((a, b) => (b + "") > (a + "") ? 1 : -1)
    .map(y => {
      const lis = byYear[y].map(p => `
        <li class="card">
          <strong>${p.title}</strong><br/>
          <span>${p.authors}${p.journal ? " — <em>" + p.journal + "</em>" : ""}</span>
          ${p.doi ? `<div><a href="${p.doi}" target="_blank" rel="noopener">DOI</a></div>` : ""}
        </li>
      `).join("");
      return `<h2>${y}</h2><ul style="list-style:none;padding:0;margin:0 0 20px">${lis}</ul>`;
    }).join("") || `<div class="card">No publications found.</div>`;
})().catch(err => {
  console.error(err);
  document.getElementById("pubs-container").innerHTML =
    `<div class="card">Couldn’t load publications right now.</div>`;
});
