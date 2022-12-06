import React, { useState } from "react";
import { authService } from "../fbase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (e) => {
    // change event target에서 name={}, value={}값이 email, password일 때 state를 변화시킨다.
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPwd(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(email, pwd);
      } else {
        data = await authService.signInWithEmailAndPassword(email, pwd);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  // 버튼 state를 바꾸는 toggle handler
  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          required
          value={pwd}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log in"} />
        {error}
        <span onClick={toggleAccount}>
          {newAccount ? "Sign In" : "Create Account"}
        </span>
      </form>
      <div>
        <button>Continue with Googlee</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
