import { Book } from "@/data/books";

type BookCardProps = {
  book: Book;
};

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="group flex flex-col">
      {/* Book cover */}
      <div
        className="relative aspect-[2/3] rounded-sm shadow-md group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-200 overflow-hidden"
        style={{ backgroundColor: book.color }}
      >
        {/* Spine shadow on the left */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black/20" />
        {/* Title on cover */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
          <p className="text-white text-xs font-bold text-center leading-tight line-clamp-5 drop-shadow">
            {book.title}
          </p>
        </div>
      </div>

      {/* Book info below cover */}
      <div className="mt-2 px-0.5 space-y-0.5">
        <p className="text-xs font-medium text-gray-800 dark:text-gray-200 leading-tight line-clamp-2">
          {book.title}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
          {book.author}
        </p>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={
                i < book.rating
                  ? "text-yellow-400 text-xs"
                  : "text-gray-300 dark:text-gray-600 text-xs"
              }
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
