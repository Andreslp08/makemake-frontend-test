import React, { useEffect, useState } from "react";
import "./styles/styles.scss";
import BackgroundShape from "./assets/images/background.png";
import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import { Header } from "./components/header";
import { InstitutionsPage } from "./pages/institutions-page";

// {
//   name: "test",
//   email: "@",
//   assignedBooks: 3,
//   assignedPackage: "package 1",
//   color: "#00ff00",
//   courses: [],
//   phone: "42534534",
//   students: [],
//   teachers: 5,
// }

function App() {
	return (
		<BrowserRouter>
			<img src={BackgroundShape} alt="background-shape" className="background-shape" />
			<div className="main-layout">
				<Header />
				<div className="main">
					<Routes>
            <Route path="/institutos" element={<InstitutionsPage/>}/>
            <Route path="/" element={<Navigate to='/institutos'/>}/>
            <Route path="/institutos" element={<div>Instituto</div>}/>
          </Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
