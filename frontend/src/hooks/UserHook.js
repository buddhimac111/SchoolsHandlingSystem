//coded for testing purposes only 

const UseUser = () => {

    const user = sessionStorage.getItem('sessionRole');
   
    return { user };
}

export default UseUser;
