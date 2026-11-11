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
                <h3>Electronics: ${product.item} - ${product.model}${product.warranty !== undefined
                    ? ` - Warranty: ${product.warranty} year(s)`
                    : ''}</h3>
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

const products = new Collection<Product>([
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
]);

const output = document.querySelector<HTMLDivElement>('#output');

function showProducts(type?: Product['type']): void {
    if (!output) {
        return;
    }

    const filteredProducts = type
        ? products.filter(product => product.type === type)
        : products.getAll();

    const html = filteredProducts
        .map(renderProduct)
        .join('');

    output.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
    showProducts();
    setActiveButton('all');

    document.querySelector('#all')?.addEventListener('click', () => {
        showProducts();
        setActiveButton('all');
    });

    document.querySelector('#books')?.addEventListener('click', () => {
        showProducts('book');
        setActiveButton('books');
    });

    document.querySelector('#electronics')?.addEventListener('click', () => {
        showProducts('electronics');
        setActiveButton('electronics');
    });

    document.querySelector('#clothing')?.addEventListener('click', () => {
        showProducts('clothing');
        setActiveButton('clothing');
    });
});

function setActiveButton(activeId: string): void {
    const buttons = document.querySelectorAll<HTMLButtonElement>('.buttons button');

    buttons.forEach(button => {
        button.classList.toggle('active', button.id === activeId);
    });
}