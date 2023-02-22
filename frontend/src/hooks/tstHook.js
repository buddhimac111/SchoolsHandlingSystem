//testing only

import { useState } from "react";

const useUser = () => {

    const [user, setUser] = useState('admin'); //change role here for testing 

    return { user };
}

export default useUser;
