import { useEffect, useState } from "react";
import NoCategories from "./NoCategories";
import TableCategories from "./TableCategories";
import api from "./axiosApi";
import Loading from "./Loading";
import ModalConfirm from "./ModalConfirm";
import { Link } from "react-router-dom";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const [loading, setLoading] = useState(true);

    const loadCategories = () => {
        setLoading(true);
        const categoriesEndpoint = "admin/obter_categorias";
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

    const deleteCategory = (categoryId) => {
        setLoading(true);
        api.postForm("admin/excluir_categoria", {"id_categoria": categoryId})
            .then(response => {
                if (response.status === 204)
                    loadCategories();
            })
            .catch(error => {
                console.error('Erro ao excluir categoria:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDeleteCategory = (categoryId) => {
        setSelectedCategoryId(categoryId);
        const modal = new bootstrap.Modal(document.getElementById('modalDeleteCategory'));
        modal.show();
    }

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <>
            <div className="d-flex justify-content-end">
              <Link to={`/createCategory/`} className="btn btn-success mt-2 mb-2" title="Criar">
                Adicionar Categoria
              </Link>
            </div>
            {categories.length > 0 ?
                <>
                    <ModalConfirm modalId="modalDeleteCategory" question="Deseja realmente excluir a categoria?" confirmAction={() => deleteCategory(selectedCategoryId)} />
                    <TableCategories items={categories} handleDeleteCategory={handleDeleteCategory}/> 
                </> :
                (!loading && <NoCategories />)
            }
            {loading && <Loading />}
        </>
    );
}

export default Categories;