import Link from "next/link";
import { Film } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 border-t border-white/10 bg-black">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-bold text-xl text-white">
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
            © {new Date().getFullYear()} MovieRec. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}