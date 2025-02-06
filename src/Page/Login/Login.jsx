import React, { useState } from "react";
import './Login.css';
import Logo from '../../assets/logo.png';
import { login,signup } from "../../firebase";
import spinner from '../../assets/netflix_spinner.gif';


const Login = () => {
  const [signState, setSignstate] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const useAuth = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading before async request

    try {
      if (signState === "Sign In") {
        await login(email, password);
      } else {
        await signup(name, email, password); 
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return loading ? (
    <div className="login-spinner">
      <img src={spinner} alt="Loading..." />
    </div>
  ) : (
    <div className="login">
      <img src={Logo} alt="Netflix Logo" className="login-logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === "Sign Up" && (
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={useAuth} type="submit">
            {signState}
          </button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label>Remember me</label>
            </div>
            <p>Need help?</p>
          </div>
          <div>
            {signState === "Sign In" ? (
              <p className="sign">
                New to Netflix?{" "}
                <span onClick={() => setSignstate("Sign Up")}>Sign Up</span>
              </p>
            ) : (
              <p className="sign">
                Already have an account?{" "}
                <span onClick={() => setSignstate("Sign In")}>Sign In</span>
              </p>
            )}
          </div>
        </form>
      </div>

    </div>
  );
};

export default Login;
