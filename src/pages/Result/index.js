import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
import classnames from 'classnames';

import { fetchResult } from '../../utils/fetch';

import styles from './styles.module.scss';

export default function Result({ setStep, reqImage, setReqImage }) {
	const ref = useRef([]);
	const [items, set] = useState([]);
	const [animationStep, setAnimationStep] = useState(0);
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	const transitions = useTransition(items, {
		trail: 1000,
		from: {
			opacity: 0,
			height: 0,
			innerHeight: 0,
		},
		enter: [{ opacity: 1, height: 64, innerHeight: 64 }],
		leave: [{ innerHeight: 0 }, { opacity: 0, height: 0 }],
	});

	// const levelMap = {
	// 	crazy: { score: 1, comment: '這樣比就對了！' },
	// 	'middle-finger': { score: 0.8, comment: '你是個標準的台灣人！' },
	// 	bad: { score: 0.5, comment: '好像沒有表現出憤怒！' },
	// 	'reverse-v': { score: 0.1, comment: '不錯！有跟上流行喔！' },
	// 	heart: { score: 0, comment: '你太可愛了' },
	// 	good: { score: 0, comment: '是在反諷嗎XD' },
	// 	rock: { score: 0, comment: '突然想搖滾一下嗎？' },
	// 	ok: { score: 0, comment: '等下課再決定吃什麼啦！' },
	// };
	const levelMap = {
		賓士貓: { score: 1, comment: '這樣比就對了！' },
		虎斑貓: { score: 0.6, comment: '很好，你是個標準的台灣人！' },
		三花貓: { score: 0.5, comment: '好像沒有表現出憤怒！' },
	};

	const reset = useCallback(() => {
		if (data) {
			const { score, comment } = levelMap[data.data[0].label];
			ref.current.forEach(clearTimeout);
			ref.current = [];
			set([]);
			ref.current.push(
				set([
					`<h1>測驗結果如下</h1>`,
					`<h3 style="margin-bottom: 24px;">你是⋯⋯</h3>`,
					`<p><span>${score * 100}% </span>正港台灣人！</p>`,
					`<p >${comment}</p>`,
				])
			);
			setTimeout(() => {
				setAnimationStep(1);
				setTimeout(() => setAnimationStep(2), 1000);
			}, 3000);
		}
		/* eslint-disable-next-line react-hooks/exhaustive-deps */
	}, [data]);

	const fetchData = useCallback(async () => {
		const data = await fetchResult(reqImage);
		setData(data);

		/* eslint-disable-next-line react-hooks/exhaustive-deps */
	}, []);

	useEffect(() => {
		setLoading(true);
		fetchData();

		return () => ref.current.forEach(clearTimeout);
		/* eslint-disable-next-line react-hooks/exhaustive-deps */
	}, []);

	useEffect(() => {
		if (data) {
			reset();
			setLoading(false);
		}
		/* eslint-disable-next-line react-hooks/exhaustive-deps */
	}, [data]);

	return (
		<div className={styles.wrapper}>
			{loading ? (
				<div className={styles.outer}>
					<div className={styles.middle}>
						<div className={styles.inner}></div>
					</div>
				</div>
			) : (
				transitions(({ innerHeight, ...rest }, item) => (
					<animated.div className={styles.transitionsItem} style={rest}>
						<animated.div
							style={{ overflow: 'hidden', height: innerHeight, display: 'flex', alignItems: 'flex-end' }}
							dangerouslySetInnerHTML={{ __html: item }}
						/>
					</animated.div>
				))
			)}
			<button
				className={classnames(styles.button, styles.retake, { [styles.visible]: animationStep >= 2 })}
				type="button"
				onClick={() => {
					setStep(0);
					setReqImage(null);
					setData(null);
				}}
			>
				回首頁
			</button>
			<button
				className={classnames(styles.button, { [styles.visible]: animationStep >= 2 })}
				type="button"
				onClick={() => {
					setStep(3);
					setReqImage(null);
					setData(null);
				}}
			>
				重新測驗
			</button>
		</div>
	);
}
