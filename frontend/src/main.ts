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
    constructor(public items: T[]) {
    }

    getAll(): T[] {
        return this.items;
    }

    filter(callback: (item: T) => boolean): T[] {
        return this.items.filter(callback);
    }
}

// Отдельная функция, вне класса
function renderProduct(product: Product): string {
    switch (product.type) {
        case 'book':
            return `
                <div class="item" id="${product.id}">
                    <h3>Book: ${product.title} by ${product.author}</h3>
                    <p class="price">${product.price}</p>
                </div>
            `;

        case 'electronics':
            return `
                <div class="item" id="${product.id}">
                    <h3>
                        Electronics: ${product.item} - ${product.model}
                        ${product.warranty !== undefined
                        ? ` - Warranty: ${product.warranty} year(s)`
                        : ''}
                    </h3>
                    <p class="price">${product.price}</p>
                </div>
            `;

        case 'clothing':
            return `
                <div class="item" id="${product.id}">
                    <h3>Clothing: ${product.item} by ${product.brand}${product.size !== undefined
                        ? ` - Size ${product.size}`
                        : ''}</h3>
                    <p class="price">${product.price}</p>
                </div>
            `;

        default:
            throw new Error(`Unknown product type: ${JSON.stringify(product)}`);
    }
}