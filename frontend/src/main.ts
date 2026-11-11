import './style.css'
import type { Product } from './types/product';
import { Collection } from './models/Collection';
import { productsData } from './data/products';
import { renderProduct } from './components/ProductCard';

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

    const buttons = document.querySelector('.buttons');

    buttons?.addEventListener('click', (event) => {
        const target = event.target;

        if (!(target instanceof HTMLButtonElement)) {
            return;
        }

        const categoryMap: Record<string, Product['type'] | undefined> = {
            all: undefined,
            books: 'book',
            electronics: 'electronics',
            clothing: 'clothing'
        };

        if (!Object.hasOwn(categoryMap, target.id)) {
            return;
        }

        showProducts(categoryMap[target.id]);
        setActiveButton(target.id);
    });
});

function setActiveButton(activeId: string): void {
    const buttons = document.querySelectorAll<HTMLButtonElement>('.buttons button');

    buttons.forEach(button => {
        button.classList.toggle('active', button.id === activeId);
    });
}