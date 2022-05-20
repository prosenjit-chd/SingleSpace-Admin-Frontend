import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Dashboard from './components/Home/Dashboard/Dashboard';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import AuthProvider from './contexts/AuthProvider/AuthProvider';
import Login from './components/Login/Login/Login';
import Register from './components/Login/Register/Register';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/Login/PrivateRoute/PrivateRoute';
import Projects from './components/Home/Projects/Projects';
import HomeLand from './components/Home/HomeLand/HomeLand';
import Teams from './components/Home/Teams/Teams';
import Reviews from './components/Home/Reviews/Reviews';
import AddProjects from './components/Home/AddProjects/AddProjects';
import AddTeams from './components/Home/AddTeams/AddTeams';
import AddReview from './components/Home/AddReview/AddReview';
import Utilities from './components/Home/Utilities/Utilities';
import AddUtilities from './components/Home/AddUtilities/AddUtilities';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>

            {/* Admin*/}
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
              <Route exact path="/home" element={<PrivateRoute><HomeLand /></PrivateRoute>}>
              </Route>
              <Route exact path="/projects" element={<PrivateRoute><Projects /></PrivateRoute>}>
              </Route>
              <Route path={`/teams`} element={<PrivateRoute><Teams /></PrivateRoute>}>
              </Route>
              <Route path={`/reviews`} element={<PrivateRoute><Reviews /></PrivateRoute>}>
              </Route>

              <Route path={`/addprojects`} element={<PrivateRoute><AddProjects /></PrivateRoute>}>
              </Route>
              <Route path={`/addteams`} element={<PrivateRoute><AddTeams /></PrivateRoute>}>
              </Route>
              <Route path={`/addreview`} element={<PrivateRoute><AddReview /></PrivateRoute>}>
              </Route>
              <Route path={`/utilities`} element={<PrivateRoute><Utilities /></PrivateRoute>}>
              </Route>
              <Route path={`/addutilities`} element={<PrivateRoute><AddUtilities /></PrivateRoute>}>
              </Route>

            </Route>

            {/* autentication */}
            <Route path="/login" element={<Login />}>
            </Route>
            <Route path="/register" element={<Register />}>
            </Route>

            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
