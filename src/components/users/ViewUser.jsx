import React,{useEffect, useState} from 'react'
import { useParams,Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { listUser } from '../../redux/slice/userDetailSlice';
import "../../css/styles.css"

function ViewUser() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const [user, setUser] = useState([])
    const {users,isLoading} = useSelector((state)=>state.userDetail);
    useEffect(()=>{
        dispatch(listUser())
    },[]);

    useEffect(()=>{
        if(users.length>0 && id!==""){
            const data = users.filter((res)=>res.id == id);
            setUser(data[0])
        }
    },[users]);

    if(Object.keys(user).length == 0){
        return <h3 style={{"color":"black","marginTop":"100px","marginLeft":"100px"}}>Data is Loading....</h3>
    }
    
  return (
    <main>
            <div className="page-content">
                <div className="records table-responsive">
                    <div className="record-header">
                      <div className="add">
                        <h3>View User Details</h3>
                    </div>
                    <div className="add">
                            <Link to="/listUser"><button>Back</button></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="user-detail">
                <ul>
                    <li><b>User ID:</b><span>{user && user.id}</span></li>
                    <li><b>Username:</b><span>{user && user.username}</span></li>
                    <li><b>Email:</b><span>{user && user.email}</span></li>
                    <li><b>Role:</b><span>{user && user.role}</span></li>
                    <div className="add edit-user">
                            <Link to={`/editUser/${user.id}`}>Edit user&nbsp;&nbsp;<i className='fa fa-edit'></i></Link>
                    </div>
                </ul>
            </div>
           
        </main>
  )
}

export default ViewUser