import { useNavigate, useParams } from 'react-router-dom'; 
import ProductForm from './ProductForm';
import FormButtons from './FormButtons';
import { useEffect, useState } from 'react';
import api from './axiosApi';
import handleChange from './HandleChange';
import Loading from './Loading';
 
const EditProduct = () => { 
    const [inputs, setInputs] = useState({}); 
    const [errors, setErrors] = useState({}); 
    const [modal, setModal] = useState(undefined); 
    const navigate = useNavigate(); 
    const [loading, setLoading] = useState(true);
 
    const idProduto = useParams().id; 
    if (!idProduto) { 
        navigate("/products"); 
    } 


    useEffect(()=> {setInputs({...inputs, id:idProduto });
    loadProductById(idProduto);
    }, [idProduto]);

    function handleSubmit(event){
        event.preventDefault();
        api.post("/alterar_produto", inputs)
        .then((response)=> {
            if(response.status === 204){
                navigate("/products");
            } else {
                console.log(response);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    function localHandleChange(event){
        handleChange(event, inputs, setInputs)
    }

    function loadProductById(id){
        setLoading(true)
        api.get(`obter_produto/${id}`)
        .then(response => {
            setInputs(response.data);
        })
        .catch(error => {
            console.error('Erro ao carregar produto:', error);
        })
        .finally(()=> {
            setLoading(false)
        })
    }

    return ( 
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Alteração de Produto</h1>    
            </div>
            <form onSubmit={handleSubmit} noValidate autoComplete='off' action="">
                <ProductForm handleChange={localHandleChange} inputs={inputs} errors={errors} isNew={false} />
                <FormButtons cancelTarget="/products" />
            </form>
            {loading && <Loading />}
        </> 
    ); 
}
 
export default EditProduct;