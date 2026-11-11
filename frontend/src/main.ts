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