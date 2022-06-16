import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function SearchBox() {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }
  return (
    <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search..."
        className="me-1"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button onClick={submitHandler} variant="outline-success">
        {' '}
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
