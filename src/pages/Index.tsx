import Header from '@/components/portfolio/Header';
import Hero from '@/components/portfolio/Hero';
import About from '@/components/portfolio/About';
import Projects from '@/components/portfolio/Projects';
import Skills from '@/components/portfolio/Skills';
import Articles from '@/components/portfolio/Articles';
import Contact from '@/components/portfolio/Contact';
import Footer from '@/components/portfolio/Footer';


const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Fixed Header */}
      <Header />
      
      {/* Main Content */}
      <main className="relative">
        {/* Hero Section with Particles */}
        <section id="home">
          <Hero />
        </section>
        
        {/* About Section with 3D Avatar */}
        <section id="about" className="py-20">
          <About />
        </section>
        
        {/* Projects Section */}
        <section id="projects" className="py-20 bg-muted/30">
          <Projects />
        </section>
        
        {/* Skills Section */}
        <section id="skills" className="py-20">
          <Skills />
        </section>
        
        {/* Articles Section */}
        <section id="articles" className="py-20 bg-muted/30">
          <Articles />
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="py-20 bg-muted/30">
          <Contact />
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
