import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Activity, TrendingUp, Moon, Zap, AlertCircle, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DashboardPage() {
  const [vitalityScore, setVitalityScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVitalityScore(78);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const healthMetrics = [
    {
      icon: Heart,
      label: 'PHYSICAL HEALTH',
      value: 82,
      status: 'good',
      insight: 'Consistent activity levels detected'
    },
    {
      icon: Brain,
      label: 'MENTAL WELLBEING',
      value: 75,
      status: 'moderate',
      insight: 'Stress patterns increasing this week'
    },
    {
      icon: Moon,
      label: 'SLEEP QUALITY',
      value: 68,
      status: 'attention',
      insight: 'Sleep debt accumulating - prioritize rest'
    },
    {
      icon: Activity,
      label: 'ACTIVITY LEVEL',
      value: 85,
      status: 'good',
      insight: 'Exceeding daily movement goals'
    }
  ];

  const predictions = [
    {
      type: 'warning',
      title: 'Pre-Burnout Risk Detected',
      description: 'Your stress signals have increased 23% over the past 10 days. Consider scheduling downtime this weekend.',
      priority: 'high'
    },
    {
      type: 'info',
      title: 'Sleep Pattern Optimization',
      description: 'Going to bed 30 minutes earlier could improve your cognitive performance by 18% based on your data.',
      priority: 'medium'
    },
    {
      type: 'success',
      title: 'Positive Trend',
      description: 'Your mind-body correlation score improved 12% this month. Keep up the balanced routine.',
      priority: 'low'
    }
  ];

  const contextualNudges = [
    'You\'ve had 4 hours of screen time today. A 10-minute walk now will boost focus by ~30%',
    'Your last meal was 6 hours ago. Hydration and light snack recommended',
    'Stress levels elevated. Try a 5-minute breathing exercise'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-accentmintgreen';
      case 'moderate':
        return 'text-linkblue';
      case 'attention':
        return 'text-destructive';
      default:
        return 'text-primary-foreground';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-6 h-6 text-destructive" />;
      case 'medium':
        return <AlertCircle className="w-6 h-6 text-linkblue" />;
      case 'low':
        return <CheckCircle className="w-6 h-6 text-accentmintgreen" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-primary pt-20">
      <Header />

      <div className="max-w-[100rem] mx-auto px-6 lg:px-12 py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="font-heading text-5xl lg:text-7xl text-primary-foreground uppercase mb-4">
            YOUR HEALTH DASHBOARD
          </h1>
          <p className="font-paragraph text-xl text-primary-foreground">
            Real-time insights into your holistic wellbeing
          </p>
        </motion.div>

        {/* Vitality Score - Hero Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-secondary p-8 lg:p-12 mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-heading text-3xl text-primary-foreground uppercase mb-4">
                VITALITY INDEX
              </h2>
              <p className="font-paragraph text-primary-foreground mb-6">
                Your comprehensive health score integrating mental, physical, and lifestyle signals
              </p>
              <div className="flex items-baseline gap-3">
                <span className="font-heading text-8xl text-accentmintgreen">
                  {vitalityScore}
                </span>
                <span className="font-heading text-3xl text-primary-foreground">/100</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-64 h-64">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    fill="none"
                    stroke="#0B2545"
                    strokeWidth="16"
                  />
                  <motion.circle
                    cx="128"
                    cy="128"
                    r="120"
                    fill="none"
                    stroke="#B9FBC0"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 120}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 120 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 120 * (1 - vitalityScore / 100) }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="w-16 h-16 text-accentmintgreen" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Health Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {healthMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="bg-secondary p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <metric.icon className={`w-8 h-8 ${getStatusColor(metric.status)}`} />
                <span className={`font-heading text-3xl ${getStatusColor(metric.status)}`}>
                  {metric.value}
                </span>
              </div>
              <h3 className="font-heading text-sm text-primary-foreground uppercase mb-2">
                {metric.label}
              </h3>
              <p className="font-paragraph text-sm text-primary-foreground">
                {metric.insight}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Predictive Alerts */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-2"
          >
            <h2 className="font-heading text-3xl text-primary-foreground uppercase mb-6">
              PREDICTIVE INSIGHTS
            </h2>
            <div className="space-y-4">
              {predictions.map((prediction, index) => (
                <div key={index} className="bg-secondary p-6">
                  <div className="flex items-start gap-4">
                    {getPriorityIcon(prediction.priority)}
                    <div className="flex-1">
                      <h3 className="font-heading text-lg text-primary-foreground uppercase mb-2">
                        {prediction.title}
                      </h3>
                      <p className="font-paragraph text-primary-foreground">
                        {prediction.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contextual Nudges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="font-heading text-3xl text-primary-foreground uppercase mb-6">
              SMART NUDGES
            </h2>
            <div className="space-y-4">
              {contextualNudges.map((nudge, index) => (
                <div key={index} className="bg-secondary p-4 border-l-4 border-accentmintgreen">
                  <p className="font-paragraph text-sm text-primary-foreground">
                    {nudge}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-primary border-2 border-accentmintgreen p-6">
              <h3 className="font-heading text-lg text-accentmintgreen uppercase mb-3">
                COMMUNITY PULSE
              </h3>
              <p className="font-paragraph text-sm text-primary-foreground">
                People in your area are showing elevated stress signals this week, likely due to seasonal changes. You're not alone.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Mind-Body Correlation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 bg-secondary p-8 lg:p-12"
        >
          <h2 className="font-heading text-3xl text-primary-foreground uppercase mb-6">
            MIND-BODY CORRELATION
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 border-2 border-accentmintgreen rounded-full mb-4">
                <TrendingUp className="w-10 h-10 text-accentmintgreen" />
              </div>
              <h3 className="font-heading text-xl text-primary-foreground uppercase mb-2">
                CORRELATION SCORE
              </h3>
              <p className="font-heading text-4xl text-accentmintgreen mb-2">87%</p>
              <p className="font-paragraph text-sm text-primary-foreground">
                Strong alignment between mental and physical states
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="font-paragraph text-primary-foreground mb-4">
                Your data shows that when your sleep quality drops below 70, your stress levels increase by an average of 25% within 48 hours. This pattern has been consistent over the past month.
              </p>
              <p className="font-paragraph text-primary-foreground">
                <strong className="text-accentmintgreen">Recommendation:</strong> Prioritize sleep hygiene on high-stress days to break this cycle. Your optimal sleep window is 10:30 PM - 6:30 AM based on your circadian patterns.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
