import { useState, useEffect } from "react";
import UserContext from './UserName';

const UserProvider = ({ children,userCon}) => {
    const [user, setUser] = useState();
    useEffect(() => {
        if(userCon){
            setUser(userCon);
        }
    }, [userCon]);

    return (
        <UserContext.Provider value={user} >
            {children}
        </UserContext.Provider>
    );
}
export default UserProvider;