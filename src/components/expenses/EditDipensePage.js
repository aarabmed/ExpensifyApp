import React from 'react';
import { connect } from 'react-redux';
import FormDipense from './formDispense'
import { startEditDipense } from '../../redux/actions/dipenses';

export class EditDipense extends React.Component{
    onSubmit = (dipense) => {
        startEditDipense(this.props.match.params.id, dipense).then(()=>{
            this.props.history.push('/dashboard');
        })
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

export default connect(mapStateToProps,null)(EditDipense);
