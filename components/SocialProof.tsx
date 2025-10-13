import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Registrar, Stanford University",
    content: "EduChain has revolutionized how we issue and verify credentials. The blockchain technology ensures our degrees are tamper-proof and globally verifiable.",
    rating: 5,
  },
  {
    name: "James Anderson",
    role: "HR Director, Microsoft",
    content: "Instant credential verification has cut our hiring process time by 60%. No more waiting weeks for background checks on academic credentials.",
    rating: 5,
  },
  {
    name: "Maria Garcia",
    role: "Graduate Student",
    content: "Having complete ownership of my academic records is empowering. I can share my credentials with employers instantly and securely.",
    rating: 5,
  },
];

const SocialProof = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
            Trusted by Leading Institutions
          </h2>
          <p className="text-lg text-muted-foreground">
            Join 500+ universities and millions of students securing their academic future
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  &quot;{testimonial.content}&quot;
                </p>
                <div>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Client Logos */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-8">TRUSTED BY LEADING UNIVERSITIES</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            {["MIT", "Stanford", "Harvard", "Oxford", "Cambridge"].map((university) => (
              <div key={university} className="text-xl font-medium text-muted-foreground">
                {university}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
