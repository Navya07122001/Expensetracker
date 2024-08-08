import React, { useEffect, useState } from 'react';
import styles from './EditexpenseSection.module.css';

const EditexpenseSection = ({ close, id, expenselist, setExpenselist, setBalance, balance }) => {
  const [formdata, setFormdata] = useState({
    title: '',
    price: '',
    category: '',
    date: ''
  });

  const handlePrice = (e) => {
    setFormdata({ ...formdata, price: e.target.value });
  };

  const handleTitle = (e) => {
    setFormdata({ ...formdata, title: e.target.value });
  };

  const handleDate = (e) => {
    setFormdata({ ...formdata, date: e.target.value });
  };

  const handleCategory = (e) => {
    setFormdata({ ...formdata, category: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (balance < Number(formdata.price)) {
      alert("Price should be less than the wallet balance");
      return;
    }

    const updatedFormdata = {
      ...formdata,
      id
    };

    const oldExpense = expenselist.find(expense => expense.id === id);
    
    const priceDifference = Number(formdata.price) - Number(oldExpense.price);
    setBalance(prev=>prev-priceDifference);

    // Update expense list
    const updatedExpenselist = expenselist.map(expense => 
      expense.id === id ? updatedFormdata : expense
    );
    setExpenselist(updatedExpenselist);

    setFormdata({ title: '', price: '', date: '', category: '', id: '' });
    close();
  };

  useEffect(() => {
    const data = expenselist.find(expense => expense.id === id);
    if (data) {
      setFormdata(data);
    }
  }, [id, expenselist]);

  return (
    <div className={styles.expenseform}>
      <div className={styles.box}>
        <div className={styles.heading}>Edit Expenses</div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputfields}>
            <input
              className={styles.inputfield}
              placeholder='Title'
              value={formdata.title}
              onChange={handleTitle}
            />
            <input
              className={styles.inputfield}
              placeholder='Price'
              value={formdata.price}
              onChange={handlePrice}
            />
          </div>
          <div className={styles.inputfields}>
            <input
              className={styles.inputfield}
              placeholder='Select Category'
              value={formdata.category}
              onChange={handleCategory}
            />
            <input
              className={styles.inputfield}
              placeholder='dd/mm/yyyy'
              value={formdata.date}
              onChange={handleDate}
            />
          </div>
          <div className={styles.inputfields}>
            <button className={styles.buttonstyle1} type='submit'>Update Expense</button>
            <button className={styles.buttonstyle2} type='button' onClick={close}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditexpenseSection;
