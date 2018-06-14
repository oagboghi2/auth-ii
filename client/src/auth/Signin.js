import React, { Component } from 'react';
import axios from 'axios';

class Signin extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: 'test',
            password: "12345"
        };
    }

    submitHandler = event => {
        event.preventDefault();
        //submit the form
        axios.post(`http://localhost:5500/api/users/signin`, this.state)
            .then(response => {
                console.log('response', response.data)
            })
            .catch(err => {
                console.log(err)
            })

    };

   


    inputChangeHandler = event => {
        console.log('changing', event.target.name)
        const { name, value } = event.target;
        this.setState({ [name] : value});

    };
    

    render(){
        return (
            <form onSubmit={this.submitHandler}>
                <div>
                    <label>username</label>
                    <input 
                    value = {this.state.username}
                     onChange={this.inputChangeHandler}
                      name='username' 
                      type="text" />
                </div>
                <div>
                    <label>password</label>
                    <input 
                    value={this.state.password}
                     onChange={this.inputChangeHandler}
                      name='password' 
                      type="password" />
                </div>
                <div>
                    <button type='submit'>
                        Sign In
                    </button>
                </div>
            </form>
        )
    }
}

export default Signin