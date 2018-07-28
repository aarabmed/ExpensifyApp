import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <NavLink className="header__title" to="/dashboard">
          <img src="https://image.ibb.co/em6GRJ/logo_app.png" style={{width: '30px', float: 'left'}}/>
          <h2 className='headH2'>Société IMMAR Berkane</h2>
        </NavLink>
        <NavLink className="button--link" to="/create_dipense" style={{fontSize:'1.6rem',fontFamily:'arial black', color:'#fff',width: '186px',marginRight:'25px'}}>Crée bon-dipense</NavLink>
        <NavLink className="button--link" to="/create_commande" style={{fontSize:'1.6rem',fontFamily:'arial black', color:'#fff',width: '229px'}}>Crée bon-commande</NavLink>
        <button className="button button--link" onClick={startLogout} style={{fontSize:'1.6rem',fontFamily:'arial black',color:'#fff',width: '10%'}}>Logout</button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
