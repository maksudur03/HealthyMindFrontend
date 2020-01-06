import React from 'react';
import {
    Carousel,
    CarouselItem,
    Col,
    Row,
    Card,
    CardBody,
    CarouselCaption,
    CardHeader,
    CarouselIndicators,
    CarouselControl,
    Button,
    CardFooter,
    FormGroup,
    Input
} from "reactstrap";
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
            loader: false,
            hasImage : false
        };
        this.handleChange = this.handleChange.bind(this);
        this.approve = this.approve.bind(this);
        this.delete = this.delete.bind(this);

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

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

    async approve(event) {
        this.setState({ loader: true });
        await fetch(`http://localhost:8081/blog/approve/`+this.state.post.id, {
            method: 'PUT',
        }).then(res => {
            console.log(res.status);
            if (res.status == 200) {
                this.setState({ loader: false });
                swal({
                    title: "Good Job!",
                    text: "Post approved!!!",
                    icon: "success",
                    button: "Ok",
                }).then(next => {
                    window.location.replace('/');
                });
            }
        })
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

            if(post.contentHtml === null){
                this.setState({hasImage : true})
                console.log("no image");
                
            }
        }

    }


    render() {
        
        var hasImage = this.state.hasImage;

        if (this.state.isLoading)
            return (<div>Loading....</div>);
        else {
            return (
                <div>
                    <Card className="text-center text-md-center">
                        <CardHeader className="text-center text-md-center">  Post  </CardHeader>
                        <CardBody className="text-center text-md-center">
                        {
                                (hasImage) ?( <div></div>):(<CardBody>
                                    <img className="card-img-top" style={{ width: '50%', padding: '10px' }} src={this.state.post.contentHtml} alt="Card image cap" />
                                </CardBody>)
                            }
                            <CardBody>
                                {this.state.post.body}
                            </CardBody>
                            <CardBody>
                                Posted by : {this.state.post.user.name}

                            </CardBody>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardBody>
                            <Button color="primary" className="px-4" onClick={this.approve}>Approve</Button>
                            <Button color="danger" className="px-4" onClick={this.delete}>Delete</Button>
                            </CardBody>
                    </Card>



                </div>


            );
        }
    }
} 