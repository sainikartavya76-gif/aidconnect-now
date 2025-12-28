import { MobileLayout } from "@/components/layout/MobileLayout";
import { Shield, Users, Target, Phone, Mail, Heart, Rocket, Globe, Bell, MapPinned } from "lucide-react";

const teamMembers = [
  { name: "Kartavya", role: "Creator" },
  { name: "Abhishek", role: "Creator" },
  { name: "Ketan", role: "Creator" },
];

const futureFeatures = [
  { icon: MapPinned, text: "Real maps & GPS integration" },
  { icon: Bell, text: "Push notifications for volunteers" },
  { icon: Globe, text: "Multilingual support (more languages)" },
  { icon: Shield, text: "ID verification & background checks" },
];

const About = () => {
  return (
    <MobileLayout>
      <div className="animate-fade-in">
        {/* Hero */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            About AidLink
          </h1>
          <p className="text-primary font-medium">
            Right Skill. Right Place. Right Time.
          </p>
        </div>

        {/* Problem & Solution */}
        <section className="mb-8">
          <div className="card-elevated animate-slide-up" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-destructive" />
              </div>
              <h2 className="font-semibold text-foreground">The Problem</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              During emergencies and disasters, there's often a critical gap between available skilled volunteers and those who need help. Traditional coordination methods are slow, unorganized, and fail to match the right skills with specific needs.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <div className="card-elevated animate-slide-up" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-success" />
              </div>
              <h2 className="font-semibold text-foreground">Our Solution</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AidLink is a prototype platform that demonstrates how skilled citizens can be efficiently connected to emergency and civic needs. Our rule-based matching system considers skills, location, and availability to ensure the right help reaches the right place at the right time.
            </p>
          </div>
        </section>

        {/* Real-World Deployment */}
        <section className="mb-8">
          <div className="card-elevated animate-slide-up" style={{ animationDelay: "250ms" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-semibold text-foreground">Real-World Deployment</h2>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="leading-relaxed">
                AidLink can integrate with NGOs and local authorities to provide a scalable emergency response coordination system.
              </p>
              <div className="pl-4 border-l-2 border-primary/30">
                <p className="font-medium text-foreground mb-1">Scalability Path:</p>
                <p>City → State → National deployment</p>
              </div>
              <p className="font-medium text-foreground mt-3 mb-2">Future Upgrades:</p>
              <div className="grid grid-cols-1 gap-2">
                {futureFeatures.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-8">
          <h2 className="section-title flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-primary" />
            Team: 404: Competition Not Found
          </h2>
          
          <div className="grid grid-cols-3 gap-3">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className="card-elevated text-center animate-slide-up"
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-primary">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground text-sm">{member.name}</h3>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="mb-8">
          <h2 className="section-title">Contact Us</h2>
          
          <div className="space-y-3">
            <a
              href="tel:+919982221026"
              className="card-elevated flex items-center gap-4 animate-slide-up hover:bg-muted/50 transition-colors"
              style={{ animationDelay: "600ms" }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium text-foreground">+91 9982221026</p>
              </div>
            </a>

            <a
              href="mailto:sainikartavya40@gmail.com"
              className="card-elevated flex items-center gap-4 animate-slide-up hover:bg-muted/50 transition-colors"
              style={{ animationDelay: "700ms" }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-foreground break-all">sainikartavya40@gmail.com</p>
              </div>
            </a>
          </div>
        </section>

        {/* Hackathon Notice */}
        <div className="card-elevated bg-primary/5 border-primary/20 text-center animate-slide-up" style={{ animationDelay: "800ms" }}>
          <p className="text-sm text-foreground font-medium mb-1">
            Confluence 1.0 – Fight For The Top 10
          </p>
          <p className="text-xs text-muted-foreground mb-2">
            AidLink is a hackathon prototype focused on emergency coordination and skill-based response. This is a demonstration of feasibility, not a production application.
          </p>
          <p className="text-xs text-muted-foreground font-medium">
            All data and workflows shown are simulated for hackathon demonstration.
          </p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default About;
