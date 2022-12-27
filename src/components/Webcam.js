import { forwardRef } from 'react';
import Webcam from 'react-webcam';
import classnames from 'classnames';

const videoConstraints = {
	width: 720,
	height: 720,
	facingMode: 'user',
};

const WebcamCapture = ({ className }, ref) => (
	<Webcam
		ref={ref}
		className={classnames(className)}
		audio={false}
		height={720}
		width={720}
		screenshotFormat="image/jpeg"
		mirrored
		videoConstraints={videoConstraints}
	/>
);

export default forwardRef(WebcamCapture);
