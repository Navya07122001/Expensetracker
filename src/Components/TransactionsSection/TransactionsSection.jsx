import React, { useState, useEffect } from 'react';
import styles from './TransactionsSections.module.css';
import pizzalight from '../../images/pizzalight.png';
import giftlight from '../../images/giftlight.png';
import suitcaselight from '../../images/suitcaselight.png';
import editimage from '../../images/editimage.png';
import cancelimage from '../../images/cancelimage.png';
import leftarrow from '../../images/leftarrow.png';
import rightarrow from '../../images/rightarrow.png';
import Modal from 'react-modal';
import EditexpenseSection from '../EditexpenseSection/EditexpenseSection';

const customStyles = {
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    background: 'none',
    border: '2px ',
    bgcolor: 'background.paper',
    boxShadow: 34,
    p: 4,
  },
};

const TransactionsSection = ({setBalance,expenselist,setExpenselist,balance}) => {
  const [currentTransactions,setCurrentTransactions]=useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages,setTotalPages]=useState(0)
  const maxRecords = 3;


  const [openEdit, setOpenEdit] = useState(false);
  const [id,setId]=useState(-1)

  const openModal = () => {
    setOpenEdit(true);
  }

  const closeModal = () => {
    setOpenEdit(false);
  }
  
  const getImage = (category) => {
    switch (category) {
      case 'Food':
        return pizzalight;
      case 'Entertainment':
        return giftlight;
      case 'Travel':
        return suitcaselight;
      default:
        return pizzalight;
    }
  };

  const handleNextPage = () => {
    if(totalPages!= currentPage)
    {
      setCurrentPage(prev=>prev+1)
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev=>prev-1);
    }
  };

  const handleDelete = (id) => {
    const item=expenselist.find(ele=>ele.id==id)
    setBalance(prev=>prev+Number(item.price))
    setExpenselist(expenselist.filter((ele)=>(
    ele.id!==id)))
  };
  const handleEdit=(id)=>{
    openModal();
    setId(id)
  }

  useEffect(()=>{
    const startIndex=(currentPage-1)*maxRecords;
    const endIndex=Math.min(currentPage*maxRecords,expenselist.length)
    setCurrentTransactions([...expenselist].slice(startIndex, endIndex))
    setTotalPages(Math.ceil(expenselist.length/maxRecords))
  },[currentPage,expenselist])
  useEffect(()=>{
    if(totalPages<currentPage && currentPage>1)
    {
      setCurrentPage(prev=>prev-1)
    }
  },[totalPages])

  return (
    <div className={styles.maindivbox}>
      <div className={styles.heading}>Recent Transactions</div>
     
      {expenselist.length===0?
      
       (<div className={styles.notransaction}>No Transactions!</div>):
       (<div className={styles.maindiv}>
        {currentTransactions.map((transaction, index) => (
          
          <div key={transaction.id}>
            <div className={styles.mainrow}>
              <div className={styles.row}>
                <img src={getImage(transaction.category)} alt={transaction.category} className={styles.images} />
                <div>
                  <div className={styles.fontstyle}>{transaction.title}</div>
                  <div className={styles.fontstyledate}>{transaction.date}</div>
                </div>
              </div>
              <div className={styles.row2}>
                <div className={styles.pricefont}>₹{transaction.price}</div>
                <img src={cancelimage} alt='cancel' className={styles.rightimages} onClick={() => handleDelete(transaction.id)} />
                <img src={editimage} alt='edit' className={styles.rightimages} onClick={()=>handleEdit(transaction.id)} />
              </div>
            </div>
            <hr className={styles.horizontalline}></hr>

          </div>
         
        ))}
        {
        totalPages>1?
        (<div className={styles.pagination}>
          <button className={styles.rectangle} onClick={handlePrevPage}>
            <img src={leftarrow} alt="arrow" className={styles.arrow} disabled={currentPage==1}/>
          </button>
          <div className={styles.greenrectangle}>{currentPage}</div>
          <button className={styles.rectangle} onClick={handleNextPage} disabled={totalPages==currentPage}>
            <img src={rightarrow} alt="arrow" className={styles.arrow} />
          </button>
        </div>): 
        (<div ></div>)
        }
        </div>)}
        
        <Modal
          isOpen={openEdit}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <EditexpenseSection close={closeModal} id={id} expenselist={expenselist} setExpenselist={setExpenselist} setBalance={setBalance} balance={balance} />
        </Modal>
      </div>
 
  );
};

export default TransactionsSection;
