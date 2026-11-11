import type { Product } from './types/product';
import { Collection } from './models/Collection';
import { productsData } from './data/products';
import { renderProduct } from './components/ProductCard';

const products = new Collection<Product>(productsData);

const categoryMap: Record<string, Product['type'] | undefined> = {
    all: undefined,
    books: 'book',
    electronics: 'electronics',
    clothing: 'clothing'
};

function showProducts(type?: Product['type']): void {
    const output = document.querySelector<HTMLDivElement>('#output');

    if (!output) {
        return;
    }

    const filteredProducts = type
        ? products.filter(product => product.type === type)
        : products.getAll();

    output.innerHTML = filteredProducts
        .map(renderProduct)
        .join('');
}

function setActiveButton(activeId: string): void {
    const buttons = document.querySelectorAll<HTMLButtonElement>('.buttons button');

    buttons.forEach(button => {
        button.classList.toggle('active', button.id === activeId);
    });
}

export function initApp(): void {
    showProducts();
    setActiveButton('all');

    const buttons = document.querySelector('.buttons');

    buttons?.addEventListener('click', (event) => {
        const target = event.target;

        if (!(target instanceof HTMLButtonElement)) {
            return;
        }

        if (!Object.hasOwn(categoryMap, target.id)) {
            return;
        }

        showProducts(categoryMap[target.id]);
        setActiveButton(target.id);
    });
}