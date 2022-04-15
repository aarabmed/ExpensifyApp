import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { login,logout } from '../redux/actions/auth';
import Firebase from '../firebase';
import { history } from '../routers/AppRouter';

export const Header = ({ startLogout }) => {

const doLogout = () => {
  const firebase = new Firebase()

    return firebase.doSignOut().then(res=>{
      startLogout()
      history.push('/login')
    }
)};
  
return(
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <NavLink className="header__title" to="/dashboard">
        {/*<img src="" style={{width: '30px', float: 'left'}}/>*/}
           <h2 className='headH2'>COMPANY NAME</h2>
        </NavLink>
        <NavLink className="button--link" to="/create_dipense" style={{fontSize:'1.6rem',fontFamily:'arial black', color:'#fff',width: '186px',marginRight:'25px'}}>Crée bon-dipense</NavLink>
        <NavLink className="button--link" to="/create_commande" style={{fontSize:'1.6rem',fontFamily:'arial black', color:'#fff',width: '229px'}}>Crée bon-commande</NavLink>
        <button className="button button--link" onClick={doLogout} style={{fontSize:'1.6rem',fontFamily:'arial black',color:'#fff',width: '10%'}}>Logout</button>
      </div>
    </div>
  </header>
)};

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(logout())
});

export default connect(undefined, mapDispatchToProps)(Header);
