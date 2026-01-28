"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Star,
  ChevronRight,
  Film,
  Zap,
  Heart
} from "lucide-react";

// Sample featured movies data - replace with your actual data fetching
const featuredMovies = [
  {
    id: 1,
    title: "Dune: Part Two",
    poster: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    rating: 8.8,
    genre: "Sci-Fi",
  },
  {
    id: 2,
    title: "Oppenheimer",
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    rating: 8.5,
    genre: "Drama",
  },
  {
    id: 3,
    title: "Poor Things",
    poster: "https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
    rating: 8.0,
    genre: "Comedy",
  },
  {
    id: 4,
    title: "The Batman",
    poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    rating: 7.8,
    genre: "Action",
  },
  {
    id: 5,
    title: "Everything Everywhere",
    poster: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    rating: 8.1,
    genre: "Adventure",
  },
];

const stats = [
  { label: "Movies", value: "50K+", icon: Film },
  { label: "Users", value: "120K+", icon: Users },
  { label: "Recommendations", value: "2M+", icon: Sparkles },
];

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Picks",
    description: "Our algorithm learns your taste and surfaces hidden gems you'll actually love.",
  },
  {
    icon: TrendingUp,
    title: "Trending Now",
    description: "Stay ahead with real-time trending movies and what's buzzing in the community.",
  },
  {
    icon: Heart,
    title: "Personalized Lists",
    description: "Create watchlists, rate movies, and track everything you've seen.",
  },
  {
    icon: Zap,
    title: "Instant Match",
    description: "Tell us your mood and get perfect movie suggestions in seconds.",
  },
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/40 via-black to-rose-950/30" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-rose-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>


      <div 
        className="fixed inset-0 z-10 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

 
      <div className="relative z-20">

        <section className="relative min-h-screen flex items-center">

          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute inset-0 grid grid-cols-5 gap-2 p-4 transform -rotate-6 scale-125">
              {[...featuredMovies, ...featuredMovies, ...featuredMovies].map((movie, i) => (
                <div
                  key={i}
                  className="aspect-[2/3] rounded-lg overflow-hidden"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-b from-zinc-800 to-zinc-900" />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
          </div>

          <div className="container mx-auto px-6 py-20 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              <div className="space-y-8">
                <div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
                  style={{ animation: "fadeInUp 0.6s ease-out" }}
                >
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <span className="text-sm text-zinc-300">Cosine Similarity based Recommendations</span>
                </div>

                <h1 
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
                  style={{ animation: "fadeInUp 0.6s ease-out 0.1s both" }}
                >
                  <span className="block">Discover Your</span>
                  <span className="block mt-2 bg-gradient-to-r from-violet-400 via-rose-400 to-orange-400 bg-clip-text text-transparent">
                    Next Obsession
                  </span>
                </h1>

                <p 
                  className="text-lg sm:text-xl text-zinc-400 max-w-lg leading-relaxed"
                  style={{ animation: "fadeInUp 0.6s ease-out 0.2s both" }}
                >
                  Stop endless scrolling. Our recommender system makes you tick and 
                  delivers personalised movie recommendations that actually hit different.
                </p>

                <div 
                  className="flex flex-col sm:flex-row gap-4"
                  style={{ animation: "fadeInUp 0.6s ease-out 0.3s both" }}
                >
                  <Button 
                    size="lg" 
                    className="group bg-gradient-to-r from-violet-600 to-rose-600 hover:from-violet-500 hover:to-rose-500 text-white border-0 h-14 px-8 text-base rounded-full"
                    asChild
                  >
                    <Link href="/register">
                      Get Started Free
                      <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="h-14 px-8 text-base rounded-full border-white/20 bg-white/5 hover:bg-white/10 text-white"
                    asChild
                  >
                    <Link href="/about">
                      <Play className="mr-2 w-5 h-5" />
                      See How It Works
                    </Link>
                  </Button>
                </div>

                {/* Stats */}
                <div 
                  className="flex gap-8 pt-8 border-t border-white/10"
                  style={{ animation: "fadeInUp 0.6s ease-out 0.4s both" }}
                >
                  {stats.map((stat) => (
                    <div key={stat.label} className="space-y-1">
                      <div className="text-2xl sm:text-3xl font-bold">{stat.value}</div>
                      <div className="text-sm text-zinc-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div 
                className="relative hidden lg:block"
                style={{ animation: "fadeInUp 0.6s ease-out 0.2s both" }}
              >
                <div className="relative aspect-[3/4] max-w-md mx-auto">
     
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/30 to-rose-600/30 rounded-3xl blur-3xl transform scale-90" />
                  
                  <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                    <div className="aspect-[2/3] bg-gradient-to-b from-zinc-800 to-zinc-900 relative">
                      {/* Gonna replace with actual image */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Film className="w-20 h-20 text-zinc-700" />
                      </div>
                      
                      <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                        <Badge className="mb-3 bg-violet-600/80 hover:bg-violet-600/80 text-white border-0">
                          {featuredMovies[activeIndex].genre}
                        </Badge>
                        <h3 className="text-2xl font-bold mb-2">
                          {featuredMovies[activeIndex].title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{featuredMovies[activeIndex].rating}</span>
                          <span className="text-zinc-400">/ 10</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -left-8 top-1/4 w-24 aspect-[2/3] rounded-xl overflow-hidden border border-white/10 shadow-xl transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                    <div className="w-full h-full bg-gradient-to-b from-zinc-700 to-zinc-800" />
                  </div>
                  <div className="absolute -right-8 top-1/3 w-28 aspect-[2/3] rounded-xl overflow-hidden border border-white/10 shadow-xl transform rotate-6 hover:rotate-0 transition-transform duration-300">
                    <div className="w-full h-full bg-gradient-to-b from-zinc-700 to-zinc-800" />
                  </div>

                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                    {featuredMovies.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i === activeIndex 
                            ? "w-8 bg-violet-500" 
                            : "bg-white/30 hover:bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-zinc-500 to-transparent animate-pulse" />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />
          
          <div className="container mx-auto px-6 relative">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <Badge variant="outline" className="mb-4 border-violet-500/50 text-violet-400">
                Features
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Why You'll Love{" "}
                <span className="text-violet-400">MovieRec</span>
              </h2>
              <p className="text-lg text-zinc-400">
                We've built the smartest movie recommendation engine so you can spend 
                less time searching and more time watching.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <Card 
                  key={feature.title}
                  className="group bg-white/[0.02] border-white/10 hover:border-violet-500/50 hover:bg-white/[0.04] transition-all duration-300"
                  style={{ animation: `fadeInUp 0.5s ease-out ${0.1 * i}s both` }}
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600/20 to-rose-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <feature.icon className="w-6 h-6 text-violet-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                    <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Section */}
        <section className="py-32 relative">
          <div className="container mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <Badge variant="outline" className="mb-4 border-rose-500/50 text-rose-400">
                  Trending
                </Badge>
                <h2 className="text-4xl sm:text-5xl font-bold">
                  What's Hot Right Now
                </h2>
              </div>
              <Button 
                variant="ghost" 
                className="text-zinc-400 hover:text-white"
                asChild
              >
                <Link href="/movies">
                  View All
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
              {featuredMovies.map((movie, i) => (
                <Link
                  key={movie.id}
                  href={`/movies/${movie.id}`}
                  className="group"
                  style={{ animation: `fadeInUp 0.5s ease-out ${0.1 * i}s both` }}
                >
                  <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-white/10 bg-zinc-900">
                    {/* replace with real image (depends) */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-zinc-800 to-zinc-900">
                      <Film className="w-12 h-12 text-zinc-700" />
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{movie.rating}</span>
                        </div>
                        <Badge variant="secondary" className="bg-white/10 text-white text-xs">
                          {movie.genre}
                        </Badge>
                      </div>
                    </div>

                    <div className="absolute top-2 left-2 w-8 h-8 rounded-lg bg-black/60 backdrop-blur flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="mt-3 font-medium text-sm text-zinc-200 group-hover:text-white transition-colors line-clamp-1">
                    {movie.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-950/50 via-transparent to-rose-950/50" />
          
          <div className="container mx-auto px-6 relative">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-12 lg:p-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-600/20 rounded-full blur-[100px]" />
              
              <div className="relative max-w-2xl mx-auto text-center space-y-8">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                  Ready to Find Your Next{" "}
                  <span className="bg-gradient-to-r from-violet-400 to-rose-400 bg-clip-text text-transparent">
                    Favorite Movie?
                  </span>
                </h2>
                <p className="text-lg text-zinc-400">
                  Join over 120,000 movie lovers who've discovered their perfect 
                  watch with our AI-powered recommendations. It's free to start.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="group bg-white text-black hover:bg-zinc-200 h-14 px-8 text-base rounded-full"
                    asChild
                  >
                    <Link href="/register">
                      Create Free Account
                      <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="h-14 px-8 text-base rounded-full border-white/20 hover:bg-white/10"
                    asChild
                  >
                    <Link href="/login">
                      Sign In
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 border-t border-white/10">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2 font-bold text-xl">
                <Film className="w-6 h-6 text-violet-400" />
                <span>MovieRec</span>
              </div>
              <div className="flex items-center gap-8 text-sm text-zinc-500">
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms
                </Link>
              </div>
              <p className="text-sm text-zinc-600">
                © 2026 MovieRec. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
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