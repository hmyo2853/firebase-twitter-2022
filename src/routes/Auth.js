import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

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
  const onSubmit = (e) => {
    e.preventDefault();
  };
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
        <input type="submit" value="log in" />
      </form>
      <div>
        <button>Continue with Googlee</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
