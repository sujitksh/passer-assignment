import React,{useState} from 'react'
import "../../css/styles.css"
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { createUser } from '../../redux/slice/userDetailSlice';

function AddUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const [users, setUsers] = useState({
        username:"",
        email:"",
        role:"user"
    });

    //validation error state
    const [errors, setErrors] = useState({
      username: '',
      email: ''
    });

    const {username,email,role} = users;
    const handleInput = (e)=>{
        setUsers({...users,[e.target.name]:e.target.value})
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

    const submitUser = (e)=>{
      e.preventDefault();
      if(validateForm()){
        dispatch(createUser(users));
        setUsers({
        username:"",
        email:"",
        role:""
        })
        navigate("/listUser")
      }
      
 }
  return (
    <div>
        <main>
            <div className="page-content">
                <div className="records table-responsive">
                    <div className="record-header">
                      <div className="add">
                        <h3>Add New User</h3>
                    </div>
                        <div className="add">
                            <Link to="/listUser"><button>Back</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
   
        <div className="container">
            <form onSubmit={submitUser}>
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
                    <option value="admin">Admin</option>
                    <option value="user" selected={true}>User</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <input type="submit" value="Submit" />
              </div>
            </form>
          </div>
    </div>
  )
}

export default AddUser