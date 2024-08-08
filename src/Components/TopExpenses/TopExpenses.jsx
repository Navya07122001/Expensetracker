import React, { useState ,useEffect} from 'react';
import styles from './TopExpenses.module.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const TopExpenses = ({data}) => {
   

    return (
        <div className={styles.main}>
            <div className={styles.heading}>Top Expenses</div>
            <div className={styles.design}>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart 
                        layout="vertical" 
                        data={data} 
                        margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                    >
                        <XAxis type="number" axisLine={false} tickLine={false}  />
                        <YAxis type="category" dataKey="name" axisLine={false} tickLine={false}/>
                        <Tooltip />
                        <Bar dataKey="value" fill="#8784D2" barSize={20}  stroke="#8784D2" strokeWidth={1} radius={[0, 20, 20, 0]}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default TopExpenses;