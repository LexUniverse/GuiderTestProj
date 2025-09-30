import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Book Store',
    description: 'Online bookstore with filtering and sorting',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    )
}