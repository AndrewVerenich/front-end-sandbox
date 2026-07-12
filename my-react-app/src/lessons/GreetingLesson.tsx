interface GreetingProps {
  name: string;
  age?: number;
}

function GreetingLesson({name, age}: GreetingProps) {
  return (
      <p>
        Привет, {name}! {age !== undefined && `Тебе ${age} года`}
      </p>
  )
}

export default GreetingLesson;