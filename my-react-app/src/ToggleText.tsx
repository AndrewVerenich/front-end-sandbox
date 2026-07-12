import {useState} from "react";

function ToggleText() {
  const [visible, setVisible] = useState(true);
  function toggle() {
    setVisible(!visible);
  }
  return (
      <>
        <p hidden={!visible}>Этот текст можно скрыть</p>
        <button onClick={toggle}>{visible ? 'Скрыть' : 'Показать'}</button>
      </>
  )
}

export default ToggleText;