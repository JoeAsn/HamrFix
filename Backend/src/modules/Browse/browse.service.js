import browse_professionals, { browse_locations, browse_services } from "./browse.repository.js";

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
  const services = await browse_services(professionals_id) ;
  const service_areas = await browse_locations(professionals_id) ;
  const professionalsMap = new map(
    professionals.map(professional =>{
      return [professional.id , {...professional , services : [] , service_areas : []}]
    })
  )
  services.forEach(service => {
    const professional = professionalsMap.get(professional.id) ;
    professional.service.push(service.name)
  });
  service_areas.forEach(location=>{
    const professional = professionalsMap.get(professional.id) ;
    professional.service_areas.push(location.name)
  })

  return [...professionalsMap.values()] ;
}

export default browse_service;
