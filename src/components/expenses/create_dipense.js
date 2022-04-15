import React from 'react';
import FormDispense from './formDispense'
import { connect } from 'react-redux';
import { startAddDipense,addDipense } from '../../redux/actions/dipenses';



export class CreatePage extends React.Component {
    
    onSubmit = (dipense) => {
      this.props.startAddDipense(dipense);
       this.props.history.push('/dashboard');
    };
    render() {
      return (
        <div>
          <h1 className='formH1'>Formulaire d'ajout d'un bon dipense : </h1>
          <FormDispense
            onSubmit={this.onSubmit}
          />
        </div>
      );
    }
  }

  const mapDispatchToProps = (dispatch) => ({
   startAddDipense: (dipense) => dispatch(startAddDipense(dipense))
  });


  
  export default connect(undefined, mapDispatchToProps)(CreatePage);