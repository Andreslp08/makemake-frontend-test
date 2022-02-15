import React, { useEffect, useState } from "react";
import "./styles/styles.scss";
import BackgroundShape from "./assets/images/background.png";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { InstitutionsPage } from "./pages/institutions-page";
import { Provider as StoreProvider } from "react-redux";
import { store } from "./redux/store";
import { EditPage } from "./pages/edit-page";
import InstitutionAPI from "./api/institution.api";
import { institutionsSlice } from "./redux/slices/institutions.silce";
import { ToastContainer } from 'react-toastify';

function App() {

	useEffect(() => {
		window.scrollTo({top:0});
		const loadInitialData = async () => {
			await InstitutionAPI.getAll().then((result) => {
				store.dispatch(institutionsSlice.actions.set(result));
			});
		};
		loadInitialData();
	}, []);

	return (
		<StoreProvider store={store}>
			<BrowserRouter>
				<img src={BackgroundShape} alt="background-shape" className="background-shape" />
				<div className="main-layout">
					<Header />
					<div className="main">
						<Routes>
							<Route path="/institutos" element={<InstitutionsPage />} />
							<Route path="/" element={<Navigate to="/institutos" />} />
							<Route path="/institutos" element={<div>Instituto</div>} />
							<Route path="/institutos/:id/editar" element={<EditPage/>} />
						</Routes>
					</div>
				</div>
			</BrowserRouter>
			<ToastContainer/>
		</StoreProvider>
	);
}

export default App;
