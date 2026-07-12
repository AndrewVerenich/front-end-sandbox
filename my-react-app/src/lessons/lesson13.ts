interface Cat {
  type: 'cat';
  meow: () => void;
}

interface Dog {
  type: 'dog';
  bark: () => void;
}

type Pet = Cat | Dog;

function speak(pet: Pet){
  if (pet.type === 'cat') {
    pet.meow();
  } else if (pet.type === 'dog') {
    pet.bark()
  }
}

const cat: Cat = {type: 'cat', meow: () => {console.log("meowwww")}};

speak(cat)

export {}