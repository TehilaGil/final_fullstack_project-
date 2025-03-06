
import React, { useState ,useEffect} from 'react'; 
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';

const Login =({setUser}) =>{
    const [userCon, setUserCon] =useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();


   
const  login=async()=>{
    if(email&&password){
        console.log(setUser);
        const res = await axios.post('http://localhost:7000/api/user/login',{email,password})
        if(res){
            console.log(res);
            setUserCon(res)
        }
    }
}
    
    useEffect(() => {
        if (userCon) {

          props.setUser(userCon);
          navigate('/home');
        }
      }, [userCon]);
    return (
        <div className="card">
            <div className="flex flex-column md:flex-row">
                <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Email</label>
                        <InputText  onChange={(e)=>{setEmail(e.target.value)}} id="username" type="text" className="w-12rem" />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Password</label>
                        <InputText  onChange={(e)=>{setPassword(e.target.value)}} id="password" type="password" className="w-12rem" />
                    </div>
                    <Button  onClick={()=>{login()}} label="Login" icon="pi pi-user" className="w-10rem mx-auto"></Button>
                </div>
            </div>
        </div>
    )
}
        


export default Login


