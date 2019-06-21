import React from 'react'
import axios from 'axios'

export default class Jokes extends React.Component {
    state = {
        jokes: []
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            const options = {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            }
            axios.get('http://localhost:3300/api/jokes', options)
                .then(jokes => {
                    console.log(jokes)
                    this.setState({
                        jokes: jokes.data
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            this.props.history.push('/login')
        }
    }

    render() {
        return (
            <>
                <h2>Dad Jokes</h2>
                <ul>
                    {this.state.jokes.map(joke => (
                        <div key={joke.id}>
                            <p>{joke.joke}</p>
                        </div>
                    ))}
                </ul>
            </>
        )
    }
}