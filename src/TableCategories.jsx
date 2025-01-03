import PropTypes from 'prop-types';
import TableCategoriesLine from "./TableCategoriesLine"

const TableCategories = ({ items, handleDeleteCategory }) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {items.map(p => <TableCategoriesLine item={p} key={p.id} handleDeleteCategory={handleDeleteCategory} />)}
            </tbody>
        </table>
    );
}

TableCategories.propTypes = {
    items: PropTypes.array.isRequired,
    handleDeleteCategory: PropTypes.func.isRequired
};

export default TableCategories;