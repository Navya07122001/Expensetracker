import React,{useEffect} from 'react';
import TopExpenses from '../TopExpenses/TopExpenses'
import styles from './Home.module.css'
import PieChartComp from '../PieChart/PieChartComp';
import Modal from 'react-modal'
import TransactionsSection from '../TransactionsSection/TransactionsSection';
import { useState } from 'react';
import AddbalanceForm from '../AddbalanceForm/AddbalanceForm';
import ExpenseForm from '../ExpenseForm/ExpenseForm';
const customStyles = {
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        background:'none',
        border: '2px ',
        
  bgcolor: 'background.paper',
        boxShadow: 34,
        p: 4,
    },
  };
  const customStyles1= {
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        background:'none',
        border: '2px ',
        
  bgcolor: 'background.paper',
        boxShadow: 34,
        p: 4,
    },
  };

function Home() {
    const [balance,setBalance]=useState(0);
    const [isMounted,setIsMounted]=useState(false);
    const [expense,setExpense]=useState(0)
    const [expenselist,setExpenselist]=useState([]);
    const [openBalform, setIsOpenbalform] = useState(false); 
    const [modalIsOpen1, setIsOpen1] = useState(false);  
    const [editId,setIsEditid]=useState()
      function openModal1() {
        setIsOpen1(true);
      }
    function openModal() {
        setIsOpenbalform(true);
      }
      function closeModal() {
        setIsOpenbalform(false);
      }
      function closeModal1() {
        setIsOpen1(false);
      }

    const [categoryexpenses,setCategoryExpenses]=useState({
        food:0,
        travel:0,
        entertainment:0
    });
    const [categorycount,setCategorycount]=useState({
        food:0,
        travel:0,
        entertainment:0
    })
    useEffect(()=>{
        const localbal=localStorage.getItem("balance");
        console.log(localbal)
        if(localbal){
            setBalance(Number(localbal));
        }
        else{
            setBalance(5000);
            localStorage.setItem("balance", 5000);
        }
        const items=JSON.parse(localStorage.getItem("expenses"))
        setExpenselist(items||[])
        setIsMounted(true);
    },[]);
    
    useEffect(()=>{
        if(expenselist.length>0 || isMounted){
            localStorage.setItem("expenses",JSON.stringify(expenselist))
        }
        if(expenselist.length>0){
            setExpense(expenselist.reduce((accumulator,expense)=>
                accumulator + Number(expense.price)
            ,0))
        }
        else{
            setExpense(0)
        }
        let foodexpense=0,entertainmentexpense=0,travelexpense=0;
        let foodcount=0,entertainmentcount=0,travelcount=0;
        expenselist.forEach((expense)=>{
                    if(expense.category=="Food"){
                        foodexpense+=Number(expense.price)
                        foodcount++;
                    }
                    else if(expense.category=="Entertainment"){
                        console.log(expense,"0000")
                        entertainmentexpense+=Number(expense.price)
                        entertainmentcount++;
                    }
                    else{
                        travelexpense+=Number(expense.price)
                        travelcount++
                    }

        });
        setCategoryExpenses({
            food:foodexpense,
            entertainment:entertainmentexpense,
            travel:travelexpense
        })
        setCategorycount({
            food:foodcount,
            entertainment:entertainmentcount,
            travel:travelcount
        })
    
    },[expenselist])

    useEffect(()=>{
        if(isMounted){
            localStorage.setItem("balance",balance);
        }
    },[balance]);
    return (
        <div className={styles.home}>
           <div className={styles.heading}>Expense Tracker</div>
            <div className={styles.main}>

                <div className={styles.wallet}>
                <div>
                <span className={styles.fontStyle}>Wallet Balance:</span>
                <span className={styles.amount}>₹{balance}</span>
                </div>
                <button className={styles.btnstyle}
                 onClick={openModal} >+ Add Income</button>
                </div>

                <div className={styles.wallet}>
                <div>
                <span className={styles.fontStyle}>Expenses:</span>
                <span className={styles.expamount}>₹{expense}</span>
                </div>
                <button className={styles.btnexpstyle}
                 onClick={openModal1} >+ Add Expense</button>
                </div>  

                <PieChartComp data={[
                    {name:"Food",value:categoryexpenses.food},
                    {name:"Enterainment",value:categoryexpenses.entertainment},
                    {name:"Travel",value:categoryexpenses.travel}
                    ]}
                    />
           </div>
            <div className={styles.transactionexpense}>
                <div><TransactionsSection expenselist={expenselist}
                 setBalance={setBalance} 
                 setExpenselist={setExpenselist}
                 balance={balance}/></div>
                <div><TopExpenses data={[
                    {name:"Food",value:categoryexpenses.food},
                    {name:"Enterainment",value:categoryexpenses.entertainment},
                    {name:"Travel",value:categoryexpenses.travel}
                    ]}/></div>
            </div>
            <Modal
            isOpen={openBalform}
           
            style={customStyles1}
            contentLabel="Example Modal"
            >
               <AddbalanceForm close={closeModal} setBalance={setBalance} open={setIsOpenbalform}/>
            </Modal>
            <Modal
            isOpen={modalIsOpen1}
            onRequestClose={closeModal1}
            style={customStyles}
            contentLabel="Example Modal"
            >
        
          <ExpenseForm 
                        balance={balance}
                        setBalance={setBalance}
                        expense={setExpense}
                        setIsopen={setIsOpen1}
                        expenselist={expenselist}
                        closeModal={closeModal1}
                        setExpenselist={setExpenselist}
          />
      </Modal>
        </div>
    );
}

export default Home;