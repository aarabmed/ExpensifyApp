import React from 'react';
import { Tabs } from 'antd';
import DipenseListFilters from './dipenseListFilter';
import DipenseList from './dipenseList'
import CommandList from './commandList';

const TabPane = Tabs.TabPane;
const DashboardPage=(props)=>(
    <div style={{padding: '3%'}}>
    <Tabs defaultActiveKey="1">
        <TabPane tab="Bons dipense" key="1">
            <div>
                <h2 style={{fontFamily:' monospace', fontSize:'3rem', fontWeight:'600',
                    borderBottom: '1px solid black',
                    marginBottom: '30px',
                    paddingBottom: '11px'}}
                    >Tableau des bons dipense</h2>
                <DipenseListFilters style={{display: 'inline-block', width: '60%'}}/>
                <DipenseList/>
            </div>
        </TabPane>
        <TabPane tab="Bons de Commande" key="2">
            <div>
                <h2 style={{fontFamily:' monospace', fontSize:'3rem', fontWeight:'600',
                borderBottom: '1px solid black',
                marginBottom: '30px',
                paddingBottom: '11px'}}
                >Tableau des bons de commande</h2>
                <CommandList/>
            </div>
        </TabPane>
    </Tabs>
    </div> 


)

export default DashboardPage;


