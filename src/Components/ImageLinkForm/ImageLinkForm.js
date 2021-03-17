import React from 'react';

const ImageLinkForm = ({ handleKeyPress, inputChange, onButtonSubmit }) => {
	return(
		<div>
			<p className ='f3 white'>
				{'This Magic Brain will detect faces in your pictures. Give it a try.'}
			</p>
			<div className='center'>
				<div className='center pa4 br3 shadow-5'>
					<input
						className='f4 pa2 w-70 center' type='text'
						placeholder='enter an image url'
						onChange={inputChange}
						onKeyPress={handleKeyPress}
					/>
					<button onClick={onButtonSubmit} className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>
				</div>
			</div>
		</div>
	)
}




export default ImageLinkForm;