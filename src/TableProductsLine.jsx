import { Link } from "react-router-dom"
import { NumberFormatter, DateTimeFormatter, CurrencyFormatter, StringFormatter } from "./formatters"


const TableProductsLine = ({item , handleDeleteProduct}) => {
  return (
        <tr>
            <td>{NumberFormatter.format(item.id, 6)}</td>
            <td>{item.nome}</td>
            <td>{CurrencyFormatter.format(item.preco)}</td>
            <td>{NumberFormatter.format(item.estoque, 6)}</td>
            <td>
            <button className="btn btn-outline-danger btn-sm" title="Deletar Produto" onClick={() => handleDeleteProduct(item.id)}>
                <i className="bi bi-trash"></i>
            </button>
              <Link to={`/products/${item.id}`} className="btn btn-outline-primary btn-sm ms-2" title="Alterar"><i className="bi bi-pencil"></i></Link>
            </td>
        </tr>
  )
}

export default TableProductsLine
