import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-primary/5">

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
              Secure Academic
              <span className="block text-primary">
                Credentials on Blockchain
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              Revolutionize education with blockchain-powered credential verification. 
              Immutable records, instant verification, and complete ownership of academic achievements.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="lg" className="group">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="group">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              <div>
                <div className="text-3xl font-semibold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Universities</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-primary">1M+</div>
                <div className="text-sm text-muted-foreground">Credentials</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Immutable</div>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative animate-slide-up">
            {/* <img
              src={heroVisual}
              alt="Blockchain academic credentials visualization"
              className="relative rounded-2xl shadow-lg"
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
