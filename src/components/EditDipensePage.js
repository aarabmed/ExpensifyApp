import React from 'react';
import { connect } from 'react-redux';
import FormDipense from '../components/formDispense'
import { startEditDipense } from '../actions/dipenses';

export class EditDipense extends React.Component{
    onSubmit = (dipense) => {
        this.props.startEditDipense(this.props.dipense.id, dipense);
        this.props.history.push('/');
    }
    render(){
        return (
            <FormDipense
                dipense={this.props.dipense}
                onSubmit={this.onSubmit}
            />
        )       
    }
}

const mapStateToProps = (state, props) => ({
    dipense: state.dipenses.find((dip) => dip.id === props.match.params.id)
  });
  const mapDispatchToProps = (dispatch, props) => ({
    startEditDipense: (id, dipense) => dispatch(startEditDipense(id, dipense)),
  });

export default connect(mapStateToProps,mapDispatchToProps)(EditDipense);
