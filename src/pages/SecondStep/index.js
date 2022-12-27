import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
import classnames from 'classnames';

import Anger from '../../images/anger.png';

import styles from './styles.module.scss';

export default function SecondStep({ setStep }) {
	const ref = useRef([]);
	const [items, set] = useState([]);
	const [animationStep, setAnimationStep] = useState(0);
	const transitions = useTransition(items, {
		trail: 1500,
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
				`<h1>情境如下</h1>`,
				`<h3>假設現在是上課時間，距離下課只剩十分鐘</h3>`,
				`<h3>老師正在說明下週期末考的範圍和內容</h3>`,
				`<h3>坐在右後方的王同學找你說話</h3>`,
				`<h3 style="color: #fcbf49">「欸欸，等下要吃什麼？」</h3>`,
				`<h3>但你正在仔細聽老師宣布，王同學再次呼喊</h3>`,
				`<h3 style="color: #fcbf49">「等下要吃什麼啦！」</h3>`,
				`<h3>這時你很生氣，想叫他閉嘴</h3>`,
				`<h3>該用什麼手勢回應他？</h3>`,
			])
		);
		setTimeout(() => {
			setAnimationStep(1);
			setTimeout(() => setAnimationStep(2), 1000);
		}, 13500);
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
			<img className={classnames(styles.image, { [styles.visible]: animationStep >= 1 })} src={Anger} alt="" />
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
