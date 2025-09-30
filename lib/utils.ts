import { Book, SortOption, SortDirection } from './types';

export const sortBooks = (
    books: Book[],
    sortBy: SortOption,
    direction: SortDirection
): Book[] => {
    if (!sortBy) return books;

    const sorted = [...books].sort((a, b) => {
        switch (sortBy) {
            case 'price':
                if (a.price === b.price) {
                    return a.author.localeCompare(b.author);
                }
                return direction === 'asc' ? a.price - b.price : b.price - a.price;

            case 'author':
                return direction === 'asc'
                    ? a.author.localeCompare(b.author)
                    : b.author.localeCompare(a.author);

            case 'date':
                if (!a.date || !b.date) return 0;
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);

                if (dateA.getTime() === dateB.getTime()) {
                    return a.author.localeCompare(b.author);
                }

                return direction === 'asc'
                    ? dateA.getTime() - dateB.getTime()
                    : dateB.getTime() - dateA.getTime();

            default:
                return 0;
        }
    });

    return sorted;
};

export const filterBooksByTags = (books: Book[], selectedTags: string[]): Book[] => {
    if (selectedTags.length === 0) return books;

    return books.filter(book =>
        selectedTags.every(tag => book.tags.includes(tag))
    );
};

export const getAllTags = (books: Book[]): string[] => {
    const tagsSet = new Set<string>();
    books.forEach(book => {
        book.tags.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
};