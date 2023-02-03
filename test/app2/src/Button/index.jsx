import "./style.scss";
const helloFromButton = name => console.log(`App2: Hello ${name}`);
const Button = (props) => <button className="funny-button" onClick={()=>helloFromButton(props.name)}>Hello from app2</button>;

export default Button;