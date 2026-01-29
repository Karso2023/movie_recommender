import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface MovieCardProps {
  title: string;
  year: string;
  imdbID: string;
  poster: string;
}

export function MovieCard({ title, year, imdbID, poster }: MovieCardProps) {
  return (
    <Link href={`/movies/${imdbID}`}>
      <Card className="overflow-hidden hover:ring-2 hover:ring-primary transition-all cursor-pointer h-full">
        <div className="aspect-[2/3] relative bg-muted">
          {poster && poster !== "N/A" ? (
            <img
              src={poster}
              alt={title}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-muted-foreground text-sm">
              No Poster
            </div>
          )}
        </div>
        <CardContent className="p-3">
          <p className="font-medium text-sm line-clamp-2">{title}</p>
          <p className="text-xs text-muted-foreground">{year}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
