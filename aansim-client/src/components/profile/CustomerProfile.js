import React from 'react';
import { useParams } from 'react-router-dom';
import UserProfile from './UserProfile';

function CustomerProfile() {
  const { id } = useParams();
  return (
    <div className="customerProfile">
      <UserProfile id={id} />
    </div>
  )
}

export default CustomerProfile;
