import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  MousePointerClick,
  BarChart3,
  Target,
} from "lucide-react";

export default function Bento() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-violet-950 p-6 md:p-10">
      <div className="mx-auto max-w-7xl h-[calc(100vh-5rem)]">
        <motion.div
          className="grid h-full gap-4 md:gap-6"
          style={{
            gridTemplateAreas: `
              "header stats roi"
              "convert main clients"
              "convert main clients"
              "cta cta cta"
            `,
            gridTemplateColumns: "1fr 1.5fr 1fr",
            gridTemplateRows: "1fr 1fr 1fr auto",
          }}
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {/* Header Card */}
          <motion.div
            className="rounded-3xl bg-gradient-to-br from-purple-800/50 to-purple-900/50 p-6 backdrop-blur-sm border border-purple-700/30"
            style={{ gridArea: "header" }}
            variants={fadeInUp}
          >
            <div className="flex items-start justify-between">
              <TrendingUp className="text-purple-300 w-6 h-6" />
              <span className="text-xs text-purple-200/80">YTD Growth</span>
            </div>
            <h3 className="text-4xl font-bold text-white mt-4">+8.9M</h3>
            <p className="text-purple-200/90 mt-2">Total Impressions</p>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="rounded-3xl bg-gradient-to-br from-violet-600/50 to-violet-800/50 p-8 backdrop-blur-sm border border-violet-500/30 flex flex-col justify-center items-center text-center"
            style={{ gridArea: "main" }}
            variants={fadeInUp}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Driving Growth Through Digital Excellence
            </h1>
            <p className="text-lg text-violet-200/90">
              Our data-driven strategies have transformed businesses across
              industries, delivering exceptional ROI through targeted campaigns
              and optimization.
            </p>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            className="rounded-3xl bg-gradient-to-br from-fuchsia-600/50 to-fuchsia-800/50 p-6 backdrop-blur-sm border border-fuchsia-500/30"
            style={{ gridArea: "stats" }}
            variants={fadeInUp}
          >
            <div className="flex items-start justify-between">
              <MousePointerClick className="text-fuchsia-300 w-6 h-6" />
              <span className="text-xs text-fuchsia-200/80">Engagement</span>
            </div>
            <h3 className="text-4xl font-bold text-white mt-4">193.3K</h3>
            <p className="text-fuchsia-200/90 mt-2">Total Clicks</p>
          </motion.div>

          {/* ROI Card */}
          <motion.div
            className="rounded-3xl bg-gradient-to-br from-pink-600/50 to-pink-800/50 p-6 backdrop-blur-sm border border-pink-500/30"
            style={{ gridArea: "roi" }}
            variants={fadeInUp}
          >
            <div className="flex items-start justify-between">
              <BarChart3 className="text-pink-300 w-6 h-6" />
              <span className="text-xs text-pink-200/80">Performance</span>
            </div>
            <h3 className="text-4xl font-bold text-white mt-4">312%</h3>
            <p className="text-pink-200/90 mt-2">Average ROI</p>
          </motion.div>

          {/* Conversion Rate Card (2 rows) */}
          <motion.div
            className="rounded-3xl bg-gradient-to-br from-purple-600/50 to-purple-800/50 p-6 backdrop-blur-sm border border-purple-500/30 flex flex-col justify-between"
            style={{ gridArea: "convert" }}
            variants={fadeInUp}
          >
            <div className="flex items-start justify-between">
              <Target className="text-purple-300 w-6 h-6" />
              <span className="text-xs text-purple-200/80">Success Rate</span>
            </div>
            <div>
              <h3 className="text-5xl font-bold text-white mt-4">+28%</h3>
              <p className="text-purple-200/90 mt-2">Conversion Rate</p>
            </div>
          </motion.div>

          {/* Active Clients Card (2 rows) */}
          <motion.div
            className="rounded-3xl bg-gradient-to-br from-violet-600/50 to-violet-800/50 p-6 backdrop-blur-sm border border-violet-500/30 flex flex-col justify-between"
            style={{ gridArea: "clients" }}
            variants={fadeInUp}
          >
            <div className="flex items-start justify-between">
              <Users className="text-violet-300 w-6 h-6" />
              <span className="text-xs text-violet-200/80">Growth</span>
            </div>
            <div>
              <h3 className="text-5xl font-bold text-white mt-4">10+</h3>
              <p className="text-violet-200/90 mt-2">Active Clients</p>
            </div>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            className="rounded-3xl bg-gradient-to-br from-violet-600/50 to-violet-800/50 p-6 backdrop-blur-sm border border-violet-500/30"
            style={{ gridArea: "cta" }}
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="text-violet-300 w-6 h-6" />
                <span className="text-lg font-semibold text-white">
                  Ready to Transform Your Digital Presence?
                </span>
              </div>
              <button className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors">
                Get Started
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
