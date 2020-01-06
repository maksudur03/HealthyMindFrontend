import React from 'react';
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
import swal from 'sweetalert';

export default class AdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            cardData: [],
            temp: null,
            isLoading: false,
            comment : null,
            filterdCardDataWithImage : [],
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

    var user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        if(user.type !== 'admin'){
            swal({
                title: "STOP!!",
                text: "Your are not authorized!!!",
                icon: "warning",
                button: "Ok",
            }).then(next => {
                window.location.replace('/');
            });
        }
        else {

    await fetch(`http://localhost:8081/getAllPostForAdmin`)
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
}
render() {
    return (
        <div>
            <Card className="text-center text-md-center">
                <CardHeader className="text-center text-md-center">  Admin Page  </CardHeader>
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
                                    <Link to={{ pathname: '/approval_page',  state: { key: forEach.id, post: forEach} }}>Continue reading ...</Link>
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
                                    <Link to={{ pathname: '/approval_page',  state: { key: forEach.id, post: forEach} }}>Continue reading ...</Link>
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