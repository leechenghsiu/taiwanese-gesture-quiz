import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
import classnames from 'classnames';

import WebcamCapture from '../../components/Webcam';

import styles from './styles.module.scss';

export default function ThirdStep({ setStep, reqImage, setReqImage }) {
	const webcamRef = useRef(null);
	const countDownRef = useRef(null);
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
		ref.current.push(set([`<h1>你的回應</h1>`, `<h3>按下拍攝按鈕進行回應</h3>`]));
		setTimeout(() => {
			setAnimationStep(1);
			setTimeout(() => setAnimationStep(2), 1000);
		}, 3000);
	}, []);

	const capture = useCallback(() => {
		let imageSrc = webcamRef.current.getScreenshot();
		setReqImage(imageSrc);
	}, [webcamRef]);

	const handleCountDown = () => {
		setReqImage(null);
		let i = 3;
		let counterId = setInterval(() => {
			countDownRef.current.innerText = i.toString();
			if (i === 0) {
				countDownRef.current.className = classnames(styles.countDown, styles.flash);
				setTimeout(() => {
					countDownRef.current.className = classnames(styles.countDown, styles.removeFlash);
				}, 800);
			}
			i--;
		}, 1000);

		setTimeout(() => {
			capture();
			clearInterval(counterId);
			countDownRef.current.innerText = '';
		}, 4000);
	};

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
			<div className={classnames(styles.webcamWrapper, { [styles.visible]: animationStep >= 1 })}>
				{reqImage ? <img src={reqImage} alt="" /> : <WebcamCapture ref={webcamRef} className={styles.webcam} />}
				<div className={styles.countDown} ref={countDownRef} />
			</div>
			<button
				className={classnames(styles.button, {
					[styles.visible]: animationStep >= 2,
					[styles.retake]: reqImage,
				})}
				type="button"
				onClick={handleCountDown}
			>
				{reqImage ? '重新拍攝' : '📸 拍攝'}
			</button>
			{reqImage && (
				<button className={classnames(styles.button, styles.visible)} type="button" onClick={() => setStep(4)}>
					送出
				</button>
			)}
		</div>
	);
}
