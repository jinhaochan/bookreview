import React from 'react'
import axios from 'axios'
import ImageUploader from 'react-images-upload';
import { Form, Button, TextArea, Select, Header, Icon, Image, Modal } from 'semantic-ui-react'

const options = [
	  { key: 'b', text: 'Book', value: 'Book' },
	  { key: 'v', text: 'Video', value: 'Video' },
	  { key: 't', text: 'Talk', value: 'Talk' },
	  { key: 'o', text: 'Other', value: 'Other' },
]

class AddItem extends React.Component{

    state = {
	    uploaded:false,
	    title: '',
	    medium: '',
	    description: '',
	    points: '',
	    modalOpen:false
            }

    constructor(props) {
	            super(props);
	             this.onDrop = this.onDrop.bind(this);
	        }
	 
    onDrop(pictureFile, pictureDataURL) {
	            this.setState({
		    uploaded:true,
	            pictureURL:pictureDataURL,
                    pictureData:pictureFile
		    });
	           
	        }

  handleOpen = () => this.setState({modalOpen: true})
  handleClose = () => this.setState({modalOpen: false})

  handleChange = (e, { name, value }) => this.setState({ [name]: value })


  handleSubmit = () => {
           const { title, medium, description, points } = this.state

	      const data = {title, medium, description, points}
              console.log(data)

              axios
	        .post('http://localhost:3001/data', data)
	        .then(() => console.log('created'))
	        .catch(err => {
			        console.error(err);
			      });
	  this.handleClose()
  }
	  render () {
		  
             const { title, medium, description, points } = this.state

	     return (

            <Modal
	       trigger={<Button onClick={this.handleOpen}>Add</Button>}
	       open={this.state.modalOpen}
		     onClose={this.handleClose}>
	    <Modal.Header>Add Item</Modal.Header>
	    <Modal.Content scrolling>
		     {this.state.uploaded ?
		     <Image src={this.state.pictureURL}/> :
	<ImageUploader
	                withIcon={true}
	                buttonText='Upload Image'
	                imgExtension={['.jpg', '.png']}
	                label='Max File Size 2MB'
		        onChange={this.onDrop}
	                maxFileSize={5242880}
	            />
		     }
	      <Modal.Description>
	         <Form onSubmit={this.handleSubmit}>
	              <Form.Input required fluid label='Title'
		      name='title'
		      value={title}
		     onChange={this.handleChange}
		     placeholder='Title of Material' />

	          <Form.Field
		     required
	            control={Select}
		    name='medium'
	            label='Medium'
	            options={options}
		    value={medium}
		    defaultValue="Book"
                    onChange={this.handleChange}
	            placeholder='Source of Information'
	          />

	         <Form.Input required fluid label='Description'
		     value={description}
		     name='description'
		     onChange={this.handleChange}
		     placeholder='Brief Description About The Material' />

                 <Form.Field
		     required
		           id='form-textarea-control-opinion'
		           control={TextArea}
		           value={points}
		           name='points'
		           onChange={this.handleChange}
		           label='Enter Points Separated By One Line'
		           placeholder='Point 1&#13;&#13;Point 2&#13;&#13;Point 3&#13;&#13;...'
		         />

	            <Form.Checkbox label='I agree to the Terms and Conditions' />

		     <Form.Button content='Submit' />
	          </Form>
	      </Modal.Description>
	    </Modal.Content>
	  </Modal>
	     )
	  }
}

export default AddItem

