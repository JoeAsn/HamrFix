import browse_professionals from "./browse.repository.js";

async function browse_service({ filters = {}, pagination = {} } = {}) {
  // Keep these positions in sync with the placeholders in the repository query.
  const queryValues = [
    filters.name ?? null,
    filters.service ?? null,
    filters.category ?? null,
    filters.location ?? null,
    pagination.cursor?.id ?? null,
    pagination.limit ?? 10,
  ];

  const professionals = await browse_professionals(queryValues);
  const professionals_id = [] ;
  professionals.forEach(professional => {
    professionals_id.push(professional.id)
  });
  
}

export default browse_service;
