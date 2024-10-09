import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import { navStruct } from './Components/NavBar/Utils';
import './App.scss'
import NavBar from './Components/NavBar/NavBar';
import Login from './Pages/AuthPages/Login';
import SignUp from './Pages/AuthPages/SignUp';

import WelcomePage from "./Pages/Dashboard/WelcomePage"
import {removeStorage,setStorage} from './utils';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import RequireAuth from './Components/RequireAuth/RequireAuth';
import SuperUser from './Components/RequireAuth/SuperUser';
import S_401 from './Pages/Status/S_401';
import Guest from './Components/RequireAuth/Guest';
import NotFound from './Pages/Status/NotFound';
import { Users } from './Pages/Admin/ALLUsers/ALLUsers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Me } from './Components/Me/Me';
import { Quizzes } from './Pages/Admin/Quizzes/Quizzes';
import { CreateQuiz } from './Pages/Admin/CreateQuiz/CreateQuiz';
import { EditQuiz } from './Pages/Admin/EditQuiz/EditQuiz';
import { UserQuizPage } from './Pages/Guest/Quiz';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token:localStorage.getItem("token"),
      email:localStorage.getItem("email"),
      navStruct: navStruct,
    };
  }
  setTokens(token,email = ""){
    if(token){
      setStorage(token)
      this.setState((prev)=>({
        "token":token,
        "email":prev?.email ||email,
      }));
    }else{
      removeStorage()
      this.setState({
        ...this.state,
        "token":"",
        email:"",
      });
    }
    
  }
  render() {
    console.log(this.state.token,this.state.email,"token11")

    const queryClient = new QueryClient();

    return (
      <BrowserRouter>
          <QueryClientProvider client={queryClient}>
      
      <div className={"app "}>
        <header className="app__header">
          
          <NavBar setTokens={this.setTokens.bind(this)}/>
        </header>
        <main className="app__main">
        <Routes>
          <Route path='/' element={<RequireAuth idToken={this.state.token}><WelcomePage/></RequireAuth>}/>
          <Route path='/login' element={<Guest idToken={this.state.token}><Login setToken={this.setTokens.bind(this)}/></Guest>}/>
          <Route path='/signup' element={<Guest idToken={this.state.token}><SignUp setTokens={this.setTokens.bind(this)}/></Guest>}/>
          <Route path='/quiz/:id' element={<Guest idToken={this.state.token}><UserQuizPage setToken={this.setTokens.bind(this)}/></Guest>}/>
          
          <Route element={<RequireAuth idToken={this.state.token}><Me email={this.state.email}/></RequireAuth>}>
          <Route path='/users' element={
            <RequireAuth idToken={this.state.token}>
              {/* the BE should support this */}
              <SuperUser is_super={true}> 
                {<Users/>}
              </SuperUser>
            </RequireAuth>
          }/>
          <Route path='/quizzes' element={
            <RequireAuth idToken={this.state.token}>
              <SuperUser is_super={true}>
                {<Quizzes/>}
              </SuperUser>
            </RequireAuth>
          }/>
          <Route path='/create-quiz' element={
            <RequireAuth idToken={this.state.token}>
              <SuperUser is_super={true}>
              {<CreateQuiz/>}
              </SuperUser>
            </RequireAuth>
          }/>
           <Route path='/edit-quiz/:id' element={
            <RequireAuth idToken={this.state.token}>
              <SuperUser is_super={true}>
              <EditQuiz/>
              </SuperUser>
            </RequireAuth>
          }/>
          </Route>
          <Route path='/unauthorized' element={<RequireAuth><S_401/></RequireAuth>}/>
          <Route path='*' element={<NotFound/>}/>

        </Routes>
        </main>
      </div>
      </QueryClientProvider>

      </BrowserRouter>
    );
  }
}


export default App;
