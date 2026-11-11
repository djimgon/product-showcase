export interface Item {
    type: 'book' | 'electronics' | 'clothing';
    id: string;
    price: number;
}

export interface Book extends Item {
    type: 'book';
    title: string;
    author: string;
}

export interface Electronics extends Item {
    type: 'electronics';
    item: string;
    model: string;
    warranty?: number;
}

export interface Clothing extends Item {
    type: 'clothing';
    item: string;
    brand: string;
    size?: 'S' | 'M' | 'L';
}

export type Product = Book | Electronics | Clothing;