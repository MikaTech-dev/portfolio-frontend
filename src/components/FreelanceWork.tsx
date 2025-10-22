import { ExternalLink, Palette, ShoppingCart, Briefcase, Heart, Globe } from 'lucide-react';

const websites = [
  {
    title: 'Luxury Fashion Boutique',
    description: 'High-end e-commerce platform with immersive product galleries, virtual try-on, and seamless checkout experience.',
    icon: ShoppingCart,
    image: 'https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=800',
    tech: ['React', 'Node.js', 'Stripe', 'MongoDB'],
    category: 'E-Commerce',
  },
  {
    title: 'Creative Agency Portfolio',
    description: 'Award-winning agency website with interactive case studies, motion graphics, and client testimonial showcase.',
    icon: Palette,
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    tech: ['Next.js', 'Framer Motion', 'Sanity CMS'],
    category: 'Portfolio',
  },
  {
    title: 'FinTech SaaS Dashboard',
    description: 'Enterprise financial platform with real-time analytics, data visualization, and compliance reporting tools.',
    icon: Briefcase,
    image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
    tech: ['Vue.js', 'D3.js', 'PostgreSQL', 'AWS'],
    category: 'SaaS',
  },
  {
    title: 'Wellness & Fitness Hub',
    description: 'Comprehensive health platform with workout tracking, meal planning, progress analytics, and community features.',
    icon: Heart,
    image: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=800',
    tech: ['React Native', 'Firebase', 'Stripe', 'REST API'],
    category: 'Lifestyle',
  },
  {
    title: 'Real Estate Marketplace',
    description: 'Property listing platform with advanced search, virtual tours, mortgage calculator, and CRM integration.',
    icon: Globe,
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    tech: ['Angular', 'Django', 'PostgreSQL', 'Google Maps'],
    category: 'Marketplace',
  },
  {
    title: 'Restaurant Chain Website',
    description: 'Multi-location restaurant site with online ordering, reservation system, and loyalty rewards program.',
    icon: ShoppingCart,
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
    tech: ['React', 'Express', 'MySQL', 'Twilio'],
    category: 'Food & Beverage',
  },
];

export default function FreelanceWork() {
  return (
    <section className="relative min-h-screen px-6 py-32">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            Freelance <span className="text-gradient">Work</span>
          </h2>
          <p className="text-xl text-frosted-silver max-w-2xl mx-auto">
            Delivering stunning websites that drive results for clients worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {websites.map((site, index) => {
            const Icon = site.icon;
            return (
              <div
                key={index}
                className="glass-card-hover rounded-3xl overflow-hidden group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={site.image}
                    alt={site.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(28,16,46,1), rgba(28,16,46,0.5), rgba(28,16,46,0))' }} />

                  <div className="absolute top-4 right-4 glass-card px-4 py-2 rounded-full flex items-center gap-2">
                    <Icon size={16} className="text-royal-purple" />
                    <span className="text-sm text-frosted-silver font-medium">{site.category}</span>
                  </div>

                  <div className="absolute top-4 left-4 glass-card w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ExternalLink size={20} className="text-royal-purple" />
                  </div>
                </div>

                <div className="p-8 space-y-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-royal-purple transition-colors">
                    {site.title}
                  </h3>

                  <p className="text-slate-300 leading-relaxed">
                    {site.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {site.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-royal-purple border"
                        style={{ borderColor: 'rgba(94,58,255,0.12)' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Want to contact me directly?
            </h3>
            <p className="text-slate-300 mb-6">
              Click the button below, fill and submit the form and I'll get back to you within 12 Hours :3
            </p>
            <a
              href="mailto:your.email@example.com"
              className="inline-block glass-card-hover px-8 py-4 rounded-full text-lg font-medium text-purple-400 border-2 border-cyan-400/30"
            >
              Start a Conversation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
