import path from 'path'
import multer from 'multer'

var types = ['image/png', 'image/jpg', 'image/jpeg']
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'client/public/Images')
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname)
    cb(null, file.fieldname + Date.now() + ext)
  },
})

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (types.includes(file.mimetype)) {
      callback(null, true)
    } else {
      console.log(types + file.mimetype)
      console.log('File not accepted')
    }
  },
})

export { upload }
