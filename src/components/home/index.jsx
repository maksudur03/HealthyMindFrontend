import React from 'react';
import Post from './posts/Post';
import { Link,NavLink } from 'react-router-dom';
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

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            cardData: [],
            filterdCardDataWithImage : [],
            temp: null,
            isLoading: false,
            comment : null,
            filterdCardDataWithOutImage : []
        };
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event) {
        this.setState({
           [event.target.name] : event.target.value
       });

   }



    async componentDidMount() {
        this.setState({ isLoading: true });

        await fetch(`http://localhost:8081/getAllPost`)
            .then(res => res.json())
            .then(json => {
                let cardData = json;
                this.setState({ cardData });
                console.log(cardData);

            });

            let filterdCardDataWithImage = this.state.cardData.filter(
                (data) => {
                  return data.contentHtml !== null;
                }
            );
            this.setState({filterdCardDataWithImage});

            let filterdCardDataWithOutImage = this.state.cardData.filter(
                (data) => {
                  return data.contentHtml === null;
                }
            );
            this.setState({filterdCardDataWithOutImage});
    }

    render() {
        return (
            <div>
                <Card className="text-center text-md-center">
                    <CardHeader className="text-center text-md-center">  Timeline  </CardHeader>
                    <CardBody className="text-center text-md-center">

                        {
                            this.state.filterdCardDataWithImage.map(forEach =>
                                <Row>
                                    <Card key={Math.random()}>
                                        <CardBody>
                                            <img className="card-img-top" style={{ width: '50%', padding: '10px' }} src={forEach.contentHtml} alt="Card image cap" />
                                        </CardBody>
                                        <CardBody>
                                            {forEach.body}
                                        </CardBody>
                                        <CardFooter className="text-center text-md-left">
                                            Posted by : {forEach.user.name}
                                        </CardFooter>

                                        <Card>
                                        <Link to={{ pathname: '/details_post',  state: { key: forEach.id, post: forEach} }}>See More...</Link>
                                        </Card>
                                    </Card>
                                </Row>
                            )
                        }


{
                            this.state.filterdCardDataWithOutImage.map(forEach =>
                                <Row>
                                    <Card key={Math.random()}>
                                        <CardBody>
                                            {forEach.body}
                                        </CardBody>
                                        <CardFooter className="text-center text-md-left">
                                            Posted by : {forEach.user.name}
                                        </CardFooter>

                                        <Card>
                                        <Link to={{ pathname: '/details_post',  state: { key: forEach.id, post: forEach} }}>See More ...</Link>
                                        </Card>
                                    </Card>
                                </Row>
                            )
                        }


                    </CardBody>
                </Card>


            </div>


        );
    };
} 