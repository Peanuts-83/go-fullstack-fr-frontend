// CONTROLER Auth/Routes
const jwt = require('jsonwebtoken');

// takes any request and analyse header/body
module.exports = (req,res,next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN");   // JS object {userId, ...}
    const userId = decodedToken.userId;
    //if(req.headers) { console.log('headers:', req.headers) }
    //if(req.params) { console.log('params:', req.params) }
    if (req.body.userId && req.body.userId !== userId) {   // req.body only for POST/PUT
      throw 'Wrong User ID';
    } else {
      //console.log('body:', req.body, '###########');
      next();
    }
  } catch(error) {
    res.status(401).json({error: error | 'Unauthentified request'});
  }
}