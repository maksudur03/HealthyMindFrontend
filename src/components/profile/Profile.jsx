import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
export default class Profile extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            user : [],
            profile : [],
            imageURL : "https://maxcdn.icons8.com/Share/icon/Users//user_male_circle_filled1600.png",
            myPost : [],
            filterdCardDataWithImage : [],
            filterdCardDataWithOutImage : []
        }

    
        
    }

    async componentDidMount() {
        this.setState({ isLoading: true });

        var user = JSON.parse(localStorage.getItem('user'));
        this.setState({ user });

        if(user.imageURL!==null){
            this.setState({
                imageURL : user.imageURL
            });
        }


        await fetch(`http://localhost:8081/blog/getMyPost/`+user.userid)
        .then(res => res.json())
        .then(json => {
            let myPost = json;
            this.setState({ myPost });
            console.log(myPost);

        });

        let filterdCardDataWithImage = this.state.myPost.filter(
            (data) => {
              return data.contentHtml !== null;
            }
        );
        this.setState({filterdCardDataWithImage});

        let filterdCardDataWithOutImage = this.state.myPost.filter(
            (data) => {
              return data.contentHtml === null;
            }
        );
        this.setState({filterdCardDataWithOutImage});


        await fetch(`http://localhost:8081/getOneUser?userId=`+user.userid)
            .then(res => res.json())
            .then(json => {
                let profile = json;
                this.setState({ profile });

            });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            
                            <img className="card-img-top" src={this.state.imageURL} alt="Card image" style={{ width: '100%', padding: '10px' }} />
                            <div className="card-body">
                                <h4 className="card-title">{this.state.user.name}</h4>

                                <div className="list-group list-group-flush " style={{ cursor : 'pointer' }}>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item"><i className="fas fa-paper-plane"></i> {this.state.user.emailId} </li>
                                        <li className="list-group-item"><i className="far fa-id-card"></i> {this.state.user.phn_no} </li>
                                        <li className="list-group-item"><i className="fas fa-venus-mars"></i> {this.state.user.gender}</li>

                                        <li className="list-group-item"><i className="fas fa-phone"></i> {this.state.user.profession} </li>
                                        <li className="list-group-item"><i className="far fa-id-card"></i> {this.state.user.bio} </li>
                                        <li className="list-group-item"> <Link to={{ pathname: '/edit_profile'  }}>Update Profile</Link> </li>

                                    </ul>
                                    <br />
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="issues-created-by-me" id="issue-created-by-me-div">
                        {
                            this.state.filterdCardDataWithImage.map(foreach => 
                                <div className="issue-card">
                                 <img className="card-img-top"  style={{ width: '50%', padding: '10px' }} src={foreach.contentHtml} alt="Card image cap" />
                                <p class="issue-details">{foreach.body}</p>
                                
                                <Link className="issue-see-more btn btn-info btn-sm d-inline-block mr-2" to={{ pathname: '/edit_post', state: { key: foreach.id, post: foreach}  }}>Update Post</Link>
                                
                            </div>
                            )
                        }

{
                            this.state.filterdCardDataWithOutImage.map(foreach => 
                                <div className="issue-card">
                                <p class="issue-details">{foreach.body}</p>
                                
                                <Link className="issue-see-more btn btn-info btn-sm d-inline-block mr-2" to={{ pathname: '/edit_post', state: { key: foreach.id, post: foreach}  }}>Update Post</Link>
                                
                            </div>
                            )
                        }
                          
                        </div>
                    </div>

                </div>
            </div>

        );
    }

}