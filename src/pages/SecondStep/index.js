import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
import classnames from 'classnames';

import Seller from '../../images/seller.png';

import styles from './styles.module.scss';

export default function SecondStep({ setStep }) {
	const ref = useRef([]);
	const [items, set] = useState([]);
	const [animationStep, setAnimationStep] = useState(0);
	const transitions = useTransition(items, {
		trail: 1000,
		from: {
			opacity: 0,
			height: 0,
			innerHeight: 0,
		},
		enter: [{ opacity: 1, height: 32, innerHeight: 32 }],
		leave: [{ innerHeight: 0 }, { opacity: 0, height: 0 }],
	});

	const reset = useCallback(() => {
		ref.current.forEach(clearTimeout);
		ref.current = [];
		set([]);
		ref.current.push(
			set([
				`<h1>情境如下：</h1>`,
				`<h3>ＸＸＸＸＸＸＸＸＸＸＸ</h3>`,
				`<h3>ＸＸＸＸＸＸＸＸＸＸＸＸＸ</h3>`,
				`<h3>你會用什麼手勢回應？</h3>`,
			])
		);
		setTimeout(() => {
			setAnimationStep(1);
			setTimeout(() => setAnimationStep(2), 1000);
		}, 4000);
	}, []);

	useEffect(() => {
		reset();
		return () => ref.current.forEach(clearTimeout);

		/* eslint-disable-next-line react-hooks/exhaustive-deps */
	}, []);

	return (
		<div className={styles.wrapper}>
			{transitions(({ innerHeight, ...rest }, item) => (
				<animated.div className={styles.transitionsItem} style={rest}>
					<animated.div
						style={{ overflow: 'hidden', height: innerHeight, display: 'flex', alignItems: 'flex-end' }}
						dangerouslySetInnerHTML={{ __html: item }}
					/>
				</animated.div>
			))}
			<img className={classnames(styles.image, { [styles.visible]: animationStep >= 1 })} src={Seller} alt="" />
			<button
				className={classnames(styles.button, { [styles.visible]: animationStep >= 2 })}
				type="button"
				onClick={() => setStep(3)}
			>
				比出手勢
			</button>
		</div>
	);
}
