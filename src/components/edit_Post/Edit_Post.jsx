import React, { Component } from 'react';
import { Button, FormGroup, Label, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { ButtonDropdown, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import LoadingOverlay from 'react-loading-overlay';
import swal from 'sweetalert';

export default class ApprovalPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            cardData: [],
            temp: null,
            isLoading: true,
            comment: null,
            allComment : [],
            post: [],
            loader: false
        }

        this.updateData = this.updateData.bind(this);
        this.handlePostChange = this.handlePostChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.delete = this.delete.bind(this); 
    }

 


    handlePostChange(event) {
        const target = event.target;
        const body = target.value;
        const name = target.name;
        this.setState({ body });

    }

    handleFileChange(event) {
        const target = event.target;
        const file = target.files[0];
        const name = target.file;
        this.setState({ file });

    }


    async componentDidMount() {

        if (this.props.location.state === undefined) {
            swal({
                title: "OOPSSS",
                text: "Something went wrong!!!",
                icon: "warning",
                button: "Go back",
            }).then(next => {
                window.location.replace('/');
            });
        }
        else {
            const { post } = this.props.location.state;
            this.setState({ post });
            this.setState({ isLoading: false });
        }

    }

    async delete(event) {
        this.setState({ loader: true });
        await fetch(`http://localhost:8081/blog/delete/`+this.state.post.id, {
            method: 'DELETE',
        }).then(res => {
            console.log(res.status);
            if (res.status == 200) {
                this.setState({ loader: false });
                swal({
                    title: "Bingoo!",
                    text: "Post Deleted!!!",
                    icon: "warning",
                    button: "Ok",
                }).then(next => {
                    window.location.replace('/');
                });
            }
        })
    }

    async updateData(event) {
        this.setState({loader : true});
        const { description } = this.state;
        var formdata = new FormData();
        formdata.append("file", this.state.file);
        formdata.append("post", new Blob([JSON.stringify({
            "body": this.state.body
        })],
            {
                type: "application/json",
                processData: false, contentType: false, cache: false
            }));
            console.log(this.state.file);
            
        await fetch(`http://localhost:8081/blog/update?postId=` + this.state.post.id, {
            method: 'PUT',
            body: formdata
        }).then(res => {console.log(res.status);
            if(res.status == 200){
                this.setState({loader : false});
                swal({
                    title: "Bingoo!",
                    text: "Your post updated successfully!!!",
                    icon: "success",
                    button: "Ok",
                  }).then(next => {
                      window.location.replace('/');
                  });
            }
        })
    }

 
    render() {
        return (
            <div className="app flex-row align-items-center">
                <LoadingOverlay
                    active={this.state.loader}
                    spinner
                    text='Loading ...'
                >
                   
               
                {/* <h3>Give a title:</h3> */}
                <Container className="justify-content-center">
          
                <Row>
                    <Col xs="12">
                        <h5>Update your post here:  </h5>
                        <FormGroup>
                            <Input type="text" id="post" placeholder="Write Your Post" onChange={this.handlePostChange} required />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12">
                        <h5>Update Photo </h5>
                        <FormGroup>
                            <Input type="file" id="file" placeholder="Select photo" onChange={this.handleFileChange} required />
                        </FormGroup>
                    </Col>
                </Row>

                <div style={{ margin: '10px' }}>

                    <Row>
                        <Col sm="16" md={{ size: 6, offset: 4 }}>
                            <Button color="primary" className="px-4" onClick={this.updateData}>Update</Button>
                            <Button color="danger" className="px-4" onClick={this.delete}>Delete</Button>
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