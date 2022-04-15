import { Error, Landing, Register, ProtectedRoute } from "./pages";
import {
	AllJobs,
	AddJob,
	Profile,
	SharedLayout,
	Stats,
} from "./pages/Dashboard";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<SharedLayout />
							</ProtectedRoute>
						}
					>
						<Route index element={<Stats />}></Route>
						<Route path="all-jobs" element={<AllJobs />}></Route>
						<Route path="add-job" element={<AddJob />}></Route>
						<Route path="profile" element={<Profile />}></Route>
					</Route>
					<Route path="/register" element={<Register></Register>}></Route>
					<Route path="/landing" element={<Landing></Landing>}></Route>
					<Route path="*" element={<Error></Error>}></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
