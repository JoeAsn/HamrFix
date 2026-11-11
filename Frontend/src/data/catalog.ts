export const SUB_CITIES = [
  "Bole",
  "Kirkos",
  "Arada",
  "Yeka",
  "Lideta",
  "Nifas Silk-Lafto",
  "Kolfe Keranio",
  "Addis Ketema",
  "Gullele",
  "Akaky Kaliti",
  "Lemi Kura",
] as const

export type SubCity = (typeof SUB_CITIES)[number]

export const CATEGORIES = [
  {
    id: "plumbing",
    name: "Plumbing",
    icon: "plumbing",
    description: "Pipes, leaks, pumps, and water systems.",
  },
  {
    id: "electrical",
    name: "Electrical",
    icon: "electrical_services",
    description: "Wiring, breakers, lighting, and power issues.",
  },
  {
    id: "carpentry",
    name: "Carpentry",
    icon: "carpenter",
    description: "Doors, cabinets, furniture, and wood repairs.",
  },
  {
    id: "appliances",
    name: "Appliances",
    icon: "kitchen",
    description: "Refrigerators, washers, cookers, and HVAC units.",
  },
  {
    id: "painting",
    name: "Painting",
    icon: "format_paint",
    description: "Interior and exterior painting and finishing.",
  },
  {
    id: "cleaning",
    name: "Cleaning",
    icon: "cleaning_services",
    description: "Home cleaning and maintenance support.",
  },
] as const

export type CategoryId = (typeof CATEGORIES)[number]["id"]

export type ServiceOffering = {
  id: string
  name: string
  description: string
}

export type Professional = {
  id: string
  name: string
  profession: string
  categoryId: CategoryId
  bio: string
  yearsExperience: number
  languages: string[]
  areas: SubCity[]
  services: ServiceOffering[]
  phone: string
  telegram: string
  photo: string
}

export const PROFESSIONALS: Professional[] = [
  {
    id: "abebe-mekonnen",
    name: "Abebe Mekonnen",
    profession: "Plumber",
    categoryId: "plumbing",
    bio: "I install and repair residential plumbing systems across eastern and central Addis Ababa. Residents can contact me directly to describe the job and agree on a visit.",
    yearsExperience: 12,
    languages: ["Amharic", "English"],
    areas: ["Bole", "Kirkos", "Yeka", "Lemi Kura"],
    services: [
      {
        id: "pipe-install",
        name: "Pipe installation",
        description: "PVC, PPR, and metal piping for kitchens and bathrooms.",
      },
      {
        id: "leak-repair",
        name: "Leak repair",
        description: "Find and repair visible or concealed water leaks.",
      },
      {
        id: "pump-setup",
        name: "Booster pump setup",
        description: "Install and service rooftop or basement booster pumps.",
      },
      {
        id: "drainage",
        name: "Drainage clearing",
        description: "Unblock sinks, floor drains, and household sewer lines.",
      },
    ],
    phone: "+251 91 123 4567",
    telegram: "@abebeplumber",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBf2v2UoRgvS-GpnyJNj-tuHJqIG1-OlXdwVPVWPyZkHM6SenNgPPTkqXNLCCCJ990hrJYEMjOloh_ThZ225YedxKzO_i6ENGrXJCBnR9rPV5PAl_XI0XfiOG9_jf6Ck-R5LKxJ-jXSFULia0Va4k7D2wxYXl9NzP7VJXZ-CwTzWyJUypItBnY-vLG4FrvJFX1BoQ3eE-fEFIIL7GdNkCmql4Ir_Qxzti-0m0C6RvY",
  },
  {
    id: "dawit-tadesse",
    name: "Dawit Tadesse",
    profession: "Electrician",
    categoryId: "electrical",
    bio: "I work on household electrical systems, from breaker trips to lighting upgrades. I serve homes in Bole, Kirkos, and surrounding sub-cities.",
    yearsExperience: 9,
    languages: ["Amharic", "English"],
    areas: ["Bole", "Kirkos", "Arada", "Lideta"],
    services: [
      {
        id: "breaker",
        name: "Breaker and panel work",
        description: "Diagnose tripping breakers and inspect distribution boards.",
      },
      {
        id: "wiring",
        name: "House wiring",
        description: "New circuits, socket repairs, and lighting circuits.",
      },
      {
        id: "generator",
        name: "Generator changeover",
        description: "Install or service ATS switches and generator connections.",
      },
    ],
    phone: "+251 92 884 9120",
    telegram: "@dawitelectric",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC1NROZ4WPAluAycReE9NSWuYyI-m4Kx-Qof8tI4aPGDlzBXe-LZ9hPVQWy68bEf-L-s2H8nT6mxQ6tQ67X0XR_tUPr-iMmbY1krQVxbFtAJdQLvcLkjbtwB6jqY4xXx5KUNI8aTAbB1UoLWXPLCZ2DPoqB3djaPZTylUtKbYhQC_gCad0h9LnyT1YnUJXZn_VQoNyH2w8aG4R05cwMGJU4nrVH7nQ-YUuEhw5ied0",
  },
  {
    id: "hanna-alemu",
    name: "Hanna Alemu",
    profession: "Appliance technician",
    categoryId: "appliances",
    bio: "I repair household appliances including refrigerators, washing machines, and cookers. Contact me with the brand and the issue before a house visit.",
    yearsExperience: 7,
    languages: ["Amharic", "English", "Oromo"],
    areas: ["Bole", "Yeka", "Gullele", "Lemi Kura"],
    services: [
      {
        id: "fridge",
        name: "Refrigerator repair",
        description: "Cooling issues, gas refill, and thermostat faults.",
      },
      {
        id: "washer",
        name: "Washing machine repair",
        description: "Drum, pump, and control-board diagnostics.",
      },
      {
        id: "cooker",
        name: "Cooker and oven repair",
        description: "Electric and mixed cooktop servicing.",
      },
    ],
    phone: "+251 91 445 7788",
    telegram: "@hannaappliances",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDOUOuWIVHboqziBU88h-UB388zo7mew4QTPBlZGy19DSt1Qkq9hynAKi-di0mE5A9JdNRWD2b8O6sWwMJI2E1czq5TQBFKR7M_ULnB2xeI75zZhJAga76NjX7qyTv4ya49Qs1Oe-a555CuBfd4FdEroOjgLKGm7YwiS8Jp1DGaYQ5-YJlvOWW6SIDQORfEGNR8jMR_ji2w_Zqj7yDsThxv8PSheAc5dMWhmBiOJy4",
  },
  {
    id: "kidus-tesfaye",
    name: "Kidus Tesfaye",
    profession: "Carpenter",
    categoryId: "carpentry",
    bio: "I build and repair doors, cabinets, and household woodwork. I list the services I offer so residents can see whether I can take their job.",
    yearsExperience: 11,
    languages: ["Amharic"],
    areas: ["Nifas Silk-Lafto", "Kolfe Keranio", "Lideta", "Kirkos"],
    services: [
      {
        id: "doors",
        name: "Door hanging and repair",
        description: "Align, plane, and hang interior and compound doors.",
      },
      {
        id: "cabinets",
        name: "Kitchen cabinets",
        description: "Repair or assemble household cabinets and shelves.",
      },
      {
        id: "furniture",
        name: "Furniture repair",
        description: "Fix chairs, tables, and bed frames.",
      },
    ],
    phone: "+251 93 220 1188",
    telegram: "@kiduswood",
    photo: "",
  },
  {
    id: "selam-negash",
    name: "Selam Negash",
    profession: "Painter",
    categoryId: "painting",
    bio: "I paint apartments and houses, including surface preparation and finishing. Residents can message me with room count and current wall condition.",
    yearsExperience: 8,
    languages: ["Amharic", "English"],
    areas: ["Arada", "Addis Ketema", "Gullele", "Lideta"],
    services: [
      {
        id: "interior",
        name: "Interior painting",
        description: "Walls, ceilings, and trim in occupied homes.",
      },
      {
        id: "exterior",
        name: "Exterior painting",
        description: "Compound walls and building facades.",
      },
      {
        id: "prep",
        name: "Surface preparation",
        description: "Filling, sanding, and priming before paint.",
      },
    ],
    phone: "+251 91 667 3344",
    telegram: "@selampaint",
    photo: "",
  },
]

export function getProfessional(id: string) {
  return PROFESSIONALS.find((item) => item.id === id)
}

export function getCategory(id: string) {
  return CATEGORIES.find((item) => item.id === id)
}

export function filterProfessionals(query: string, categoryId: string, area: string) {
  const q = query.trim().toLowerCase()
  return PROFESSIONALS.filter((pro) => {
    const matchesCategory = !categoryId || pro.categoryId === categoryId
    const matchesArea = !area || pro.areas.includes(area as SubCity)
    const haystack = [
      pro.name,
      pro.profession,
      pro.bio,
      ...pro.services.map((service) => `${service.name} ${service.description}`),
      ...pro.areas,
    ]
      .join(" ")
      .toLowerCase()
    const matchesQuery = !q || haystack.includes(q)
    return matchesCategory && matchesArea && matchesQuery
  })
}
