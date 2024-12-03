import PropTypes from 'prop-types';
import FormInput from "./FormInput"
import FormTextarea from "./FormTextarea"

const CategoryForm = ({ handleChange , inputs, errors }) => {
    return (
        <>
            <div className="row">
                <div className="col-12 mb-3">
                    <FormInput type="text" field="nome" label="Nome" value={inputs?.nome} onChange={handleChange} error={errors?.nome} autofocus={true} />
                </div>
                <div className="col-12 mb-3">
                    <FormTextarea field="descricao" label="Descrição" value={inputs?.descricao} onChange={handleChange} error={errors?.descricao} />
                </div>
            </div>
        </>
    );
}

CategoryForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    inputs: PropTypes.object,
    errors: PropTypes.object
};

export default CategoryForm;