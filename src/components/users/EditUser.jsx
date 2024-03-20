import React,{useEffect, useState} from 'react'
import "../../css/styles.css"
import { Link,useParams,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { listUser,updateUser } from '../../redux/slice/userDetailSlice';

function EditUser() {
    const {editId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {users} = useSelector((state)=>state.userDetail)
    useEffect(()=>{
       dispatch(listUser());
    },[])

    const [user, setUser] = useState({
        username:"",
        email:"",
        role:""
    })

    //validation error state
    const [errors, setErrors] = useState({
        username: '',
        email: ''
      });

    const {username,email,role} = user;
    const handleInput = (e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }

     //validation function
     const validateForm = () => {
        let valid = true;
        const errorsCopy = { ...errors };
        if (!username.trim()) {
            errorsCopy.username = 'Username is required';
            valid = false;
          }else if(typeof username !== "undefined"){
            const re = /^[a-zA-Z]+$/; 
            
            /* 
            Usernames can only have: 
            - Lowercase Letters and Upper letter(a-z A-Z) 
          */
            if (username.length > 10 || !re.test(username)) {
              valid = false;
              errorsCopy.username = "Please enter valid username.";
            }
          }
           else {
            errorsCopy.username = '';
        }
  
        if (!email.trim()) {
          errorsCopy.email = 'Email is required';
          valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          errorsCopy.email = 'Email is invalid';
          valid = false;
        } else {
          errorsCopy.email = '';
        }
        setErrors(errorsCopy);
        return valid;
      };

    const userUpdate = (e)=>{
         e.preventDefault();
         user.id = editId;
         if(validateForm()){
            dispatch(updateUser(user));
            navigate("/listUser")
         }
    }
    useEffect(()=>{
        if(users.length>0 && editId!==""){
            const data = users?.filter((res)=>res.id == editId);
            setUser({
                username:data[0]?.username,
                email:data[0]?.email,
                role:data[0]?.role
            })
        }
       
     },[users])
    
     
  return (
    <div>
    <main>
        <div className="page-content">
            <div className="records table-responsive">
                <div className="record-header">
                  <div className="add">
                    <h3>Update User</h3>
                </div>
                    <div className="add">
                        <Link to="/listUser"><button>Back</button></Link>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <div className="container">
        <form onSubmit={userUpdate}>
          <div className="row">
            <div className="col-25">
              <label htmlFor="username">Username</label>
            </div>
            <div className="col-75">
              <input type="text"  
              name="username" 
              value={username}
              onChange={handleInput}
              />
            </div>
            <div className="text-danger">{errors.username}</div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="email">Email</label>
            </div>
            <div className="col-75">
              <input type="text"  
              name="email" 
              value={email}
              onChange={handleInput}
             />
            </div>
            <div className="text-danger">{errors.email}</div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="role">Role</label>
            </div>
            <div className="col-75">
              <select  name="role" onChange={handleInput}>
                <option value='admin' selected={role == 'admin'}>Admin</option>
                <option value='user' selected={role == 'user'}>User</option>
              </select>
            </div>
          </div>
          <div className="row">
            <input type="submit" value="Update" />
          </div>
        </form>
      </div>
</div>
  )
}

export default EditUser