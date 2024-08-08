import React, { useState } from 'react';
import styles from './ExpenseForm.module.css';
import { useSnackbar } from 'notistack';

const ExpenseForm = ({ balance, setIsopen, expense, setBalance, expenselist, setExpenselist, closeModal }) => {
  const [formdata, setFormdata] = useState({
    title: '',
    price: '',
    date: '',
    category: '',
  });
  const { enqueueSnackbar } = useSnackbar();

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

    // Check if all fields are filled
    if (!formdata.title || !formdata.price || !formdata.date || !formdata.category) {
      enqueueSnackbar("All fields are required", { variant: "warning" });
      return;
    }

    // Check if balance is sufficient
    if (balance < Number(formdata.price)) {
      enqueueSnackbar("Price should be less than the wallet balance", { variant: "warning" });
      setIsopen(false);
      return;
    }

    const newId = (Array.isArray(expenselist) && expenselist.length) ? expenselist.length + 1 : 0;
    const updatedFormdata = {
      ...formdata,
      id: newId
    };
    setBalance(prev => prev - Number(formdata.price));
    setExpenselist(prev => [updatedFormdata, ...prev]);

    setFormdata({ title: '', price: '', date: '', category: '', id: '' });
    setIsopen(false);
    closeModal();
  };

  return (
    <div className={styles.expenseform}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.heading}>Add Expenses</div>
        <div className={styles.inputfields}>
          <input
            className={styles.inputfield}
            type="text"
            placeholder="Title"
            value={formdata.title}
            onChange={handleTitle}
            required
          />
          <input
            className={styles.inputfield}
            type="number"
            placeholder="Price"
            value={formdata.price}
            onChange={handlePrice}
            required
          />
        </div>
        <div className={styles.inputfields}>
          <select
            className={styles.inputfieldselect}
            value={formdata.category}
            onChange={handleCategory}
            required
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Entertainment">Entertainment</option>
          </select>
          <input
            className={styles.inputfield}
            type="date"
            placeholder="dd/mm/yyyy"
            value={formdata.date}
            onChange={handleDate}
            required
          />
        </div>
        <div className={styles.inputfields}>
          <button type="submit" className={styles.buttonstyle1}>
            Add Expense
          </button>
          <button type="button" className={styles.buttonstyle2} onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
