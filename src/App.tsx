import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider} from "./AuthContext";
import Login from "./AuthComponents/Login";
import Signup from "./AuthComponents/Signup";
import ForgotPassword from "./AuthComponents/ForgotPassword";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Main from "./Components/Main/Main";

function App() {
  async function test() {
    // let email = "admin@admin.admin";
    // await getLoginDataFromEmail(email);
    // await getTimeToCommentsByEmail(email);
    // await getTimeToLikesByEmail(email);
    // await getTimeToRetweetsByEmail(email)
    // await getTimeToTweetsByEmail(email)
    // await getUserContentByEmail(email)
    // await getUserNameUsedForTweetsByEmail(email)
  }
  return (
    <div className="App-container">
      <Router basename="/">
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={<PrivateRoute><Main /></PrivateRoute>}/>
          </Routes>
        </AuthProvider>
      </Router>
      {/* <button onClick={test}>TEST</button> */}
    </div>
  );
}

export default App;

//
// we need a username array from which we will download tweets of specific twitter's user;
// fetch tweets;
// select a tweet from tweets;
// check if tweet was already added;
// reprase tweet;
// trigger function AddRephrasedTweetToTwitter;

//SQL DATABASE
//Login_Password get/post request need for creating class.
//
