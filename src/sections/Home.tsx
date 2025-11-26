"use client";

import React, { useState, useEffect } from "react";
import {
  Heart,
  Phone,
  Mail,
  Menu,
  X,
  ArrowRight,
  Shield,
  Activity,
  Users,
  Star,
  ChevronRight,
  Gift,
  Sun,
  Leaf,
  Clock,
  CheckCircle,
  HelpCircle,
  Camera,
} from "lucide-react";

// --- Design System Components ---

const Button = ({
  children,
  variant = "primary" as const,
  className = "",
  onClick = () => {},
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "white" | "green";
  className?: string;
  onClick?: () => void;
}) => {
  // Styles for a more modern, bold button feel
  const baseStyle =
    "inline-flex items-center justify-center px-8 py-3 rounded-lg font-bold tracking-wide transition-all duration-300 transform hover:-translate-y-1 shadow-md cursor-pointer";

  const variants = {
    primary:
      "bg-orange-600 text-white hover:bg-orange-700 hover:shadow-orange-600/40 shadow-orange-500/20",
    secondary:
      "bg-blue-900 text-white hover:bg-blue-950 hover:shadow-blue-900/40",
    outline:
      "bg-transparent border-2 border-orange-600 text-orange-600 hover:bg-orange-50",
    white: "bg-white text-orange-700 hover:bg-orange-50 hover:shadow-lg",
    green:
      "bg-green-600 text-white hover:bg-green-700 hover:shadow-green-600/30",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const SectionHeading = ({
  title,
  subtitle,
  light = false,
  align = "center",
}: {
  title: string;
  subtitle?: string;
  light?: boolean;
  align?: "center" | "left";
}) => (
  <div
    className={`mb-16 ${
      align === "center" ? "text-center mx-auto" : "text-left"
    } max-w-3xl`}
  >
    <h2
      className={`text-3xl md:text-5xl font-bold mb-6 ${
        light ? "text-white" : "text-slate-900"
      }`}
    >
      {title}
    </h2>
    <div
      className={`h-1 w-24 ${light ? "bg-orange-400" : "bg-orange-600"} mb-6 ${
        align === "center" ? "mx-auto" : ""
      }`}
    ></div>
    {subtitle && (
      <p
        className={`text-lg md:text-xl leading-relaxed ${
          light ? "text-slate-200" : "text-slate-600"
        }`}
      >
        {subtitle}
      </p>
    )}
  </div>
);

interface StoryCardProps {
  category: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  progress: number;
  imageUrl?: string;
}

const StoryCard: React.FC<StoryCardProps> = ({
  category,
  title,
  description,
  icon: Icon,
  progress,
  imageUrl,
}) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col h-full relative border border-slate-100">
    <div className="h-48 bg-slate-200 relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
      {/* Image Handling */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-slate-300"></div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
      <div className="absolute bottom-4 left-4 text-white flex items-center gap-2 font-bold z-10">
        <Icon size={20} className="text-orange-400" />
        <span>{category}</span>
      </div>
    </div>

    <div className="p-6 flex flex-col flex-1 bg-white relative">
      <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-orange-600 transition-colors">
        {title}
      </h3>

      <p className="text-slate-600 mb-6 leading-relaxed flex-1">
        {description}
      </p>

      {/* Progress Section */}
      <div className="mt-auto pt-6 border-t border-slate-100">
        <div className="flex justify-between text-sm font-bold text-slate-500 mb-2">
          <span>Raised</span>
          <span className="text-orange-600">{progress}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2 mb-6 overflow-hidden">
          <div
            className="bg-orange-500 h-full rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <Button variant="secondary" className="w-full text-sm py-3 rounded-lg">
          Donate Now
        </Button>
      </div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="font-sans text-slate-900 bg-slate-50 min-h-screen flex flex-col selection:bg-orange-200 selection:text-orange-900">
      {/* Navigation - Fixed Style */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-md py-3"
            : "bg-white/90 backdrop-blur-md py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Brand */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            <img
              src="/logo.jpg"
              alt="Navdeep Seva Logo"
              className="w-12 h-12 rounded-lg object-contain bg-white/50"
            />
            <div>
              <h1 className="font-bold text-xl leading-none text-slate-900">
                Navdeep Seva
              </h1>
              <p className="text-xs font-bold tracking-[0.2em] text-orange-600 uppercase">
                Foundation
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            {["Mission", "How It Works", "Rescues", "Elderly Care"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() =>
                    scrollToSection(item.toLowerCase().replace(/\s+/g, "-"))
                  }
                  className="px-4 py-2 font-bold text-slate-600 hover:text-orange-600 rounded-lg transition-all"
                >
                  {item}
                </button>
              )
            )}
            <div className="ml-4 pl-4 border-l border-slate-300 flex items-center gap-4">
              <span className="flex items-center gap-2 text-slate-600 text-sm font-bold">
                <Phone size={14} className="text-orange-600" /> 6269234450
              </span>
              <Button
                onClick={() => scrollToSection("donate")}
                variant="primary"
                className="py-2 px-6"
              >
                Donate
              </Button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-slate-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl p-4 flex flex-col gap-2 animate-in slide-in-from-top-5">
            {["Mission", "How It Works", "Rescues", "Elderly Care"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() =>
                    scrollToSection(item.toLowerCase().replace(/\s+/g, "-"))
                  }
                  className="p-4 text-left font-bold text-slate-900 hover:bg-orange-50 rounded-lg"
                >
                  {item}
                </button>
              )
            )}
            <Button
              className="w-full mt-2"
              onClick={() => scrollToSection("donate")}
            >
              Donate Now
            </Button>
          </div>
        )}
      </nav>

      {/* HERO SECTION: Warm, Trust-Based Split Layout */}
      <header
        id="home"
        className="relative min-h-screen flex items-center pt-24 pb-12 bg-gradient-to-br from-amber-50 via-white to-orange-50 overflow-hidden"
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-100/30 rounded-bl-[10rem] -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-100/50 rounded-tr-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left Content */}
          <div className="space-y-8 relative z-10 animate-in slide-in-from-left-5 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white text-orange-700 rounded-full text-sm font-bold shadow-sm border border-orange-100">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              Emergency Rescue Team Active
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1]">
              Heal a Heart, <br />
              <span className="text-orange-600 relative inline-block">
                Save a Soul.
                <svg
                  className="absolute w-full h-3 -bottom-1 left-0 text-yellow-300 -z-10"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 50 10 100 5"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
              When an animal is left to die on the road, our team is their only
              family. Your support turns their pain into peace.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                onClick={() => scrollToSection("donate")}
                variant="primary"
                className="text-lg px-8 py-4 shadow-orange-500/30 shadow-xl"
              >
                Donate for Surgery
              </Button>
              <div className="flex items-center gap-4 px-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden"
                    >
                      <Users size={20} className="text-slate-400" />
                    </div>
                  ))}
                </div>
                <div className="text-sm font-bold text-slate-600">
                  <span className="text-orange-600">12k+</span> Supporters
                </div>
              </div>
            </div>
          </div>

          {/* Right Content: Image + Donation Card */}
          <div className="relative lg:h-[600px] flex items-center justify-center animate-in zoom-in-95 duration-1000 delay-200">
            {/* Main Image Mask */}
            <div className="relative w-full h-[500px] bg-slate-200 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://res.cloudinary.com/doy1iucnw/image/upload/v1764159469/pexels-pixabay-36347_zuetkl.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Veterinarian helping a cow"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <p className="font-bold text-lg">Live Rescue: Nandi</p>
                <p className="text-sm opacity-90">
                  Recovering from leg fracture
                </p>
              </div>
            </div>

            {/* Floating Quick Donate Card */}
            <div className="absolute -bottom-6 -left-6 md:bottom-12 md:-left-12 bg-white p-6 rounded-2xl shadow-xl border border-orange-100 max-w-xs w-full">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-slate-800">Quick Donate</span>
                <Heart size={20} className="text-red-500 fill-red-500" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between gap-2">
                  {[500, 1000, 2000].map((amt) => (
                    <button
                      key={amt}
                      className="flex-1 py-2 text-sm font-bold text-orange-700 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
                <Button
                  variant="primary"
                  className="w-full py-2 text-sm"
                  onClick={() => scrollToSection("donate")}
                >
                  Help Now
                </Button>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 text-yellow-400 animate-spin-slow">
              <Sun size={80} strokeWidth={1} />
            </div>
          </div>
        </div>
      </header>

      {/* Mission Section */}
      <section id="mission" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="Our Sacred Duty"
            subtitle="Protecting Gau Mata and her calf brings immeasurable blessings. We are dedicated to providing emergency medical evaluation, rapid pain management, and life-saving surgeries."
          />

          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                title: "Emergency Rescue",
                desc: "Rapid response medical team for road accidents.",
                icon: Activity,
              },
              {
                title: "Life-Saving Surgery",
                desc: "Amputations and critical care for survival.",
                icon: Heart,
              },
              {
                title: "Holistic Recovery",
                desc: "Nutritious food, safe shelter, and emotional care.",
                icon: Shield,
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-orange-600 shadow-sm border border-slate-100 mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon size={32} />
                </div>
                <h3 className="font-bold text-slate-900 text-xl mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION: How It Works / Process */}
      <section
        id="how-it-works"
        className="py-24 bg-orange-50 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200 rounded-full blur-3xl opacity-30 -mr-32 -mt-32"></div>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="The Journey of Rescue"
            subtitle="From the roadside to recovery, see how your support transforms a life in pain into a life of peace."
          />

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-orange-200 -translate-y-1/2 z-0"></div>

            <div className="grid md:grid-cols-4 gap-8 relative z-10">
              {[
                {
                  step: "01",
                  title: "Rescue Call",
                  desc: "We receive a call about an injured animal.",
                  icon: Phone,
                },
                {
                  step: "02",
                  title: "Treatment",
                  desc: "On-spot first aid or transport to hospital.",
                  icon: Activity,
                },
                {
                  step: "03",
                  title: "Recovery",
                  desc: "Surgery, daily dressing, and nutritious food.",
                  icon: Heart,
                },
                {
                  step: "04",
                  title: "Sanctuary",
                  desc: "Released to safety or kept in our shelter.",
                  icon: Sun,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg border border-orange-100 relative group hover:-translate-y-2 transition-transform"
                >
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-orange-50">
                    {item.step}
                  </div>
                  <div className="mt-6 text-center">
                    <div className="text-orange-600 mb-3 flex justify-center">
                      <item.icon size={32} />
                    </div>
                    <h4 className="font-bold text-xl mb-2">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section id="rescues" className="py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="Urgent Appeals"
            subtitle="These innocent souls are fighting for their lives. Your contribution is their only hope."
            align="left"
          />

          <div className="grid md:grid-cols-3 gap-8">
            <StoryCard
              category="Critical Case"
              title="A Loving Gau Mata"
              progress={75}
              description="Struck by a vehicle, her leg was shattered. She cried in agony—alone. Our team rushed to perform a life-saving amputation. She needs daily dressing and nutritious food to recover."
              icon={Activity}
              imageUrl="https://res.cloudinary.com/doy1iucnw/image/upload/v1764159656/pexels-dropshado-32842189_xm21n7.jpg?w=800&q=80"
            />
            <StoryCard
              category="Neonatal Care"
              title="Baby Calf at Night"
              progress={30}
              description="A newborn calf, hit by a vehicle and left bleeding in the silence of the night. We provided immediate surgery and mother-like protection. He needs ongoing care."
              icon={Heart}
              imageUrl="https://res.cloudinary.com/doy1iucnw/image/upload/v1764159656/pexels-julia-volk-5205221_b5nwz8.jpg?w=800&q=80"
            />
            <StoryCard
              category="Medical Support"
              title="Injured Cow Treatment"
              progress={55}
              description="An innocent cow battling for her life after a road accident. She is unable to move and needs urgent medicines and safe shelter. Even ₹500 can help begin her treatment."
              icon={Shield}
              imageUrl="https://res.cloudinary.com/doy1iucnw/image/upload/v1764159654/pexels-gaurav-rajit-maurya-1656617-15814267_cr0lr1.jpg?w=800&q=80"
            />
          </div>
        </div>
      </section>

      {/* Elderly Care Section */}
      <section id="elderly-care" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* Added bg-slate-100 to container and changed object-cover to object-contain on image */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl group bg-slate-100">
            <img
              src="https://res.cloudinary.com/doy1iucnw/image/upload/v1764158834/ryalskw3tn7qo5_gfmwhx.jpg"
              alt="Ram Bahadur and Shanti Devi"
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-900/90 to-transparent text-white">
              <h3 className="text-2xl font-bold mb-2">
                Ram Bahadur (85) & Shanti Devi (82)
              </h3>
              <p className="text-slate-200">Living their last years alone</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 text-orange-600 font-bold uppercase tracking-widest text-sm mb-6">
              <Users size={16} /> Human Welfare Mission
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Support the Elderly in Their Final Years
            </h2>
            <p className="text-lg leading-relaxed mb-8 text-slate-600">
              Ram Bahadur and Shanti Devi have no children, no family support,
              and no money left. Age has brought weakness, illness, and complete
              dependency.
            </p>
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 mb-8">
              <p className="font-bold text-orange-800 text-lg">
                &quot;Your support can help them live their remaining life with
                dignity, comfort, and love — not suffering or hunger.&quot;
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                variant="primary"
                onClick={() => scrollToSection("donate")}
              >
                Donate for Elderly Care
              </Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Join the Movement / Volunteer */}
      <section
        id="volunteer"
        className="py-20 bg-slate-900 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Heart
            size={48}
            className="mx-auto text-orange-500 mb-6 animate-pulse"
          />
          <h2 className="text-4xl font-bold mb-6">
            Join Our Family of Volunteers
          </h2>
          <p className="text-xl text-slate-300 mb-10">
            Not everyone can donate money, but everyone can donate love. Join us
            on the ground to help feed, clean, and care for the animals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              className="bg-orange-600 hover:bg-orange-500 border-none"
            >
              Become a Volunteer
            </Button>
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-slate-900"
            >
              Spread the Word
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-24 bg-blue-900 text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <SectionHeading
            title="Your Donation Impact"
            subtitle="Every rupee becomes Seva. Every Seva becomes Punya. Here is how your contribution saves lives."
            light={true}
          />

          <div className="grid md:grid-cols-2 gap-6 text-left">
            {[
              {
                amt: "200",
                txt: "Pain relief & medicines for an injured animal",
                icon: Activity,
              },
              { amt: "500", txt: "Wound dressing & antibiotics", icon: Shield },
              {
                amt: "1,000",
                txt: "Surgery follow-up & daily care",
                icon: Heart,
              },
              {
                amt: "5,000",
                txt: "Complete month of food + medical support",
                icon: Star,
              },
              {
                amt: "10,000",
                txt: "Life-saving surgeries like amputations",
                icon: Gift,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-6 bg-blue-800 p-6 rounded-xl border border-blue-700 hover:bg-blue-700 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-blue-900 flex items-center justify-center text-orange-400 shrink-0 shadow-sm border border-blue-800">
                  <item.icon size={24} />
                </div>
                <div>
                  <div className="font-bold text-2xl mb-1">₹{item.amt}</div>
                  <div className="text-blue-200 font-medium">{item.txt}</div>
                </div>
              </div>
            ))}

            {/* Final CTA */}
            <div
              className="bg-orange-600 p-6 rounded-xl flex flex-col justify-center items-center text-center shadow-lg hover:bg-orange-700 transition-colors cursor-pointer"
              onClick={() => scrollToSection("donate")}
            >
              <h4 className="font-bold text-2xl mb-2">
                Become a Guardian Today
              </h4>
              <p className="text-orange-100 mb-6">
                Be the divine reason another life survives and heals.
              </p>
              <Button
                variant="secondary"
                className="w-full bg-white text-orange-600 hover:bg-orange-50 hover:text-orange-700 hover:shadow-none"
              >
                Donate Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: FAQ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Common questions about your donation and our work."
          />

          <div className="space-y-4">
            {[
              {
                q: "Is my donation tax-exempt?",
                a: "Yes, all donations to Navdeep Seva Foundation are eligible for tax exemption under section 80G of the Income Tax Act.",
              },
              {
                q: "Can I visit the shelter?",
                a: "Absolutely! We encourage donors and supporters to visit our shelter and meet the animals you are helping. Please contact us to schedule a visit.",
              },
              {
                q: "How is my money used?",
                a: "100% of your donation goes directly towards the medical treatment, food, and shelter of the animals. We maintain complete transparency.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg shadow-sm border border-slate-200"
              >
                <h4 className="font-bold text-lg text-slate-900 mb-2 flex items-center gap-2">
                  <HelpCircle size={18} className="text-orange-500" /> {faq.q}
                </h4>
                <p className="text-slate-600 pl-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Simple & Clean */}
      <footer className="bg-slate-950 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/logo.jpg"
                alt="Navdeep Seva Logo"
                className="w-10 h-10 rounded-lg object-contain bg-slate-800"
              />
              <h4 className="text-white text-lg font-bold">
                Navdeep Seva Foundation
              </h4>
            </div>
            <p className="leading-relaxed mb-6">
              Where others see a hopeless case, our veterinary heroes see a life
              worth saving. Every rupee becomes Seva. Every Seva becomes Punya.
            </p>
          </div>

          <div>
            <h5 className="text-white font-bold uppercase tracking-widest text-sm mb-6">
              Quick Links
            </h5>
            <ul className="space-y-3 font-medium">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className="hover:text-orange-500 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("mission")}
                  className="hover:text-orange-500 transition-colors"
                >
                  Our Mission
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("rescues")}
                  className="hover:text-orange-500 transition-colors"
                >
                  Rescue Stories
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("elderly-care")}
                  className="hover:text-orange-500 transition-colors"
                >
                  Elderly Care
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold uppercase tracking-widest text-sm mb-6">
              Contact Us
            </h5>
            <div className="space-y-3 font-medium">
              <p className="flex items-center gap-3 hover:text-orange-500 transition-colors group">
                <Mail
                  size={18}
                  className="text-orange-600 group-hover:text-orange-500"
                />{" "}
                navdeepsevafoundation@gmail.com
              </p>
              <p className="flex items-center gap-3 hover:text-orange-500 transition-colors group">
                <Phone
                  size={18}
                  className="text-orange-600 group-hover:text-orange-500"
                />{" "}
                6269234450
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-900 text-center text-sm font-medium">
          <p>
            © {new Date().getFullYear()} Navdeep Seva Foundation. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
