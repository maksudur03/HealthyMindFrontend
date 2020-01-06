import React from 'react';
import './style.css';


export default class Post extends React.Component {
    render() {
        return (

            <div class="container container-post-detail">
                <h1 class="issue-title">dfghdfhgdf</h1>

                <small>Open</small>

                <small> In Progress</small>


                <small>Closed</small>
                <small class="issue-data"><i class="fas fa-user"></i> fghfgh  <i class="fas fa-calendar-alt"></i>
                    20.3.2019 <i class="fas fa-map-marker-alt"></i> cbcf  </small>
                <div class="media-block">
                    <img class="issue-image" src="/{{issue.media}}" alt="Issue Image" />
                </div>
                <p class="issue-details">
                    dfgkljlkdjfglkdjlgkjdklfgjldkfjg
    </p>
                <div class="issue-interraction-buttons" id="voot-block">
                    <button class="btn btn-info disabled">20</button>
                </div>
                <form method="POST" class="list-group-item" id="form-block">

                    <button class="btn btn-success">Comment</button>
                </form>

                <div class="comments list-group-item">
                    <img class="user-picture" src="{{item.user.thumbnail}}" alt="person" width="30px" height="30px" style={{ display: "inline-block", float: "left", "margin-right": "5px " }} />
                    <h5 style={{ display: "inline-block" }}> username <br /><small>20.3.2019</small></h5>
                    <p class="comment-text">fghhfghfg</p>

                </div>
            </div>



        );
    }
}


