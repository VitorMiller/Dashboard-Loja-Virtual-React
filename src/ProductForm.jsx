import PropTypes from 'prop-types';
import CleaveInput from "./CleaveInput"
import FormInput from "./FormInput"
import FormTextarea from "./FormTextarea"
import Loading from "./Loading";
import { useEffect, useState } from "react";
import api from './axiosApi';


const ProductForm = ({ handleChange, handleFileChange, inputs, errors }) => {
    const [categories, setCategories] = useState([]);
    const [categorieState, setCategorieState] = useState(inputs?.id_categoria || []);
    const [loading, setLoading] = useState(true); 

    const loadCategories = (state) => {
        setLoading(true);
        const categoriesEndpoint = 'admin/obter_categorias/';
        api.get(categoriesEndpoint)
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        loadCategories(categorieState);
    }, []);

    useEffect(() => {
        if (inputs?.id_categoria) {
            setCategorieState(inputs.id_categoria);  
        }
    }, [inputs?.id_categoria]);

    const handleCategoryChange = (event) => {
        const { value } = event.target;
        setCategorieState(value);
        handleChange(event, { ...inputs, id_categoria: value });
    };

    return (
        <>
            <div className="row">
                <div className="col-12 mb-3">
                    <FormInput type="text" field="nome" label="Nome" value={inputs?.nome} onChange={handleChange} error={errors?.nome} autofocus={true} />
                </div>
                <div className="col-12 mb-3">
                    <FormTextarea field="descricao" label="Descrição" value={inputs?.descricao} onChange={handleChange} error={errors?.descricao} />
                </div>
                <div className="col-4 mb-3">
                    <CleaveInput type="text" field="preco" label="Preço" value={inputs?.preco} onChange={handleChange} error={errors?.preco} options={{ numeral: true, numeralThousandsGroupStyle: 'thousand', prefix: 'R$ ', rawValueTrimPrefix: true, delimiter: '.', numeralDecimalMark: ',' }} />
                </div>
                <div className="col-4 mb-3">
                    <CleaveInput type="text" field="estoque"
                        label="Estoque" onChange={handleChange}
                        value={inputs.estoque} error={errors?.estoque}
                        options={{
                            numeral: true,
                            numeralPositiveOnly: true,
                            numeralThousandsGroupStyle: 'thousand',
                            delimiter: '.',
                            numeralDecimalMark: ','
                        }} />
                </div>

                <div className="col-4 mb-3">
                    <div className="form-floating">
                        <select
                            className={`form-select ${errors?.id_categoria ? 'is-invalid':''}`}
                            id="categorieState"
                            name="id_categoria"
                            value={categorieState}
                            onChange={handleCategoryChange}
                            required
                            >
                            <option>Selecione uma categoria</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.nome}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="categorieState">Selecione uma categoria</label>
                        {errors?.id_categoria && <div className="invalid-feedback">{errors.id_categoria}</div>}
                    </div>
                </div>

                <div className="col-12 mb-3">
                    <label htmlFor="imagem" className='form-label'>Foto do Produto</label>
                    <input type="file" id='imagem' name='imagem' className={`form-control ${errors?.imagem ? 'is-invalid':''}`} onChange={handleFileChange} accept='image/*'/>
                    {errors?.imagem && <div className='invalid-feedback'>{errors.imagem}</div>}
                </div>
            </div>
            {loading && <Loading />}
        </>
    );
}

ProductForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    inputs: PropTypes.object,
    errors: PropTypes.object
};

export default ProductForm;