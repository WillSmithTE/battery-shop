import './App.css';
import 'semantic-ui-css/semantic.min.css'
import {Button, Container, Form, Header} from 'semantic-ui-react'
import {useForm} from 'react-hook-form';
import {api} from './api';
import React, {useEffect, useState} from 'react';
import {BatteryList} from './BatteryList';
import {Cart} from './Cart';
import {TransactionList} from './TransactionList';

function App() {
  const { handleSubmit, register, setValue } = useForm();

  const [cartItems, setCartItems] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [items, setItems] = React.useState([]);

  const updateCart = () => api.getCart().then(setCartItems);
  const updateTransactions = () => api.getTransactions().then(setTransactions);

  useEffect(() => {
    api.searchBatteries()
        .then((response) => setItems(response))
        .then(updateCart)
        .then(updateTransactions);
  }, []);

  const onSearchSubmit = async ({ search }) => {
    api.searchBatteries(search).then((items) => setItems(items));
  };

  const onCheckoutSubmit = async ({ email }) => {
    await api.submitTransaction(email);
    await updateTransactions();
    await updateCart();
    setValue('email', '');
  };


  const deleteFromCart = async (title) => {
    await api.deleteFromCart(title);
    await updateCart();
  };

  const cartPrice = cartItems.reduce((sum, { price, quantity }) => sum + price * quantity, 0);

  return (
    <div className="App">
      <Header as='h2'>Buy some batteries :)</Header>
      <Container fluid className="container">
        <Form onSubmit={handleSubmit(onSearchSubmit)}>
          <Form.Field>
            <label>Search</label>
            <input placeholder='Search by title or description' {...register('search')} />
          </Form.Field>
          <Button>Search</Button>
        </Form>
        <Form onSubmit={handleSubmit(onCheckoutSubmit)}>
          <Form.Field>
            <label>Email</label>
            <input placeholder='Enter your email for the transaction' {...register('email')} />
          </Form.Field>
          <Form.Field>
            <label>Cart total</label>
            <input readOnly value={`$${cartPrice}`} />
          </Form.Field>
          <Button>Checkout cart</Button>
        </Form>
        <div className='table-container'>
          <div className='width-50'>
            <BatteryList items={items} onAddToCart={updateCart} />
          </div>
          <div className='width-25'>
            <Cart items={cartItems} deleteItem={deleteFromCart} />
          </div>
          <div className='width-25'>
            <TransactionList className='width-25' items={transactions} />
          </div>
        </div>
      </Container>
    </div >
  );
}

export default App;
