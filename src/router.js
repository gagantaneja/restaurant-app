import React from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';
import Step1 from './components/step1';
import Step2 from './components/step2';
import Step3 from './components/step3';
import Review from './components/review';

const RouterComponent = () => {
	return (
		<Router>
			<Stack key="root">
				<Scene key="step1" component={Step1} panHandlers={null} hideNavBar />
				<Scene key="step2" component={Step2} panHandlers={null} hideNavBar />
				<Scene key="step3" component={Step3} panHandlers={null} hideNavBar />
				<Scene key="review" component={Review} panHandlers={null} hideNavBar />
			</Stack>
		</Router>
	);
}
export default RouterComponent;