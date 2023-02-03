const helloFromButton = name => console.log(`App1: Hello ${name}`);
const Button = (props) => <button onClick={()=>helloFromButton(props.name)}>Hello from app1</button>;
export default Button;
