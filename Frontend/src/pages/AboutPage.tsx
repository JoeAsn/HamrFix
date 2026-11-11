import { Link } from "react-router-dom"
import { Icon } from "../components/Icon"
import { useAuth } from "../auth/AuthContext"

export function AboutPage() {
  const { session } = useAuth()

  return (
    <div>
      <section className="bg-surface-low py-8 sm:py-12 md:py-16">
        <div className="mx-auto max-w-[1280px] px-4 md:px-8 lg:px-12">
          <nav className="mb-4 flex flex-wrap items-center gap-x-2 text-sm text-on-variant">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <span className="font-semibold text-primary">About us</span>
          </nav>
          <p className="mb-3 inline-flex rounded-full bg-surface-high px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Addis Ababa home-service directory
          </p>
          <h1 className="max-w-4xl text-[1.75rem] font-bold leading-tight tracking-tight text-primary sm:text-4xl md:text-[40px] md:leading-12">
            Connecting Addis Ababa homes with independent tradespeople
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-on-variant sm:text-base sm:leading-7">
            Hamrfix is a public directory for household repairs and maintenance across the city’s 11 sub-cities. Residents
            look up plumbers, electricians, carpenters, appliance technicians, painters, and cleaners, then contact them
            directly.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
            {[
              { value: "11", label: "Sub-cities covered" },
              { value: "Direct", label: "Phone and Telegram contact" },
              { value: "One account", label: "Find help and list a trade" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-surface-lowest p-5 shadow-card">
                <div className="text-3xl font-bold text-primary">{item.value}</div>
                <div className="mt-1 text-sm text-on-variant">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-10 sm:py-16 md:px-8 lg:px-12">
        <div className="grid gap-4 sm:gap-8 lg:grid-cols-2">
          <div className="rounded-xl bg-surface-lowest p-5 shadow-card sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-error">The old way</p>
            <h2 className="mt-2 text-2xl font-semibold text-primary">Informal street brokers</h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-on-variant">
              <p>
                In neighborhoods from Bole high-rises to residential compounds in CMC and Old Airport, finding a
                tradesperson often meant relying on roadside intermediaries (<strong className="text-primary">delalas</strong>
                ), street-corner referrals, or ad-hoc phone trees.
              </p>
              <p>
                Those introductions can add opaque markups, squeeze the person doing the work, and leave households with no
                clear record of who came to the house.
              </p>
              <p>
                Skilled tradespeople, meanwhile, had no simple public place to show their profession, the services they
                offer, and the areas they actually cover.
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-primary-container p-5 text-on-primary sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-secondary-container">The Hamrfix way</p>
            <h2 className="mt-2 text-2xl font-semibold">A direct directory</h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-on-primary-container">
              <p>
                Hamrfix removes the broker layer from discovery. Residents search by trade and sub-city, open a profile, and
                reach the professional themselves.
              </p>
              <p>
                Professionals publish one profession, several services under that profession, and the sub-cities they serve.
                How the job is priced and paid is agreed between the two people, off the platform.
              </p>
              <p>Phone numbers are shown only after someone creates an account, so listings are not an open scrapable phone book.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-low py-8 sm:py-12">
        <div className="mx-auto grid max-w-[1280px] gap-3 px-4 sm:gap-4 md:grid-cols-3 md:px-8 lg:px-12">
          {[
            {
              image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAg0c4ft6VK0eB8aNo-QM4K-bMVYfOfz4cBMNOoXOnSHD1ZtZlRgDyJ4nLIt43KDazJ4CDwNFjmskIyxC_c2KEyeRY2_qLA-jfbvRoBOg4rUDQoP1-r6WWeYTWJ3ig-V_VEaLXhZyXA1zQCQmIOKt230BTItt-QcBbSW02yL_D2WTQq_EmiEujuoFRVQI0XQ36NWRJDYHXPfHSaBoKZ4yc2J3eSd9s5b1mLA6xjWYg",
              title: "Electrical work",
            },
            {
              image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDoX92SzIofUHSsSgXBBautrO8qM78ztSfW-LYvSt7W281AgzP8OsnX7jsyHryeyn_2vw4R4Kf1Kfd2_nOYacpf03JAr1ij8B5P-q23lmOFtAJOV0zyD4jTCUhPfrNCpy7NRJRkT33AfxuOX4ZgTtauJWoquXV69CZcTKQuVhwOxoJ_6cyMuJrrINFiXrgIRf-V44iYhURP9u9EIg5GUsQBYI3OW-vk4LwdTpNLUjE",
              title: "Plumbing and water systems",
            },
            {
              image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDT-fHUiV8K0057kUA8ZytXgUZIKDg-zNwN2mXd9Cf115I25_9_mZlYjkAfX1AhGZlSeFVrBUfeyYRYsu4hyTTcEzge7e6GL_9uOFWxHUeDDfxVIJMeM8rRoOgDPiNwZfKVU0K-IeGfUP0RKjxorZ1fJu31bcmj-I_qRh06M3W8H76jU5v9-Iqaa8hIr3-XVTiobtVvb3rMNEackZKd-y8BMvY2W5IRUGBsbeF5gHA",
              title: "Carpentry and joinery",
            },
          ].map((item) => (
            <div key={item.title} className="relative h-48 overflow-hidden rounded-xl sm:h-64">
              <img src={item.image} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-primary/80 to-transparent p-4">
                <span className="font-semibold text-on-primary">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-10 sm:py-16 md:px-8 lg:px-12">
        <h2 className="text-2xl font-semibold text-primary sm:text-3xl">How Hamrfix works</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: "search",
              title: "Search by trade and area",
              body: "Filter the directory by category and the sub-city where you need the work done.",
            },
            {
              icon: "badge",
              title: "Read the profile",
              body: "See the profession, every service listed under it, and the neighborhoods that person covers.",
            },
            {
              icon: "call",
              title: "Contact them yourself",
              body: "Create an account, then call or message on Telegram. Hamrfix does not take a cut or schedule the visit.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl bg-surface-lowest p-6 shadow-card">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-surface-high text-primary-container">
                <Icon name={item.icon} className="text-[26px]" />
              </div>
              <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
              <p className="mt-2 text-sm text-on-variant">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface-low py-10 sm:py-16">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-4 md:px-8 lg:grid-cols-2 lg:px-12">
          <div>
            <h2 className="text-2xl font-semibold text-primary">For households</h2>
            <ul className="mt-4 space-y-2 text-sm text-on-variant">
              <li>Browse categories such as plumbing, electrical, carpentry, appliances, painting, and cleaning.</li>
              <li>Filter by the sub-city you live in.</li>
              <li>One signup unlocks phone and Telegram details.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-primary">For professionals</h2>
            <ul className="mt-4 space-y-2 text-sm text-on-variant">
              <li>Use the same account you would use as a household.</li>
              <li>Name your profession and add every service you actually do.</li>
              <li>Mark the sub-cities you cover so nearby residents can find you.</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-[1280px] flex-wrap gap-3 px-4 md:px-8 lg:px-12">
          <Link to="/browse" className="inline-flex min-h-11 items-center rounded-lg bg-primary-container px-4 py-2 text-sm font-semibold text-on-primary">
            Browse services
          </Link>
          <Link to={session ? "/professional/edit" : "/login?next=/professional/edit"} className="inline-flex min-h-11 items-center rounded-lg bg-surface-lowest px-4 py-2 text-sm font-semibold text-primary">
            Create a Listing
          </Link>
        </div>
      </section>
    </div>
  )
}
