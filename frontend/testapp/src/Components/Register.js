import React, { useState } from "react";

const Register = ( {onRegister}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");


  const onSubmitRegister = (e) => {
    e.preventDefault()
    
    console.log(username)
    onRegister(username,email,password)
  }

  return (
    <div>
      <h2>Kayıt Olmak;</h2>
        <form onSubmit={onSubmitRegister}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <button type="submit">Kayıt Ol</button>
        </form>
          <p>Zaten Kayıtlısın Siteye Dönebilirsin</p>
    </div>
  );
};

export default Register;
