import React from "react";
import TableOrdersLine from "./TableOrdersLine";

const TableOrders = ({items}) => {

  return (

        <table className="table table-striped">
            <thead>
            <tr>
                <th>Id</th>
                <th>Data/Hora</th>
                <th>Valor</th>
                <th>Estado</th>
            </tr>
            </thead>
            <tbody>
                {items.map(o => <TableOrdersLine item={o} key={o.id}/>)}
            </tbody>
        </table> 

  )
}

export default TableOrders;
