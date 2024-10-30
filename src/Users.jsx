import { useEffect, useState } from 'react';
import './App.css';
import api from './axiosApi';
import Loading from './Loading';
import ModalConfirm from './ModalConfirm';
import NoUsers from './NoUsers';
import TableUsers from './TableUsers';

const Users = () => {
 
  const [users, setUsers] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(0);

  
  const loadUsers = () => {
    
    setLoading(true);
    // const usersEndpoint = "obter_usuarios";
    // api.get(usersEndpoint).then((response) => {setUsers(response.data)}).catch((error) => {console.log(error)}).finally(() => {setLoading(false)});
    
    const users = [
    {id:1, nome:"Vitor", email:"vitor@email.com", telefone:"28999680226"},
    {id:2, nome:"Vitor 2", email:"vitor@email.com", telefone:"28999680226"},
    {id:3, nome:"Vitor 3", email:"vitor@email.com", telefone:"28999680226"},
    {id:4, nome:"Vitor 4", email:"vitor@email.com", telefone:"28999680226"},
    {id:5, nome:"Vitor 5", email:"vitor@email.com", telefone:"28999680226"},
  ];

    setUsers(users)
    setLoading(false)
  }


  const deleteUser = (userId) => {
    setLoading(true);
    api.post("excluir_usuario", {"id_usuario": userId}).then((response) => { if(response.status === 204) loadUsers()}).catch((error) => {console.error("Erro ao excluir usuário:", error)}).finally(() => {setLoading(false)});
  }

  const handleDeleteUser = (userId) => {
    setSelectedUserId(userId);
    const modal = new bootstrap.Modal(document.getElementById('modalDeleteUser'));
    modal.show();
  }

  useEffect(() => {loadUsers()},[]);

  
  return (
    <>
      {users.length > 0 ? 
      <>
      <ModalConfirm modalId="modalDeleteUser" question="Deseja realmente excluir o usuário?" confirmAction={()=> deleteUser(selectedUserId)} />
      <TableUsers items={users} handleDeleteUser={handleDeleteUser} />
      </> :
      ( !loading && <NoUsers />)
      }
      {loading && <Loading />}
      </>
  );
}
export default Users;