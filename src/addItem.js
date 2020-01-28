import React from 'react'
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

	  render () {
	     return (

            <Modal trigger={<Button>Add</Button>}>
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
	         <Form>
	              <Form.Input fluid label='Title' placeholder='Title of Material' />

	          <Form.Field
	            control={Select}
	            label='Medium'
	            options={options}
	            placeholder='Source of Information'
	          />

	         <Form.Input fluid label='Description' placeholder='Brief Description About The Material' />

                 <Form.Field
		           id='form-textarea-control-opinion'
		           control={TextArea}
		           label='Enter Points Separated By One Line'
		           placeholder='Point 1&#13;&#13;Point 2&#13;&#13;Point 3&#13;&#13;...'
		         />

	            <Form.Checkbox label='I agree to the Terms and Conditions' />
	          </Form>

	      </Modal.Description>
	    </Modal.Content>
	    <Modal.Actions>
	      <Button primary>
	        Save <Icon name='chevron right' />
	      </Button>
	    </Modal.Actions>
	  </Modal>
	     )
	  }
}

export default AddItem

