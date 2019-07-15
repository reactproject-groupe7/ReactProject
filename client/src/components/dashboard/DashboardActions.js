import React from 'react';
import { Link } from 'react-router-dom';
const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='./edit-profile' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary' /> Editer mon profil
      </Link>

      <Link to='./add-experience' className='btn btn-light'>
        <i className='fab fa-black-tie text-primary' /> Ajouter une expérience
      </Link>
      <Link to='./add-education' className='btn btn-light'>
        <i className='fas fa-graduation-cap text-primary' /> Ajouter un établissement/cursus
      </Link>
    </div>
  );
};

export default DashboardActions;