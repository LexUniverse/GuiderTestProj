export interface Book {
    id: number;
    title: string;
    author: string;
    date?: string;
    price: number;
    tags: string[];
    illustrator?: string;
}

export type SortOption = 'price' | 'author' | 'date' | null;
export type SortDirection = 'asc' | 'desc';