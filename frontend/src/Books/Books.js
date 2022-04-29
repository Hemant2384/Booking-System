import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../App'


const Books = () => {
    const { emailstate, emaildispatch } = useContext(UserContext);


    const [books, setbooks] = useState([])
    // const[list,setList] = useState([])
    useEffect(() => {
        axios.get('https://www.googleapis.com/books/v1/volumes?q=search-terms&key=AIzaSyBCD3AP3MqXwvQ0uo5UC4x5Lf42nuUep-s')
            .then(response => { setbooks(response.data.items) })
    }, [])
    return (
        <>
            {
                books.map((item) => (
                    <>
                        <div>
                            {item.volumeInfo.title}
                        </div>
                    </>
                ))
            }
        </>
    )
}

export default Books