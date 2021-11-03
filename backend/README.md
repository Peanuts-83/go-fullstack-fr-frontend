# Backend setup with node.js / Full course app #
This is a resolved app course about Node, Express & MongoDB.
* Reference course: https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb

* Original unresolved course (Frontend) shown here:
https://github.com/OpenClassrooms-Student-Center/go-fullstack-fr-frontend


## Added securization for Git-repos - dotenv ##
In order not to expose your confidential credentials to MongoDB, please use the <b>dotenv</b> module. Add '.env' to '.gitignore' to keep your credentials private!

* Reference documentation:
https://github.com/motdotla/dotenv

## An '.env' file must be set at root, containing credentials to a valid mongoDB database: ##
```
  DB_user=user_name
  DB_password=password
  DB_address=address
```

## The app should import 'dotenv' package and then access '.env' credentials this way: ##
* Credentials secured to .env:

```
  require('dotenv').config();
```

* Connect MongoDB:
```
  mongoose.connect(`mongodb+srv://${process.env.DB_user}:${process.env.DB_password}@${process.env.DB_address}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
      .then(() => console.log('MongoDB connected!'))
      .catch(error => console.log('MongoDB NOT connected: ', error));
```