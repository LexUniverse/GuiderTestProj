import { Book } from '@/lib/types';
import BookCard from './BookCard';

interface BookListProps {
    books: Book[];
}

export default function BookList({ books }: BookListProps) {
    if (books.length === 0) {
        return (
            <div className="text-center py-16 text-slate-500">
                <p className="text-xl">No books found matching your filters</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map(book => (
                <BookCard key={book.id} book={book} />
            ))}
        </div>
    );
}