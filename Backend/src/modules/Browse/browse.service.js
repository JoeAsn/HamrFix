import {
  browse_professionals,
  browse_locations,
  browse_services,
  find_category_by_name,
} from "./browse.repository.js";

async function browse_service({ filters = {}, pagination = {} } = {}) {
  const category = filters.category
    ? await find_category_by_name(filters.category)
    : null;
  if (filters.category && !category) return [];

  // Keep these positions in sync with the placeholders in the repository query.
  const queryValues = [
    filters.name ?? null,
    filters.service ?? null,
    category ? String(category.id) : null,
    filters.location ?? null,
    pagination.cursor?.id ?? null,
    pagination.limit ?? 10,
  ];

  const professionals = await browse_professionals(queryValues);
  if (!professionals.length) return [];
  const professionals_id = [] ;
  professionals.forEach(professional => {
    professionals_id.push(professional.id)
  });
  const services = await browse_services(professionals_id) ;
  const service_areas = await browse_locations(professionals_id) ;
  const professionalsMap = new Map(
    professionals.map(professional =>{
      return [professional.id , {...professional , services : [], areas : []}]
    })
  )
  services.forEach(service => {
    const profile = professionalsMap.get(service.professional_id);
    profile.services.push({ id: service.id, name: service.name })
  });
  service_areas.forEach(location=>{
    const profile = professionalsMap.get(location.professional_id);
    profile.areas.push({ name: location.name, isPrimary: location.is_primary })
  })

  return [...professionalsMap.values()] ;
}

export default browse_service;
