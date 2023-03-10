// * ======= Third Party Components ======= */
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

//? ======== Local Components ========== */
import SearchResultsDisplay from './pages/SearchResultsDisplay';
import PageError from './components/Error/PageError';
import AllSuggestions from './pages/AllSuggestions';
import Tutorial from './pages/Tutorial';
import Profile from './pages/Profile';
import Search from './pages/Search';
import About from './pages/About';
import Login from './auth/Login';
import Home from './pages/Home';

//! ======== Styles ========== */
import './styles/master.scss';
import Signup from './auth/Signup';
import { useEffect } from 'react';
import { authActions } from './store/auth-slice';
import { LOCAL_SERVER_URL } from './config/config';

function App() {
  const dispatch = useDispatch();
  // Axios to send cookies automatically
  axios.defaults.withCredentials = true;
  let auth = useSelector((state) => state.auth);
  const userId = auth.user.id;
  const { isLoggedIn } = auth;

  // Configure auth status from backend
  useEffect(() => {
    axios
      .get('http://localhost:7000/api/authstatus')
      .then(({ data }) => {
        dispatch(authActions.login(data.user));
      })
      .catch((err) => console.log('auth error'));
  }, [dispatch]);

  // Set bookmarks
  useEffect(() => {
    if (!userId) return;
    axios
      .get(`${LOCAL_SERVER_URL}/api/users/${userId}/bookmarks`)
      .then(({ data }) => {
        dispatch(authActions.setBookmarks(data.data.bookmarks));
      });
  }, [dispatch, userId]);

  // App theme from redux
  const theme = useSelector((state) => state.theme.currTheme);

  const routes = isLoggedIn ? (
    <>
      <Route path='/' exact element={<Home />} />
      <Route path='/home' exact element={<Home />} />
      <Route
        path='/login'
        exact
        element={<Navigate to='/' replace />}
      />
      <Route
        path='/signup'
        exact
        element={<Navigate to='/' replace />}
      />
      <Route path='/search' exact element={<Search />} />
      <Route path='/about' exact element={<About />} />
      <Route path='/search/:recipeId' exact element={<Tutorial />} />
      <Route
        path='/search/suggestions'
        exact
        element={<AllSuggestions />}
      />
      <Route
        path='/search/:searchType/:recipe'
        exact
        element={<SearchResultsDisplay />}
      />
      <Route
        path='/search/:searchType/:recipe/:recipeId'
        exact
        element={<Tutorial />}
      />
      <Route path='/profile' exact element={<Profile />} />
      <Route path='*' element={<PageError />} />
    </>
  ) : (
    <>
      <Route path='/login' exact element={<Login />} />
      <Route path='/signup' exact element={<Signup />} />
      <Route path='*' element={<Navigate to='/login' replace />} />
    </>
  );

  return (
    <div className={`App theme-${theme}`}>
      <Routes>{routes}</Routes>
    </div>
  );
}

export default App;
