'use client';

import { ChevronUp } from 'lucide-react';
import { SortOption, SortDirection } from '@/lib/types';

interface SortControlsProps {
    sortBy: SortOption;
    sortDirection: SortDirection;
    onSortChange: (option: SortOption) => void;
}

export default function SortControls({ sortBy, sortDirection, onSortChange }: SortControlsProps) {
    const sortOptions: Array<{ value: SortOption; label: string }> = [
        { value: 'price', label: 'Price' },
        { value: 'author', label: 'Author' },
        { value: 'date', label: 'Date' },
    ];

    return (
        <div className="flex gap-4 flex-wrap">
            {sortOptions.map(option => (
                <button
                    key={option.value}
                    onClick={() => onSortChange(option.value)}
                    className="group flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:bg-slate-50"
                    style={{
                        color: sortBy === option.value ? '#405D72' : '#405D72',
                        opacity: sortBy === option.value ? 1 : 0.5
                    }}
                >
                    <span className="font-medium capitalize">{option.label}</span>
                    <div
                        className="transition-transform duration-300"
                        style={{
                            transform: sortBy === option.value && sortDirection === 'desc'
                                ? 'rotate(180deg)'
                                : 'rotate(0deg)'
                        }}
                    >
                        <ChevronUp size={20} />
                    </div>
                </button>
            ))}
        </div>
    );
}