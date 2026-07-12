import {useTheme} from '../context/ThemeContext';
import GreetingLesson from "../lessons/GreetingLesson.tsx";

function HomePage() {
  const {theme} = useTheme();

  return (
      <div>
        <h1>Главная</h1>
        <p>Добро пожаловать в React-песочницу!</p>
        <GreetingLesson name="Andrew" age={34}/>
        <p>Сейчас тема: {theme}</p>
      </div>

  );
}

export default HomePage;
