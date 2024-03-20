import React,{useEffect, useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import { listUser,deleteUser } from '../../redux/slice/userDetailSlice'
import Pagination from '../../utils/Pagination'
import "../../css/styles.css"

function ListUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(10);
    const {users,isLoading} = useSelector((state)=>state.userDetail);
    useEffect(()=>{
        dispatch(listUser());
    },[])
    
    const handleDelete = (e,id)=>{
        e.stopPropagation();
       if(confirm("Are sure Delete User")){
          dispatch(deleteUser(id))
       }
    }

    const handleSingleUser = (id)=>{
        navigate(`/viewUser/${id}`)
    }

    if(users.length == 0){
        return <h3 style={{"color":"black","marginTop":"100px","marginLeft":"100px"}}>Data is Loading....</h3>
    }

    //pagination
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const previousPage = () => {
        if (currentPage !== 1) {
           setCurrentPage(currentPage - 1);
        }
     };
   
     const nextPage = () => {
        if (currentPage !== Math.ceil(users.length / perPage)) {
           setCurrentPage(currentPage + 1);
        }
     };
  
  return (
    <main>
            <div className="page-content">
                <div className="records table-responsive">
                    <div className="record-header">
                      <div className="add">
                        <h3>User List</h3>
                    </div>
                        <div className="add">
                            <Link to="/addUser"><button>Add New User</button></Link>
                        </div>
                    </div>
                    <div>
                        <table width="100%">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th><span className="las la-sort"></span> User Name</th>
                                    <th><span className="las la-sort"></span> Email</th>
                                    <th><span className="las la-sort"></span> Role</th>
                                    <th><span className="las la-sort"></span> Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users && users.slice((currentPage-1)*perPage,currentPage*perPage).map((res)=>(
                                        <tr key={res.id} onClick={()=>handleSingleUser(res.id)}>
                                        <td>#{res.id}</td>
                                        <td>{res.username}</td>
                                        <td>{res.email}</td>
                                        <td>{res.role}</td>
                                        <td><i className='fa fa-trash' onClick={(e)=>handleDelete(e,res.id)}></i></td>
                                    </tr>
                                    ))
                                }
                              
                            </tbody>
                        </table>
                        {
                            users.length>0?(<Pagination
                                currentPage={currentPage}
                                perPage = {perPage}
                                totalPages={users.length}
                                onPageChange={handlePageChange}
                                previousPage={previousPage}
                                nextPage={nextPage}
                            />):(<div className="loading">Loading...</div>)
                        }
                        
                    </div>

                </div>
            
            </div>
            
        </main>
  )
}

export default ListUser