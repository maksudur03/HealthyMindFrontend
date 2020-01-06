import React, { Component } from 'react';
import { Button, FormGroup, Label, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { ButtonDropdown, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import LoadingOverlay from 'react-loading-overlay';
import swal from 'sweetalert';

class Blog_Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            description: null,
            body: null,
            user: null,
            tags: null,
            ageLimit: null,
            title: null,
            temp: null,
            dropDownValue: 'Select One',
            dropdownOpen: false,
            loader: false,
            file : null,
            post : null
        }

        this.postData = this.postData.bind(this);
        this.handlePostChange = this.handlePostChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        
    }

 


    handlePostChange(event) {
        const target = event.target;
        const post = target.value;
        const name = target.name;
        this.setState({ post });

    }

    handleFileChange(event) {
        const target = event.target;
        const file = target.files[0];
        const name = target.file;
        this.setState({ file });

    }


    async componentDidMount() {
     
        var user = JSON.parse(localStorage.getItem('user'));
        this.setState({ user });
        
        if(user===null){
            swal({
              text: "You aren't logged in!!!",
              icon: "warning",
              button: "Ok",
            }).then(next => {
                window.location.replace('/');
            });
          }
    }

    async postData(event) {
        this.setState({loader : true});
        const { description } = this.state;
        var formdata = new FormData();
        if(this.state.file !== null){
        formdata.append("file", this.state.file);
        formdata.append("post", new Blob([JSON.stringify({
            "body": this.state.post
        })],
            {
                type: "application/json",
                processData: false, contentType: false, cache: false
            }));
            
        var user = JSON.parse(localStorage.getItem('user'));
        await fetch(`http://localhost:8081/blog/create?userID=` + user.userid, {
            method: 'POST',
            body: formdata
        }).then(res => {console.log(res.status);
            if(res.status == 200){
                this.setState({loader : false});
                swal({
                    title: "Complete!",
                    text: "Your content has been posted successfully!!!",
                    icon: "success",
                    button: "Ok",
                  }).then(next => {
                      window.location.replace('/');
                  });
            }
        })
    }
    else{
        formdata.append("post", new Blob([JSON.stringify({
            "body": this.state.post
        })],
            {
                type: "application/json",
                processData: false, contentType: false, cache: false
            }));
            
        var user = JSON.parse(localStorage.getItem('user'));
        await fetch(`http://localhost:8081/blog/createOpt?userID=` + user.userid, {
            method: 'POST',
            body: formdata
        }).then(res => {console.log(res.status);
            if(res.status == 200){
                this.setState({loader : false});
                swal({
                    title: "Complete!",
                    text: "Your content has been posted successfully!!!",
                    icon: "success",
                    button: "Ok",
                  }).then(next => {
                      window.location.replace('/');
                  });
            }
        })
    }
    }

 
    render() {
        return (
            <div className="app flex-row align-items-center">
                <LoadingOverlay
                    active={this.state.loader}
                    spinner
                    text='Uploading ...'
                >
                   
               
                {/* <h3>Give a title:</h3> */}
                <Container className="justify-content-center">
          
                <Row>
                    <Col xs="12">
                        <h5>Write your post here:  </h5>
                        <FormGroup>
                            <Input type="text" id="post" placeholder="Write Your Post" onChange={this.handlePostChange} required />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12">
                        <h5>Select Photos  </h5>
                        <FormGroup>
                            <Input type="file" id="file" placeholder="Select photo" onChange={this.handleFileChange} required />
                        </FormGroup>
                    </Col>
                </Row>

                <div style={{ margin: '10px' }}>

                    <Row>
                        <Col sm="16" md={{ size: 6, offset: 4 }}>
                            <Button color="primary" className="px-4" onClick={this.postData}>Post</Button>
                        </Col>
                    </Row>
                </div>
                
                </Container>
                {/* <div dangerouslySetInnerHTML={ { __html: this.state.body } }></div> */}
                </LoadingOverlay>
            </div>
        );
    }
}
export default Blog_Post;