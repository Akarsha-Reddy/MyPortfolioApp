import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "Ocean Transport & We Trade",
    company: "Publicis Sapient • Cargill",
    description: "Built automated CI/CD pipelines for global trading platforms. Implemented Docker containerization, Kubernetes orchestration, and AWS infrastructure automation using Terraform.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400",
    tags: ["Jenkins", "Docker", "AWS", "Terraform"],
    achievements: ["Reduced deployment time by 70%", "Zero-downtime deployments achieved"],
    color: "primary"
  },
  {
    title: "London Markets Platform",
    company: "DXC Technology • Lloyd's of London",
    description: "Designed and implemented comprehensive monitoring and CI/CD solutions for London's insurance market platform. Integrated SonarQube for code quality and Grafana for performance monitoring.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400",
    tags: ["Jenkins", "Maven", "SonarQube", "Grafana"],
    achievements: ["99.9% uptime achieved", "Code quality score improved 40%"],
    color: "accent"
  },
  {
    title: "Student Management Service",
    company: "DXC Technology • TAFE Australia",
    description: "Developed comprehensive automation testing framework using Selenium WebDriver. Created regression test suites and integrated with Jenkins for continuous testing.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400",
    tags: ["Selenium", "Java", "TestNG", "Jenkins"],
    achievements: ["80% test automation coverage", "Testing time reduced by 60%"],
    color: "secondary"
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            DevOps <span className="text-primary">War Stories</span>
          </h2>
          <p className="text-slate-400 text-lg">Real projects, real impact, real solutions</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="bg-slate-800 border-slate-700 overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-48 object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-3 h-3 bg-${project.color} rounded-full mr-2`}></div>
                  <span className="text-sm text-slate-400">{project.company}</span>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge 
                      key={tagIndex} 
                      variant="secondary" 
                      className="text-xs bg-slate-700 text-slate-300 hover:bg-slate-600"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="space-y-1">
                  {project.achievements.map((achievement, achIndex) => (
                    <div key={achIndex} className="flex items-center text-sm">
                      <svg className="w-4 h-4 text-secondary mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-slate-300">{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary px-8 py-3 rounded-full transition-all duration-300 font-semibold hover:scale-105">
            View More Projects
          </button>
        </div>
      </div>
    </section>
  );
}
