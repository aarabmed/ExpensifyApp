import React from 'react';
import FormCommande from './formCommand'
import { connect } from 'react-redux';
import { startAddCommand } from '../../redux/actions/commands';



export class CreatePage extends React.Component {
    
    onSubmit = (command) => {
      this.props.startAddCommand(command);
       this.props.history.push('/dashboard');
    };
    render() {
      return (
        <div>
          <h1 className='formH1'>Formulaire d'ajout d'un bon de commande : </h1>
          <FormCommande
            onSubmit={this.onSubmit}
          />
        </div>
      );
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    startAddCommand: (command) => dispatch(startAddCommand(command))
  });


  
  export default connect(undefined, mapDispatchToProps)(CreatePage);