import { firebase } from '../firebase/firebase';
import { history } from '../routers/AppRouter';
import {auth} from '../firebase/firebase'
import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
import { Button,Input} from 'antd';
import image from '../../public/dist/images/bg.jpg';

export class LoginPage extends React.Component{
  constructor(){
    super();
    this.state={
      image:null,
      loading: false,
      iconLoading: false,
      result:false
    }
  }

startLogin = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  this.setState({ loading: true, result:false },()=>{
    return auth.signInWithEmailAndPassword(email,password).then(
      ()=>history.push('/dashboard')
    ).catch(error=>{
      this.setState({result:true,loading:false,})
    })}
  )};

  
  render(){
       const{result}=this.state;
      return(
      <div className="box-layout" style={{background:`url(${image})`, backgroundSize:'cover'}}>
        <div className="box-layout__box">
          <h3 className="box-layout__title" style={{fontWeight:'bold'}}>Connectez-vous sur l'application</h3>
          <Input type="email"  id="email"   placeholder="Your E-mail" style={{textAlign:'center',marginBottom:"3px"}} />
          <Input type="password"  id="password"   placeholder="your password" style={{textAlign:'center',marginBottom:"15px"}} />
          {result?<p style={{color:'red', fontSize:'1.2rem'}}>l'identifiant ou le mot de passe est invalide, veuillez réessayer </p>:null}
          <Button type="primary" loading={this.state.loading} onClick={this.startLogin} style={{width:'100%'}}>Entrer</Button>
        </div>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => ({
  startLogin: (login,password) => dispatch(startLogin(login,password)),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
