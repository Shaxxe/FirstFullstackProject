import React, { useState,useRef } from "react";

const Login = ( {onLogin,username}) => {

  const userNameRef = useRef(null)
  const passwordRef = useRef(null)

  const onSubmitLogin = (e) => {
    e.preventDefault()
    console.log(userNameRef.current.value,passwordRef.current.value)
    onLogin(userNameRef.current.value,passwordRef.current.value)
  }
  if (username) return <p>Zaten Giriş Yapmışsın, Siteye Dönebilirsin</p>


  return (
    <div>
      <h2>Login</h2>
      
        <form onSubmit={onSubmitLogin}>
          <input
            type="text"
            placeholder="Username"
            //value={username}
            //onChange={(e) => setUsername(e.target.value)}
            ref={userNameRef}
          />
          <input
            type="password"
            placeholder="Password"
            //value={password}
            //onChange={(e) => setPassword(e.target.value)}
            ref={passwordRef}
          />
          <button type="submit">Login</button>
        </form>

    </div>
  );
};

export default Login;
