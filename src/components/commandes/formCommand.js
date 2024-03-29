import React from 'react';

import {Icon,Form, Input, Button,Radio,InputNumber} from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;



class FormCommandPage extends React.Component {
  constructor(props){ 
    super(props)
    this.state={
      companyName:props.command? props.command.companyName:'',
      articleRowCount:props.command?props.command.articleRowCount:[0],
      
      
      ArticleName:props.command?props.command.ArticleName:[''],
      NombreArticle:props.command?props.command.NombreArticle:[0],
      PrixUnitaire:props.command?props.command.PrixUnitaire:[0],
      MontantArticle:props.command?props.command.PrixUnitaire:[0],
      
      MontantTotal:props.command?props.command.MontantTotal:0,
      MontantValueLettres:props.command?props.command.MontantValueLettres:'',

      PayModeValue:props.command? props.command.PayModeValue:'espece', 
      AccountNumValue:props.command? props.command.AccountNumValue:'',
      payor:props.command? props.command.payor:'',
      maxRows:props.command?props.command.maxRows:0,
      calendarFocused: false,
      edit:props.command? true : false,
    }
  }
  
  //====================================== fornisseur Functions ===================================
      
    ArticleNameOnchange=(idx)=>(e) => {
        
        const newArticleName = this.state.ArticleName.map((article, sidx) => {

          if (idx !==sidx) return article;
           return e.target.value 
        }); 
        this.setState({ArticleName: newArticleName });
        
    }


    MontantInLetters=(montant)=>{
      var writtenForm = require('written-number');
      writtenForm.defaults.lang = 'fr'
      if(montant!=0){
      var wf = writtenForm(montant);
      return wf 
      }
      else return ''
    }

    PrixUnitaireOnchange=(idx)=>(e)=>{
        const newPrixUnitaire = this.state.PrixUnitaire.map((article, sidx) => {
          if (idx !== sidx) return article;
          return Number(e.target.value)
        });
        
        
         const newMontantArticle = this.state.MontantArticle.map((article, sidx) => {
          if (idx !== sidx) return article;
                return document.getElementById(`montantArticle[${idx}]`).value = Number(e.target.value)*(this.state.NombreArticle[idx]!==''?this.state.NombreArticle[idx]:0)    
          });
        this.setState({
          PrixUnitaire: newPrixUnitaire,
          MontantArticle:newMontantArticle
         },()=>this.setState({
          MontantTotal:this.state.MontantArticle.reduce((a,b)=>a+b,0),
          MontantValueLettres:this.MontantInLetters(this.state.MontantArticle.reduce((a,b)=>a+b,0))
          }));
          
    }




     NombreArticleOnchange=(idx)=>(e)=>{
        const newNombreArticle = this.state.NombreArticle.map((article, sidx) => {
          if (idx !== sidx) return article;
          return e.target.value
        });
        
        const newMontantArticle = this.state.MontantArticle.map((article, sidx) => {
          if (idx !== sidx) return article;
               return document.getElementById(`montantArticle[${idx}]`).value = Number(e.target.value)*(this.state.PrixUnitaire[idx]!==''?this.state.PrixUnitaire[idx]:0)
          
        });

        this.setState({
          NombreArticle: newNombreArticle,
          MontantArticle:newMontantArticle
        },()=>this.setState({
          MontantTotal:this.state.MontantArticle.reduce((a,b)=>a+b,0),
          MontantValueLettres:this.MontantInLetters(this.state.MontantArticle.reduce((a,b)=>a+b,0))
        }))
    
    }

         
    

    addLigneCommand = () => {

        const {getFieldValue } = this.props.form;
        const { form } = this.props;
        const Ckeys = form.getFieldValue('Ckeys');

        var val = Ckeys.length-1;
        this.props.form.validateFields([`name[${val}]`,`prixUni[${val}]`,`nombreArticle[${val}]`,`montantArticle[${val}]`],
        (err, values) =>{
        if (err) {
               
              // can use data-binding to get         
    
        } else {
  
          const { form } = this.props;
          this.setState({
            maxRows:this.state.maxRows + 1,
            ArticleName: this.state.ArticleName.concat([this.state.ArticleName]),
            NombreArticle: this.state.NombreArticle.concat(['']),
            PrixUnitaire: this.state.PrixUnitaire.concat(['']),
            MontantArticle: this.state.MontantArticle.concat(['']),
            //MontantTotal: this.state.MontantTotal.concat(['']),
            
             },()=>{
             this.setState({articleRowCount:this.state.articleRowCount.concat(this.state.uuidC)})
             const nextCkeys = Ckeys.concat(this.state.uuidC);
             form.setFieldsValue({
                        Ckeys: nextCkeys,
              });
            })
        }
      });
    }

    removeLigneCommand = (k) => {
      const { form } = this.props;
      // can use data-binding to get
      const Ckeys = form.getFieldValue('Ckeys');
      form.setFieldsValue({
        Ckeys: Ckeys.filter(key => key !== k),
      })
      
      const newValue = this.state.articleRowCount.filter((elm,index)=>index!==k)
      const articleRowCount= newValue.map((elm,index)=>{
            if(elm===index){
              return elm
            }
            else{
              return elm-1
            }  
        })
   //    


      this.setState({
        maxRows:this.state.maxRows-1,
        MontantTotal:this.state.MontantArticle.filter((elm,index)=>index!==k).reduce((a,b)=>a+b,0)},()=>{
        this.setState({
          articleRowCount:articleRowCount,
          ArticleName: this.state.ArticleName.filter((elm,index)=>index!==k),
          NombreArticle: this.state.NombreArticle.filter((elm,index)=>index!==k),
          PrixUnitaire: this.state.PrixUnitaire.filter((elm,index)=>index!==k),
          MontantArticle: this.state.MontantArticle.filter((elm,index)=>index!==k),
          })
        });
    }
    

      ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //================================================== Autres inputs ===========================================
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////


      PayModeOnChange=(e)=>{
        const PayModeValue = e.target.value
        this.setState(()=>({
          PayModeValue
        }));
      }

      AccountNumOnChange=(e)=>{
        const AccountNumValue = e.target.value
        this.setState(()=>({
          AccountNumValue
        }))
      }
      
      AccountPayerOnChange=(e)=>{
        const payor = e.target.value
        this.setState(()=>({
          payor
        }))
      }

      companyNameOnChange=(e)=>{
        const companyName = e.target.value
        this.setState(()=>({
          companyName
        }))
      }
    

      ClientTypeOnChange=(e)=>{
          const ClientType = e.target.value
          this.setState(()=>({
            ClientType
          }))
      }
    


    onFocusChange = ({ focused }) => {
      this.setState(() => ({ calendarFocused: focused }));
    };


    //////////////////////////////========= Submit Forms =======///////////////////////////////////////////////
     
    onSubmit=(e)=>{
    e.preventDefault();
    
    const { form } = this.props;

    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
                this.props.onSubmit(
                  {          
                    companyName:this.state.companyName,
                    createdAt: moment().valueOf(),
                    articleRowCount:this.state.articleRowCount,

                    ArticleName:this.state.ArticleName,
                    NombreArticle:this.state.NombreArticle,
                    PrixUnitaire:this.state.PrixUnitaire,
                    MontantArticle:this.state.MontantArticle,
                    MontantTotal:this.state.MontantTotal,

                    PayModeValue:this.state.PayModeValue, 
                    AccountNumValue:this.state.AccountNumValue,
                    payor:this.state.payor,

                    MontantTotal:this.state.MontantTotal,
                    maxRows:this.state.maxRows,
                    MontantValueLettres:this.state.MontantValueLettres
                })
              }

    
            form.resetFields();   
      
    }); 

          

    
  }
  
  render() {

 

    const { getFieldDecorator, getFieldValue,setFieldsValue } = this.props.form;
    ////////////////////////////////////////////// MODE PAIMENT ///////////////////
      const payModeA=(
        <div style={{marginTop: '15px'}}>
        <label className='remislabelCommand' style={{ display:'inline-block'}}>► Autre:</label>
                <FormItem className='remisFieldCommand'>
                {getFieldDecorator('accountNum', {
                    initialValue:this.state.AccountNumValue,
                    rules: [{ required: true, message: 'Svp, entrez une valeur valide!' , whitespace: true }]
                })(
                    <Input  onChange={this.AccountNumOnChange} />
                )}
       </FormItem> 
       </div>
      )

      const payModeC=(
        <div style={{marginTop: '15px'}}>
          <label className='remislabelCommand' style={{display:'inline-block'}}>► Payeur:</label>
          <FormItem className='remisFieldCommand'>
                {getFieldDecorator('payer', {
                    initialValue:this.state.edit ?this.state.payor:'',
                    rules: [{ required: true, message: 'Svp, entrez un nom de payeur valide!' , whitespace: true }]
                })(
                    <Input  onChange={this.AccountPayerOnChange} />
                )}
            </FormItem>
            <label className='remislabelCommand' style={{display:'inline-block'}}>► Numéro de compte:</label>
              <FormItem className='remisFieldCommand'>
                {getFieldDecorator('accountNum', {
                    initialValue:this.state.AccountNumValue,
                    rules: [{ required: true, message: 'Svp, entrez un numéro de compte valide!' , whitespace: true }]
                })(
                    <Input  onChange={this.AccountNumOnChange} />
                )}
          </FormItem>
       </div>
      )

      const payModeE=(
        <div style={{marginTop: '15px'}}>
        <label className='remislabelCommand' style={{display:'inline-block'}}>► Payeur:</label>
          <FormItem className='remisFieldCommand'>
                {getFieldDecorator('payer', {
                    initialValue:this.state.edit ?this.state.payor:'',
                    rules: [{ required: true, message: 'Svp, entrez un nom de payeur valide!' , whitespace: true }]
                })(
                    <Input  onChange={this.AccountPayerOnChange} />
                )}
        </FormItem>
        <label className='remislabelCommand' style={{display:'inline-block'}}>► Numéro de Compte:</label>
           <FormItem className='remisFieldCommand'>
                {getFieldDecorator('accountNum', {
                    initialValue:this.state.edit ? this.state.AccountNumValue :'',
                    rules: [{ required: true, message: 'Svp, entrez un nom de payeur valide!' , whitespace: true }]
                })(
                    <Input  onChange={this.AccountNumOnChange} />
                )}
        </FormItem>
       
       </div>
      )

      const payModeCh=(
        <div style={{marginTop: '15px'}}>
          <label className='remislabelCommand' style={{display:'inline-block'}}>► Payeur:</label>
             <FormItem className='remisFieldCommand'>
                    {getFieldDecorator('payer', {
                        initialValue:this.state.edit ? this.state.payor:'',
                        rules: [{ required: true, message: 'Svp, entrez un nom de payeur valide!' , whitespace: true }]
                    })(
                        <Input  onChange={this.AccountPayerOnChange} />
                    )}
          </FormItem>
          <label className='remislabelCommand' style={{display:'inline-block'}}>► Numéro de chéque:</label>
             <FormItem className='remisFieldCommand'>
                    {getFieldDecorator('accountNum', {
                    initialValue:this.state.edit ?this.state.AccountNumValue:'',
                    rules: [{ required: true, message: 'Svp, entrez un numéro de chéque valide!' , whitespace: true }]
                    })(
                    <Input  onChange={this.AccountNumOnChange} />
                    )}
          </FormItem>

       </div>
      )
        
       //====================================================Article section =========== 
       getFieldDecorator('Ckeys', {initialValue:this.state.articleRowCount});
      
        const Ckeys = getFieldValue('Ckeys');
     
        const article = (
        <div className="ant-row" style={{marginBottom:'2rem', width:'100%'}}>
            {Ckeys.map((k,index)=>{
            return (
            <div key={k} style={{display: 'flex'}}>
                <FormItem  
                    className="inputFormCommand"
                    > 
                    {getFieldDecorator(`name[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: "Svp! entrez un nom valide",
                        }],
                        })( 
                            
                        <Input  onChange={this.ArticleNameOnchange(index)}  placeholder="Nom d'article"  /> 
                    )}  
                </FormItem>

                <FormItem 
                    className="inputFormCommand"     
                    > 
                    {getFieldDecorator(`prixUni[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                        required: true,
                        whitespace: true,
                        message: "Svp! entrez un prix unitaire valide",
                        }],})(      
                        <Input  type='number' onChange={this.PrixUnitaireOnchange(index)} placeholder="prix unitaire"   /> 
                    )}       
                </FormItem>
        
                <FormItem 
                className="inputFormCommand"  
                >
                
                    {getFieldDecorator(`nombreArticle[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                        required: true,
                        whitespace: true,
                        message: "Svp! entrez une quantitée valide",
                    }],})(      
                        <Input  type='number' onChange={this.NombreArticleOnchange(index)} placeholder="Quantité"  /> 
                    )} 
                        
                </FormItem>
                <Input  className="inputFormCommand" id={`montantArticle[${k}]`} value={this.state.MontantArticle[index]===0?'':this.state.MontantArticle[index]} placeholder="Montant" style={{marginTop:'3px'}} disabled />

                {Ckeys.length >= 0 ? (
                <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                disabled={Ckeys.length === 0}
                onClick={() => this.removeLigneCommand(k)}
                style={{margin:'0.5rem'}}
                />
                ) : null}
            </div>       
            )
            })}
            <FormItem  style={{width:'100%', margin:'0' }}>
            <Button type="dashed"   onClick={this.addLigneCommand} style={{ width: '100%' }}>
            <Icon type="plus" /> Ajouter une ligne
            </Button>
            </FormItem> 
        </div>
        )


  
    //================== avatar section =======================

    return (    
     <Form onSubmit={this.onSubmit}  ref='form' >
                  
      <div className="ant-row ant-form-item" >     
          <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-xs-offset-0 "/* ant-col-sm-15 ant-col-sm-offset-4 */ >      
            <div className="formContainer">
              <FormItem  
                style={{width:'100%',margin:'0px',margin: '0px' ,marginBottom:'0.1%'}}
                className="inputFormFornis"
                required={false}>
                    {getFieldDecorator('NomEntreprise', {
                      validateTrigger: ['onChange', 'onBlur'],
                      rules: [{
                        required: true,
                        whitespace: true,
                        message: "Svp! saisie une valeure valide",
                      }],})(      
                        <Input size="large" 
                                  onChange={this.companyNameOnChange}
                                  placeholder="Nom de personne ou d'entreprise" 
                                  style={{width: '35%', height: '40px'}}/>
                    )}     
              </FormItem> 
                <div style={{margin:'2.5vh auto 1vh'}}>{article}</div>
                <div style={{width:'100%'}}>                       
                      <label className="fontzise" style={{ width:'27%', display:'inline-block',marginLeft:'13%'}}>► Montant en chiffres:</label>
                              <InputNumber min={0} max={100000000000}  value={this.state.MontantTotal}  style={{width:'60%'}} disabled/>
                      <label className="fontzise montantLettreInput" style={{marginTop:'10px',width:'27%', display:'inline-block',marginLeft:'13%'}}>► Montant en lettres :</label>       
                      <Input  className="inputFormFornis" value={this.state.MontantValueLettres} placeholder="Montant en lettres" style={{width:'60%' , display:'inline-block', margin: 'unset' }} disabled />
                         
                        <label style={{width:'4vw'}}>Mode de paiement:</label>
                            <RadioGroup onChange={this.PayModeOnChange} value={this.state.PayModeValue} style={{width:'70%',marginLeft:'33px' , marginBottom: '15px',marginTop: '30px'}}>
                                <Radio className="fontsize" value={"espece"}>Espece</Radio>
                                <Radio className="fontsize" value={"autres"}>Autres</Radio>
                                <Radio className="fontsize" value={"cheque"}>Chéque</Radio>
                                <Radio className="fontsize" value={"virement"}>Virement</Radio>
                            </RadioGroup>  
                        {this.state.PayModeValue==='espece'?payModeE:null}
                        {this.state.PayModeValue==='cheque'?payModeCh:null}
                        {this.state.PayModeValue==='virement'?payModeC:null}
                        {this.state.PayModeValue==='autres'?payModeA:null}
        
                </div> 
              </div>
              <div style={{width:'65%',margin:'auto'}}>
              <Button type="primary" htmlType="submit" style={{marginTop:'10px'}}>Submit</Button>
              </div>
          </div>  
        </div>    
    </Form>   
    );
  }
}
const mapStateToProps = (state,props) => {
  
  return {
    commandes: state.commandes,
    }  
};
const FormCommand = Form.create()(FormCommandPage);

export default connect(mapStateToProps)(FormCommand);