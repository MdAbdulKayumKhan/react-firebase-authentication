
import './App.css';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import initializetaionAuthentication from './Firebase/firebase.initialize';
import { useState } from 'react';

initializetaionAuthentication();
const googleProvider = new GoogleAuthProvider();
function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();


  const isLoggedInChecked = (e) => {
    setIsLoggedIn(e.target.checked);
  }
  const handleEmailChange = e => {
    setEmail(e.target.value);

  }
  const handleNameChange = (e) =>{
    setName(e.target.value);
  }
  const handlePasswordChange = e => {
    setPassword(e.target.value)

  }
  const handleRegistration = e => {
    e.preventDefault();
    console.log(email, password)
    if (password.length < 6) {
      setError(' Password should be at least 6 characters');
      return;
    }
    if (!/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/.test(password)) {
      setError('should contain at least one digit, one lower case, one upper case and  8  characters lenght');
      return;
    }

    isLoggedIn ? processLogIn(email, password) : registerNewUser(email, password);
  }

  const registerNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user)
        setError('');
        verifyEmail();
        setUserName();
      })
      .catch(error => {
        setError(error.message);
      })
  }

  const setUserName = () =>{
    updateProfile(auth.currentUser, {
      displayName: name
    })
    .then(result =>{

    })
  }
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(result => {
        console.log(result);
      })
  }
  const processLogIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
      })
      .catch(error => {
        setError(error.message);
      })
  }

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        setError(error.message);
      })
  }

  return (
    <div className="App">
      <div className="conatainer mt-5 mx-5">
        <h2 className="text-primary">{isLoggedIn ? "Log In Form" : "Registration Form"}</h2>
        <form onSubmit={handleRegistration}>
          <div className="row mb-3">
            <label htmlFor="inputName" className="col-sm-2 col-form-label">name</label>
            <div className="col-sm-10">
              <input onBlur={handleNameChange} type="text" className="form-control" id="inputName" required />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input onBlur={handleEmailChange} type="email" className="form-control" id="inputEmail3" required />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input onBlur={handlePasswordChange} type="password" className="form-control" id="inputPassword3" required />
            </div>
          </div>
          <div className="row mb-3 text-danger">
            <p>{error}</p>
          </div>

          <div className="row mb-3">
            <div className="col-sm-10 offset-sm-2">
              <div className="form-check">
                <input onChange={isLoggedInChecked} className="form-check-input" type="checkbox" id="gridCheck1" />
                <label className="form-check-label" htmlFor="gridCheck1">
                  {isLoggedIn ? ' Already Register' : 'Register here'}
                </label>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">{isLoggedIn ? 'Log in' : 'Registration'}</button>
          <button onClick={handleResetPassword} type="button" className="btn btn-secondary btn-sm">Small button</button>
        </form>
      </div>

      <div>-------------------------</div>
      <br /><br /><br />
      <button >Google Sign In</button>

    </div>
  );
}

export default App;
