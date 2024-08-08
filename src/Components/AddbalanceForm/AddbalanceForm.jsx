import React from 'react'
import styles from './AddbalanceForm.module.css';
import { useState,useEffect } from 'react';
import { useSnackbar } from 'notistack';

const AddbalanceForm = ({close,setBalance,open}) => {
  const [income,setIncome]=useState('');
  const { enqueueSnackbar } =useSnackbar()
  const handleBalance=(e)=>{
    e.preventDefault();
    if(Number(income)<0)
    {
      enqueueSnackbar("Balance must be greater than 0",{
        variant:'warning'
      })
      open(false)
      return;
    }
    setBalance(prev=>prev+Number(income))
    open(false);

  
    
  }
 
  return (
    <div className={styles.expenseform}>
        <div className={styles.box}>
        <div className={styles.heading}>Add Balance</div>
        <div className={styles.inputfields}>
        <form onSubmit={handleBalance}>
          
        <input className={styles.inputfield} placeholder='Income Amount' onChange={(e)=>setIncome(e.target.value)} />
        <button className={styles.buttonstyle1} >Add Balance</button>
        <button className={styles.buttonstyle2} onClick={close}>Cancel</button>
       
        </form>
        </div>
      </div>
        
    </div>
  )
}

export default AddbalanceForm