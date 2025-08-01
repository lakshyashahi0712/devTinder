# dev tinder APIs


##AuthRouter
- POST /signup
- POST /login
- POST /logout

##profileRouter
- PATCH /profile/edit
- GET /profile/view
- PATCH /profile/password

##connectionRequestRouter
- POSt /request/send/interested/:userId
- POSt /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

##userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed