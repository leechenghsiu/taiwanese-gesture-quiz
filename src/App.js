import { useState } from 'react';
import { useTransition, animated } from '@react-spring/web';
import Div100vh, { use100vh } from 'react-div-100vh';

import FirstStep from './pages/FirstStep';
import SecondStep from './pages/SecondStep';

import styles from './App.module.scss';

function App() {
	const height = use100vh();
	const [step, setStep] = useState(0);
	const transitions = useTransition(step, {
		key: step,
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		config: { duration: step === 0 ? 3000 : 500 },
		onRest: (_a, _b, item) => {
			if (item === 0) {
				setStep(1);
			}
		},
		exitBeforeEnter: true,
	});

	return (
		<Div100vh className={styles.wrapper}>
			{transitions((style, i) => (
				<animated.div className={styles.animatedWrapper} style={{ ...style, height }}>
					{i === 0 && (
						<div className={styles.outer}>
							<div className={styles.middle}>
								<div className={styles.inner}></div>
							</div>
						</div>
					)}
					{i === 1 && <FirstStep setStep={setStep} />}
					{i === 2 && <SecondStep setStep={setStep} />}
				</animated.div>
			))}
		</Div100vh>
	);
}

export default App;
