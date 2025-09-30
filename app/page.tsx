'use client';

import { useState, useEffect, useMemo } from 'react';
import SortControls from '@/components/SortControls';
import TagFilter from '@/components/TagFilter';
import BookList from '@/components/BookList';
import booksData from '@/data/books.json';
import { Book, SortOption, SortDirection } from '@/lib/types';
import { sortBooks, filterBooksByTags, getAllTags } from '@/lib/utils';

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const validBooks = booksData.filter((book: any) => {
      if (!book.date) {
        console.error(`Book "${book.title}" is missing required field: date`);
        return false;
      }
      return true;
    });

    setBooks(validBooks as Book[]);

    const savedTags = sessionStorage.getItem('selectedTags');
    if (savedTags) {
      setSelectedTags(JSON.parse(savedTags));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('selectedTags', JSON.stringify(selectedTags));
  }, [selectedTags]);

  const allTags = useMemo(() => getAllTags(books), [books]);

  const displayedBooks = useMemo(() => {
    let filtered = filterBooksByTags(books, selectedTags);
    return sortBooks(filtered, sortBy, sortDirection);
  }, [books, selectedTags, sortBy, sortDirection]);

  const handleSortClick = (option: SortOption) => {
    if (sortBy === option) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortDirection('asc');
    }
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
        prev.includes(tag)
            ? prev.filter(t => t !== tag)
            : [...prev, tag]
    );
  };

  const handleReset = () => {
    setSortBy(null);
    setSortDirection('asc');
    setSelectedTags([]);
    sessionStorage.removeItem('selectedTags');
  };

  return (

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-slate-800 mb-12 text-center">
            Book Store
          </h1>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-wrap gap-6 items-center justify-between">
              <SortControls
                  sortBy={sortBy}
                  sortDirection={sortDirection}
                  onSortChange={handleSortClick}
              />

              <TagFilter
                  allTags={allTags}
                  selectedTags={selectedTags}
                  onTagToggle={handleTagToggle}
                  onReset={handleReset}
              />
            </div>
          </div>

          <BookList books={displayedBooks}/>
        </div>
      </div>
  );
}