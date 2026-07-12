type Status = 'loading' | 'success' | 'error';
const status: Status = 'loading';

console.log(status);

type Id = number | string;

const numericId: Id = 500;
console.log(numericId);

const stringId: Id = "asd";
console.log(stringId);

export {};