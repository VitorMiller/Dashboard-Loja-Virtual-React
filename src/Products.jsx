import { useEffect, useState } from 'react';
import './App.css';
import NoProducts from './NoProducts';
import TableProducts from './TableProducts';
import api from './axiosApi';
import Loading from './Loading';

const Products = () => {
 
  const [products, setProducts] = useState([]);  
  const[loading, setLoading] = useState(true);

  
  const loadProducts = () => {
    setLoading(true);
    const productsEndpoint = "obter_produtos";
    api.get(productsEndpoint).then((response) => {setProducts(response.data)}).catch((error) => {console.log(error)}).finally(() => {setLoading(false)});
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
    <>
      {products.length > 0 ? <TableProducts items={products} /> : ( !loading && <NoProducts />)}
      {loading && <Loading />}
    </>
  )
}
export default Products