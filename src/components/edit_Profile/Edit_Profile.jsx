import React, { Component } from 'react';
import { Button, FormGroup, Label, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { ButtonDropdown, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import LoadingOverlay from 'react-loading-overlay';
import swal from 'sweetalert';

class Edit_Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            user: null,
            phn_no : null,
            gender : null,
            profession : null,
            bio : null,
            file : null,
            name : null
          
        }

        this.postData = this.postData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }



    handleChange(event) {
         this.setState({
            [event.target.name] : event.target.value
        });

    }

    handleFileChange(event) {
        const target = event.target;
        const file = target.files[0];
        const name = target.file;
        this.setState({ file });

    }


    async componentDidMount() {
     
        this.setState({ isLoading: true });
        var user = JSON.parse(localStorage.getItem('user'));
        this.setState({ user });
        
        var name = user.name;
        var  phn_no = user.phn_no;
        var  gender = user.gender;
        var profession = user.profession;
        var bio = user.bio;

        this.setState({name});
        this.setState({phn_no});
        this.setState({gender});
        this.setState({profession});
        this.setState({bio});

    }

    async postData(event) {
        this.setState({loader : true});
        const { description } = this.state;
        var formdata = new FormData();
        
        formdata.append("file", this.state.file);
        formdata.append("user", new Blob([JSON.stringify({
            "name": this.state.name,
            "phn_no" : this.state.phn_no,
            "gender" : this.state.gender,
            "profession" : this.state.profession,
            "bio" : this.state.bio
        })],
            {
                type: "application/json",
                processData: false, contentType: false, cache: false
            }));
            console.log(this.state.file);
            

        const { user } = this.state;
        await fetch(`http://localhost:8081/profile/update?userID=` + user.userid, {
            method: 'PUT',
            body: formdata
        }).then(res => {console.log(res.status);
            if(res.status == 200){
                this.setState({loader : false});

             fetch(`http://localhost:8081/getOneUser?userId=`+user.userid)
            .then(res => res.json())
            .then(json => {
                localStorage.setItem('user',JSON.stringify(json));

            });
                swal({
                    title: "Complete!",
                    text: "Your profile has been updated !!!",
                    icon: "success",
                    button: "Ok",
                  }).then(next => {
                      window.location.replace('/profile');
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
                    text='Updating ...'
                >
                   
               
                {/* <h3>Give a title:</h3> */}
                <Container className="justify-content-center">
          
                <Row>
                    <Col xs="12">
                        <h5>Name :  </h5>
                        <FormGroup>
                            <Input name="name" type="text" id="post" placeholder="Update Name" onChange={this.handleChange} required />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12">
                        <h5>Phone No :  </h5>
                        <FormGroup>
                            <Input name="phn_no" type="text" id="post" placeholder="Update Phone no" onChange={this.handleChange} required />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12">
                        <h5>Gender :  </h5>
                        <FormGroup>
                            <Input name="gender" type="text" id="post" placeholder="Update Gender" onChange={this.handleChange} required />
                        </FormGroup>
                    </Col>
                </Row>

                
                <Row>
                    <Col xs="12">
                        <h5>Profession :  </h5>
                        <FormGroup>
                            <Input name="profession" type="text" id="post" placeholder="Update Profession" onChange={this.handleChange} required />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12">
                        <h5>Bio :  </h5>
                        <FormGroup>
                            <Input name="bio" type="text" id="post" placeholder="Update Profession" onChange={this.handleChange} required />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12">
                        <h5>Select Profile Picture  </h5>
                        <FormGroup>
                            <Input type="file" name="file" id="file" placeholder="Select photo" onChange={this.handleFileChange} required />
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
export default Edit_Profile;