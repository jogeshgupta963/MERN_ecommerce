import mongoose from 'mongoose';

function connect(url){
    try {
        return mongoose.connect(url)
    } catch (error) {
        console.log(error.message)
    }
}

// module.exports = {connect}
export {connect};