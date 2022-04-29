import { Navigate } from 'react-router-dom';

function SignOut() {
    return (
        localStorage.clear(),
        <Navigate to = "/" />
    );     
};

export default SignOut