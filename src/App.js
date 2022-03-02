import React, { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

// routes
import Router from "./routes";
// theme
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
// components
import ScrollToTop from "./components/ScrollToTop";
import { BaseOptionChartStyle } from "./components/charts/BaseOptionChart";

// redux
import { loadUser } from "./redux/actions/auth";
import { store } from "./redux/store";

// ----------------------------------------------------------------------

export default function App() {

	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	const { isAuthenticated } = useSelector((state) => state.auth);
	
	const routing = useRoutes(Router(isAuthenticated));
	return (
		<ThemeConfig>
			<ToastContainer />
			<ScrollToTop />
			<GlobalStyles />
			<BaseOptionChartStyle />
			{routing}
		</ThemeConfig>
	);
}
