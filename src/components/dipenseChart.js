import React from 'react';
import ReactDOM from 'react-dom';
import {Chart, Geom, Axis, Tooltip, Coord, Label, Legend, Guide, Shape } from 'bizcharts';
import { View, DataSet } from '@antv/data-set';
import { connect } from 'react-redux';
import {setStartDate, setEndDate } from '../actions/filters';
import selectdipenses from '../selectors/dipenses'
import moment from 'moment';


const { Html,Text } = Guide;
var math = require('mathjs');

class DipenseChart extends React.Component{
    constructor(props){
        super(props)
        this.state={
            
            alldipenes:props.alldipenes,
            countFornis:props.alldipenes.filter(dipense=>dipense.isFornisseur).length,
            countClient:props.alldipenes.filter(dipense=>dipense.isClient).map(dipense=>dipense.ClientNames.length).reduce((a,b)=>a+b,0),
            countActionnaire:props.alldipenes.filter(dipense=>dipense.isActionnaire).map(dipense=>dipense.ClientNames.length).reduce((a,b)=>a+b,0),
            countEmploye:props.alldipenes.filter(dipense=>dipense.isEmploye).map(dipense=>dipense.ClientNames.length).reduce((a,b)=>a+b,0),
            countAutre:props.alldipenes.filter(dipense=>dipense.isAutre).map(dipense=>dipense.ClientNames.length).reduce((a,b)=>a+b,0),

        }

    }
  
    calculTotalMontant=(month,param)=>{
       
         const  startDate= moment().month(month).startOf('month')
         const  endDate= moment().month(month).endOf('month')   
         const total = this.props.dipenses.filter(dip=>{
             if(dip.benificType===param){
             const created = moment(dip.createdAt); 
             if(startDate.isSameOrBefore(created,'day') && endDate.isSameOrAfter(created, 'day')){
                 return true
             }
            }
         }).map(dip=>dip.MontantTotal).reduce((a,b)=>a+b,0)
        return total
    }
    
    componentWillReceiveProps(nextProps) {
            this.setState({ alldipenes: nextProps.alldipenes },()=>this.setState({
                countFornis:this.state.alldipenes.filter(dipense=>dipense.isFornisseur).length,
                countClient:this.state.alldipenes.filter(dipense=>dipense.isClient).map(dipense=>dipense.ClientNames.length).reduce((a,b)=>a+b,0),
                countActionnaire:this.state.alldipenes.filter(dipense=>dipense.isActionnaire).map(dipense=>dipense.ClientNames.length).reduce((a,b)=>a+b,0),
                countEmploye:this.state.alldipenes.filter(dipense=>dipense.isEmploye).map(dipense=>dipense.ClientNames.length).reduce((a,b)=>a+b,0),
                countAutre:this.state.alldipenes.filter(dipense=>dipense.isAutre).map(dipense=>dipense.ClientNames.length).reduce((a,b)=>a+b,0)
            }))
            
    }

    componentDidMount(){

    }
      
    render(){
        
        //////////// circle Chart //////////////////////////
        const {countFornis,countAutre,countClient,countEmploye,countActionnaire}=this.state;
        const data = [
            { item: 'Fornisseurs', count:countFornis},
            { item: 'Clients', count: countClient },
            { item: 'Employés', count: countEmploye },
            { item: 'Actionnaires', count: countActionnaire },
            { item: 'Autres', count: countAutre },
            ];
        const dv = new View();
        dv.source(data).transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
            });

        const cols = {
                percent: {
                  formatter: val => {
                    val = (val * 100).toFixed(1) + '%';
                    return val;
                  }
                }
            }
               
        //////////// horizontal chart ///////////
        const dataChart = [
            { name:'Fornisseurs',
                'Jan.': this.calculTotalMontant(0,'fornisseur'),
                'Feb.': this.calculTotalMontant(1,'fornisseur'), 
                'Mar.': this.calculTotalMontant(2,'fornisseur'), 
                'Apr.': this.calculTotalMontant(3,'fornisseur'), 
                'May.': this.calculTotalMontant(4,'fornisseur'), 
                'Jun.': this.calculTotalMontant(5,'fornisseur'),  
                'Jul.': this.calculTotalMontant(6,'fornisseur'),  
                'Aug.': this.calculTotalMontant(7,'fornisseur'),  
                'Sep.': this.calculTotalMontant(8,'fornisseur'), 
                'Oct.': this.calculTotalMontant(9,'fornisseur'), 
                'Nov.': this.calculTotalMontant(10,'fornisseur'), 
                'Dec.': this.calculTotalMontant(11,'fornisseur'), 
            },
            { name:'Clients',
                'Jan.': this.calculTotalMontant(0,'client'),
                'Feb.': this.calculTotalMontant(1,'client'), 
                'Mar.': this.calculTotalMontant(2,'client'), 
                'Apr.': this.calculTotalMontant(3,'client'), 
                'May.': this.calculTotalMontant(4,'client'),
                'Jun.': this.calculTotalMontant(5,'client'), 
                'Jul.': this.calculTotalMontant(6,'client'),
                'Aug.': this.calculTotalMontant(7,'client'),
                'Sep.': this.calculTotalMontant(8,'client'),
                'Oct.': this.calculTotalMontant(9,'client'), 
                'Nov.': this.calculTotalMontant(10,'client'), 
                'Dec.': this.calculTotalMontant(11,'client'),
            },
            { name:'Employés',
                'Jan.': this.calculTotalMontant(0,'employer'),
                'Feb.': this.calculTotalMontant(1,'employer'), 
                'Mar.': this.calculTotalMontant(2,'employer'), 
                'Apr.': this.calculTotalMontant(3,'employer'), 
                'May.': this.calculTotalMontant(4,'employer'), 
                'Jun.': this.calculTotalMontant(5,'employer'),  
                'Jul.': this.calculTotalMontant(6,'employer'),  
                'Aug.': this.calculTotalMontant(7,'employer'),  
                'Sep.': this.calculTotalMontant(8,'employer'), 
                'Oct.': this.calculTotalMontant(9,'employer'), 
                'Nov.': this.calculTotalMontant(10,'employer'), 
                'Dec.': this.calculTotalMontant(11,'employer'),
            },
            { name:'Actionnaires',
                'Jan.': this.calculTotalMontant(0,'actionnaire'),
                'Feb.': this.calculTotalMontant(1,'actionnaire'), 
                'Mar.': this.calculTotalMontant(2,'actionnaire'), 
                'Apr.': this.calculTotalMontant(3,'actionnaire'), 
                'May.': this.calculTotalMontant(4,'actionnaire'), 
                'Jun.': this.calculTotalMontant(5,'actionnaire'),  
                'Jul.': this.calculTotalMontant(6,'actionnaire'),  
                'Aug.': this.calculTotalMontant(7,'actionnaire'),  
                'Sep.': this.calculTotalMontant(8,'actionnaire'), 
                'Oct.': this.calculTotalMontant(9,'actionnaire'), 
                'Nov.': this.calculTotalMontant(10,'actionnaire'), 
                'Dec.': this.calculTotalMontant(11,'actionnaire'),
            },
            { name:'Autres',
                'Jan.': this.calculTotalMontant(0,'autre'),
                'Feb.': this.calculTotalMontant(1,'autre'), 
                'Mar.': this.calculTotalMontant(2,'autre'), 
                'Apr.': this.calculTotalMontant(3,'autre'), 
                'May.': this.calculTotalMontant(4,'autre'), 
                'Jun.': this.calculTotalMontant(5,'autre'),  
                'Jul.': this.calculTotalMontant(6,'autre'),  
                'Aug.': this.calculTotalMontant(7,'autre'),  
                'Sep.': this.calculTotalMontant(8,'autre'), 
                'Oct.': this.calculTotalMontant(9,'autre'), 
                'Nov.': this.calculTotalMontant(10,'autre'), 
                'Dec.': this.calculTotalMontant(11,'autre'),
           },
          ];
          const da = new DataSet();
          const ds = da.createView().source(dataChart);
            ds.transform({
                type: 'fold',
                fields: [ 'Jan.','Feb.','Mar.','Apr.','May.','Jun.','Jul.','Aug.','sep.','oct.','nov.','dec.' ],
                key: 'month', // key字段
                value: 'rainfall', // value字段
            });
    
                
         return (
            <div className="chartContainer" >
             <Chart  height={400} data={dv} scale={cols} padding={[10, 80, 10, 70]}  forceFit>
                    <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
                    <Axis name="percent" />
                    <Legend 
                        useHtml={true}
                        position='right' 
                        offsetY={-window.innerHeight / 2 + 130} 
                        offsetX={-window.innerHeight / 2 + 150} 
                        style={{fontSize:'2rem'}} 
                        itemTpl={
                            (value, color,checked,index) => {
                             const obj = dv.rows[index];
                              return( 
                                '<li class="g2-legend-list-item item-' + index + '" data-value="' + value + '" data-color=' + color +
                                'style="cursor: pointer;font-size: 14px;">' +
                                '<i class="g2-legend-marker" style="background-color:' + color + ';"></i>'+
                                '<span style="background-color:{color};" class="g2-tooltip-marker"></span>{value}: '+ obj.count +'</li>')										
                            }
                          }
                        
                        />
                    <Tooltip 
                    showTitle={false} 
                    itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                    />
                    <Guide >
                        <Html 
                        position ={[ '50%', '53%' ]} 
                        html={()=>{
                            return(
                            '<div style="color:#4a4a4a;font-size:1.4vw;text-align: center;width: 24vw;"><p style="margin-bottom:0em">Total Dipenses</p>'+
                            '<span style="font-size:2.5em">'+this.state.alldipenes.length+'</span>'+
                            '</div>' 
                            )
                        }}
                        />
                    </Guide>
                    <Geom
                    type="intervalStack"
                    position="percent"
                    color='item'
                    tooltip={['item*percent',(item, percent) => {
                        percent = percent * 100 + '%';
                        return {
                        name: item,
                        value: percent
                        };
                    }]}
                    style={{lineWidth: 1,stroke: '#fff',}}
                    >
                    <Label content='percent' formatter={(val, item) => {
                        return item.point.item + ': ' + val;}} />
                    </Geom>
          </Chart> 
          <Chart height={400} data={ds} forceFit>
            <Axis name="Month" />
            <Axis name="rainfall" label={{
                formatter: val => {
                  return val  + ' Dhs';
                }
              }}/>
            <Legend />
            <Tooltip crosshairs={{type : "y"}}  
            showTitle={true} 
            itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value} Dhs</li>'
            />
            
            <Geom type='intervalStack' position="month*rainfall" color={'name'}  adjust={[{type: 'dodge',marginRatio: 1/32}]} />
          </Chart>
          </div>
        )
    } 
}

const mapStateToProps = (state) => {
    return {
      dipenses: state.dipenses,
      filteredDipense:selectdipenses(state.dipenses, state.filters)
    };
  };
  const mapDispatchToProps = (dispatch) => ({
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
  });

  export default connect(mapStateToProps,mapDispatchToProps)(DipenseChart);