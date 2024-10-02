import { NumberFormatter, DateTimeFormatter, CurrencyFormatter, StringFormatter } from "./formatters"

const TableOrdersLine = ({item}) => {
  return (
        <tr>
            <td>{NumberFormatter.format(item.id, 6)}</td>
            <td>{DateTimeFormatter.format(new Date(item.data_hora))}</td>
            <td>{CurrencyFormatter.format(item.valor_total)}</td>
            <td>{StringFormatter.Capitalize(item.estado)}</td>
            
        </tr>
  )
}

export default TableOrdersLine
