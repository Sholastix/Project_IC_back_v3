# Project_IC_back_v3

Organizer for sports training (server api + database).

Allow to create your own exercises and combine them into workouts, which you can "pinned" to specific date in calendar 
(restriction exist: 1 workout on 1 date).  

Automatic passwords hashing with 'bcryptjs', authorization process with JWT using symmetric algorithm HS-256. All routes except registration, 
verification and authorization pages closed with 'passport' middleware, access permitted only for authorized users.

Application created using the following technologies:
____________________________________________________________________

        Back:       Node.js + Express.js.
        Database:   MongoDB + Mongoose.
____________________________________________________________________

1. Active MongoDB server's needed.

2. Rename file '.env.example' into '.env' and setup enviroment variables.

3. Download project from GIT, open it with code redactor and use following commands from terminal/console:

        3.1. npm install - needed modules installation;
        3.2. npm start - code start.

4. Available endpoints (xxxx - connection port from .env):

        4.1. http://localhost:xxxx/api/signup - registration page.
             ATTENTION: after registration you'll get the digital code in POSTMAN response field (or code redactor's terminal/console aswell). This code will be needed in verification process. Verification code type in model - NUMBER, in POSTMAN (or something similar) insert this code without quotes.

        4.2. http://localhost:xxxx/api/verification - verification page.
             ATTENTION: after verification you'll get the token in POSTMAN response field, but that token not for access to closed routes - only for security of one-time email verification process. Don't copy it, you don't need it at all for application test.

        4.3. http://localhost:xxxx/api/signin - authorization page
             ATTENTION: after authorization you'll get the token in POSTMAN response field. Don't forget to use this token for access to closed routes.
             In POSTMAN: choose tab "Authorization" -> choose type "Bearer Token" from dropdown menu -> insert token in appeared field -> now you can use closed route.

        4.4. 'USERS'

             http://localhost:xxxx/api/users/

             GET profile of specific user (by user ID from token).
             DELETE existed user's profile (by user ID from token).

        4.5. 'EXERCISES'

             http://localhost:xxxx/api/exercise/                   

             GET exercises list of specific user (by user ID from token).
             CREATE new exercises in a list of specific user (by user ID from token).

             http://localhost:xxxx/api/exercise/:exerciseID

             GET specific exercise (by exercise ID), which belongs to specific user.
             UPDATE already existed exercise (by exercise ID) in a list of specific user.
             DELETE specific exercise (by exercise ID) from list of specific user.

        4.6. 'WORKOUT'

             http://localhost:xxxx/api/workout/

             GET workout of specific user (by user ID from token).
             CREATE new workouts in specific user's list (by user ID from token).

             http://localhost:xxxx/api/workout/:workoutID

             UPDATE already existed workout (by workout ID) in a list of specific user.
             DELETE specific workout (by workout ID) from list of specific user.