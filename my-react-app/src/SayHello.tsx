function SayHello() {

  function handleClick() {
    alert("Привет!");
  }
  return <button onClick={handleClick}>Click me</button>
}

export default SayHello;