const languages: string[] = ['Java', 'TypeScript', 'SQL'];
const scores: Array<number> = [90, 85, 100];
console.log(languages[0], scores.filter(i => i > 89).length);
console.log(scores.map(score => score * score).filter( value => value > 90));

export {};
