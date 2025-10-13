import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const CTASection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6 animate-fade-in">
            Ready to Secure Academic Credentials?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
            Join hundreds of institutions and millions of students leveraging blockchain for tamper-proof academic records.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Button variant="hero" size="lg" className="group">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="group">
              Request Institution Demo
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Free for students • Flexible plans for institutions • Enterprise support available
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;