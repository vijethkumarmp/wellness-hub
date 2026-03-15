// HPI 1.7-V
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Brain, Heart, Activity, TrendingUp, Shield, Users, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

// --- Canonical Data Sources ---
const features = [
  {
    icon: Brain,
    title: 'PREDICTIVE INTELLIGENCE',
    description: 'Advanced AI analyzes patterns to detect health risks before symptoms appear'
  },
  {
    icon: Heart,
    title: 'MIND-BODY UNITY',
    description: 'Holistic approach connecting mental and physical wellbeing as one system'
  },
  {
    icon: Activity,
    title: 'VITALITY TRACKING',
    description: 'Real-time health scoring based on lifestyle, emotions, and biometric data'
  },
  {
    icon: TrendingUp,
    title: 'PROACTIVE GUIDANCE',
    description: 'Context-aware recommendations that prevent issues before they escalate'
  },
  {
    icon: Shield,
    title: 'PRIVACY FIRST',
    description: 'On-device processing ensures your health data never leaves your control'
  },
  {
    icon: Users,
    title: 'COMMUNITY INSIGHTS',
    description: 'Anonymous health trends help you understand broader wellness patterns'
  }
];

const PLACEHOLDER_IMG = "https://static.wixstatic.com/media/ba2849_ef64585e43574493bfede4a99a854c03~mv2.png?originWidth=1280&originHeight=704";

// --- Reusable Animation Variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// --- Custom SVG Grid Motif ---
const GeometricGrid = ({ className }: { className?: string }) => (
  <svg className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="angled-grid" width="200" height="200" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
        <path d="M 200 0 L 0 0 0 200" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#angled-grid)" />
  </svg>
);

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);

  const breatherRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: breatherScroll } = useScroll({
    target: breatherRef,
    offset: ["start end", "end start"]
  });
  const breatherY = useTransform(breatherScroll, [0, 1], ["-20%", "20%"]);

  return (
    <div className="min-h-screen bg-primary text-primary-foreground selection:bg-accentmintgreen selection:text-primary overflow-clip">
      <Header />

      {/* 
        SECTION 1: HERO 
        Premium hero with enhanced visual hierarchy and modern interactions
      */}
      <section ref={heroRef} className="relative w-full min-h-[100svh] flex flex-col lg:flex-row pt-24 lg:pt-0">
        
        {/* Left Column - Vibrant Blue Block */}
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="w-full lg:w-[55%] bg-gradient-to-br from-secondary to-secondary/90 flex flex-col justify-center px-6 py-20 lg:px-20 xl:px-32 relative z-10"
        >
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-block bg-accentmintgreen/20 text-accentmintgreen font-heading text-xs uppercase px-4 py-2 rounded-full tracking-widest border border-accentmintgreen/40">
                ✨ AI-Powered Health Intelligence
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="font-heading text-6xl sm:text-7xl lg:text-8xl xl:text-[9rem] uppercase leading-[0.85] tracking-tight mb-8">
              VitalMind<br />
              <span className="text-accentmintgreen">AI</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="font-paragraph text-xl lg:text-2xl mb-12 max-w-xl leading-relaxed text-primary-foreground/90">
              Proactive holistic health intelligence that predicts, prevents, and personalizes your wellbeing before symptoms arise.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6">
              <Link 
                to="/dashboard"
                className="group relative inline-flex items-center justify-center bg-accentmintgreen text-primary font-heading text-lg uppercase px-10 py-5 overflow-hidden hover:shadow-lg hover:shadow-accentmintgreen/50 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              </Link>
              <Link 
                to="/articles"
                className="inline-flex items-center justify-center border-2 border-primary-foreground/40 text-primary-foreground font-heading text-lg uppercase px-10 py-5 hover:bg-primary-foreground/10 hover:border-accentmintgreen transition-all duration-300 backdrop-blur-sm"
              >
                Explore Articles
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Column - Deep Navy with Grid Motif */}
        <div className="w-full lg:w-[45%] bg-gradient-to-br from-primary to-primary/80 relative min-h-[50vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
          <GeometricGrid className="text-accentmintgreen" />
          
          {/* Top Right Accent Block */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-8 right-8 bg-accentmintgreen text-primary px-8 py-4 hidden lg:block z-20 shadow-lg shadow-accentmintgreen/30"
          >
            <span className="font-heading uppercase tracking-widest text-sm font-bold">System Active</span>
          </motion.div>

          {/* Abstract Floating Element */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            className="relative z-10 w-3/4 aspect-square max-w-md"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-accentmintgreen/30 rounded-full"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 border border-secondary/40 rounded-full"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-32 h-32 bg-gradient-to-br from-secondary/40 to-secondary/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-secondary/50"
              >
                <Activity className="w-12 h-12 text-accentmintgreen" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 
        SECTION 2: VISUAL BREATHER & PARALLAX
        Premium cinematic pause with enhanced visual effects
      */}
      <section ref={breatherRef} className="relative w-full h-[80vh] lg:h-[100vh] overflow-hidden flex items-center justify-center">
        <motion.div style={{ y: breatherY }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <Image 
            src={PLACEHOLDER_IMG} 
            alt="Abstract representation of health data" 
            className="w-full h-full object-cover opacity-50 mix-blend-luminosity"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/85 to-primary" />
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <motion.div 
              className="inline-block border border-accentmintgreen/60 px-6 py-2 mb-8 rounded-full backdrop-blur-md bg-accentmintgreen/5"
              whileHover={{ scale: 1.05, borderColor: '#B9FBC0' }}
            >
              <span className="font-heading text-accentmintgreen uppercase tracking-widest text-xs">✓ The Philosophy</span>
            </motion.div>
            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl uppercase leading-tight mb-6">
              Don't wait to <br className="hidden md:block" />
              <span className="text-accentmintgreen">get sick.</span>
            </h2>
            <p className="font-paragraph text-xl md:text-2xl text-primary-foreground/75 max-w-2xl mx-auto leading-relaxed">
              Know before it happens. We bridge the gap between mental and physical health, creating a unified baseline for your vitality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 
        SECTION 3: INTELLIGENT HEALTH SYSTEM (Features)
        Premium feature showcase with enhanced interactions
      */}
      <section className="w-full bg-primary py-24 lg:py-40 relative">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* Sticky Left Column */}
            <div className="lg:col-span-5">
              <div className="sticky top-40">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                >
                  <h2 className="font-heading text-5xl lg:text-7xl uppercase leading-none mb-6">
                    Intelligent<br />
                    <span className="text-accentmintgreen">System</span>
                  </h2>
                  <p className="font-paragraph text-lg text-primary-foreground/70 mb-8 max-w-md leading-relaxed">
                    A unified platform that treats your body and mind as one interconnected system, continuously learning and adapting to your unique health patterns.
                  </p>
                  <motion.div 
                    className="w-24 h-1 bg-gradient-to-r from-accentmintgreen to-accentmintgreen/30"
                    layoutId="underline"
                  />
                </motion.div>
              </div>
            </div>

            {/* Scrolling Right Column */}
            <div className="lg:col-span-7 flex flex-col gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/30 p-8 lg:p-12 hover:border-accentmintgreen/50 hover:bg-secondary/15 transition-all duration-500 relative overflow-hidden"
                  whileHover={{ y: -4 }}
                >
                  {/* Hover Gradient Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accentmintgreen/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col sm:flex-row gap-8 items-start">
                    <motion.div 
                      className="p-4 bg-primary border border-secondary/40 rounded-xl shrink-0 group-hover:border-accentmintgreen/60 transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <feature.icon className="w-8 h-8 text-accentmintgreen" />
                    </motion.div>
                    <div>
                      <h3 className="font-heading text-2xl lg:text-3xl uppercase mb-4 group-hover:text-accentmintgreen transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="font-paragraph text-primary-foreground/70 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 
        SECTION 4: HOW IT WORKS (Process)
        Premium magazine-style layout with enhanced visual hierarchy
      */}
      <section className="w-full bg-secondary py-24 lg:py-40 relative overflow-hidden">
        <GeometricGrid className="text-primary opacity-20" />
        
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-20 lg:mb-32"
          >
            <h2 className="font-heading text-5xl lg:text-7xl uppercase text-primary-foreground">
              How It Works
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left: Stepped Content */}
            <div className="space-y-16 lg:space-y-24 relative">
              {/* Connecting Line */}
              <div className="absolute left-[1.15rem] top-4 bottom-4 w-px bg-gradient-to-b from-primary-foreground/40 via-primary-foreground/20 to-transparent hidden sm:block" />

              {[
                { step: "01", title: "BUILD YOUR HEALTH DNA", desc: "Create a comprehensive 360° health profile including medical history, lifestyle habits, dietary preferences, and emotional baseline." },
                { step: "02", title: "PASSIVE MONITORING", desc: "AI continuously analyzes patterns from your daily activities, sleep, stress levels, and optional wearable data without manual entry." },
                { step: "03", title: "PREDICTIVE INSIGHTS", desc: "Receive early warnings about potential health risks 10-14 days before symptoms appear, allowing for true preventive care." },
                { step: "04", title: "PERSONALIZED ACTION", desc: "Get context-aware recommendations and interventions tailored to your unique health patterns and current state." }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="relative pl-0 sm:pl-16 group"
                >
                  <motion.div 
                    className="hidden sm:flex absolute left-0 top-1 w-10 h-10 rounded-full bg-primary items-center justify-center border-2 border-accentmintgreen z-10 group-hover:scale-110 transition-transform"
                    whileHover={{ scale: 1.2 }}
                  >
                    <span className="font-heading text-sm text-accentmintgreen font-bold">{item.step}</span>
                  </motion.div>
                  <h3 className="font-heading text-2xl lg:text-4xl uppercase mb-4 text-accentmintgreen group-hover:text-primary-foreground transition-colors">
                    <span className="sm:hidden mr-4">{item.step}.</span>
                    {item.title}
                  </h3>
                  <p className="font-paragraph text-lg text-primary-foreground/85 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Right: Large Image Reveal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[60vh] lg:h-[80vh] w-full rounded-2xl overflow-hidden border border-primary-foreground/30 shadow-2xl shadow-primary/50"
            >
              <Image 
                src={PLACEHOLDER_IMG} 
                alt="VitalMind AI Interface" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent mix-blend-multiply" />
              
              {/* Overlay UI Element */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute bottom-8 left-8 right-8 bg-primary/90 backdrop-blur-xl border border-primary-foreground/30 p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-heading uppercase text-accentmintgreen text-sm tracking-widest">System Status</span>
                  <motion.span 
                    className="flex h-3 w-3 relative"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accentmintgreen opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accentmintgreen"></span>
                  </motion.span>
                </div>
                <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-accentmintgreen to-accentmintgreen/70"
                  />
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 
        SECTION 5: VITALITY INDEX (Deep Dive)
        Premium full-width image banner with overlapping content block
      */}
      <section className="w-full bg-primary py-24 lg:py-40 relative">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="relative w-full min-h-[70vh] flex items-center">
            
            {/* Background Image Container */}
            <div className="absolute inset-0 w-full lg:w-[70%] h-full right-0 ml-auto">
              <Image 
                src={PLACEHOLDER_IMG} 
                alt="Vitality Index Visualization" 
                className="w-full h-full object-cover opacity-60 lg:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent lg:via-transparent" />
            </div>

            {/* Content Block Overlapping */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10 w-full lg:w-1/2 bg-gradient-to-br from-primary/95 to-primary/90 backdrop-blur-xl border border-secondary/40 p-8 lg:p-16 shadow-2xl shadow-primary/50"
            >
              <motion.div 
                className="inline-flex items-center justify-center w-20 h-20 border-2 border-accentmintgreen rounded-full mb-8 bg-accentmintgreen/10"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <span className="font-heading text-3xl text-accentmintgreen font-bold">VI</span>
              </motion.div>
              <h2 className="font-heading text-4xl lg:text-6xl uppercase mb-6">
                The Vitality <br />
                <span className="text-accentmintgreen">Index</span>
              </h2>
              <p className="font-paragraph text-lg lg:text-xl text-primary-foreground/85 mb-8 leading-relaxed">
                Your daily health trajectory scored 0-100. We don't just track steps; we integrate mental, physical, and lifestyle signals into a single, actionable metric that tells you exactly where you stand.
              </p>
              <ul className="space-y-4 mb-10">
                {['Mental State Correlation', 'Biometric Anomaly Detection', 'Lifestyle Impact Scoring'].map((item, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-center gap-3 font-heading uppercase text-sm tracking-wider"
                    whileHover={{ x: 8 }}
                  >
                    <motion.div 
                      className="w-2 h-2 bg-accentmintgreen rounded-full"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    />
                    {item}
                  </motion.li>
                ))}
              </ul>
              <Link 
                to="/dashboard"
                className="inline-flex items-center gap-2 text-accentmintgreen font-heading uppercase hover:text-primary-foreground transition-colors group"
              >
                View Your Dashboard 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 
        SECTION 6: CTA
        Premium bold closing statement with enhanced visual impact
      */}
      <section className="w-full bg-accentmintgreen py-32 lg:py-48 relative overflow-hidden">
        <GeometricGrid className="text-primary opacity-10" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl uppercase text-primary leading-[0.9] mb-8">
              Ready to transform <br />
              your health?
            </h2>
            <p className="font-paragraph text-xl text-primary/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands who are taking control of their wellbeing with proactive, AI-powered health intelligence.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/dashboard"
                className="inline-block bg-primary text-accentmintgreen font-heading text-xl uppercase px-12 py-6 hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/50"
              >
                Get Started Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}