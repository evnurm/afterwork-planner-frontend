import React, { Component } from 'react';
import { db } from '../Firebase/firebase';
import './Dashboard.css'

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.ref = db.collection('events');
        this.unsubscribe = null;
        this.state = {
            eventList: []
        }
    }

    onCollectionUpdate = (querySnapshot) => {
        const eventList = [];
        querySnapshot.forEach((doc) => {
          const { name, description } = doc.data();
          eventList.push({
            key: doc.id,
            doc, // DocumentSnapshot
            name,
            description,
          });
        });

        this.setState({
          eventList
       });
      }
    
      componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
      }

    render() {
        const { eventList } = this.state;
        return (
            <div>
                <header>
                    <nav className="navbar">
                        <ul className="nav container d-flex">
                        <li className="nav-item active"><a href="/event/create">New</a></li>
                        <li className="nav-item"><a href="/">Account</a></li>
                        </ul>
                    </nav>
                </header>
    
                <div className="content">
                    <div className="event-list">
                        {eventList.map((item) => {
                            return(
                            <div key={item.key} className="event-list-item">
                                <div className="container">
                                <div className="row">
                                    <div className="col">
                                    {item.name}
                                    </div>
                                    <div className="col">
                                    {item.description}
                                    </div>
                                </div>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

}

export default Dashboard;