'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  CheckCircle2,
  LoaderCircle,
  Circle,
  Lock,
  Zap,
  Mic,
} from "lucide-react";

const items = [
  {
    icon: Zap,
    label: "Vision Archetype",
    title: "Cinematic Data Annotation",
    description:
      "Multimodal workflows for image, video, and 3D annotation with high-accuracy quality control.",
    video: "https://res.cloudinary.com/dy4bqxt8p/video/upload/v1779622196/new107_qhrklf.mp4",
    card: {
      heading: "Script Transcription",
      badge: "Live",
      goal: "Sameer Deploy multimodal pipelines across multiple international regions.",
      tasks: [
        { title: "Regional onboarding", meta: "Completed in 4.2s", status: "completed" },
        { title: "Deploy collection teams", meta: "Completed in 8.1s", status: "completed" },
        { title: "Scale infrastructure", meta: "In progress... 18s", status: "progress" },
        { title: "Validate datasets", meta: "Pending", status: "pending" },
      ],
    },
  },
  {
    icon: Lock,
    label: "Narrative Engine",
    title: "Data Collection",
    description:
      "High-speed multimodal data collection pipelines to capture and structure real-world datasets.",
    video: "https://res.cloudinary.com/dy4bqxt8p/video/upload/v1779621768/new105_meaomd.mp4",
    card: {
      heading: "Scene Collection",
      badge: "Data-Ready",
      goal: "Prepare large-scale datasets for training multimodal reasoning systems.",
      tasks: [
        { title: "Process raw data", meta: "Completed in 3.1s", status: "completed" },
        { title: "Generate annotations", meta: "Completed in 5.4s", status: "completed" },
        { title: "Train reasoning model", meta: "In progress... 24s", status: "progress" },
        { title: "Run evaluation tests", meta: "Pending", status: "pending" },
      ],
    },
  },
  {
    icon: Mic,
    label: "Sonic Landscapes",
    title: "Audio and Speech",
    description:
      "Automation-first AI systems with human validation and scalable workflows.",
    video: "https://res.cloudinary.com/dy4bqxt8p/video/upload/v1779622220/new108_k1a47m.mp4",
    card: {
      heading: "Audio Reconstruction",
      badge: "Auto-generated",
      goal: "Build a REST API endpoint for user authentication with JWT tokens.",
      tasks: [
        { title: "Gather requirements", meta: "Completed in 2.3s", status: "completed" },
        { title: "Research solutions", meta: "Completed in 5.1s", status: "completed" },
        { title: "Implement solution", meta: "In progress... 12s", status: "progress" },
        { title: "Test and validate", meta: "Pending", status: "pending" },
      ],
    },
  },
  {
    icon: Database,
    label: "Director's Lab",
    title: "Data Engine",
    description:
      "Transparent AI models with interpretable predictions and decision-making insights.",
    video: "https://res.cloudinary.com/dy4bqxt8p/video/upload/v1779622271/02_u2efg7.mp4",
    card: {
      heading: "Pipeline Studio",
      badge: "Optimized",
      goal: "Process and validate multimodal datasets for enterprise deployment.",
      tasks: [
        { title: "Upload raw datasets", meta: "Completed in 1.9s", status: "completed" },
        { title: "Run QA workflows", meta: "Completed in 6.7s", status: "completed" },
        { title: "Generate metadata", meta: "In progress... 16s", status: "progress" },
        { title: "Export training package", meta: "Pending", status: "pending" },
      ],
    },
  },
];

export function VaelPlatforms() {
  const [activeTab, setActiveTab] = useState(0);
  const activeItem = items[activeTab];

  return (
    <section id="lab" className="bg-background py-32 md:py-48 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="grid md:grid-cols-2 gap-14 items-start mb-16">
          <div>
            <span className="text-[10px] tracking-[0.5em] uppercase text-primary/60 block mb-4">R&D / Process</span>
            <h2 className="text-5xl md:text-7xl font-headline italic text-foreground max-w-2xl">
              Director&apos;s <span className="text-primary not-italic">Lab</span>
            </h2>
          </div>
          <div>
            <p className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed font-body">
              Crafted interactive UI systems, modern component experiences — designed and developed by <span className="font-medium text-primary">Sameer</span>.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-4 bottom-12 z-20 hidden lg:block">
            <div className="bg-card/80 backdrop-blur-xl rounded-none shadow-2xl border border-border/50 p-4 w-[260px]">
              <div className="flex flex-col gap-2">
                {items.map((tab, index) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveTab(index)}
                      className={`
                        group flex items-center gap-3 px-4 py-3 rounded-none text-left transition-all duration-300 border
                        ${
                          activeTab === index
                            ? "bg-primary/5 border-primary"
                            : "border-transparent hover:border-primary/30 hover:bg-primary/5"
                        }
                      `}
                    >
                      <Icon
                        className={`
                          w-5 h-5 transition-colors duration-300
                          ${
                            activeTab === index
                              ? "text-primary"
                              : "text-muted-foreground group-hover:text-primary"
                          }
                        `}
                      />
                      <span
                        className={`
                          text-[11px] tracking-widest uppercase font-medium transition-colors duration-300
                          ${
                            activeTab === index
                              ? "text-primary"
                              : "text-muted-foreground group-hover:text-primary"
                          }
                        `}
                      >
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div
            className="relative overflow-hidden h-[400px] md:h-[690px] border border-border/20"
            style={{
              clipPath: "polygon(0 0, 92% 0, 100% 12%, 100% 100%, 30% 100%, 22% 88%, 0 88%)",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.video
                key={activeItem.video}
                src={activeItem.video}
                autoPlay
                muted
                loop
                playsInline
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute inset-0 flex items-center justify-center p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.card.heading}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 14 }}
                  transition={{ duration: 0.35 }}
                  className="w-full max-w-[320px] rounded-none border border-white/20 bg-background/80 backdrop-blur-xl shadow-2xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-[14px] font-bold tracking-widest uppercase text-foreground">
                      {activeItem.card.heading}
                    </h3>
                    <span className="text-[9px] bg-primary/10 text-primary px-2 py-1 rounded-none border border-primary/20 uppercase tracking-tighter">
                      {activeItem.card.badge}
                    </span>
                  </div>

                  <div className="mt-4 border border-border/50 rounded-none p-3 bg-white/5">
                    <p className="text-[9px] tracking-widest uppercase text-muted-foreground">Goal</p>
                    <p className="text-[12px] leading-[18px] mt-1 text-foreground italic">
                      {activeItem.card.goal}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-col gap-3">
                    {activeItem.card.tasks.map((task, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-[2px]">
                          {task.status === "completed" && <CheckCircle2 className="w-4 h-4 text-primary" />}
                          {task.status === "progress" && <LoaderCircle className="w-4 h-4 text-primary animate-spin" />}
                          {task.status === "pending" && <Circle className="w-4 h-4 text-muted/30" />}
                        </div>
                        <div>
                          <p className={`text-[12px] ${task.status === "completed" ? "line-through text-muted-foreground" : task.status === "progress" ? "text-primary font-bold" : "text-muted"}`}>
                            {task.title}
                          </p>
                          <p className="text-[10px] text-muted/60 tabular-nums uppercase tracking-tight">{task.meta}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-6 text-[9px] tracking-widest uppercase text-muted/60 font-medium">
                    <span>Active Sessions</span>
                    <span>Est. Time 0:45s</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
