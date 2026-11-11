import './style.css'

interface Item {
    type: 'book' | 'electronics' | 'clothing';
    id: string;
    price: number;
}