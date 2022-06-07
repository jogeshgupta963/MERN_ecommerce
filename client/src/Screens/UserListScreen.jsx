import React, { useEffect } from 'react'
import { Button, Table, Tab } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import Message from '../components/Message'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../redux/user.js'
import { getUserList, deleteUser } from '../redux/userList'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'

function UserListScreen() {
  const { userList, status, error } = useSelector((state) => state.userList)
  const { user } = useSelector((state) => state.user)
  const [err, setErr] = React.useState('')
  const dispatch = useDispatch()

  const deleteHandle = async (id) => {
    try {
      const response = await axios.delete(`/user/${id}`)
      console.log(response)
      if (!response) throw new Error('user not found')

      dispatch(deleteUser(id))
      setErr('User Deleted')
    } catch (error) {
      setErr(error.message)
    }
  }
  useEffect(() => {
    dispatch(getUserList())
  }, [dispatch])

  return (
    <div>
      {!Cookies.get('JWT') && <Navigate to="/" />}
      {user.role !== 'Admin' && <Navigate to="/" />}
      {status === 'loading' && <Loader />}
      {status === 'error' && (
        <Message
          variant={error === 'User Deleted' ? 'success' : 'danger'}
          msg={error}
        />
      )}
      {err !== '' && <Message variant="danger" msg={err} />}
      {console.log(err)}
      {status === 'success' && (
        <Table striped bordered hover responsive className="table-sm3">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  {' '}
                  <a href={`mailto:${user.email}`}>{user.email}</a>{' '}
                </td>
                <td>
                  {user.role === 'Admin' ? (
                    <i className="fas fa-check" style={{ color: 'green' }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/edit/${user._id}`}>
                    <Button variant="outline-primary" className="btn-sm">
                      {' '}
                      <i className="fas fa-edit"></i>{' '}
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => {
                      deleteHandle(user._id)
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default UserListScreen
