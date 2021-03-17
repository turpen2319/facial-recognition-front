import React from 'react';


const Rank = ({ name, rank }) => {
	return(
		<div className='center white f3'>
			{`${name}, you've made ${rank} image submissions.`}
		</div>
	)
}

export default Rank; //DON'T FORGET TO DO THIS