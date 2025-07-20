import boschLogo from "@assets/Bosch_1752968584869.jpg";
import publicisLogo from "@assets/PublicisSapient_1752968584870.jpg";
import dxcLogo from "@assets/DXCTechnology_1752968584870.jpg";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              The <span className="text-primary">Infrastructure</span> Whisperer
            </h2>
            <div className="space-y-4 text-slate-300 text-lg leading-relaxed">
              <p>
                Started my journey in <strong className="text-secondary">Electronics & Communication Engineering</strong>, but fate had different plans. Like many tech enthusiasts, I discovered my true calling in the world of automation and infrastructure.
              </p>
              <p>
                From writing my first <strong className="text-accent">Selenium test scripts</strong> to orchestrating complex <strong className="text-primary">CI/CD pipelines</strong> across global enterprises, I've evolved into what I like to call an "Infrastructure Whisperer" - someone who speaks fluent DevOps and makes servers purr.
              </p>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center p-1 mt-1 flex-shrink-0">
                  <img 
                    src={boschLogo} 
                    alt="Bosch logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p>
                  Currently crafting digital experiences at <strong className="text-violet">Bosch Digital</strong>, where I blend cutting-edge DevOps practices with real-world business impact. My mission? Making deployments so smooth, they're practically invisible.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 bg-slate-900 rounded-lg">
                <div className="text-2xl font-bold text-primary">5+</div>
                <div className="text-sm text-slate-400">Years</div>
              </div>
              <div className="text-center p-4 bg-slate-900 rounded-lg">
                <div className="text-2xl font-bold text-secondary">100+</div>
                <div className="text-sm text-slate-400">Pipelines</div>
              </div>
              <div className="text-center p-4 bg-slate-900 rounded-lg">
                <div className="text-2xl font-bold text-accent">4</div>
                <div className="text-sm text-slate-400">Companies</div>
              </div>
            </div>

            {/* Company Logos */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4 text-slate-400">Trusted by leading organizations</h4>
              <div className="flex flex-wrap items-center gap-4">
                <div className="bg-white rounded-lg p-3 w-20 h-16 flex items-center justify-center">
                  <img 
                    src={boschLogo} 
                    alt="Bosch logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="bg-white rounded-lg p-3 w-20 h-16 flex items-center justify-center">
                  <img 
                    src={publicisLogo} 
                    alt="Publicis Sapient logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="bg-white rounded-lg p-3 w-20 h-16 flex items-center justify-center">
                  <img 
                    src={dxcLogo} 
                    alt="DXC Technology logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600" 
                alt="Modern DevOps workspace" 
                className="w-full h-auto rounded-2xl" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
              
              {/* Floating tech icons */}
              <div className="absolute top-4 right-4 bg-primary/20 backdrop-blur-sm px-3 py-2 rounded-full">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.75 8.25L12 2.25l-6.75 6H9v9h6v-9h3.75z"/>
                </svg>
              </div>
              <div className="absolute bottom-4 left-4 bg-secondary/20 backdrop-blur-sm px-3 py-2 rounded-full">
                <svg className="w-6 h-6 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="absolute top-1/2 left-4 bg-accent/20 backdrop-blur-sm px-3 py-2 rounded-full">
                <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
