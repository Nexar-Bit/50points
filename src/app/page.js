"use client";

import Link from "next/link";
import { Target, Trophy, TrendingUp, ChevronRight, ArrowRight } from "lucide-react";
import AnimateInView from "@/components/ui/AnimateInView";
import HomeLanding from "@/components/home/HomeLanding";
import LiveTournamentCard from "@/components/home/LiveTournamentCard";
import { tournaments, topPlayers } from "@/lib/data/mockData";

const howItWorksMeta = [
  { step: 1, icon: "target" },
  { step: 2, icon: "trophy" },
  { step: 3, icon: "trending-up" },
];
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { staticFile } from "@/lib/config/paths";

function getRankStyle(rank) {
  switch (rank) {
    case 1: return "bg-gradient-to-br from-yellow-400 to-amber-600 text-black shadow-lg shadow-amber-500/20";
    case 2: return "bg-gradient-to-br from-zinc-300 to-zinc-500 text-black";
    case 3: return "bg-gradient-to-br from-amber-600 to-amber-800 text-white";
    default: return "bg-white/5 text-zinc-400";
  }
}

function StepIcon({ name, className }) {
  const icons = { target: Target, trophy: Trophy, "trending-up": TrendingUp };
  const Icon = icons[name] || Target;
  return <Icon className={className} />;
}

export default function Home() {
  const { t } = useLanguage();

  const howItWorks = howItWorksMeta.map((item) => ({
    ...item,
    title: t(`howItWorksSection.step${item.step}Title`),
    description: t(`howItWorksSection.step${item.step}Desc`),
  }));

  return (
    <div className="relative overflow-x-hidden">
      <HomeLanding />

      {/* ─── LIVE TOURNAMENTS ─── */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0">
          <img src={staticFile("/images/hero-lobby.jpg")} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/85 to-brand-dark" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <AnimateInView>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan animate-pulse-live" />
              <span className="text-xs font-semibold text-cyan uppercase tracking-widest">
                {t("tournamentsSection.liveLabel")}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3">
              {t("tournamentsSection.title")}
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 mb-6 max-w-xl leading-relaxed">
              {t("tournamentsSection.descriptionLead")}{" "}
              <span className="text-cyan-light font-semibold">
                {t("tournamentsSection.descriptionHighlight")}
              </span>
              .
            </p>
            <div className="live-tournaments-section__divider" aria-hidden />
          </AnimateInView>

          <div className="live-tournaments-section__grid">
            {tournaments.map((tournament, i) => (
              <AnimateInView key={tournament.id} delay={i * 0.15}>
                <LiveTournamentCard tournament={tournament} t={t} featured={i === 0} />
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-brand-dark" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <AnimateInView>
            <div className="text-center mb-12 sm:mb-16">
              <span className="text-xs font-semibold text-purple-light uppercase tracking-widest mb-3 block">
                {t("howItWorksSection.label")}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
                {t("howItWorksSection.title")}
              </h2>
              <p className="text-zinc-500 text-sm sm:text-base max-w-lg mx-auto">
                {t("howItWorksSection.description")}
              </p>
            </div>
          </AnimateInView>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            {howItWorks.map((step, i) => (
              <AnimateInView key={step.step} delay={i * 0.15}>
                <div className="relative glass-card rounded-2xl p-6 sm:p-8 group hover:glow-purple transition-all duration-500 h-full">
                  <div className="absolute -top-3 -left-1 sm:-top-4 sm:-left-2">
                    <span className="text-6xl sm:text-7xl font-black text-white/[0.03] select-none">{step.step}</span>
                  </div>
                  <div className="relative mb-5 sm:mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-purple/20 to-purple/5 border border-purple/10 flex items-center justify-center group-hover:border-purple/30 transition-colors duration-300">
                      <StepIcon name={step.icon} className="w-6 h-6 sm:w-7 sm:h-7 text-purple-light" />
                    </div>
                  </div>
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-purple-light/60 uppercase tracking-wider">
                        {t("howItWorksSection.step")} {step.step}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 group-hover:text-purple-light transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </AnimateInView>
            ))}
          </div>

          <AnimateInView delay={0.3}>
            <div className="mt-12 sm:mt-16 glass-card rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-6 text-center">
                {t("howItWorksSection.chooseStrategy")}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: t("strategies.fullPoint"), points: t("strategies.fullPointsLabel"), risk: t("strategies.highRisk"), riskColor: "text-red-400", description: t("strategies.fullDesc"), gradient: "from-red-500/10 to-transparent", border: "border-red-500/10 hover:border-red-500/30" },
                  { name: t("strategies.dualPoint"), points: t("strategies.dualPointsLabel"), risk: t("strategies.medRisk"), riskColor: "text-amber-400", description: t("strategies.dualDesc"), gradient: "from-amber-500/10 to-transparent", border: "border-amber-500/10 hover:border-amber-500/30" },
                  { name: t("strategies.smartPick"), points: t("strategies.smartPointsLabel"), risk: t("strategies.lowRisk"), riskColor: "text-green-400", description: t("strategies.smartDesc"), gradient: "from-green-500/10 to-transparent", border: "border-green-500/10 hover:border-green-500/30" },
                ].map((strat, i) => (
                  <div key={i} className={`rounded-xl p-5 bg-gradient-to-b ${strat.gradient} border ${strat.border} transition-all duration-300`}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-white">{strat.name}</h4>
                      <span className={`text-[11px] font-semibold ${strat.riskColor}`}>{strat.risk}</span>
                    </div>
                    <p className="text-2xl font-black text-white/90 mb-2">{strat.points}</p>
                    <p className="text-xs text-zinc-500">{strat.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateInView>
        </div>
      </section>

      {/* ─── TOP PLAYERS ─── */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-card/20 to-brand-dark" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <AnimateInView>
            <div className="text-center mb-10 sm:mb-14">
              <span className="text-xs font-semibold text-gold uppercase tracking-widest mb-3 block">
                {t("topPlayers.label")}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
                {t("topPlayers.title")}
              </h2>
              <p className="text-zinc-500 text-sm sm:text-base max-w-md mx-auto">
                {t("topPlayers.subtitle")}
              </p>
            </div>
          </AnimateInView>

          <AnimateInView delay={0.1}>
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="px-4 sm:px-6 py-3 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider w-full">
                  <span className="w-10 text-center">{t("topPlayers.rank")}</span>
                  <span className="flex-1">{t("topPlayers.player")}</span>
                  <span className="w-20 text-right hidden sm:block">{t("topPlayers.winRate")}</span>
                  <span className="w-20 text-right hidden sm:block">{t("topPlayers.streak")}</span>
                  <span className="w-24 text-right">{t("topPlayers.points")}</span>
                </div>
              </div>

              {topPlayers.map((player, i) => (
                <AnimateInView key={player.rank} delay={0.1 + i * 0.08}>
                  <div className={`px-4 sm:px-6 py-3.5 flex items-center gap-4 transition-all duration-200 hover:bg-white/[0.02] ${
                    i < topPlayers.length - 1 ? "border-b border-white/[0.03]" : ""
                  } ${player.rank === 1 ? "bg-gradient-to-r from-amber-500/[0.04] to-transparent" : ""}`}>
                    <div className="w-10 flex justify-center">
                      <span className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold ${getRankStyle(player.rank)}`}>
                        {player.rank}
                      </span>
                    </div>
                    <div className="flex-1 flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-white shrink-0"
                        style={{ backgroundColor: player.avatarColor + "33", color: player.avatarColor }}>
                        {player.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{player.username}</p>
                        <p className="text-[11px] text-zinc-600 sm:hidden">{player.winRate} WR</p>
                      </div>
                    </div>
                    <div className="w-20 text-right hidden sm:block">
                      <span className="text-sm text-zinc-400">{player.winRate}</span>
                    </div>
                    <div className="w-20 text-right hidden sm:flex items-center justify-end gap-1">
                      {player.streakType === "win" ? (
                        <>
                          <img src={staticFile("/images/icons/icon-fire.png")} alt="" className="w-4 h-4 object-contain" />
                          <span className="text-sm font-medium text-orange-400">{player.streak}W</span>
                        </>
                      ) : (
                        <span className="text-sm text-zinc-600">{player.streak}L</span>
                      )}
                    </div>
                    <div className="w-24 text-right">
                      <span className={`text-sm sm:text-base font-bold ${player.rank === 1 ? "text-gradient-gold" : "text-white"}`}>
                        {player.totalPoints.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-zinc-600 ml-1">{t("common.pts")}</span>
                    </div>
                  </div>
                </AnimateInView>
              ))}

              <div className="px-6 py-4 border-t border-white/5 text-center">
                <Link href="/leaderboard" className="inline-flex items-center gap-2 text-sm font-semibold text-purple-light hover:text-white transition-colors group">
                  {t("topPlayers.viewAll")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </AnimateInView>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-brand-dark" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <AnimateInView>
            <div className="relative glass-card rounded-3xl p-8 sm:p-14 text-center overflow-hidden">
              <div className="absolute inset-0">
                <img src={staticFile("/images/sidebar-promo.jpg")} alt="" className="w-full h-full object-cover opacity-15" />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-brand-dark/90 to-brand-dark" />
              </div>
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple via-purple-light to-cyan" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-purple/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative">
                <img src={staticFile("/images/icons/icon-controller.png")} alt="" className="w-12 h-12 sm:w-14 sm:h-14 object-contain mx-auto mb-5 sm:mb-6" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
                  {t("cta.title")}
                </h2>
                <p className="text-sm sm:text-lg text-zinc-400 max-w-lg mx-auto mb-8 leading-relaxed">
                  {t("cta.description")}
                </p>
                <Link href="/register" className="inline-flex items-center px-10 py-4 text-base font-semibold text-white bg-gradient-to-r from-purple to-purple-light rounded-xl btn-glow animate-glow-pulse">
                  {t("cta.createAccount")}
                  <ChevronRight className="inline-block w-5 h-5 ml-1" />
                </Link>
                <p className="text-xs text-zinc-600 mt-5">{t("cta.noCreditCard")}</p>
              </div>
            </div>
          </AnimateInView>
        </div>
      </section>
    </div>
  );
}
