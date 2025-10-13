import { Shield, Award, Lock, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Lock,
    title: "Immutable Records",
    description: "Academic credentials stored on blockchain cannot be altered, ensuring permanent verification and trust.",
  },
  {
    icon: CheckCircle,
    title: "Instant Verification",
    description: "Employers and institutions can verify credentials instantly without lengthy background checks.",
  },
  {
    icon: Award,
    title: "Student Ownership",
    description: "Students own and control their academic data, sharing credentials on their terms.",
  },
  {
    icon: Shield,
    title: "Fraud Prevention",
    description: "Eliminate credential fraud with cryptographically secured, tamper-proof academic records.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
            Why Blockchain for Education?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform academic credential management with decentralized, secure, and verifiable records.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="pt-6">
                <div className="mb-4 p-3 w-fit rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
