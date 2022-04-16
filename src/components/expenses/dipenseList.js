import React from 'react';
import {Select,List, Avatar, Button,Icon,Collapse,Modal,Table, Divider,Card,Checkbox   } from 'antd';
import { connect } from 'react-redux';
import  selectdipenses from '../../redux/selectors/dipenses'
import DipenseChart from './dipenseChart'
import { Link } from 'react-router-dom';
import {startRemoveDipense } from '../../redux/actions/dipenses';
import moment from 'moment';
//const ipcRenderer = require("electron").ipcRenderer;

const Option = Select.Option;
const confirm = Modal.confirm;
let x = 0;
const CheckboxGroup = Checkbox.Group;
class DipenseList extends React.Component {
    constructor(props){
    super(props)
    this.state = {
            fornisseurName:'',
            loading: true,
            loadingMore: false,
            showLoadingMore: true,
            data: [],
            visible: false,
            modal1Visible: false,
            counter:0,
            id:'',
            FornisNames:[],
            FornisNumNBS:[],
            FornisPHS:[],
            FornisQUS:[],
            FornisMontants:[],
            tableData:[],
            columns:[],
            dataSourceFornis:[],
            dataSourceClient:[],
            clientType:'',
            autres:'',
            libValue:'',
            MontantTotal:0,
            MontantLettres:'',
            test:[],
            Responsable:'',
            PayModeValue:'',
            ChantierValue:'',
            AccountNumValue:'',
            RemiseValue:'',
            CaisseObserv:'',
            avatar:'',
            createdAt:0,
            count:1,
            isAutre:null,
            isActionnaire:null,
            isAutre:null,
            isEmployer:null,
            isFornisseur:null,
            ///////////////////
            filterTable1:[],
            filterTable2:[],
            filterTable3:[],
            filterTable4:[],
            filterTable:[],
            CompanyName:[],
            benificType:[],
            ChantierValue:[],
            Responsable:[],
            FilterCompanyName:[...new Set(this.props.dipenses.map((el)=>el.CompanyName))],
            FilterbenificType:[...new Set(this.props.dipenses.map((el)=>el.benificType))],
            FilterChantierValue:[...new Set(this.props.dipenses.map((el)=>el.ChantierValue))],
            FilterResponsable:[...new Set(this.props.dipenses.map((el)=>el.Responsable))],
          }
      this.concatFilter=this.concatFilter.bind(this);
    }

    componentDidMount() {
        
        const {dipenses} = this.props;
        
        this.setState({
                        loading: false,
                        data: this.props.dipenses,
           })
        
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
  
    
    
      calculID=(id)=>{
        if(id<10){
          return '00000'+id
        }else if (id<100 && id>10){
          return '0000'+id
        }else if (id<1000 && id >100){
          return '000'+id
        }else if (id<10000 && id>1000){
          return '00'+id
        }else{
          id
        }
      }
    
 

      setModal1Visible(modal1Visible) {
        this.setState({ modal1Visible });
        
      }
      onOk=()=>{
        this.setModal1Visible(false)
      }
      onCancel=()=>{
        this.setModal1Visible(false)
        this.setState({
                    dataSourceFornis:[],
                    dataSourceClient:[],
                    clientType:'',
                    fornisseurName:'',
                    autres:'',
                    libValue:'',
                    MontantTotal:0,
                    MontantLettres:'',
                    test:[],
                    Responsable:'',
                    PayModeValue:'',
                    ChantierValue:'',
                    AccountNumValue:'',
                    RemiseValue:'',
                    CaisseObserv:'',
                    avatar:'',
                    isActionnaire:null,
                    isAutre:null,
                    isEmployer:null,
                    isFornisseur:null,

                    
                    createdAt:null  
          })
      }
      onNume=()=>{
        this.setState({})
      }

      triger=(item)=>{

        this.setState({
          id:item.id,
          fornisseurName:item.FornisNames,
          companyNameInitial:item.companyNameInitial,
          CompanyName:item.CompanyName,
          counter:item.counter,
          libValue: item.LibValue,
          MontantTotal:item.MontantTotal,
          MontantLettres: item.MontantValueLettres,
          isAutre: item.isAutre,
          isActionnaire:item.isActionnaire,
          isClient:item.isClient,
          isEmployer:item.isEmployer,
          PayModeValue: item.PayModeValue,
          ChantierValue: item.ChantierValue,
          RemiseValue: item.RemiseValue,
          AccountNumValue: item.AccountNumValue,
          CaisseObserv: item.CaisseObserv,
          clientType: item.clientType,
          Responsable: item.Responsable,
          avatar: item.avatar,
          createdAt: item.createdAt,
          
        })

        if(item.isAutre){
          const dataSourceClient=item.ClientNames.map((Name,index)=>
                 ({
                        key: `${index+1}`,
                        name: `${Name}`,
                        DESCRIPTION:(item.ClientQjs[index]?`${item.ClientQjs[index]}`:'────'),
                        montant:(item.ClientMontants[index]?`${item.ClientMontants[index]} Dhs`:'────')
                }))
          this.setState({dataSourceClient})
        }

        if(item.isActionnaire || item.isClient || item.isEmployer){
         const dataSourceClient= item.ClientNames.map((Name,index)=>
                      ({
                        key: `${index+1}`,
                        name: `${Name}`,
                        PJ:(item.ClientPjs[index]? `${item.ClientPjs[index]}`:'────'),
                        QJ:(item.ClientQjs[index]?`${item.ClientQjs[index]}`:'────'),
                        montant:(item.ClientMontants[index]?`${item.ClientMontants[index]} Dhs`:'────')
                      }))
          this.setState({dataSourceClient})
        }

        if(item.isFornisseur===true){
         const dataSourceFornis= item.FornisMontants.map((Name,index)=>      
                ({
                  key: `${index+1}`,
                  //name: `${Name}`,
                  FornisNum:`${item.FornisNumNBS}`,
                  FornisPH:(item.FornisPHS[index]? `${item.FornisPHS[index]}`:'────'),
                  FornisQU: (item.FornisQUS[index]?`${item.FornisQUS[index]}`:'────'),
                  FornisMontant:(item.FornisMontants[index]?`${item.FornisMontants[index]} Dhs`:'────')
                }))
          this.setState({dataSourceFornis})
   
        }
        
         
      this.setModal1Visible(true) 
      }
    
    ///////////////////////////Modal Confirm supression /////////
    showConfirm=(item)=>{
      const{counter}=this.state
      const prop=this.props
      confirm({
        className:'ConfirmDelete',
        title: 'êtes-vous sure de vouloir suprimer ce dipense ?',
        content: '',
        onOk() {
          prop.startRemoveDipense({id:item.id});
        },

        onCancel() {
        },
      });
    }  

    increment=()=>{
      this.setState({count:this.state.count+1})

    }

    addOne=()=>{
      this.setState({count:this.state.count+1})
    }

    displayBenificitaire=(item)=>{
      if(item.isClient){
        return 'Clients'
      }else if(item.isActionnaire){
        return 'Actionnaires'
      }else if(item.isEmployer){
        return 'Employés'
      }else if(item.isAutre){
        return 'Autres'
      }else{
        return 'Fornisseurs'
      }
    }
    ///// THIS FUNCTION TRIGER PRINT OPTION ON MODE WEB ////////
    trigetPinter=()=>{ 
        isIframe = false;
        var DocumentContainer = document.getElementById('divtoprint').outerHTML
        var launcherHTML = ` 
        <!DOCTYPE html>
        <html>
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <link rel="stylesheet" type="text/css" href="/dist/styles.css" />
          </head>
          <body>
           ${DocumentContainer}
          </body>
        </html>`      

        var WindowObject = window.open("", "PrintWindow",
        "width=750,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes");
  
        WindowObject.document.writeln(launcherHTML);
        WindowObject.document.close()
        //WindowObject.focus();

        setTimeout(function(){
            WindowObject.focus();
            WindowObject.print();
            WindowObject.close();
        },2000)
    }
 
    /* sendCommandToWorker=(content)=>{
       ipcRenderer.send("printPDF", content);
    } */

    printDipense=()=>{
      // send whatever you like
      const container = document.getElementById('divtoprint').innerHTML
      //this.sendCommandToWorker(container);
      this.trigetPinter()
    }

    selectFiltredItem1=(value)=>{
      this.setState({filterTable1:value.slice(0)},this.concatFilter)
    }
    selectFiltredItem2=(value)=>{  
      this.setState({filterTable2:value.slice(0)},this.concatFilter) 
    }
    selectFiltredItem3=(value)=>{ 
      this.setState({filterTable3:value.slice(0)},this.concatFilter)    
    }
    selectFiltredItem4=(value)=>{ 
      this.setState({filterTable4:value.slice(0)},this.concatFilter)
    }

    concatFilter=()=>{
      this.setState({filterTable:[...new Set(this.state.filterTable.filter((el)=>el.length===0).concat(
        this.state.filterTable1,
        this.state.filterTable2,
        this.state.filterTable3,
        this.state.filterTable4
      ))]})
    }
    
    

    render() {
    //////////TotalDipense//////////////////////////
      const Totalcolumns = [{
        title: 'Nombres de Dipenses',
        dataIndex: 'number',
      }, {
        title: 'Total du montant',
        dataIndex: 'total',
      }];
      
      const Totaldata = [{
        key: '1',
        number:this.state.filterTable.length===0 ? this.props.dipenses.length : 
        this.props.dipenses.filter((el)=>{
                return this.state.filterTable.includes(el.CompanyName)||
                 this.state.filterTable.includes(el.benificType)||
                 this.state.filterTable.includes(el.ChantierValue)||
                 this.state.filterTable.includes(el.Responsable)
        }).length,
      
        total: this.state.filterTable.length===0 ? this.props.dipenses.map((dip)=>dip.MontantTotal).reduce((a,b)=>a+b,0) +' Dhs': 
        this.props.dipenses.filter((el)=>{
                return this.state.filterTable.includes(el.CompanyName)||
                 this.state.filterTable.includes(el.benificType)||
                 this.state.filterTable.includes(el.ChantierValue)||
                 this.state.filterTable.includes(el.Responsable)
        }).map((dip)=>dip.MontantTotal).reduce((a,b)=>a+b,0) +' Dhs',
      }];
      
      ////////////////////////////////DATA-TABLE///////////////////////    
      const columnsFornis = [{
      //     title: 'Name',
      //     dataIndex: 'name',
      //     key: 'name',
      // },{
        title: 'Numéro BNC',
        dataIndex: 'FornisNum',
        key: 'FornisNum',
      },{
        title: 'Prix H.T',
          dataIndex: 'FornisPH',
          key: 'FornisPH',
      },{
        title: 'Quantité',
          dataIndex: 'FornisQU',
          key: 'FornisQU',
      },{
        title: 'Montant',
          dataIndex: 'FornisMontant',
          key: 'FornisMontant',
      }];

      const columnsClient = [{
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
      },{
        title: 'P.J',
        dataIndex: 'PJ',
        key: 'PJ',
      },{
        title: 'Q.J',
          dataIndex: 'QJ',
          key: 'QJ',
      },{
        title: 'Montant',
          dataIndex: 'montant',
          key: 'montant',
      }];
      
      const columnsAutre = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },{
        title: 'Discription',
        dataIndex: 'DESCRIPTION',
        key: 'DESCRIPTION',
      },{
          title: 'Montant',
          dataIndex: 'montant',
          key: 'montant',
      }];
      /////////////////////// VISA TABLE /////////////////////////
      const columnsVisa = [{
        title: 'Directeur',
        dataIndex: 'directeur',
        className: 'visaColumn',
      }, {
        title: 'Client',
        dataIndex: 'client',
        className: 'visaColumn',

      }, {
        title: 'Caissière',
        dataIndex: 'caissiere',
        className: 'visaColumn',

      }];

      const dataVisa = [{
        key: '1',
        name: '',
        money: '',
        address: '',
      }];
      const text = `
                    A dog is a type of domesticated animal.
                    Known for its loyalty and faithfulness,
                    it can be found as a welcome guest in many households across the world.
                  `;
      const customPanelStyle = {
        background: 'rgb(231, 230, 230)',
        borderRadius: 4,
        marginBottom: 24,
        border: 0,
        overflow: 'hidden',
        width:'100%'
      };
    //===========================================================

      const Panel = Collapse.Panel;
      return (
       
        <div className="pageContainer">
          <div className="listeContainer">
              <div>
                <Collapse bordered={false}>
                  <Panel header="Filtrer les Résultats" key="1" style={customPanelStyle} className='filtersHeader'>
                    <div><label>Société:</label>
                        <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        allowClear={true}
                        onChange={this.selectFiltredItem1}
                        >
                          {this.state.FilterCompanyName.map((el)=>(<Option key={el}>{el}</Option>))}
                        </Select>
                    </div><br/>
                    <div><label>Benificitaire:</label>
                        <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        allowClear={true}
                        onChange={this.selectFiltredItem2}
                        >
                          {this.state.FilterbenificType.map((el)=><Option key={el}>{el}</Option>)}
                        </Select>
                    </div><br/>
                    <div><label>Chantier/Projet:</label>
                        <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        allowClear={true}
                        onChange={this.selectFiltredItem3}
                        >
                          {this.state.FilterChantierValue.map((el)=><Option key={el}>{el}</Option>)}
                        </Select>
                        </div><br/>
                    <div><label>Res.Chantier:</label>
                        <Select
                        mode="multiple"
                        style={{ width: '100%',marginBottom:'15px' }}
                        placeholder="Please select"
                        allowClear={true}
                        onChange={this.selectFiltredItem4}
                        >
                          {this.state.FilterResponsable.map((el)=><Option key={el}>{el}</Option>)}
                        </Select>              
                    </div>
                  </Panel>
                </Collapse>
              </div>
              <div className="listeContainerSub">  
                <List
                className="demo-loadmore-list" 
                itemLayout="horizontal"
                dataSource={this.state.filterTable.length===0 ? this.props.dipenses : 
                  this.props.dipenses.filter((el)=>{
                          return this.state.filterTable.includes(el.CompanyName)||
                           this.state.filterTable.includes(el.companyNameInitial)||
                           this.state.filterTable.includes(el.benificType)||
                           this.state.filterTable.includes(el.ChantierValue)||
                           this.state.filterTable.includes(el.Responsable)
                })}
                renderItem={item=> (
                  <List.Item actions={this.props.user.isAdmin?[<a onClick={()=>this.triger(item)}>...plus</a>, <Link to={`/edit/${item.id}`} >Editer</Link>, <a onClick={()=>this.showConfirm(item,this.props)}>suprimer</a>]:[<a onClick={()=>this.triger(item)}>...plus</a>, <Link to={`/edit/${item.id}`} >Editer</Link>]}>
                    <List.Item.Meta
                      
                      title={<a onClick={()=>this.triger(item)}>Bon dipense N°: {
                        item.counter
                      }
                    
                      </a>}
                      description={
                        item.CompanyName!=''?
                        <div>
                        <span>Société: </span><span className='forniHeader'>{item.CompanyName}</span>
                        <p style={{marginBottom:'0',marginTop:'5px'}}>Crée le :<span style={{fontSize:'1.3rem',marginLeft:'5px',color:'#ee4c4c'}}>
                        {moment(item.createdAt).format('YYYY/MM/DD')}</span></p>
                        </div>
                        :
                        <div>
                        <span>Société: </span><span className='forniHeader'>{item.companyNameInitial}</span>
                        <p style={{marginBottom:'0',marginTop:'5px'}}>Crée le :<span style={{fontSize:'1.3rem',marginLeft:'5px',color:'#ee4c4c'}}>
                        {moment(item.createdAt).format('YYYY/MM/DD')}</span></p>
                        </div>
                      }   
                      />                     
                   
                  </List.Item>
                )}
              />
            

              
                <Modal
                title={"bon dipense numéro : "+this.state.counter}
                style={{ top: 20 , width:'unset'}}
                visible={this.state.modal1Visible}
                onOk={this.onOk}
                onCancel={this.onCancel}
                footer ={null}
                > 
                  <Button 
                    size='large' 
                    style={{bottom:'10px',float: 'right'}}
                    onClick={this.printDipense}>Imprimer 
                    <Icon type="printer" />
                  </Button>

                  <div className="ModalPrint" style={{clear:'both', WebkitPrintColorAdjust:'exact'}} id='divtoprint'>              
                    <div className="modalHeader">
                      <div className="userAvatar">                
                        {this.state.avatar!=''? <Avatar shape="square" size="large" className="myAvatar avatar" src={this.state.avatar} icon='user' style={{marginTop:'10px'}}/> : null }
                        {this.state.avatar==='' && this.state.CompanyName===''? <Avatar shape="square" size="large" className="myAvatar avatar" icon="user"  style={{marginTop:'10px'}}/>:null}
                        {this.state.CompanyName===''?  
                        <h3 style={{
                          width: '60%',
                          padding: '5px 30px'}}>{this.state.companyNameInitial}</h3>:
                          <h3 style={{
                            border:' 2px solid #d3d2d2',
                            width: '60%',
                            padding: '15px 30px'}}>{this.state.CompanyName}</h3>}
                        </div>
                      <div className="counterItem">
                        <p>Bon dipense N°: {this.calculID(this.state.counter)}</p>
                        <p>Cree le: {moment(this.state.createdAt).format('YYYY/MM/DD')}</p>
                      </div>
                    </div>
                    
                    {this.state.dataSourceFornis.length>0 ?
                    <div>
                      <h3>le Nom du Fornisseur :  <span className='fornisseurName'> {this.state.fornisseurName} </span></h3>
                      <Table 
                      className='tableFornis'
                      dataSource={this.state.dataSourceFornis}
                      columns={columnsFornis} 
                      size="small" 
                      pagination={false} 
                      scroll={{ y: 100 }}/>
                    </div>: null}
                      {(this.state.isClient || this.state.isEmployer || this.state.isActionnaire) ?
                    <div>
                      <h3 style={{marginTop:'2rem'}}>Les Clients :</h3> 
                      <Table
                      className='tableClient' 
                      dataSource={this.state.dataSourceClient}
                      columns={columnsClient}  
                      size="small" 
                      scroll={{ y: 100 }}
                      pagination={false}/>
                    </div>:null}
                    {this.state.isAutre?
                      <div>
                        <h3 style={{marginTop:'2rem'}}>Autres :</h3> 
                        <Table 
                        className="tableAutre"
                        dataSource={this.state.dataSourceClient}
                        columns={columnsAutre}  
                        size="small" 
                        scroll={{ y: 100 }}
                        pagination={false}/>
                      </div>:null}
                    {
                      this.state.autres!=''?
                      ( <Card
                          type="inner"
                          title="Autres Bénificiares"
                          >
                          {this.state.autres}
                        </Card>
                        ):null
                      }
                    <Card
                        type="inner"
                        title="Libellés / Décharges"
                        >
                        {this.state.libValue}
                    </Card>
                    <Card title="Montant Chargé" className="cardStyled">
                      <Card 
                        className="cardStyled-child"
                        type="inner"
                        title="en chiffres"
                        
                      >
                        {this.state.MontantTotal} Dhs
                      </Card>
                      <Card
                        className="cardStyled-child"
                        type="inner"
                        title="en lettres"
                      >
                        {this.state.MontantLettres} Dirhams
                      </Card>
                    </Card>
                    <Card className='ressCard'>
                      <p style={{marginRight:'10%' ,marginTop:'11px'}}>&#x25AA; R{'é'}sponsable de chantier :  
                          {' '+this.state.Responsable} 
                      </p>
                        <p>&#x25AA; Mode de paiement :  
                          <Checkbox checked={true} style={{marginLeft:'5px', marginTop:'11px' }}>
                            {this.state.PayModeValue}
                          </Checkbox>
                        </p>
                    </Card>
                    <div style={{display:'flex'}}>
                      <Card
                          title="Chantier / Projet"
                          style={{marginRight:'2%'}}
                        >
                        <p style={{marginLeft:'12%',    marginTop: '18px'}}>{this.state.ChantierValue}</p> 
                      </Card>
                      <Card className='cardCompteRemise' style={{display:'block'}}>
                          <p style={{marginTop:'unset'}}>Compte N°: {this.state.AccountNumValue}</p>
                          {this.state.RemiseValue!=''?<p style={{marginBottom:'unset'}}>Remise   : {this.state.RemiseValue}</p> :null}
                      </Card>
                    </div>
                    {this.state.CaisseObserv!=''? 
                    (<Card title="Caisse Obsérvations">
                        <p>{this.state.CaisseObserv}</p>
                    </Card>):null}
                    <Table
                      className="visaTable"
                      columns={columnsVisa}
                      dataSource={dataVisa}
                      bordered
                      title={() => 'Visa'}
                      pagination={false}
                    /> 
                  </div>
                </Modal>
              </div>
              <Table className="totalTable" columns={Totalcolumns} dataSource={Totaldata} pagination={false} size="small"/>
          </div>         
           <DipenseChart currentUser={this.props.user} alldipenes={this.props.allDipense}/> 
        </div>
      )
    }
}  
  
  const mapStateToProps = (state) => {
    return {
      user:state.auth.user,
      dipenses:selectdipenses(state.dipenses, state.filters),
      allDipense:state.dipenses
    };
  };
  const mapDispatchToProps=(dispatch,props)=>({
    startRemoveDipense:(id)=>dispatch(startRemoveDipense(id)),
  })

  export default connect(mapStateToProps,mapDispatchToProps)(DipenseList);







