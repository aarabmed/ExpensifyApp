import React from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/actions/auth';
import { Button,Input} from 'antd';
import image from '../../public/dist/images/bg.jpg';
import Firebase, { withFirebase } from '../firebase';
import { history } from '../routers/AppRouter';
import { LoggedIn } from '../redux/actions/auth';

export class LoginPage extends React.Component{
  constructor(){
    super();
    this.state={
      image:null,
      loading: false,
      iconLoading: false,
      result:false
    }
    this.firebase = new Firebase();
  }
doLogin = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  this.setState({ loading: true, result:false },()=>{
    return this.firebase.doSignInWithEmailAndPassword(email,password).then(res=>{
     
      this.firebase.fetchUser(res.user.uid).then(({isAdmin})=>{
        const user = {
          id:res.user.uid,
          email:res.user.email,
          createdAt:res.user.metadata.creationTime,
          isAdmin
        }

        LoggedIn(user,()=>history.push('/dashboard'))
    
      })
       
    }
    ).catch(error=>{
      this.setState({result:true,loading:false,})
    })
  })};

  
  render(){
       const{result}=this.state;
      return(
      <div className="box-layout" style={{background:`url(${image})`, backgroundSize:'cover'}}>
        <div className="box-layout__box">
          <h3 className="box-layout__title" style={{fontWeight:'bold'}}>Connectez-vous sur l'application</h3>
          <div className="credential">
            <span>email: test@user.com</span>
            <span>password: 000000</span>
          </div>
          <Input type="email"  id="email"   placeholder="Your E-mail" style={{textAlign:'center',marginBottom:"3px"}} />
          <Input type="password"  id="password"   placeholder="your password" style={{textAlign:'center',marginBottom:"15px"}} />
          {result?<p style={{color:'red', fontSize:'1.2rem'}}>l'identifiant ou le mot de passe est invalide, veuillez réessayer </p>:null}
          <Button type="primary" loading={this.state.loading} onClick={this.doLogin} style={{width:'100%'}}>Entrer</Button>
        </div>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => ({
  startLogin: async (user) => dispatch(login(user)),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
