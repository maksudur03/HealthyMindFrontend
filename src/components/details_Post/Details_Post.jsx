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

export default class Details_Post extends React.Component {
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
        this.postComment = this.postComment.bind(this);

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }

    async postComment(event) {
        this.setState({ loader: true });

        var user = JSON.parse(localStorage.getItem('user'));
        console.log(user);

        var formdata = new FormData();
        formdata.append("comment", new Blob([JSON.stringify({
            "content": this.state.comment,
            "userId": user.userid,
            "postId": this.state.post.id
        })],
            {
                type: "application/json",
                processData: false, contentType: false, cache: false
            }));
        await fetch(`http://localhost:8081/createComment`, {
            method: 'POST',
            body: formdata
        }).then(res => {
            console.log(res.status);
            if (res.status == 200) {
                this.setState({ loader: false });
                swal({
                    title: "Well Done!",
                    text: "Your Comment is posted!!!",
                    icon: "success",
                    button: "Ok",
                }).then(next => {
                    window.location.replace('/home');
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

            if(post.contentHtml === null){
                this.setState({hasImage : true})
                console.log("no image");
                
            }

            await fetch(`http://localhost:8081/commentPost?id=` + post.id)
                .then(res => res.json())
                .then(json => {
                    var allComment = json;
                    this.setState({ allComment });
                    console.log(this.state.allComment);
                });

            this.setState({ isLoading: false });
        }

    }


    render() {
        var hasImage = this.state.hasImage;
        console.log(hasImage);
        
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
                        <CardHeader>
                            Comments:
                        </CardHeader>
                        <CardBody>
                            {
                                
                                this.state.allComment.map(forEach =>
                                    <Card key={forEach.id}>
                                        <CardHeader>
                                            {forEach.user.name} commented : 
                                        </CardHeader>
                                        <CardBody>
                                            {forEach.body}
                                        </CardBody>
                                    </Card>

                                )
                            }
                        </CardBody>
                    </Card>


                    <Card>
                        <CardBody>
                            <FormGroup>
                                <Input name="comment" type="text" id="post" placeholder="Type your comment: " onChange={this.handleChange} />
                            </FormGroup>
                            <Button color="primary" className="px-4" onClick={this.postComment}>Comment</Button>

                            </CardBody>
                    </Card>



                </div>


            );
        }
    }
} 