import React from 'react'
import ImageUploader from 'react-images-upload';
import { Form, Button, Select, Header, Icon, Image, Modal } from 'semantic-ui-react'

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
	              <Form.Input fluid label='Name' placeholder='Title of interest' />

	          <Form.Field
	            control={Select}
	            label='Medium'
	            options={options}
	            onChange={this.onDrop}
	            placeholder='Source of Information'
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

