import React from 'react';
import { useParams } from 'react-router-dom';
import UserProfile from './UserProfile';

function SalesProfile() {
  const { id } = useParams();
  return (
    <div className="salesProfile">
      <UserProfile id={id} />
    </div>
  )
}

export default SalesProfile;
