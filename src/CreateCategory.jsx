import { useNavigate } from 'react-router-dom';
import CategoryForm from './CategoryForm';
import { useState } from 'react';
import api from "./axiosApi";
import FormButtons from './FormButtons';
import handleChange from './handleChange';
import parseErrors from './parseErrors';
import Loading from './Loading';

const CreateCategory = () => {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    // const [file, setFile] = useState(null);
    const navigate = useNavigate();


    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        const insertCategoryEndpoint = "admin/inserir_categoria";

        const formData = new FormData();
        Object.entries(inputs).forEach(([key, value])=> {formData.append(key,value);       
        });
        // if(file){
        //     formData.append("imagem", file);
        // }
        await api.postForm(insertCategoryEndpoint, formData, {headers:{"Content-Type": "multipart/form-data"},})
            .then((response) => {
                if (response.status === 201) {
                    navigate("/categories");
                } else {
                    console.log(response);
                }
            })
            .catch((error) => {
                if (error && error.response && error.response.data)
                    setErrors(parseErrors(error.response.data));
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function localHandleChange(event) {
        handleChange(event, inputs, setInputs);
    }

    // function handleFileChange(event){
    //     setFile(event.target.files[0]);
    // }

    return (
        <>
           <div className="d-flex justify-content-between align-items-center">
                <h1>Cadastro de Categoria</h1>
            </div>
            <form className='mb-3' onSubmit={handleSubmit} noValidate autoComplete='off'>
                <CategoryForm handleChange={localHandleChange} inputs={inputs} errors={errors}  />
                <FormButtons cancelTarget="/categories" />
            </form>
            {loading && <Loading />}
        </>
    );
}

export default CreateCategory;