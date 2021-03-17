import React from 'react';


const BoundingBox = ({ fromTop, fromRight, fromLeft, fromBottom }) => {
	return(
		<div className='bounding-box' style={{top: fromTop, right: fromRight, bottom: fromBottom, left: fromLeft}}></div>
	)
}

export default BoundingBox; //DON'T FORGET TO DO THIS