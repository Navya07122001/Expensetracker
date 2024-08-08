import React, { useEffect, useState } from 'react';
import styles from './FormSection.module.css';
import PieChartComp from '../PieChart/PieChartComp';
import Modal from 'react-modal'
import ExpenseForm from '../ExpenseForm/ExpenseForm';
import AddbalanceForm from '../AddbalanceForm/AddbalanceForm';

  
function FormSection() {
  const [bal,setBal]=useState(0);
  const [exp,setExp]=useState(0);
      
    
    
     
    
      const fetchdata=()=>{
        const balance = localStorage.getItem("balance");
        if (balance) {
          setBal(parseInt(balance));
        }
      const expensesdata = localStorage.getItem("expensedata");
      if (expensesdata) {
        const parsedExpenses = JSON.parse(expensesdata);
        if (Array.isArray(parsedExpenses)) {
          const totalExpenses = parsedExpenses.reduce((acc, ele) => acc + parseInt(ele.price), 0);
          setBal((prev)=>prev-totalExpenses)
          setExp(totalExpenses);
        }
      }
      }
      useEffect(()=>{
        fetchdata();  // Initial fetch
    
        const handleStorageChange = () => {
          fetchdata();  // Update balance and expenses when custom event is fired
        };
    
        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('localStorageUpdate', handleStorageChange);
    
        return () => {
          window.removeEventListener('storage', handleStorageChange);
          window.removeEventListener('localStorageUpdate', handleStorageChange);
        };
    
       
    }, []);
    return (
        <div>
        
           
      
        </div>
    );
}

export default FormSection;