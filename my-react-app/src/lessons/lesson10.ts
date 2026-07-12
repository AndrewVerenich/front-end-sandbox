function firstElement<T>(items: T[]): T | undefined {
  return items[0];
}

console.log(firstElement([undefined, 3, 5, null, undefined]));
console.log(firstElement([null, "bt", "asd"]))

export {};