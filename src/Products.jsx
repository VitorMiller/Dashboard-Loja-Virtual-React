import { useEffect, useState } from 'react';
import './App.css';
import NoProducts from './NoProducts';
import TableProducts from './TableProducts';
import axios from 'axios';

const Products = () => {
 
  const [products, setProducts] = useState([]);  
  const productsApi = "http://127.0.0.1:8000/admin/obter_produtos";

  const loadProducts = () => {
    axios.get(productsApi).then((response) => {setProducts(response.data)}).catch((error) => {console.log(error)})
  }

  useEffect(() => {loadProducts()},[]);
//   const produtos = [
//     {id:1, nome:"Banana", preco:2.9, estoque:25},
//     {id:2, nome:"Morango", preco:4.9, estoque:31},
//     {id:3, nome:"Uva", preco:6.9, estoque:35},
//     {id:4, nome:"Pêssego", preco:5.9, estoque:21},
//     {id:5, nome:"Maçã", preco:3.9, estoque:18},
//     {id:6, nome:"Mamão", preco:7.9, estoque:13},
//     {id:7, nome:"Abacate", preco:1.9, estoque:17},
//   ];
  
  return (
    products.length > 0 ? <TableProducts items={products} /> : <NoProducts />
  )
}
export default Products