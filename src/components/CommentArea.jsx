import { Component, useEffect } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'
import { useState } from 'react'

const CommentArea = ({ asin }) => {
/* 
    state = {
        comments: [], // comments will go here
        isLoading: false,
        isError: false
    } */
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    /* componentDidUpdate = async (prevProps) => {
        if (prevProps.asin !== this.props.asin) {
            this.setState({
                isLoading: true
            })
            try {
                let response = await fetch('https://striveschool-api.herokuapp.com/api/comments/' + this.props.asin, {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTgyOTU0M2FhY2FhMjAwMTU1MmExOWYiLCJpYXQiOjE2NDE5MTE2NzIsImV4cCI6MTY0MzEyMTI3Mn0.ZONHfehwT6_OZoZFMQRS7718nlFTzHShFRfhFJBWYEU'
                    }
                })
                console.log(response)
                if (response.ok) {
                    let comments = await response.json()
                    this.setState({ comments: comments, isLoading: false, isError: false })
                } else {
                    console.log('error')
                    this.setState({ isLoading: false, isError: true })
                }
            } catch (error) {
                console.log(error)
                this.setState({ isLoading: false, isError: true })
            }
        }
    } */
    useEffect(()=>{
      const getComments = async ()=>{
        setIsLoading(true)//hook
        try {
            let response = await fetch('https://striveschool-api.herokuapp.com/api/comments/' + asin, {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTgyOTU0M2FhY2FhMjAwMTU1MmExOWYiLCJpYXQiOjE2NDE5MTE2NzIsImV4cCI6MTY0MzEyMTI3Mn0.ZONHfehwT6_OZoZFMQRS7718nlFTzHShFRfhFJBWYEU'
                }
            })
            console.log(response)
            if (response.ok) {
                let comments = await response.json()
                //this.setState({ comments: comments, isLoading: false, isError: false })
                setComments(comments)
                setIsError(false)
                setIsLoading(false)
            } else {
                console.log('error')
                //this.setState({ isLoading: false, isError: true })
                setIsLoading(false)
                setIsError(true)
            }
        } catch (error) {
            console.log(error)
            //this.setState({ isLoading: false, isError: true })
            setIsLoading(false)
            setIsError(true)
        }
      }
      getComments()
    }, [asin])
  
        return (
            <div>
                {isLoading && <Loading />}
                {isError && <Error />}
                <AddComment asin={ asin } />
                <CommentList commentsToShow={comments} />
            </div>
        )
    
}

export default CommentArea