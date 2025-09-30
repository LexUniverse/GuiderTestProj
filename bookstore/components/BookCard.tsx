import { Book } from '@/lib/types';

interface BookCardProps {
    book: Book;
}

export default function BookCard({ book }: BookCardProps) {
    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Date unknown';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-2">
                {book.title}
            </h3>
            <p className="text-slate-600 mb-1">
                by <span className="font-semibold">{book.author}</span>
            </p>
            {book.illustrator && (
                <p className="text-slate-500 text-sm mb-2">
                    Illustrated by {book.illustrator}
                </p>
            )}
            <p className="text-slate-500 text-sm mb-4">
                {formatDate(book.date)}
            </p>
            <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-blue-600">
          ${book.price}
        </span>
                <div className="flex flex-wrap gap-1">
                    {book.tags.slice(0, 2).map(tag => (
                        <span
                            key={tag}
                            className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"
                        >
              {tag}
            </span>
                    ))}
                    {book.tags.length > 2 && (
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
              +{book.tags.length - 2}
            </span>
                    )}
                </div>
            </div>
        </div>
    );
}