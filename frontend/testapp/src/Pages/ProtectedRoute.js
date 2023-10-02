import React from "react";


const ProtectedRoute = ({ onLogout, username }) => {

  const onClickLogout = (e) => {
    e.preventDefault();
    onLogout();
  };

  return (
    <div>
      {username && (
        <>
          <button onClick={onClickLogout}>Çıkış Yap</button>
        </>
      )}
    </div>
  );
};

export default ProtectedRoute;
