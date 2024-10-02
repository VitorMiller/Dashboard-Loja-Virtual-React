import { NumberFormatter, DateTimeFormatter, CurrencyFormatter, StringFormatter } from "./formatters"

const TableOrdersLine = ({item}) => {


  const handleCancelOrder = (orderId) => {
    const modal = new bootstrap.Modal(document.getElementById('modalCancelOrder'));
    modal.show();
  }


  return (
        <tr>
            <td>{NumberFormatter.format(item.id, 6)}</td>
            <td>{DateTimeFormatter.format(new Date(item.data_hora))}</td>
            <td>{CurrencyFormatter.format(item.valor_total)}</td>
            <td>{StringFormatter.Capitalize(item.estado)}</td>
            <td>
              <button className="btn btn-outline-info btn-sm me-1" title="Ver Detalhes">
                <i className="bi bi-zoom-in"></i>
              </button>
              <button className="btn btn-outline-success btn-sm me-1" title="Progredir Estado">
                <i className="bi bi-arrow-right-circle"></i>
              </button>
              <button className="btn btn-outline-danger btn-sm" title="Cancelar Pedido" onClick={() => handleCancelOrder(item.id)}>
                <i className="bi bi-x-circle"></i>
              </button>
            </td>
        </tr>
  )
}

export default TableOrdersLine
