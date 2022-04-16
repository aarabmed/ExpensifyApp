import React from 'react';
import {Chart, Geom, Axis, Tooltip, Coord, Label, Legend, Guide, Shape } from 'bizcharts';
import { View, DataSet } from '@antv/data-set';
import { connect } from 'react-redux';
import {setStartDate, setEndDate } from '../../redux/actions/filters';
import selectdipenses from '../../redux/selectors/dipenses'
import moment from 'moment';
import { Select } from 'antd';


const { Html,Text } = Guide;
const Option = Select.Option;

class DipenseChart extends React.Component{
    constructor(props){
        super(props)
        this.state={
            dataChart:[],
            selectOptions:[],
            selectedYear:moment().year(),
            currentUser:props.currentUser,
            alldipenes:props.alldipenes,
            countFornis:props.alldipenes.filter(dipense=>dipense.isFornisseur).length,
            countClient:props.alldipenes.filter(dipense=>dipense.isClient).map(dipense=>dipense.ClientNames.length).reduce((a,b)=>a+b,0),
            countActionnaire:props.alldipenes.filter(dipense=>dipense.isActionnaire).map(dipense=>dipense.ClientNames.length).reduce((a,b)=>a+b,0),
            countEmploye:props.alldipenes.filter(dipense=>dipense.isEmploye).map(dipense=>dipense.ClientNames.length).reduce((a,b)=>a+b,0),
            countAutre:props.alldipenes.filter(dipense=>dipense.isAutre).map(dipense=>dipense.ClientNames.length).reduce((a,b)=>a+b,0),
        }

    }
  
    calculTotalMontant=(year,month,param)=>{
       
         const  startDate= moment().month(month).year(year).startOf('month')
         const  endDate= moment().month(month).year(year).endOf('month')   
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
           
            this.setSelectYearOptions()
    }

    setSelectYearOptions = ()=>{
        const currentYear = moment().year()
        const numberOfyears = currentYear-moment(this.state.currentUser.createdAt).year()
        const options =[]
        for (let index = 0; index <= numberOfyears; index++) {
            options.push({label:currentYear - index,value:currentYear-index})
            if(index===numberOfyears){
                this.setState({selectOptions:options})
            }
        }

        const dataChart = [
            { name:'Fornisseurs',
                'Jan.': this.calculTotalMontant(this.state.selectedYear,0,'fornisseur'),
                'Feb.': this.calculTotalMontant(this.state.selectedYear,1,'fornisseur'), 
                'Mar.': this.calculTotalMontant(this.state.selectedYear,2,'fornisseur'), 
                'Apr.': this.calculTotalMontant(this.state.selectedYear,3,'fornisseur'), 
                'May.': this.calculTotalMontant(this.state.selectedYear,4,'fornisseur'), 
                'Jun.': this.calculTotalMontant(this.state.selectedYear,5,'fornisseur'),  
                'Jul.': this.calculTotalMontant(this.state.selectedYear,6,'fornisseur'),  
                'Aug.': this.calculTotalMontant(this.state.selectedYear,7,'fornisseur'),  
                'Sep.': this.calculTotalMontant(this.state.selectedYear,8,'fornisseur'), 
                'Oct.': this.calculTotalMontant(this.state.selectedYear,9,'fornisseur'), 
                'Nov.': this.calculTotalMontant(this.state.selectedYear,10,'fornisseur'), 
                'Dec.': this.calculTotalMontant(this.state.selectedYear,11,'fornisseur'), 
            },
            { name:'Clients',
                'Jan.': this.calculTotalMontant(this.state.selectedYear,0,'client'),
                'Feb.': this.calculTotalMontant(this.state.selectedYear,1,'client'), 
                'Mar.': this.calculTotalMontant(this.state.selectedYear,2,'client'), 
                'Apr.': this.calculTotalMontant(this.state.selectedYear,3,'client'), 
                'May.': this.calculTotalMontant(this.state.selectedYear,4,'client'),
                'Jun.': this.calculTotalMontant(this.state.selectedYear,5,'client'), 
                'Jul.': this.calculTotalMontant(this.state.selectedYear,6,'client'),
                'Aug.': this.calculTotalMontant(this.state.selectedYear,7,'client'),
                'Sep.': this.calculTotalMontant(this.state.selectedYear,8,'client'),
                'Oct.': this.calculTotalMontant(this.state.selectedYear,9,'client'), 
                'Nov.': this.calculTotalMontant(this.state.selectedYear,10,'client'), 
                'Dec.': this.calculTotalMontant(this.state.selectedYear,11,'client'),
            },
            { name:'Employés',
                'Jan.': this.calculTotalMontant(this.state.selectedYear,0,'employer'),
                'Feb.': this.calculTotalMontant(this.state.selectedYear,1,'employer'), 
                'Mar.': this.calculTotalMontant(this.state.selectedYear,2,'employer'), 
                'Apr.': this.calculTotalMontant(this.state.selectedYear,3,'employer'), 
                'May.': this.calculTotalMontant(this.state.selectedYear,4,'employer'), 
                'Jun.': this.calculTotalMontant(this.state.selectedYear,5,'employer'),  
                'Jul.': this.calculTotalMontant(this.state.selectedYear,6,'employer'),  
                'Aug.': this.calculTotalMontant(this.state.selectedYear,7,'employer'),  
                'Sep.': this.calculTotalMontant(this.state.selectedYear,8,'employer'), 
                'Oct.': this.calculTotalMontant(this.state.selectedYear,9,'employer'), 
                'Nov.': this.calculTotalMontant(this.state.selectedYear,10,'employer'), 
                'Dec.': this.calculTotalMontant(this.state.selectedYear,11,'employer'),
            },
            { name:'Actionnaires',
                'Jan.': this.calculTotalMontant(this.state.selectedYear,0,'actionnaire'),
                'Feb.': this.calculTotalMontant(this.state.selectedYear,1,'actionnaire'), 
                'Mar.': this.calculTotalMontant(this.state.selectedYear,2,'actionnaire'), 
                'Apr.': this.calculTotalMontant(this.state.selectedYear,3,'actionnaire'), 
                'May.': this.calculTotalMontant(this.state.selectedYear,4,'actionnaire'), 
                'Jun.': this.calculTotalMontant(this.state.selectedYear,5,'actionnaire'),  
                'Jul.': this.calculTotalMontant(this.state.selectedYear,6,'actionnaire'),  
                'Aug.': this.calculTotalMontant(this.state.selectedYear,7,'actionnaire'),  
                'Sep.': this.calculTotalMontant(this.state.selectedYear,8,'actionnaire'), 
                'Oct.': this.calculTotalMontant(this.state.selectedYear,9,'actionnaire'), 
                'Nov.': this.calculTotalMontant(this.state.selectedYear,10,'actionnaire'), 
                'Dec.': this.calculTotalMontant(this.state.selectedYear,11,'actionnaire'),
            },
            { name:'Autres',
                'Jan.': this.calculTotalMontant(this.state.selectedYear,0,'autre'),
                'Feb.': this.calculTotalMontant(this.state.selectedYear,1,'autre'), 
                'Mar.': this.calculTotalMontant(this.state.selectedYear,2,'autre'), 
                'Apr.': this.calculTotalMontant(this.state.selectedYear,3,'autre'), 
                'May.': this.calculTotalMontant(this.state.selectedYear,4,'autre'), 
                'Jun.': this.calculTotalMontant(this.state.selectedYear,5,'autre'),  
                'Jul.': this.calculTotalMontant(this.state.selectedYear,6,'autre'),  
                'Aug.': this.calculTotalMontant(this.state.selectedYear,7,'autre'),  
                'Sep.': this.calculTotalMontant(this.state.selectedYear,8,'autre'), 
                'Oct.': this.calculTotalMontant(this.state.selectedYear,9,'autre'), 
                'Nov.': this.calculTotalMontant(this.state.selectedYear,10,'autre'), 
                'Dec.': this.calculTotalMontant(this.state.selectedYear,11,'autre'),
           },
        ];
        this.setState({dataChart})
    }
    
    selectYear = (value)=>{

        const dataChart = [
            { name:'Fornisseurs',
                'Jan.': this.calculTotalMontant(value,0,'fornisseur'),
                'Feb.': this.calculTotalMontant(value,1,'fornisseur'), 
                'Mar.': this.calculTotalMontant(value,2,'fornisseur'), 
                'Apr.': this.calculTotalMontant(value,3,'fornisseur'), 
                'May.': this.calculTotalMontant(value,4,'fornisseur'), 
                'Jun.': this.calculTotalMontant(value,5,'fornisseur'),  
                'Jul.': this.calculTotalMontant(value,6,'fornisseur'),  
                'Aug.': this.calculTotalMontant(value,7,'fornisseur'),  
                'Sep.': this.calculTotalMontant(value,8,'fornisseur'), 
                'Oct.': this.calculTotalMontant(value,9,'fornisseur'), 
                'Nov.': this.calculTotalMontant(value,10,'fornisseur'), 
                'Dec.': this.calculTotalMontant(value,11,'fornisseur'), 
            },
            { name:'Clients',
                'Jan.': this.calculTotalMontant(value,0,'client'),
                'Feb.': this.calculTotalMontant(value,1,'client'), 
                'Mar.': this.calculTotalMontant(value,2,'client'), 
                'Apr.': this.calculTotalMontant(value,3,'client'), 
                'May.': this.calculTotalMontant(value,4,'client'),
                'Jun.': this.calculTotalMontant(value,5,'client'), 
                'Jul.': this.calculTotalMontant(value,6,'client'),
                'Aug.': this.calculTotalMontant(value,7,'client'),
                'Sep.': this.calculTotalMontant(value,8,'client'),
                'Oct.': this.calculTotalMontant(value,9,'client'), 
                'Nov.': this.calculTotalMontant(value,10,'client'), 
                'Dec.': this.calculTotalMontant(value,11,'client'),
            },
            { name:'Employés',
                'Jan.': this.calculTotalMontant(value,0,'employer'),
                'Feb.': this.calculTotalMontant(value,1,'employer'), 
                'Mar.': this.calculTotalMontant(value,2,'employer'), 
                'Apr.': this.calculTotalMontant(value,3,'employer'), 
                'May.': this.calculTotalMontant(value,4,'employer'), 
                'Jun.': this.calculTotalMontant(value,5,'employer'),  
                'Jul.': this.calculTotalMontant(value,6,'employer'),  
                'Aug.': this.calculTotalMontant(value,7,'employer'),  
                'Sep.': this.calculTotalMontant(value,8,'employer'), 
                'Oct.': this.calculTotalMontant(value,9,'employer'), 
                'Nov.': this.calculTotalMontant(value,10,'employer'), 
                'Dec.': this.calculTotalMontant(value,11,'employer'),
            },
            { name:'Actionnaires',
                'Jan.': this.calculTotalMontant(value,0,'actionnaire'),
                'Feb.': this.calculTotalMontant(value,1,'actionnaire'), 
                'Mar.': this.calculTotalMontant(value,2,'actionnaire'), 
                'Apr.': this.calculTotalMontant(value,3,'actionnaire'), 
                'May.': this.calculTotalMontant(value,4,'actionnaire'), 
                'Jun.': this.calculTotalMontant(value,5,'actionnaire'),  
                'Jul.': this.calculTotalMontant(value,6,'actionnaire'),  
                'Aug.': this.calculTotalMontant(value,7,'actionnaire'),  
                'Sep.': this.calculTotalMontant(value,8,'actionnaire'), 
                'Oct.': this.calculTotalMontant(value,9,'actionnaire'), 
                'Nov.': this.calculTotalMontant(value,10,'actionnaire'), 
                'Dec.': this.calculTotalMontant(value,11,'actionnaire'),
            },
            { name:'Autres',
                'Jan.': this.calculTotalMontant(value,0,'autre'),
                'Feb.': this.calculTotalMontant(value,1,'autre'), 
                'Mar.': this.calculTotalMontant(value,2,'autre'), 
                'Apr.': this.calculTotalMontant(value,3,'autre'), 
                'May.': this.calculTotalMontant(value,4,'autre'), 
                'Jun.': this.calculTotalMontant(value,5,'autre'),  
                'Jul.': this.calculTotalMontant(value,6,'autre'),  
                'Aug.': this.calculTotalMontant(value,7,'autre'),  
                'Sep.': this.calculTotalMontant(value,8,'autre'), 
                'Oct.': this.calculTotalMontant(value,9,'autre'), 
                'Nov.': this.calculTotalMontant(value,10,'autre'), 
                'Dec.': this.calculTotalMontant(value,11,'autre'),
           },
        ];

        this.setState({dataChart,selectYear:value})
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
        
          const da = new DataSet();
          const ds = da.createView().source(this.state.dataChart);
            ds.transform({
                type: 'fold',
                fields: [ 'Jan.','Feb.','Mar.','Apr.','May.','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.' ],
                key: 'month', 
                value: 'rainfall', 
            });
    
                
         return (
            <div className="chartContainer" >
             <Chart  height={500} data={dv} scale={cols} padding={[10, 80, 10, 70]}  forceFit>
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
          
            <div className='yearSelect'>
            <span>Data of :</span>
            <Select onSelect={this.selectYear} defaultValue={moment().year()} >
                {this.state.selectOptions.map((option,key)=><Option key={key} value={option.value}>{option.label}</Option>)}
            </Select>
            </div>
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
                itemTpl={`<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value} Dhs</li>`}
                />
                
                <Geom type='intervalStack' position="month*rainfall" color={'name'}  adjust={[{type: 'dodge',marginRatio: 1/32}]} />
            </Chart>                        
            
          
        </div>
        )
    } 
}

const mapStateToProps = (state) => {
    return {
        user:state.auth,
        dipenses: state.dipenses,
        filteredDipense:selectdipenses(state.dipenses, state.filters)
    };
};

const mapDispatchToProps = (dispatch) => ({
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps,mapDispatchToProps)(DipenseChart);