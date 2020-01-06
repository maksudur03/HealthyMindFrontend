import React from 'react';

import swal from 'sweetalert';
export default class Logout extends React.Component {

	constructor(props) {
		super(props);
    }

    async componentDidMount(){
        window.localStorage.clear();
		swal({
		  title:"Goodbye",
		  text: "See you soon!!!",
		  icon: "success",
		  button: "Ok",
		}).then(next => {
			window.location.replace('/');
		});
    }

    render(){
        return(<div>logged out</div>)
    }
}