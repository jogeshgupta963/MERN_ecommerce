import bcrypt from 'bcryptjs'

const users = [
    {
        name:"Admin user",
        email:"admin@gmail.com",
        password:bcrypt.hashSync('1n23456789',10),
        role:"Admin",
    },
    {
        name:" jogi",
        email:"jogi@gmail.com",
        password:bcrypt.hashSync('123456789',10),
    },
    {
        name:"mriga",
        email:"mriga@gmail.com",
        password:bcrypt.hashSync('123456789',10),
    }
]

export default users