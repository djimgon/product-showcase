import './style.css'
import type { Product } from './types/product';
import { Collection } from './models/Collection';
import { productsData } from './data/products';

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

const products = new Collection<Product>(productsData);

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