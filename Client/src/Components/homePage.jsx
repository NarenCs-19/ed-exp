import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';


function HomePage() {
    let history = useHistory();
    
  
    const logoutHandler = ()=>{
        axios.get('/logout')
        .then((response)=>{
            history.push(response.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    return (
        <div>
            <h1>Welcome home!</h1>
            <button type="button" className="btn btn-light" onClick={logoutHandler}>Logout</button>
        </div>
    )
}
export default HomePage;
 