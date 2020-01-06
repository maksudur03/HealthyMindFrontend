import React from 'react';
import d1 from './d1.jpg';
import d2 from './d2.jpg';
import d3 from './d3.jpg';
import { Link } from 'react-router-dom';
export default class Spec extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            user : [],
            profile : [],
            imageURL : "https://maxcdn.icons8.com/Share/icon/Users//user_male_circle_filled1600.png",
            myPost : []
        }

    
        
    }

    async componentDidMount() {
        this.setState({ isLoading: true });

        var user = JSON.parse(localStorage.getItem('user'));
        this.setState({ user });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            
                            <img className="card-img-top" src={d1} alt="Card image" style={{ width: '100%', padding: '10px' }} />
                            <div className="card-body">
                                <h4 className="card-title">Mr Handerson</h4>

                                <div className="list-group list-group-flush " style={{ cursor : 'pointer' }}>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item"><i className="fas fa-paper-plane"></i> handerson@gmail.com </li>
                                        <li className="list-group-item"><i className="far fa-id-card"></i> +880304940004 </li>
                                        <li className="list-group-item"><i className="fas fa-venus-mars"></i> Male</li>

                                       
                                        <li className="list-group-item"><i className="far fa-id-card"></i> Fishing </li>
                                        

                                    </ul>
                                    <br />
                                   
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="col-md-4">
                        <div className="card">
                            
                            <img className="card-img-top" src={d2} alt="Card image" style={{ width: '100%', padding: '10px' }} />
                            <div className="card-body">
                                <h4 className="card-title">Ms Laura</h4>

                                <div className="list-group list-group-flush " style={{ cursor : 'pointer' }}>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item"><i className="fas fa-paper-plane"></i> laura@gmail.com </li>
                                        <li className="list-group-item"><i className="far fa-id-card"></i> +9939293993 </li>
                                        <li className="list-group-item"><i className="fas fa-venus-mars"></i> Female</li>

                                       
                                        <li className="list-group-item"><i className="far fa-id-card"></i> Sketching </li>
                                        

                                    </ul>
                                    <br />
                                   
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card">
                            
                            <img className="card-img-top" src={d3} alt="Card image" style={{ width: '100%', padding: '10px' }} />
                            <div className="card-body">
                                <h4 className="card-title">Mr Vincent</h4>

                                <div className="list-group list-group-flush " style={{ cursor : 'pointer' }}>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item"><i className="fas fa-paper-plane"></i> vincent@gmail.com </li>
                                        <li className="list-group-item"><i className="far fa-id-card"></i> +03938484884 </li>
                                        <li className="list-group-item"><i className="fas fa-venus-mars"></i> Male</li>

                                       
                                        <li className="list-group-item"><i className="far fa-id-card"></i> Travelling </li>
                                        

                                    </ul>
                                    <br />
                                   
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        );
    }

}