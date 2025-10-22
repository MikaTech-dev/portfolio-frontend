import { Server, Database, Lock, Zap, Cloud, Code } from 'lucide-react';

const projects = [
  {
    title: 'Distributed Microservices Platform',
    description: 'Built a scalable microservices architecture handling 10M+ daily requests with service mesh, event-driven communication, and automated failover.',
    icon: Server,
    tech: ['Node.js', 'Kubernetes', 'RabbitMQ', 'Redis', 'PostgreSQL'],
    metrics: '10M+ requests/day, 99.99% uptime',
  },
  {
    title: 'Real-time Analytics Pipeline',
    description: 'Engineered high-throughput data processing system with real-time streaming, ETL pipelines, and custom aggregation engine.',
    icon: Database,
    tech: ['Python', 'Apache Kafka', 'ClickHouse', 'Airflow'],
    metrics: '500K events/sec, sub-second latency',
  },
  {
    title: 'Authentication & Authorization Service',
    description: 'Developed enterprise-grade identity management system with OAuth2, SAML, MFA, and fine-grained RBAC.',
    icon: Lock,
    tech: ['Go', 'Redis', 'PostgreSQL', 'JWT'],
    metrics: '1M+ active users, SOC 2 compliant',
  },
  {
    title: 'GraphQL API Gateway',
    description: 'Created unified API gateway with schema stitching, query optimization, and intelligent caching layer.',
    icon: Zap,
    tech: ['TypeScript', 'Apollo', 'DataLoader', 'Redis'],
    metrics: '200ms avg response, 5K+ queries/sec',
  },
  {
    title: 'Cloud Infrastructure Automation',
    description: 'Designed IaC framework for multi-cloud deployment with auto-scaling, monitoring, and disaster recovery.',
    icon: Cloud,
    tech: ['Terraform', 'AWS', 'Docker', 'Prometheus'],
    metrics: '40+ services, zero-downtime deploys',
  },
  {
    title: 'Payment Processing Engine',
    description: 'Built PCI-compliant payment system with multiple gateway integrations, fraud detection, and transaction reconciliation.',
    icon: Code,
    tech: ['Java', 'Spring Boot', 'MySQL', 'Stripe API'],
    metrics: '$10M+ processed, 99.9% success rate',
  },
];

export default function BackendProjects() {
  return (
    <section className="relative min-h-screen px-6 py-32">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            Backend <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-frosted-silver max-w-2xl mx-auto">
            Building robust, scalable systems that power modern applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <div
                key={index}
                className="glass-card-hover rounded-2xl p-8 group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-6 relative">
                  <div className="glass-card w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon size={32} className="text-royal-purple" />
                  </div>
                  <div className="absolute top-0 left-0 w-16 h-16 rounded-2xl blur-xl group-hover:blur-2xl transition-all" style={{ backgroundColor: 'rgba(94,58,255,0.14)' }} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-royal-purple transition-colors">
                  {project.title}
                </h3>

                <p className="text-frosted-silver mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-royal-purple border"
                        style={{ borderColor: 'rgba(94,58,255,0.12)' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-slate-400 font-medium">
                      {project.metrics}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
