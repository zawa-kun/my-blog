import { books } from "@/data/books";
import BookShelf from "@/features/book/bookShelf";

export default function BookPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Book</h1>
        <p className="text-gray-600 dark:text-gray-400">私が読んだ本</p>
      </div>
      <BookShelf books={books} />
    </main>
  );
}
