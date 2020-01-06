import React, { Component, useState,useEffect } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import { FormGroup, Label} from 'reactstrap';
import useForm from 'react-hook-form';
import LoadingOverlay from 'react-loading-overlay';
import swal from 'sweetalert';

function Register() {
  const [loader, setLoader] = useState(
    false
  );
  const { register, handleSubmit, errors ,setValue} = useForm(); // initialise the hook
  const onSubmit = async(data) => {
    setLoader(true);
   // alert(JSON.stringify(data, null));
    var formdata = new FormData();

     formdata.append("user",new Blob([JSON.stringify(data)],
     {
      type: "application/json",
      processData: false, contentType: false, cache: false
  })); 
  
     await fetch(`/registration`,{
       method : 'POST',
       body : formdata
     })
     .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      setLoader(false);
      swal({
          title: "Congratultions!",
          text: "Your account has been created!!!",
          icon: "success",
          button: "Ok",
        }).then(next => {
            window.location.replace('/login');
        });
  }
    ); 
  };
 
  
 
    return (
      <div className="app flex-row align-items-center">
        
        <Container>
        <LoadingOverlay
                    active={loader}
                    spinner
                    text='loading ...'
                >
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        
                      </InputGroupAddon>
                      <Input type="text" name="name" placeholder="Name" autoComplete="username" innerRef={register({ required: true })} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        
                      </InputGroupAddon>
                      <Input type="text" name="email" placeholder="Email" autoComplete="email" innerRef={register({ required: true,  pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "invalid email address"
                        } })} />
                        {errors.email && errors.email.message}
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                       
                      </InputGroupAddon>
                      <Input type="password" name="password" placeholder="Password" autoComplete="new-password" innerRef={register({ required: true })}/>
                    </InputGroup>
                  
                    <Button color="success" >Create Account</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          </LoadingOverlay>
        </Container>
      
      </div>
    );
  }

export default Register;