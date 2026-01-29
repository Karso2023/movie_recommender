"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Film,
  Sparkles,
  BarChart3,
  Search,
  ChevronRight,
  Code,
  Database,
  Cpu,
  Users,
} from "lucide-react";

const howItWorks = [
  {
    step: "01",
    icon: Search,
    title: "Search for a Movie",
    description:
      "Use our OMDb-powered search to find any movie. Browse details like ratings, cast, plot, and more.",
  },
  {
    step: "02",
    icon: Cpu,
    title: "Generate Recommendations",
    description:
      "Click 'Get Recommendations' and our engine builds a pool of candidate movies from similar genres.",
  },
  {
    step: "03",
    icon: BarChart3,
    title: "Cosine Similarity Ranking",
    description:
      "Each movie is converted into a feature vector (genre, rating, votes) and ranked by cosine similarity to your pick.",
  },
  {
    step: "04",
    icon: Sparkles,
    title: "Discover Hidden Gems",
    description:
      "Get a curated list of the most similar movies, sorted by match percentage. Your next favourite is waiting.",
  },
];

const techStack = [
  {
    icon: Code,
    name: "Next.js 16",
    detail: "React 19 with App Router and Server Actions",
  },
  {
    icon: Database,
    name: "SQLite",
    detail: "Lightweight user database via better-sqlite3",
  },
  {
    icon: Film,
    name: "OMDb API",
    detail: "Real-time movie data, posters, and metadata",
  },
  {
    icon: Cpu,
    name: "Cosine Similarity",
    detail: "Feature vectors with one-hot genre encoding",
  },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/40 via-black to-rose-950/30" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-rose-600/15 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-20">
        {/* Hero */}
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <Badge
              variant="outline"
              className="mb-6 border-violet-500/50 text-violet-400"
            >
              About MovieRec
            </Badge>
            <h1
              className="text-5xl sm:text-6xl font-bold tracking-tight mb-6"
              style={{ animation: "fadeInUp 0.6s ease-out" }}
            >
              Smarter Movie{" "}
              <span className="bg-gradient-to-r from-violet-400 to-rose-400 bg-clip-text text-transparent">
                Discovery
              </span>
            </h1>
            <p
              className="text-lg text-zinc-400 leading-relaxed"
              style={{ animation: "fadeInUp 0.6s ease-out 0.1s both" }}
            >
              MovieRec is a content-based movie recommendation system built as a
              Social Computing project. It uses cosine similarity on movie
              feature vectors to find films that match your taste — no
              collaborative filtering, no black boxes, just transparent math.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />
          <div className="container mx-auto px-6 relative">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge
                variant="outline"
                className="mb-4 border-rose-500/50 text-rose-400"
              >
                How It Works
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-bold">
                From Search to{" "}
                <span className="text-violet-400">Recommendation</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {howItWorks.map((item, i) => (
                <Card
                  key={item.step}
                  className="group bg-white/[0.02] border-white/10 hover:border-violet-500/50 hover:bg-white/[0.04] transition-all duration-300"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${0.1 * i}s both`,
                  }}
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl font-bold text-zinc-700">
                        {item.step}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600/20 to-rose-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <item.icon className="w-6 h-6 text-violet-400" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* The Algorithm */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-10 lg:p-16 max-w-4xl mx-auto">
              <div className="absolute top-0 right-0 w-72 h-72 bg-violet-600/15 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-rose-600/15 rounded-full blur-[80px]" />

              <div className="relative space-y-6">
                <Badge
                  variant="outline"
                  className="border-violet-500/50 text-violet-400"
                >
                  The Algorithm
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-bold">
                  Cosine Similarity Explained
                </h2>
                <div className="space-y-4 text-zinc-400 leading-relaxed">
                  <p>
                    Every movie is represented as a numerical vector with three
                    types of features:
                  </p>
                  <ul className="space-y-3 ml-4">
                    <li className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 rounded-full bg-violet-500 shrink-0" />
                      <span>
                        <strong className="text-white">Genre</strong> — One-hot
                        encoded across all genres (Action, Drama, Comedy, etc.)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                      <span>
                        <strong className="text-white">Rating</strong> —
                        Min-max normalised IMDb rating (0 to 1)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                      <span>
                        <strong className="text-white">Votes</strong> —
                        Log-transformed vote count to reduce skew from blockbusters
                      </span>
                    </li>
                  </ul>
                  <p>
                    The cosine similarity between two movie vectors measures the
                    angle between them — movies pointing in similar directions in
                    feature space get a score close to 1 (100% match), while
                    dissimilar movies score closer to 0.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-950/10 to-transparent" />
          <div className="container mx-auto px-6 relative">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge
                variant="outline"
                className="mb-4 border-violet-500/50 text-violet-400"
              >
                Tech Stack
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-bold">
                Built With Modern{" "}
                <span className="text-rose-400">Tools</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {techStack.map((tech, i) => (
                <Card
                  key={tech.name}
                  className="group bg-white/[0.02] border-white/10 hover:border-violet-500/50 hover:bg-white/[0.04] transition-all duration-300 text-center"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${0.1 * i}s both`,
                  }}
                >
                  <CardContent className="p-6 space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600/20 to-rose-600/20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <tech.icon className="w-6 h-6 text-violet-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {tech.name}
                    </h3>
                    <p className="text-sm text-zinc-400">{tech.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team / Project Info */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-10 lg:p-16 max-w-3xl mx-auto text-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-600/15 rounded-full blur-[100px]" />

              <div className="relative space-y-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600/30 to-rose-600/30 flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-violet-400" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold">
                  Social Computing Project
                </h2>
                <p className="text-zinc-400 leading-relaxed max-w-xl mx-auto">
                  This project was built as part of the Social Computing course.
                  It explores how content-based filtering can power personalised
                  recommendations using publicly available movie data from OMDb.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto space-y-8">
              <h2 className="text-4xl sm:text-5xl font-bold">
                Ready to{" "}
                <span className="bg-gradient-to-r from-violet-400 to-rose-400 bg-clip-text text-transparent">
                  Try It Out?
                </span>
              </h2>
              <p className="text-lg text-zinc-400">
                Search for any movie and see the recommendation engine in
                action.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-violet-600 to-rose-600 hover:from-violet-500 hover:to-rose-500 text-white border-0 h-14 px-8 text-base rounded-full"
                  asChild
                >
                  <Link href="/movies">
                    Browse Movies
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-base rounded-full border-white/20 bg-white/5 hover:bg-white/10 text-white"
                  asChild
                >
                  <Link href="/register">Create Account</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
