import type { Product } from '../types/product';

export const productsData: Product[] = [
    {
        type: 'book',
        id: 'book-001',
        price: 29.99,
        title: 'Clean Code',
        author: 'Robert C. Martin'
    },
    {
        type: 'electronics',
        id: 'electronics-001',
        price: 1299,
        item: 'Laptop',
        model: 'MacBook Pro',
        warranty: 2
    },
    {
        type: 'clothing',
        id: 'clothing-001',
        price: 49.99,
        item: 'T-Shirt',
        brand: 'Nike',
        size: 'M'
    }
];