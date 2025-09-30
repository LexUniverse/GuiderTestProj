'use client';

import { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';

interface TagFilterProps {
    allTags: string[];
    selectedTags: string[];
    onTagToggle: (tag: string) => void;
    onReset: () => void;
}

export default function TagFilter({ allTags, selectedTags, onTagToggle, onReset }: TagFilterProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.tag-menu-container')) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="flex gap-3 items-center">
            <div className="tag-menu-container relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    <Filter size={18} />
                    Tags
                    {selectedTags.length > 0 && (
                        <span className="bg-white text-blue-500 px-2 py-0.5 rounded-full text-sm font-semibold">
              {selectedTags.length}
            </span>
                    )}
                </button>

                {isOpen && (
                    <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-slate-200 p-4 min-w-64 z-10 max-h-96 overflow-y-auto">
                        {allTags.map(tag => (
                            <label
                                key={tag}
                                className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 rounded cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedTags.includes(tag)}
                                    onChange={() => onTagToggle(tag)}
                                    className="w-4 h-4 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
                                />
                                <span className="text-slate-700">{tag}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <button
                onClick={onReset}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
                <X size={18} />
                Reset Rules
            </button>
        </div>
    );
}