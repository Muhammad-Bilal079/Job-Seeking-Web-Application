import './App.css'
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from '../src/components/GoogleLogin.jsx';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Dashboard from '../src/components/Dashboard.jsx';
import { useState } from 'react';
import RefrshHandler from '../src/components/RefreshHandler.jsx';
import NotFound from '../src/pages/NotFound.jsx';

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const GoogleWrapper = ()=>(
		<GoogleOAuthProvider clientId="448823659864-e5kuss0qihlm6nvk4p3uf2nnodfpsmsc.apps.googleusercontent.com">
			<GoogleLogin></GoogleLogin>
		</GoogleOAuthProvider>
	)
	const PrivateRoute = ({ element }) => {
		return isAuthenticated ? element : <Navigate to="/login" />
	}
	return (
		<BrowserRouter>
		
		    <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
			<Routes>
				<Route path="/login" element={<GoogleWrapper />} />
				<Route path="/" element={<Navigate to="/login" />} />
				<Route path='/dashboard' element={<PrivateRoute element={<Dashboard/>}/>}/>
				<Route path="*" element={<NotFound/>} />
			</Routes>
	</BrowserRouter>
	);
}

export default App
