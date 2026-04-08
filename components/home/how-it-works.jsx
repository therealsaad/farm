import { Search, CalendarCheck, PartyPopper, Bot } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "AI-Powered Search",
    description:
      "Tell our AI what you are looking for - location, budget, amenities, or even a vibe. It finds the perfect match instantly.",
    step: "01",
  },
  {
    icon: Bot,
    title: "Smart Recommendations",
    description:
      "Our AI analyzes 50+ factors including reviews, location proximity, and your preferences to suggest the best options.",
    step: "02",
  },
  {
    icon: CalendarCheck,
    title: "Instant Booking",
    description:
      "Pick your date, select add-ons like catering & decorations, and book instantly. Get confirmation in seconds.",
    step: "03",
  },
  {
    icon: PartyPopper,
    title: "Enjoy Your Stay",
    description:
      "Arrive and enjoy! Get AI-powered tips, directions, and local recommendations. Rate and share your experience.",
    step: "04",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            How FunFarm Works
          </h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            From discovery to doorstep in 4 simple steps, powered by AI.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="relative group">
                {i < steps.length - 1 && (
                  <div className="absolute top-10 left-[calc(50%+2rem)] right-0 hidden h-px bg-border lg:block" />
                )}
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-5">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-8 w-8" />
                    </div>
                    <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground max-w-[250px]">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
