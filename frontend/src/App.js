import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Button, Form, Container, Header } from 'semantic-ui-react'
import { useForm } from 'react-hook-form';
import { api } from './api';
import React, { useEffect, useState } from 'react';
import { BatteryList } from './BatteryList';
import { Cart } from './Cart';

function App() {
  const { handleSubmit, register, reset } = useForm();

  const [cartItems, setCartItems] = useState([]);

  const updateCart = () => api.getCart().then(({items}) => setCartItems(items));

  useEffect(() => {
      updateCart();
  }, []);


  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    api.searchBatteries().then((response) => setItems(response));
  }, []);

  const onSubmit = async ({ search }) => {
    api.searchBatteries(search).then((items) => setItems(items));
  };

  return (
    <div className="App">
      <Header as='h2'>Buy some batteries :)</Header>
      <Container fluid className="container">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Field>
            <label>Search</label>
            <input placeholder='Search by title or description' {...register('search')} />
          </Form.Field>
        </Form>
        <div className='table-container'>
          <BatteryList batteries={items} onAddToCart={updateCart} />
          <Cart items={cartItems} />
          {/* <TransactionList /> */}
        </div>
      </Container>
    </div>
  );
}

export default App;
