import './style.css'

interface Item {
    type: 'book' | 'electronics' | 'clothing';
    id: string;
    price: number;
}

interface Book extends Item {
    type: 'book';
    title: string;
    author: string;
}

interface Electronics extends Item {
    type: 'electronics';
    item: string;
    model: string;
    warranty?: number;
}

interface Clothing extends Item {
    type: 'clothing';
    item: string;
    brand: string;
    size?: 'S' | 'M' | 'L';
}

type Product = Book | Electronics | Clothing;

class Collection<T> {
    constructor(public items: T[]) {}

    getAll(): T[] {
        return this.items;
    }

    filter(callback: (item: T) => boolean): T[] {
        return this.items.filter(callback);
    }
}