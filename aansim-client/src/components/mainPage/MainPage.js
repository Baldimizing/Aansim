import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import { USERS } from '../../data/users';

function MainPage() {
  const navigate = useNavigate();

  const handleClick = (user) => {
    const path = user.type === '판매자' ? 'salesProfile' : 'customerProfile';
    navigate(`/${path}/${user.id}`);
  };  

  return (
    <div className="mainPage">
      <div className="userList">
        {USERS.map((user) => (
            <div key={user.id} className="userListItem">
                <h2>{user.type}</h2>
                <p>{user.introduction}</p>
                <button onClick={() => handleClick(user)}>View Profile</button>
            </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;