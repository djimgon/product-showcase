export class Collection<T> {
    constructor(public items: T[]) {}

    getAll(): T[] {
        return this.items;
    }

    filter(callback: (item: T) => boolean): T[] {
        return this.items.filter(callback);
    }
}