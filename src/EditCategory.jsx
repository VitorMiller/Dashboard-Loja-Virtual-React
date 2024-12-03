import { useNavigate, useParams } from 'react-router-dom';
import CategoryForm from './CategoryForm';
import { useEffect, useState } from 'react';
import api from "./axiosApi";
import FormButtons from './FormButtons';
import handleChange from './handleChange';
import parseErrors from './parseErrors';
import Loading from './Loading';

const EditCategory = () => {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const idCategory = useParams().id;
    if (!idCategory) {
        navigate("/categories");
    }

    function loadProductById(id) {
        setLoading(true);
        const getCategoryEndpoint = `admin/obter_categorias/${id}`;
        api.get(getCategoryEndpoint)
            .then(response => {
                setInputs(response.data);
            })
            .catch(error => {
                console.error('Erro ao carregar Categoria:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        const editCategoryEndpoint = "admin/alterar_categoria";
        await api.post(editCategoryEndpoint, inputs)
            .then((response) => {
                if (response.status === 204) {
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

    useEffect(() => {
        setInputs({ ...inputs, id: idCategory });
        loadProductById(idCategory);
    }, [idCategory]);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Alteração de Categoria</h1>
            </div>
            <form className='mb-3' onSubmit={handleSubmit} noValidate autoComplete='off'>
                <CategoryForm handleChange={localHandleChange} inputs={inputs} errors={errors} isNew={false} />
                <FormButtons cancelTarget="/categories" />
            </form>
            {loading && <Loading />}
        </>
    );
}

export default EditCategory;