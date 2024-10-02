import { useEffect, useState } from 'react';
import './App.css';
import NoOrders from './NoOrders';
import TableOrders from './TableOrders';
import axios from 'axios';
import ModalConfirm from './ModalConfirm';

const Orders = () => {
 
  const [orders, setOrders] = useState([]);  
  const [orderState, setOrderState] = useState("pendente")
  

  const loadOrders = (state) => {
    const ordersApi = `http://127.0.0.1:8000/admin/obter_pedidos_por_estado/${state}`;
    axios.get(ordersApi).then((response) => {setOrders(response.data)}).catch((error) => {console.log(error)})
  }

  useEffect(() => {loadOrders(orderState)},[orderState]);
//   const produtos = [
//     {id:1, nome:"Banana", preco:2.9, estoque:25},
//     {id:2, nome:"Morango", preco:4.9, estoque:31},
//     {id:3, nome:"Uva", preco:6.9, estoque:35},
//     {id:4, nome:"Pêssego", preco:5.9, estoque:21},
//     {id:5, nome:"Maçã", preco:3.9, estoque:18},
//     {id:6, nome:"Mamão", preco:7.9, estoque:13},
//     {id:7, nome:"Abacate", preco:1.9, estoque:17},
//   ];

// const handleModalCancelClick = () => {

// }
  
  return (
    <>
      <div className="form-floating my-3">
        <select id="orderState" value={orderState} onChange={(event) => setOrderState(event.target.value)} className='form-control'>
          <option value="carrinho">Carrinho</option>
          <option value="pendente">Pendente</option>
          <option value="pago">Pago</option>
          <option value="faturado">Faturado</option>
          <option value="separado">Separado</option>
          <option value="enviado">Enviado</option>
          <option value="entregue">Entregue</option>
          <option value="cancelado">Cancelado</option>
        </select>
        <label htmlFor="orderState" className='form-label'>Estado do Pedido:</label>
      </div>

        {orders.length > 0 ? 
        <>
          <ModalConfirm modalId="modalCancelOrder" question="Deseja realmente cancelar o pedido?" />
          <TableOrders items={orders} />
        </>:
        <NoOrders state={orderState} />}
    </>
  )
}
export default Orders