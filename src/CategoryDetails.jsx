import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { NumberFormatter } from './formatters';
import api from './axiosApi';
import Loading from './Loading';

const CategoryDetails = () => {
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const categoryId = useParams().id;
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const categoryDetailsEndpoint = `admin/obter_categorias/${categoryId}`;
        api.get(categoryDetailsEndpoint)
            .then(response => {
                if (response.status === 200) {
                    setCategory(response.data);
                } else {
                    navigate("/categories")
                }
            })
            .catch(error => {
                console.error('Erro ao carregar categoria:', error);
                navigate("/categories")
            })
            .finally(() => {
                setLoading(false);
            });
    }, [categoryId]);

    if (!category) {
        return <p>Carregando detalhes da Categoria...</p>;
    }

    return (
        <>
            {loading && <Loading />}
            <h1 className="display-6 my-3">Detalhes da Categoria</h1>
            <hr />
            <div className="card p-3 mb-3">
                <p className="m-0">
                    <b>Código da Categoria: </b> {NumberFormatter.format(category.id, 6)} <br />
                    <b>Nome: </b> {category.nome} <br />
                    <b>Descrição: </b> {category.descricao}
                </p>
               
               
            </div>
        </>
    );
};

export default CategoryDetails;
