import { Book } from "@/data/books";
import BookCard from "./bookCard";

type BookShelfProps = {
  books: Book[];
};

export default function BookShelf({ books }: BookShelfProps) {
  const categories = [...new Set(books.map((b) => b.category))];

  return (
    <div className="space-y-14">
      {categories.map((category) => {
        const categoryBooks = books.filter((b) => b.category === category);
        return (
          <div key={category}>
            <h2 className="text-xl font-semibold mb-5 text-gray-800 dark:text-gray-200">
              {category}
            </h2>
            {/* Shelf */}
            <div className="relative pb-5">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {categoryBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
              {/* Shelf board */}
              <div className="absolute bottom-0 left-0 right-0 h-3 bg-amber-900/20 dark:bg-amber-800/30 rounded-sm shadow-inner" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
