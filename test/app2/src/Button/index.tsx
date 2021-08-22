import "./style.scss";
const Button = () => <button className="funny-button">Hello from app2</button>;

Button.sayHello = () => {
  console.log("hello");
};
export default Button;
