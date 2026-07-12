interface Product {
  id: number;
  name: string;
  discount?: number;
}

const laptop: Product = { id: 1, name: 'Laptop' };
const phone: Product = { id: 2, name: 'Phone', discount: 10 };

console.log(laptop);
console.log(phone);

export {};