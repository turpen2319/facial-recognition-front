import React from 'react';
import BoundingBox from './BoundingBox';
import './FaceRecognition.css'


const FaceRecognition = ({ imageUrl, boxes }) => {
	return(
		<div className='center ma3'>
			<div className='absolute ma3'>
				<img id='inputimage' alt="" src={imageUrl} width='500px' height='auto'/>
				{
					boxes.map((face, i) => {
						return(
							<BoundingBox
								key={i}
								fromTop={boxes[i].topRow}
								fromLeft={boxes[i].leftCol}
								fromBottom={boxes[i].bottomRow}
								fromRight={boxes[i].rightCol}
							/>	
						);
					})
				}
			</div>
		</div>
	)
}

export default FaceRecognition; //DON'T FORGET TO DO THIS

//"http://eofdreams.com/data_images/dreams/face/face-03.jpg"















//In case i mess up
// const FaceRecognition = ({ imageUrl, box }) => {
// 	return(
// 		<div className='center ma'>
// 			<div className='absolute ma3'>
// 				<img id='inputimage' alt="" src={imageUrl} width='500px' height='auto'/>
// 				<div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div> 
// 			</div>
// 		</div>
// 	)
// }

// export default FaceRecognition; //DON'T FORGET TO DO THIS