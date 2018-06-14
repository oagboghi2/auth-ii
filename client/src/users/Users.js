import react, { Component } from 'react';
import axios from 'axios';

class Users extends Component(){
    constructor(props){
        super(props)
        this.state = {
            users: []
        }
        
    }
    componentDidMount() {
        axios.get('http://localhost:5500/api/users/list')
        .then(response => {
            console.log(response.data)
            this.setState({ [users] : response.data })
        })
        .catch(err => {
            console.log(err)
        })
    }


    render() {
        return (
            <ul>
                {this.state.users.map(user => <li> {user.usernames}</li>)}
            </ul>
        )
    }
}

export default Users