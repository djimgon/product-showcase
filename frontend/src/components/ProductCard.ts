import type { Product } from '../types/product';

export function renderProduct(product: Product): string {
    let description: string;

    switch (product.type) {
        case 'book':
            description = `Book: ${product.title} by ${product.author}`;
            break;

        case 'electronics':
            description = `Electronics: ${product.item} - ${product.model}`;

            if (product.warranty !== undefined) {
                description += ` - Warranty: ${product.warranty} year(s)`;
            }
            break;

        case 'clothing':
            description = `Clothing: ${product.item} by ${product.brand}`;

            if (product.size !== undefined) {
                description += ` - Size ${product.size}`;
            }
            break;

        default:
            throw new Error(`Unknown product type: ${JSON.stringify(product)}`);
    }

    return `
        <div class="item" id="${product.id}">
            <h3>${description}</h3>
            <p class="price">${product.price}</p>
        </div>
    `;
}