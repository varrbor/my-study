import "./styles.css";

function withLogger(Component) {
  return function Wrapped(props) {
    console.log("Render:", Component.name);
    return <Component {...props} />;
  };
}

function Hello() {
  return <div>Hello</div>;
}

export default HelloWithLogger = withLogger(Hello);
