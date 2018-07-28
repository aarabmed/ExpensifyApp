import React from 'react';
import configureStore from '../store/configureStore'
import { SingleDatePicker } from 'react-dates';
import {Switch, Upload, Icon, message, Modal ,Form, Input, Button,DatePicker,Radio,InputNumber,Checkbox,Card,Select  } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const dateFormat = 'YYYY/MM/DD';
const { TextArea } = Input;
let isNum = false
let formid=0;
let count=1;
class FormDispensePage extends React.Component {
  constructor(props){ 
    super(props)
    this.state={
      switch:false,
      addMore:false,
      companyNameInitial:props.dipense?props.dipense.companyNameInitial:'',
      createdAt: props.dipense ? moment(props.dipense.createdAt) : moment(),
      ArticleName:props.dipense?props.dipense.ArticleName:[''],
      FornisRowCount:props.dipense?props.dipense.FornisRowCount:[0],
      ClientRowCount:props.dipense?props.dipense.ClientRowCount:[0],
      FornisNames:props.dipense?props.dipense.FornisNames:'',
      FornisNumNBS:props.dipense?props.dipense.FornisNumNBS:'',
      FornisPHS:props.dipense?props.dipense.FornisPHS:[0],
      FornisQUS:props.dipense?props.dipense.FornisQUS:[0],
      FornisMontants:props.dipense?props.dipense.FornisMontants:[0],
      ClientNames:props.dipense?props.dipense.ClientNames:[''],
      ClientPjs:props.dipense?props.dipense.ClientPjs:[''],
      ClientQjs:props.dipense?props.dipense.ClientQjs:[''],
      ClientMontants:props.dipense?props.dipense.ClientMontants:[''],
      counter:props.dipense?props.dipense.counter:(props.id.length>0? this.props.id[this.props.id.length-1].counter+1:1),
      Responsable: props.dipense? props.dipense.Responsable:'',
      AccountNumValue:props.dipense? props.dipense.AccountNumValue:'',
      PayModeValue:props.dipense? props.dipense.PayModeValue:'espece',
      MontantValueLettres:props.dipense? props.dipense.MontantValueLettres:'',
      RemiseValue:props.dipense? props.dipense.RemiseValue:'',
      LibValue:props.dipense? props.dipense.LibValue:'',
      ChantierValue:props.dipense? props.dipense.ChantierValue:'',
      ClientType:props.dipense? props.dipense.ClientType:'actionnaire',
      benificType:props.dipense? props.dipense.benificType:'',
      CaisseObserv:props.dipense? props.dipense.CaisseObserv:'',
      edit:props.dipense? true : false,
      fornisForm:false, 
      avatar:props.dipense? props.dipense.avatar:'',
      avatarExist:true,
      isFornisseur:props.dipense? props.dipense.isFornisseur:false,
      isClient:props.dipense? props.dipense.isClient:false,
      isEmployer:props.dipense? props.dipense.isEmployer:false,
      isActionnaire:props.dipense? props.dipense.isActionnaire:false,
      isSubMenu:props.dipense? props.dipense.isSubMenu:false,
      isAutre:props.dipense? props.dipense.isAutre:false,
      cardTitle:props.dipense? props.dipense.cardTitle:'Benificitaire',
      placeholder:'',
      uuidF:props.dipense? props.dipense.uuidF :0,
      uuidC:props.dipense? props.dipense.uuidC :0,
      MontantTotal:props.dipense?props.dipense.MontantTotal:0,
      maxRows:props.dipense?props.dipense.maxRows:0,
      CompanyName:props.dipense? props.dipense.CompanyName:'',
      payer:props.dipense? props.dipense.payer:'',
      children:this.props.id.length!=0?this.props.commands.filter((com)=>
      !this.props.id.map(dip=>Number(dip.FornisNumNBS)).includes(com.counter)
      ).map((el)=>el.counter):this.props.commands.map((el)=>el.counter),
      //====== avatar section =========
      previewVisible: false,
      previewImage:'',
      fileList:[],
      calendarFocused: false,
      avatarOrText:props.dipense? props.dipense.avatarOrText:'avatar'

    }

    this.onSubmit=this.onSubmit.bind(this)
    this.handleCancel=this.handleCancel.bind(this)
  }

  switchOnChange=(checked)=>{
        this.setState({switch:!checked})
  }
  handleCancel = () => this.setState({ previewVisible: false })
  handlePreview=(file) => {
          this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
        });
      }
  
  
  


  handleChange = ({ fileList }) => this.setState({ fileList })

  //====================================== fornisseur Functions ===================================

    nominationOnchange=(e) => {
        let newFornisNames=e.target.value
        this.setState({FornisNames: newFornisNames });   
    }
  

    ArticleNameOnchange=(idx)=>(e)=>{
      const newArticleName=this.state.ArticleName.map((article,sidx)=>{
        if(idx !== sidx) return article;
        return e.target.value
      })
      this.setState({ArticleName:newArticleName});
    }

    // numNBOnchange=(idx)=>(e)=>{
      
    //   const newFornisnumNBS = this.state.FornisNumNBS.map((FornisNumNB, sidx) => {
    //     if (idx !== sidx) return FornisNumNB;
    //     return Number(e.target.value);
    //   });
      
    //   this.setState({ FornisNumNBS: newFornisnumNBS });

    // }

    PHOnchange=(idx)=>(e)=>{
        const newFornisPHS = this.state.FornisPHS.map((FornisPH, sidx) => {
          if (idx !== sidx) return FornisPH;
          return Number(e.target.value)
        });
        
        
         const newFornisMontants = this.state.FornisMontants.map((FornisMontant, sidx) => {
          if (idx !== sidx) return FornisMontant;
             
                return document.getElementById(`price[${idx}]`).value = Number(e.target.value)* (this.state.FornisQUS[idx]!==''?this.state.FornisQUS[idx]:0)    
          });
        this.setState({
          FornisPHS: newFornisPHS,
          FornisMontants:newFornisMontants
         },()=>this.setState({
           MontantTotal:this.state.FornisMontants.reduce((a,b)=>a+b,0),
           MontantValueLettres:this.MontantInLetters(this.state.FornisMontants.reduce((a,b)=>a+b,0))
          }));
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

     QUOnchange=(idx)=>(e)=>{

        const newFornisQUS = this.state.FornisQUS.map((FornisQU, sidx) => {
          if (idx !== sidx) return FornisQU;
          return e.target.value
        });
        
        const newFornisMontants = this.state.FornisMontants.map((FornisMontant, sidx) => {
          if (idx !== sidx) return FornisMontant;
               return document.getElementById(`price[${idx}]`).value = Number(e.target.value)*(this.state.FornisPHS[idx]!==''?this.state.FornisPHS[idx]:0)
          
        });
        this.setState({
          FornisQUS: newFornisQUS,
          FornisMontants:newFornisMontants
        },()=>this.setState({
          MontantTotal:this.state.FornisMontants.reduce((a,b)=>a+b,0),
          MontantValueLettres:this.MontantInLetters(this.state.FornisMontants.reduce((a,b)=>a+b,0))
        }))
    


    }

         
    

    addFornis = () => {

        const {getFieldValue } = this.props.form;
        const { form } = this.props;
        const Fkeys = form.getFieldValue('Fkeys');

        var val = Fkeys.length-1;
        this.props.form.validateFields([`articleName[${val}]`,`num[${val}]`,`ph[${val}]`,`qu[${val}]`,`price[${val}]`],
        (err, values) =>{
        if (err) {
               
              // can use data-binding to get         
     
        } else {
  
          const { form } = this.props;
          this.setState({
            uuidF:this.state.uuidF + 1,
            maxRows:this.state.uuidF + 1,
            //FornisNumNBS: this.state.FornisNumNBS.concat(''),
            FornisPHS: this.state.FornisPHS.concat(''),
            FornisQUS: this.state.FornisQUS.concat(''),
            ArticleName:this.state.ArticleName.concat(''),
            FornisMontants: this.state.FornisMontants.concat(''),
            FornisRowCount:this.state.FornisRowCount.concat(this.state.FornisRowCount.length)
            
             })
            const nextFkeys = Fkeys.concat(this.state.FornisRowCount.length);
            form.setFieldsValue({
                       Fkeys: nextFkeys,
             });
        }
      });
    }

    removeFornis = (k) => {
      const { form } = this.props;
      // can use data-binding to get
      const Fkeys = form.getFieldValue('Fkeys');
      form.setFieldsValue({
        Fkeys: Fkeys.filter(key => key !== k),
      })
      
      const newValue = this.state.FornisRowCount.filter((elm,index)=>index!==k)
      const FornisRowCount= newValue.map((elm,index)=>{
            if(elm===index){
              return elm
            }
            else{
              return elm-1
            }  
        })
   //    


      this.setState({
        uuidF:this.state.uuidF-1,
        MontantValueLettres:this.MontantInLetters(this.state.FornisMontants.filter((elm,index)=>index!==k).reduce((a,b)=>a+b,0)),
        MontantTotal:this.state.FornisMontants.filter((elm,index)=>index!==k).reduce((a,b)=>a+b,0),     
          FornisRowCount:this.state.FornisRowCount.filter((el)=>el!==k),
          //FornisNumNBS: this.state.FornisNumNBS.filter((elm,index)=>index!==k),
          FornisPHS: this.state.FornisPHS.filter((elm,index)=>index!==k),
          FornisQUS: this.state.FornisQUS.filter((elm,index)=>index!==k), 
          ArticleName:this.state.ArticleName.filter((elm,index)=>index!==k),
          FornisMontants: this.state.FornisMontants.filter((elm,index)=>index!==k),        
      })
    }
    





//====================================== Client Functions =======================================
//===============================================================================================
    ClientNameOnchange =(idx) => (e) => {
      const { form } = this.props;
       const newClientNames = this.state.ClientNames.map((ClientName, sidx) => {
        if (idx !== sidx) return ClientName;
        return e.target.value ;
      });
    
      this.setState({
        ClientNames:newClientNames
      })
    }

    PjClientOnchange=(idx)=>(e)=>{
                const newClientPjs = this.state.ClientPjs.map((ClientPj, sidx) => {
                  if (idx !== sidx) return ClientPj;
                  return e.target.value ;
                });
                const newClientMontants = this.state.ClientMontants.map((ClientMontant, sidx) => {
                  if (idx !== sidx) return ClientMontant;
                        return document.getElementById(`Montant[${idx}]`).value = Number(e.target.value)*(this.state.ClientQjs[idx]!==''?this.state.ClientQjs[idx]:0)
                  
                });

                this.setState({ 
                  ClientPjs: newClientPjs,
                  ClientMontants:newClientMontants
                },()=>this.setState({
                  MontantTotal:this.state.ClientMontants.reduce((a,b)=>a+b,0),
                  MontantValueLettres:this.MontantInLetters(this.state.ClientMontants.reduce((a,b)=>a+b,0))
                }));
            
    }

    QjClientOnchange=(idx)=>(e)=>{
          const newQjs = this.state.ClientQjs.map((Qj, sidx) => {
            if (idx !== sidx)  return Qj;
               return e.target.value ;
            });
          const newClientMontants = this.state.ClientMontants.map((ClientMontant, sidx) => {
            if (idx !== sidx) return ClientMontant;
            return document.getElementById(`Montant[${idx}]`).value = Number(e.target.value)*(this.state.ClientPjs[idx]!==''?this.state.ClientPjs[idx]:0)
          });
      
          this.setState({ 
            ClientQjs: newQjs,
            ClientMontants:newClientMontants 
          },()=>this.setState({
            MontantTotal:this.state.ClientMontants.reduce((a,b)=>a+b,0),
            MontantValueLettres:this.MontantInLetters(this.state.ClientMontants.reduce((a,b)=>a+b,0))
          }));    
  }
    
    
    isAutreQjClientOnchange=(idx)=>(e)=>{
          const newQjs = this.state.ClientQjs.map((Qj, sidx) => {
            if (idx !== sidx) return Qj;
            return e.target.value ;
          });
          this.setState({ClientQjs: newQjs });
    }

    //========== form id =====================




    addClient = () => {
      
        const {getFieldValue } = this.props.form;
        const { form } = this.props;
        const Ckeys = form.getFieldValue('Ckeys');
        var val = Ckeys.length-1;
        this.props.form.validateFields([`nameClient[${val}]`,`${!this.state.isAutre?`Pj[${val}]`:null}`,`Qj[${val}]`,`Montant[${val}]`],
        (err, values) => {
        if (err) {   
                           
    
        } else {
  
          const { form } = this.props;
         
          this.setState({ 
            uuidC:this.state.uuidC+1,
            maxRows:this.state.uuidC+1,
            ClientNames: this.state.ClientNames.concat([this.state.ClientNames]),
            ClientPjs: this.state.ClientPjs.concat(['']),
            ClientQjs: this.state.ClientQjs.concat(['']),
            ClientMontants: this.state.ClientMontants.concat(['']),
            },()=>{
              this.setState({ClientRowCount:this.state.ClientRowCount.concat(this.state.uuidC)})  
              const nextCkeys = Ckeys.concat(this.state.uuidC);
              form.setFieldsValue({
                          Ckeys: nextCkeys,
                        })

          })

        
        
                    // can use data-binding to set
            // important! notify form to detect changes
        
      };
      
    })
  }

    removeClient = (k) => {
      const { form } = this.props;
      // can use data-binding to get
      const Ckeys = form.getFieldValue('Ckeys');
      form.setFieldsValue({
        Ckeys: Ckeys.filter(key => key !== k),
      })

      const newValue = this.state.ClientRowCount.filter((elm,index)=>index!==k)
      const ClientRowCount= newValue.map((elm,index)=>{
            if(elm===index){
              return elm
            }
            else{
              return elm-1
            }  
      })

      this.setState({
        uuidC:this.state.uuidC-1,
        MontantTotal:this.state.ClientMontants.filter((elm,index)=>index!==k).reduce((a,b)=>a+b,0),
        MontantValueLettres:this.MontantInLetters(this.state.FornisMontants.filter((elm,index)=>index!==k).reduce((a,b)=>a+b,0))
      },()=>{
        this.setState({
          ClientRowCount:ClientRowCount,
          ClientNames: this.state.ClientNames.filter((elm,index)=>index!==k),
          ClientPjs: this.state.ClientPjs.filter((elm,index)=>index!==k),
          ClientQjs: this.state.ClientQjs.filter((elm,index)=>index!==k),
          ClientMontants: this.state.ClientMontants.filter((elm,index)=>index!==k),        
        
        })
        });
    }



      ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //================================================== Autres inputs ===========================================
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////


      ResponsableOnChange = (e) => {
        const Responsable=e.target.value
        this.setState(()=>({
          Responsable 
        }));
      }

      PayModeOnChange=(e)=>{
        const PayModeValue = e.target.value
        this.setState(()=>({
          PayModeValue
        }));
      }

      RemiseOnChange=(e)=>{
        const RemiseValue = e.target.value
        this.setState(()=>({
          RemiseValue
        }))
      }

      AccountNumOnChange=(e)=>{
        const AccountNumValue = e.target.value
        this.setState(()=>({
          AccountNumValue
        }))
      }
      
      AccountPayerOnChange=(e)=>{
        const payer = e.target.value
        this.setState(()=>({
          payer
        }))
      }

      LibOnChange=(e)=>{
        const LibValue = e.target.value
        this.setState(()=>({
          LibValue
        }))
      }


      ChantierOnChange=(e)=>{
        const ChantierValue = e.target.value
        this.setState(()=>({
          ChantierValue
        }))
      }

      CompanyNameOnChange=(e)=>{
        const CompanyName = e.target.value
        this.setState(()=>({
          CompanyName
        }))
      }

      companyNameInitialOnChange=(e)=>{
        const companyNameInitial=e.target.value
        this.setState(()=>({companyNameInitial}))
      }

      ClientTypeOnChange=(e)=>{
          const ClientType = e.target.value
          this.setState(()=>({
            ClientType
          }))
      }

      isAutreCheckNumber=(idx)=>(e)=>{
        const isNum=e.target.value        
        if(isNum.match(/^\d{0,}(\.\d{0,2})?$/)){
            const newClientMontants = this.state.ClientMontants.map((ClientMontant, sidx) => {
              if (idx !== sidx) return ClientMontant;
              return document.getElementById(`Montant[${idx}]`).value = Number(e.target.value)
            });

            this.setState({ 
              ClientMontants: newClientMontants,
            },()=>this.setState({
              MontantTotal:this.state.ClientMontants.reduce((a,b)=>a+b,0),
              MontantValueLettres:this.MontantInLetters(this.state.ClientMontants.reduce((a,b)=>a+b,0))
            })); 
        }
      }



      observOnChance=(e)=>{
        const CaisseObserv = e.target.value
        this.setState(()=>({
          CaisseObserv
        }))
    }
    

    onDateChange = (createdAt) => {
      if (createdAt) {
        this.setState(() => ({ createdAt }));
      }
    };

    onFocusChange = ({ focused }) => {
      this.setState(() => ({ calendarFocused: focused }));
    };


    handleTypeDipense=(e)=>{
      const avatarOrText = e.target.value
      this.setState({avatarOrText})
    }

    isAutre=()=>{
      this.setState({isAutre:true,benificType:'autre',isSubMenu:true,cardTitle:'Autre', placeholder:'Nom',ClientRowCount:this.state.ClientRowCount})
      
    }


    //////////////////////////////========= Submit Forms =======///////////////////////////////////////////////
     
    onSubmit=(e)=>{
    e.preventDefault();
    
    const { form } = this.props;

    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
    
              if(this.state.edit)
              {
                this.props.onSubmit(
                {          
                    companyNameInitial:this.state.companyNameInitial,
                    ArticleName:this.state.ArticleName,
                    counter:this.state.counter,
                    Responsable:this.state.Responsable,
                    MontantValueLettres:this.state.MontantValueLettres,
                    RemiseValue:this.state.RemiseValue,
                    LibValue:this.state.LibValue,
                    PayModeValue:this.state.PayModeValue,
                    ChantierValue:this.state.ChantierValue,
                    ClientType:this.state.ClientType,
                    CompanyName:this.state.CompanyName,
                    AccountNumValue:this.state.AccountNumValue,
                    FornisNames:this.state.isFornisseur?this.state.FornisNames:[],
                    FornisNumNBS:this.state.isFornisseur?this.state.FornisNumNBS:'',
                    FornisPHS:this.state.isFornisseur?this.state.FornisPHS:[],
                    FornisQUS:this.state.isFornisseur?this.state.FornisQUS:[],
                    FornisMontants:this.state.isFornisseur?this.state.FornisMontants:[],
                    ClientNames:!this.state.isFornisseur?this.state.ClientNames:[],
                    ClientPjs:!this.state.isFornisseur?this.state.ClientPjs:[],
                    ClientQjs:!this.state.isFornisseur?this.state.ClientQjs:[],
                    ClientMontants:!this.state.isFornisseur?this.state.ClientMontants:[],
                    FornisRowCount:this.state.FornisRowCount,
                    ClientRowCount:this.state.ClientRowCount,
                    createdAt: this.state.createdAt.valueOf(),
                    isFornisseur:this.state.isFornisseur,
                    isClient:this.state.isClient,
                    isEmployer:this.state.isEmployer,
                    isActionnaire:this.state.isActionnaire,
                    cardTitle:this.state.cardTitle,
                    isSubMenu:this.state.isSubMenu,
                    isAutre:this.state.isAutre,
                    MontantTotal:this.state.MontantTotal,
                    uuidF:this.state.uuidF,
                    uuidC:this.state.uuidC,
                    maxRows:this.state.uuidF+this.state.uuidC,
                    CaisseObserv:this.state.CaisseObserv,
                    payer:this.state.payer,
                    benificType:this.state.benificType,
                    avatarOrText:this.state.avatarOrText,
                    avatar:this.state.fileList.length>0 ? this.state.fileList[0].thumbUrl:''
              })}else{
                this.props.onSubmit(
                  {          
                    counter:this.state.counter,
                    ArticleName:this.state.isFornisseur?this.state.ArticleName:[],
                    Responsable:this.state.Responsable,
                    MontantValueLettres:this.state.MontantValueLettres,
                    RemiseValue:this.state.RemiseValue,
                    LibValue:this.state.LibValue,
                    PayModeValue:this.state.PayModeValue,
                    ChantierValue:this.state.ChantierValue,
                    ClientType:this.state.ClientType,
                    payer:this.state.payer, 
                    AccountNumValue:this.state.AccountNumValue,
                    FornisNames:this.state.isFornisseur?this.state.FornisNames:[],
                    FornisNumNBS:this.state.isFornisseur?this.state.FornisNumNBS:'',
                    FornisPHS:this.state.isFornisseur?this.state.FornisPHS:[],
                    FornisQUS:this.state.isFornisseur?this.state.FornisQUS:[],
                    FornisMontants:this.state.isFornisseur?this.state.FornisMontants:[],
                    ClientNames:!this.state.isFornisseur?this.state.ClientNames:[],
                    ClientPjs:!this.state.isFornisseur?this.state.ClientPjs:[],
                    ClientQjs:!this.state.isFornisseur?this.state.ClientQjs:[],
                    ClientMontants:!this.state.isFornisseur?this.state.ClientMontants:[],
                    FornisRowCount:this.state.FornisRowCount,
                    ClientRowCount:this.state.ClientRowCount,
                    avatar:this.state.fileList.length>0 ? this.state.fileList[0].thumbUrl:'',
                    createdAt: this.state.createdAt.valueOf(),
                    isFornisseur:this.state.isFornisseur,
                    isClient:this.state.isClient,
                    isEmployer:this.state.isEmployer,
                    isActionnaire:this.state.isActionnaire,
                    cardTitle:this.state.cardTitle,
                    isSubMenu:this.state.isSubMenu,
                    isAutre:this.state.isAutre,
                    MontantTotal:this.state.MontantTotal,
                    uuidF:this.state.uuidF,
                    uuidC:this.state.uuidC,
                    maxRows:this.state.maxRows,
                    CaisseObserv:this.state.CaisseObserv,
                    benificType:this.state.benificType,
                    avatarOrText:this.state.avatarOrText,
                    CompanyName:this.state.CompanyName,
                    companyNameInitial:this.state.companyNameInitial,

                })
              }

              this.state.fileList=[],
    
            form.resetFields();
            
            
      }
    }); 

  }

  
  selectedOption=(value)=>{
    
    var isSelected = Number(value)
    const { form } = this.props;
    const Fkeys = form.getFieldValue('Fkeys');  

      // can use data-binding to get
    let z=[];
    
    for (var i=0; i<this.props.commands.length;i++){
        let ArticleRow= this.props.commands[i].articleRowCount//[2,3]
        let ArticleRowNowSub=this.props.commands[i].articleRowCount//[0]
        let FMLength=this.state.FornisMontants.length
        var val = Fkeys.length;


        let isFilled=this.state.FornisMontants[FMLength-1]===""||this.state.FornisMontants[FMLength-1]===0?true:false
        let nextIsFilled=this.state.FornisMontants[FMLength]===""||this.state.FornisMontants[FMLength]===0?true:false

        if(isSelected===this.props.commands[i].counter){
            let fornisRC=isFilled===true?ArticleRowNowSub:(nextIsFilled?[0]:ArticleRow);
            let NewKeys=[...new Set(Fkeys.concat(ArticleRow))]
            let articleLength=this.props.commands[i].articleRowCount.length;
            let ArtName=this.props.commands[i].ArticleName
            let PrixU=this.props.commands[i].PrixUnitaire;
            let NombreArt=this.props.commands[i].NombreArticle;
            let Fname=this.props.commands[i].fornisseur;
            let BondC=this.props.commands[i].counter
            let MaxR=this.props.commands[i].maxRows
            let MontantArt=this.props.commands[i].MontantArticle
            let payer=this.props.commands[i].payer
            let AccountNum=this.props.commands[i].AccountNumValue
            this.setState({
              FornisRowCount:this.state.FornisRowCount.slice(NewKeys.length).concat(NewKeys),
              edit:true,
              addMore:true,
              maxRows:this.state.maxRows + articleLength,
              FornisRowCount:[...new Set(this.state.FornisRowCount.slice(NewKeys.length).concat(fornisRC))],      
              ArticleName:this.state.ArticleName.slice(NewKeys.length).concat(ArtName).filter((el)=>el!==''&&el!==0),
              FornisPHS:this.state.FornisPHS.slice(NewKeys.length).concat(PrixU).filter((el)=>el!==''&&el!==0),
              FornisQUS:this.state.FornisQUS.slice(NewKeys.length).concat(NombreArt).filter((el)=>el!==''&&el!==0),
              FornisNames:Fname,
              FornisNumNBS:BondC,
              payer:payer,
              AccountNumValue:AccountNum,
              uuidF:MaxR,
              FornisMontants:this.state.FornisMontants.slice(NewKeys.length).concat(MontantArt).filter((el)=>el!==''&&el!==0),
              },()=>this.setState({
                MontantTotal:this.state.FornisMontants.reduce((a,b)=>a+b,0),
                MontantValueLettres:this.MontantInLetters(this.state.FornisMontants.reduce((a,b)=>a+b,0))
              })) 
          }  
   
  } 
}
 
  render() {
    
      const gridStyle = {
        width: '11vw',
        textAlign: 'center',
      };



      //==========================================================

      const { getFieldDecorator, getFieldValue,setFieldsValue } = this.props.form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 15 },
        },
      };
      const formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 15, offset: 4 },
        },
      };
  

      const payModeA=(
        <div style={{marginTop: '15px'}}>
        <label className='remislabel' style={{ display:'inline-block'}}>► Autre:</label>
                            <FormItem className='remisField'>
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
          <label className='remislabel' style={{display:'inline-block'}}>► Payeur:</label>
          <FormItem className='remisField'>
              {getFieldDecorator('payer', {
                initialValue:this.state.payer,
                rules: [{ required: true, message: 'Svp, entrez un nom de payeur valide!' , whitespace: true }]
              })(
                <Input  onChange={this.AccountPayerOnChange} />
              )}
            </FormItem>
            <label className='remislabel' style={{display:'inline-block'}}>► Numéro de compte:</label>
              <FormItem className='remisField'>
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
        <label className='remislabel' style={{display:'inline-block'}}>► Payeur:</label>
          <FormItem className='remisField'>
          {getFieldDecorator('payer', {
            initialValue:this.state.payer,
            rules: [{ required: true, message: 'Svp, entrez un nom de payeur valide!' , whitespace: true }]
          })(
            <Input  onChange={this.AccountPayerOnChange} />
          )}
        </FormItem>
        <label className='remislabel' style={{display:'inline-block'}}>► Numéro de Compte:</label>
        <FormItem className='remisField'>
          {getFieldDecorator('accountNum', {
            initialValue:this.state.AccountNumValue,
            rules: [{ required: true, message: 'Svp, entrez un nom de payeur valide!' , whitespace: true }]
          })(
            <Input  onChange={this.AccountNumOnChange} />
          )}
        </FormItem>
       
       </div>
      )

      const payModeCh=(
        <div style={{marginTop: '15px'}}>
          <label className='remislabel' style={{display:'inline-block'}}>► Payeur:</label>
          <FormItem className='remisField'>
          {getFieldDecorator('payer', {
            initialValue:this.state.payer,
            rules: [{ required: true, message: 'Svp, entrez un nom de payeur valide!' , whitespace: true }]
          })(
            <Input  onChange={this.AccountPayerOnChange} />
          )}
          </FormItem>
          <label className='remislabel' style={{display:'inline-block'}}>► Numéro de chéque:</label>
                              <FormItem className='remisField'>
                              {getFieldDecorator('accountNum', {
                                initialValue:this.state.AccountNumValue,
                                rules: [{ required: true, message: 'Svp, entrez un numéro de chéque valide!' , whitespace: true }]
                              })(
                                <Input  onChange={this.AccountNumOnChange} />
                              )}
          </FormItem>

       </div>
      )

   //=====================================from client ==================================

   getFieldDecorator('Ckeys', { initialValue:(this.state.isClient || this.state.isEmployer || this.state.isActionnaire || this.state.isAutre)? this.state.ClientRowCount :[]});   
   const Ckeys = getFieldValue('Ckeys');
    const formItemsC = Ckeys.map((k, index) => {
      return (
      <div  key={k} style={{display: 'flex'}}>
        <FormItem  
          className="inputFormClient"
          required={false} 
          style={this.state.isAutre?{width: '100%'} : null}  
        > 
          {getFieldDecorator(`nameClient`, {
            validateTrigger: ['onChange', 'onBlur'],
            initialValue:this.state.edit && this.state.maxRows>=k ?this.state.ClientNames[0]:'',
            rules: [{
              required: true,
              whitespace: true,
              message: `Svp! entrer un ${this.state.placeholder} valide`,
            }],
          },)(
                <Input  placeholder={this.state.placeholder} onChange={this.ClientNameOnchange(index)} disabled={k>0}/>
          )}
          
        </FormItem>

        {this.state.isAutre?null:
            <FormItem  
            className="inputFormClient"
            required={false}    
            >
          
              {getFieldDecorator(`Pj[${k}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                initialValue:this.state.edit && this.state.maxRows>=k?this.state.ClientPjs[index]:'',
                rules: [{
                  required: true,
                  whitespace: true,
                  message: "Svp! entrez un P.J valide",
                }],
              })(
                     <Input type='number' placeholder="P.J"   onChange={this.PjClientOnchange(index)} />         
              )}
            
          </FormItem>
        }
        {!this.state.isAutre?
        (<FormItem 
          className="inputFormClient"
          required={false} 
          >      
            {getFieldDecorator(`Qj[${k}]`, {
              validateTrigger: ['onChange', 'onBlur'],
              initialValue:this.state.edit && this.state.maxRows>=k?this.state.ClientQjs[index]:'',
              rules: [{
                required: true,
                whitespace: true,
                message: 'Svp! Entrez une Q.J valide',
              }],
            })(  
                   <Input type='number' placeholder='Q.J'  id={`qj[${k}]`}  onChange={this.QjClientOnchange(index)} />       
            )}
      
        </FormItem>):
        (<FormItem 
          className="inputFormClient"
          required={false}
          style={{width: '100%'}} 
          >     
            {getFieldDecorator(`Qj[${k}]`, {
              validateTrigger: ['onChange', 'onBlur'],
              initialValue:this.state.edit && this.state.maxRows>=k?this.state.ClientQjs[index]:'',
              rules: [{
                required: true,
                whitespace: true,
                message: 'Svp! Saisie une description valide',
              }],
            })(  
                  <Input placeholder='description' onChange={this.isAutreQjClientOnchange(index)} />        
            )}
          
                
        </FormItem>)
      }

        {!this.state.isAutre?
          (<Input  className="inputFormFornis" id={`Montant[${k}]`} value={this.state.ClientMontants[k]} placeholder="Montant" style={{marginTop:'3px'}} disabled />):
          (<Input  className="inputFormFornis" id={`Montant[${k}]`} value={this.state.ClientMontants[k]}  placeholder='Montant' onChange={this.isAutreCheckNumber(index)} style={{marginTop:'3px', width:'50%'}}/>)
        }

        {Ckeys.length > 1 ? (
        <Icon
          className="dynamic-delete-button"
          type="minus-circle-o"
          disabled={Ckeys.length === 0}
          onClick={() => this.removeClient(k)}
          style={{margin:'0.5rem'}}
        />
        ) : null}

      </div>  
      );
    });

       //====================================================form section fornisseur=========== 
       getFieldDecorator('Fkeys', {initialValue:this.state.isFornisseur?this.state.FornisRowCount:[]});
      
       const Fkeys = getFieldValue('Fkeys');
     
  
     const Fornisseur = (
      <div className="ant-row" style={{marginBottom:'2rem', width:'100%'}}>
          {Fkeys.length!=0?<div>
            <div className='fornisName'>
                <Select
                 disabled={!this.state.switch}
                 mode="combobox"
                 size="default"
                 placeholder="Numéro de BC"
                 onSelect={this.selectedOption}
                 >
                 {this.state.children.map((elm,index)=>(<Option key={elm}>{elm}</Option>))}
                 </Select>
                {this.state.switch===false?<Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />}  onChange={this.switchOnChange} defaultChecked />:null}
           </div>
           <div className="fornisName">
          <FormItem style={{width:'100%',
            paddingRight:'10px',marginBottom:'unset'}}
              > 
                {getFieldDecorator(`name`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    initialValue: this.state.edit===true?this.state.FornisNames:'',
                    rules: [{
                      required: true,
                      whitespace: true,
                      message: "Svp! entrez un fornisseur valide",
                    }],
                  })( 
                        
                  <Input  onChange={this.nominationOnchange}  placeholder="Nom du Fornisseur"  /> 
                )}  
          </FormItem></div>
          </div>:null}

        {Fkeys.map((k,index)=>{
          return (
          <div key={k} style={{display: 'flex',marginTop:'10px'}}>  
         {/*  <FormItem 
          className="inputFormFornis"     
          > 
            {getFieldDecorator(`num[${k}]`, {
              validateTrigger: ['onChange', 'onBlur'],
              initialValue:this.state.edit && this.state.maxRows>=k?this.state.FornisNumNBS[k]:'',
              rules: [{
                required: true,
                whitespace: true,
                message: "Svp! entrez un numéro de Bond de commande valide",
              }],})(      
                  <Input   onChange={this.numNBOnchange(index)} placeholder="N° BC"   />)}           
          </FormItem>  */}           

            <FormItem  
              className="inputFormFornis"
              > 
                {getFieldDecorator(`articleName[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    initialValue: this.state.edit && this.state.maxRows>=k?this.state.ArticleName[k]:'',
                    rules: [{
                      required: true,
                      whitespace: true,
                      message: "Svp! entrez un nom d'article valide",
                    }],
                  })( 
                         
                  <Input  onChange={this.ArticleNameOnchange(index)}  placeholder="Nom d'article"  /> 
                )}  
            </FormItem>
    
            <FormItem 
              className="inputFormFornis"  
              >
            
                {getFieldDecorator(`ph[${k}]`, {
                  validateTrigger: ['onChange', 'onBlur'],
                  initialValue:this.state.edit && this.state.maxRows>=k ?this.state.FornisPHS[k].toString():'',
                  rules: [{
                    required: true,
                    whitespace: true,
                    message: "Svp! entrez un Prix hors taxe valide",
                  }],})(      
                    <Input  onChange={this.PHOnchange(index)} placeholder="P.H"  /> 
                )} 
                    
              </FormItem>
              <FormItem  
              className="inputFormFornis"
              >
              
                  {getFieldDecorator(`qu[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    initialValue:this.state.edit && this.state.maxRows>=k ?this.state.FornisQUS[k].toString():'',
                    rules: [{
                      required: true,
                      whitespace: true,
                      message: "Svp! entrez une quantitée valide",
                      
                    }],})(      
                       <Input  onChange={this.QUOnchange(index)} placeholder="Quantité"  /> 
                  )} 
                  
            </FormItem>
            <Input  className="inputFormFornis" id={`price[${k}]`} value={this.state.FornisMontants[index]} placeholder="Montant" style={{marginTop:'3px'}} disabled />

            {Fkeys.length >= 0 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={Fkeys.length === 0}
              onClick={() => this.removeFornis(k)}
              style={{margin:'0.5rem'}}
            />
            ) : null}
        </div>       
        )
        })}
        {this.state.switch===false?<FormItem  style={{width:'100%', margin:'0' }}>
        <Button type="dashed"   onClick={this.addFornis} style={{ width: '100%' }}>
          <Icon type="plus" /> Ajouter une ligne
        </Button>
        </FormItem>:null} 
     </div>
    )


   //====================================================form section Client =========== 
    const Client =(
      <div className="ant-row" style={{marginTop:'1rem', width:'100%'}}>
        {formItemsC}  
      </div>
    )

  
    //================== avatar section =======================
    const { previewVisible, previewImage, fileList, avatarOrText } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      
     <Form onSubmit={this.onSubmit}  ref='form' >
      <div className="ant-row ant-form-item" >    
          <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-xs-offset-0 "/* ant-col-sm-15 ant-col-sm-offset-4 */ >      
            <div className="formContainer">
              <Radio.Group value={avatarOrText} onChange={this.handleTypeDipense} style={{display: 'block'}}>
                <Radio.Button value="avatar">Avatar</Radio.Button>
                <Radio.Button value="text">Text</Radio.Button>
              </Radio.Group>
              {avatarOrText==='avatar' ? 
              <div>
              <Upload className="clearfix" style={{marginBottom:'3rem'}}
                action="//jsonplaceholder.typicode.com/posts/"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
              {fileList.length === 0 ? uploadButton : (null)}
              </Upload>
              <FormItem  
              style={{width:'100%',margin:'0px',margin: '0px' ,marginBottom:'5%'}}
              className="inputFormFornis"
              required={false}>
              {getFieldDecorator('NomEntrepriseInitial', {
                    validateTrigger: ['onChange', 'onBlur'],
                    initialValue:this.state.edit ?this.state.companyNameInitial:'',
                    rules: [{
                      required: true,
                      whitespace: true,
                      message: "Svp! saisie une valeure valide",
              }],})(      
              <Input size="large" 
              onChange={this.companyNameInitialOnChange}
              placeholder="Nom de personne ou d'entreprise" 
              style={{width: '35%', height: '50px'}}/>
              )}     
              </FormItem>
              </div>:
              <FormItem  
                style={{width:'100%',margin:'0px',margin: '0px' ,marginBottom:'10%'}}
                className="inputFormFornis"
                required={false}>
                    {getFieldDecorator('NomEntreprise', {
                      validateTrigger: ['onChange', 'onBlur'],
                      initialValue:this.state.edit ?this.state.CompanyName:'',
                      rules: [{
                        required: true,
                        whitespace: true,
                        message: "Svp! saisie une valeure valide",
              }],})(      
              <Input size="large" 
              onChange={this.CompanyNameOnChange}
              placeholder="Nom de personne ou d'entreprise" 
              style={{width: '35%', height: '50px'}}/>
              )}     
              </FormItem>}
              
              <div style={{    
                position: 'absolute',
                top: '15vh',
                right: '39px',
                width: '15vw'}}>
               <p style={{ width: '85%', display:'block' }}>ID : {this.state.counter}</p>
               <label style={{display:'inline-block', marginRight:'7%'}}>Date:</label>
                  <SingleDatePicker
                  date={this.state.createdAt}
                  onDateChange={this.onDateChange}
                  focused={this.state.calendarFocused}
                  onFocusChange={this.onFocusChange}
                  numberOfMonths={1}
                  isOutsideRange={() => false}
                />
              </div>
              <Card title={this.state.cardTitle} style={{width:'100%'}} extra={this.state.isSubMenu ?<a onClick={
                ()=>this.setState({
                            switch:false,
                            articleName:[''].slice(0),
                            FornisRowCount:[0].slice(0),
                            maxRows:0,
                            isSubMenu:false,
                            benificType:'',
                            isActionnaire:false,
                            isClient:false,
                            isEmployer:false,
                            isFornisseur:false,
                            isAutre:false,
                            cardTitle:'Benificitaire',
                            uuidC:0,
                            uuidF:0,
                            ClientRowCount:[0],
                            ClientMontants:[''],
                            ClientPjs:[''],
                            ClientQjs:[''],
                            FornisNumNBS:'',
                            FornisNames:'',
                            FornisMontants:[''].slice(0),
                            FornisPHS:[''].slice(0),
                            FornisQUS:[''].slice(0),
                            MontantTotal:0,
                            MontantValueLettres:'',
                            edit:false,
                            addMore:false
                  },()=>{
                    const { form } = this.props;
                    const Fkeys = form.getFieldValue('Fkeys');
                    const Ckeys = form.getFieldValue('Ckeys');

                    form.setFieldsValue({
                      Fkeys: [0],
                      Ckeys:[0]
                    }) 
                  })
                  
                }
                            >retour</a> : null}>
                {!this.state.isSubMenu?(<div style={{margin:'2.5vh auto 1vh'}}>
                <Card.Grid style={gridStyle} onClick={()=>this.setState({isFornisseur:true,benificType:'fornisseur',isSubMenu:true,cardTitle:'Fornisseurs',FornisRowCount:this.state.FornisRowCount})}>Fornisseur</Card.Grid>
                <Card.Grid style={gridStyle} onClick={()=>this.setState({isClient:true,benificType:'client',isSubMenu:true,cardTitle:'Client',placeholder:'Nom du Client',ClientRowCount:this.state.ClientRowCount})}>Client</Card.Grid>
                <Card.Grid style={gridStyle} onClick={()=>this.setState({isActionnaire:true,benificType:'actionnaire',isSubMenu:true,cardTitle:'Actionnaire', placeholder:'Nom d\'Actionnaire',ClientRowCount:this.state.ClientRowCount})}>Actionnaire</Card.Grid>
                <Card.Grid style={gridStyle} onClick={()=>this.setState({isEmployer:true,benificType:'employer',isSubMenu:true,cardTitle:'Employé', placeholder:'Nom de l\'Employé',ClientRowCount:this.state.ClientRowCount})}>Employé</Card.Grid>
                <Card.Grid style={gridStyle} onClick={this.isAutre}>Autre</Card.Grid>
                </div>):null}
                
                { this.state.isFornisseur ? Fornisseur: null}
                { this.state.isClient ? Client :null} 
                { this.state.isActionnaire ? Client :null}
                { this.state.isEmployer ? Client :null}  
                { this.state.isAutre ? Client :null} 
                </Card> 
                    
                <div style={{width:'100%'}}>
                  
                      <label style={{marginTop: '37px',marginBottom:'13vh',width:'20%', display:'inline-block',float:'left'}}>Libeli{'é'}e, D{'é'}charges:</label>
                          <FormItem style={{width:'80%',marginBottom:'2rem', float:'right',marginTop:'32px'}}>
                          {getFieldDecorator('libelle', {
                            initialValue:this.state.LibValue,
                            rules: [{ required: true, message: 'Svp, Entrez libellés ou décharges valide!' , whitespace: true}],
                          
                          })(
                            <Input  placeholder="Saisie les libeliés ou les décharges"  onChange={this.LibOnChange}  />
                          )}
                          </FormItem>
                       
                      <label style={{width:'20%', display:'block'}}>Montant Chargé:</label>
                      <label className="fontzise" style={{ width:'27%', display:'inline-block',marginLeft:'13%'}}>► Montant en chiffres:</label>
                              <InputNumber min={0} max={100000000000000000000}  value={this.state.MontantTotal}  style={{width:'60%'}} disabled/>
                      <label className="fontzise montantLettreInput" style={{marginTop:'10px',width:'27%', display:'inline-block',marginLeft:'13%'}}>► Montant en lettres :</label>
                      
                      <Input  className="inputFormFornis" value={this.state.MontantValueLettres} placeholder="Montant en lettres" style={{width:'60%' , display:'inline-block', margin: 'unset' }} disabled />


                      
                      <div style={{marginTop:'3%'}}>
                        <label style={{width:'16vw', display:'inline-block'}}>Chantier / Projet :</label>
                            <FormItem>
                            {getFieldDecorator('chantierValue', {
                              initialValue:this.state.ChantierValue,
                              rules: [{ required: true, message: 'Svp, un chantier ou un projet valide!' , whitespace: true }]
                            })(
                              <TextArea  onChange={this.ChantierOnChange} autosize={{ minRows: 2, maxRows: 6 }} style={{width:'100%'}} />
                            )}
                            </FormItem>
                      </div>    
                        <label style={{marginTop:'8px',width:'25%', display:'inline-block',marginLeft:'10%'}}>► R{'é'}sponsable de Chantier :</label>
                        <FormItem style={{width:'65%' , display:'inline-block'}}>
                        {getFieldDecorator('resChanier', {
                          initialValue:this.state.Responsable,
                          rules: [{ required: true, message: 'Svp, Entrez un nom de responsable valide!' , whitespace: true }]
                        })(
                          <Input  placeholder=" Entrer le responsable de chantier "  onChange={this.ResponsableOnChange} style={{width:'100%'}} />
                        )}
                        </FormItem>                      
                        <label style={{width:'4vw'}}>Mode de paiement:</label>
                            <RadioGroup onChange={this.PayModeOnChange} value={this.state.PayModeValue} style={{width:'70%',marginLeft:'33px' , marginBottom: '15px'}}>
                                <Radio className="fontsize" value={"espece"}>Espece</Radio>
                                <Radio className="fontsize" value={"autres"}>Autres</Radio>
                                <Radio className="fontsize" value={"cheque"}>Chéque</Radio>
                                <Radio className="fontsize" value={"virement"}>Virement</Radio>
                            </RadioGroup>  
                        {this.state.PayModeValue==='espece'?payModeE:null}
                        {this.state.PayModeValue==='cheque'?payModeCh:null}
                        {this.state.PayModeValue==='virement'?payModeC:null}
                        {this.state.PayModeValue==='autres'?payModeA:null}
                        <label className="ant-row" style={{float: 'left'}}>Caisse Observation:</label>
                            <FormItem>
                            {getFieldDecorator('Observastion', {
                              initialValue:this.state.CaisseObserv
                            })(
                              <TextArea  onChange={this.observOnChance} autosize={{ minRows: 2, maxRows: 6 }} style={{width:'45vw',float: 'right'}} />
                            )}
                            </FormItem>           
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
    id: state.dipenses,
    commands:state.commands
  }
};
const FormDispense = Form.create()(FormDispensePage);

export default connect(mapStateToProps)(FormDispense);