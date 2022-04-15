import React from 'react';
import { List, Button,Modal,Table } from 'antd';
import { connect } from 'react-redux';

import moment from 'moment';
import {startRemoveCommand} from '../../redux/actions/commands'

class CommandList extends React.Component {
    constructor(props){
    super(props)
    this.state = {
            modal1Visible: false,
            elems:[],
            data:[],

            ArticleName:[],
            PrixUnitaire:[],
            MontantArticle:[],
            NombreArticle:[],
            MontantTotal:0,
            MontantLettres:'',
            PayModeValue:'',
            AccountNumValue:'',
            createdAt:0,
            visible:false,
            MontantValueLettres:'',
            PayModeValue:'espece',
            payor:'',
            AccountNumValue:0,
            companyName:'',
            fornisseur:'',
                   ///////////////////////
            checkedList: [],
            indeterminate: true,
            checkAll: false,
            commandOptions:this.props.commandes.map((command)=>command)
    }
  }

    

    onCancel=()=>{
      this.setModal1Visible(false)
    } 
    onOk=()=>{
      this.setModal1Visible(false)
    }
    setModal1Visible(modal1Visible) {
      this.setState({ modal1Visible });  
    }
   

    //////////////////////////////////////// Drop Down fornissors list ///////////////////////////////////////////////:
      handleMenuClick = (e) => {
        if (e.key) {
          this.setState({ visible: false });
        }
      }
      
      handleVisibleChange = (flag) => {
        this.setState({ visible: flag });
      }
      
      fn=()=>{  const {data}= this.state   
              const fn = data.map((e,index)=>e.FornisNames)
              return fn
      }


      displayTable=(item)=>{ 
        
        this.setState({
          id:item.id,
          visible:window.innerWidth>984?true:false,
          ArticleName:item.ArticleName.slice(0),
          PrixUnitaire:item.PrixUnitaire.slice(0),
          NombreArticle:item.NombreArticle.slice(0),
          MontantArticle:item.MontantArticle.slice(0),
          MontantTotal:item.MontantTotal,
          MontantValueLettres:item.MontantValueLettres,
          PayModeValue:item.PayModeValue,
          payor:item.payor,
          AccountNumValue:item.AccountNumValue,
          createdAt:item.createdAt,
          companyName:item.companyName,
          fornisseur:item.fornisseur
        })
        window.innerWidth<=984?this.setModal1Visible(true):null
        

    }
      
  
    CheckboxOnChange = (checkedList) => {
      const {commandOptions}=this.state;
      this.setState({
        checkedList,
        indeterminate: !!checkedList.length && (checkedList.length < commandOptions.length),
        checkAll: checkedList.length === commandOptions.length,
      });
    }
    onCheckAllChange = (e) => {
      const {commandOptions}=this.state;
      this.setState({
        checkedList: e.target.checked ? commandOptions : [],
        indeterminate: false,
        checkAll: e.target.checked,
      });
    }

    checkAll=(ele)=>{
      var checkboxes = document.getElementsByTagName('input');
      if (ele.target.checked) {
          for (var i = 0; i < checkboxes.length; i++) {
              if (checkboxes[i].type === 'checkbox'&& checkboxes[i].name ==='box') {
                  checkboxes[i].checked = true;
              }
          }
          
      } else {
          for (var i = 0; i < checkboxes.length; i++) {
              if (checkboxes[i].type === 'checkbox' && checkboxes[i].name ==='box') {
                  checkboxes[i].checked = false;
              }
          }
      }
  }

  onRemove=()=>{

    var checkboxes = document.getElementsByTagName('input');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked && checkboxes[i].name==='box') {
            this.props.startRemoveCommand({id:checkboxes[i].id})
        }  
        checkboxes[i].checked=false
    }
    this.setState({visible:false})
  
  }
    
    

    render() {
    const data = this.props.commandes;
  
    //===========================================================
    
      return (
       
        <div className="CommandpageContainer">
           <div className="CommandlisteContainer">
                {data.length!=0?<div className='headerListCmd'>
                  <Button type="danger" onClick={this.onRemove} 
                          style={{
                            height: '28px',
                            borderRadius:'unset',
                            marginBottom: '4px'
                          }}
                  >Suprimer</Button>
                  <label style={{marginLeft:'8px'}}>Check All</label>
                  <input style={{marginLeft:'25px',position:'relative',top:'3px'}} type="checkbox" onChange={this.checkAll}/>
                </div>:null}
                 <div className="CommandlisteContainerSub">  
                    <List                    
                      header={false}
                      footer={false}
                      bordered
                      dataSource={data}
                      renderItem={item =>(
                          <List.Item onClick={()=>this.displayTable(item)} className={item.id===this.state.id ?"itemList CommandListItem":"itemList"}>  
                            <div className="commandList"  >
                                <span>command ID : {item.id}</span> 
                                <span>Fornisseur : {item.fornisseur}</span>
                                <span>La date : { moment(item.createdAt).format('YYYY/MM/DD')}</span>
                              </div>
                              <input type="checkbox" id={item.id} name="box" className="checkBoxCommand"/>
                        </List.Item>
                      )}
                    />
                 </div>
            </div> 
            {window.innerWidth>984?(<div className="MainCommandTable">
              {this.state.visible?
              <div className="commandPage">
                <div className="commandPageHeader">
                  <div className="headerRight">
                    <p>command ID : <span>{this.state.id}</span></p>
                    <p>Fornisseur : <span>{this.state.fornisseur}</span></p>
                  </div> 
                  <div className="headerLeft">
                    <p>Fait le : <span>{moment(this.state.createdAt).format('YYYY/MM/DD')}</span></p>
                    <p>Bénificitaire: <span>{this.state.companyName}</span></p>
                  </div>    
                </div>
                <Table 
                className="CommandTable"
                pagination={false} 
                dataSource={this.state.ArticleName.map((el,index)=>({
                      key: index,
                      articleName: el,
                      pU: this.state.PrixUnitaire[index],
                      nA: this.state.NombreArticle[index],
                      montant:this.state.MontantArticle[index],
                      mT:index === 0 ?this.state.MontantTotal:''
                    })
                  )} 
                columns={
                  [ {
                    title: 'Articles',
                    dataIndex: 'articleName',
                    key: 'articleName',
                    className:'commandItem'
                  }, {
                    title: 'Prix Unitaire',
                    dataIndex: 'pU',
                    key: 'pU',
                    className:'commandItem'
                  }, {
                    title: 'Montant',
                    dataIndex: 'montant',
                    key: 'montant',
                    className:'commandItem'
                  }, {
                    title: "Nombre d\'articles",
                    dataIndex: 'nA',
                    key: 'nA',
                    className:'commandItem'
                  },
                  {
                    title: 'Montant Total',
                    dataIndex: 'mT',
                    key: 'mT',
                    className:'commandItem',
                  }]
                }/>
                <div className="commandPageFooter">
                  <div className="cpRightFooter">
                    <p>le Montant Total du commande : <span>{this.state.MontantTotal}</span></p>
                    <p>le Montant en Lettres : <span>{this.state.MontantValueLettres}</span></p>
                  </div> 
                  <div className="cpLeftFooter">
                    <p>mode de paiement : <span>{this.state.PayModeValue}</span></p>
                    <p>payeur : <span>{this.state.payor}</span></p>
                  </div>     
                </div>
                </div>:null}
          </div>):
          <Modal
          style={{ top: 20 , width:'unset'}}
          visible={this.state.modal1Visible}
          onOk={this.onOk}
          onCancel={this.onCancel}
          footer ={null}
          >
          <div className="ModalMainCommandTable" >
              <div className="commandPage">
                    <div className="commandPageHeader">
                      <div className="headerRight">
                        <p>command ID : <span>{this.state.id}</span></p>
                        <p>Fornisseur : <span>{this.state.fornisseur}</span></p>
                      </div> 
                      <div className="headerLeft">
                        <p>Fait le : <span>{moment(this.state.createdAt).format('YYYY/MM/DD')}</span></p>
                        <p>Bénificitaire: <span>{this.state.companyName}</span></p>
                      </div>    
                    </div>
                    <Table 
                    className="CommandTable"
                    pagination={false} 
                    dataSource={this.state.ArticleName.map((el,index)=>({
                          key: index,
                          articleName: el,
                          pU: this.state.PrixUnitaire[index],
                          nA: this.state.NombreArticle[index],
                          montant:this.state.MontantArticle[index],
                          mT:index === 0 ?this.state.MontantTotal:''
                        })
                      )} 
                  columns={
                    [ {
                      title: 'Articles',
                      dataIndex: 'articleName',
                      key: 'articleName',
                      className:'commandItem'
                    }, {
                      title: 'Prix Unitaire',
                      dataIndex: 'pU',
                      key: 'pU',
                      className:'commandItem'
                    }, {
                      title: 'Montant',
                      dataIndex: 'montant',
                      key: 'montant',
                      className:'commandItem'
                    }, {
                      title: "Nombre d\'articles",
                      dataIndex: 'nA',
                      key: 'nA',
                      className:'commandItem'
                    },
                    {
                      title: 'Montant Total',
                      dataIndex: 'mT',
                      key: 'mT',
                      className:'commandItem',
                    }]
                  }/>
                  <div className="commandPageFooter">
                    <div className="cpRightFooter">
                      <p>le Montant Total du commande : <span>{this.state.MontantTotal}</span></p>
                      <p>le Montant en Lettres : <span>{this.state.MontantValueLettres}</span></p>
                    </div> 
                    <div className="cpLeftFooter">
                        <p>mode de paiement : <span>{this.state.PayModeValue}</span></p>
                        <p>payeur : <span>{this.state.payor}</span></p>
                    </div>     
                  </div>
              </div>
            </div>
            </Modal>
            } 
        </div>
      )
    }
}  
  
  const mapStateToProps = (state) => {
    return {
      commandes:state.commandes,
      dipenses:state.dipenses
    };
  };
  const mapDispatchToProps=(dispatch,props)=>({
    startRemoveCommand:(id)=>dispatch(startRemoveCommand(id)),
  })

  export default connect(mapStateToProps,mapDispatchToProps)(CommandList);
