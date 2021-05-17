# Battery shop

To get started you'll need docker installed. Then run docker-compose up and navigate to http://localhost:3000 and the frontend should eventually spin up there.

The backend is running on localhost:8080 and the database is postgres running on localhost:5432 if you want to look at it with pgadmin or something. The credentials are just:

- username: postgres
- password: postgres
- database name: shop-db

Alternatively if you don't have docker installed, you just need yarn or npm and can run `yarn startBoth` to start up the frontend and backend. Then you'll obviously need to start your own postgres instance. The credentials are just in the docker-compose file.
## Notes

- There is only 1 cart, so the store only caters for 1 customer
- Because there's no requirement for the 'admin' functionality, no data about past transactions other than the cost and email is stored
- This app is obviously not secure - the database credentials are public and in the code on github and the API is open to sql injection attacks
- The frontend was just thrown together with components I'd previously built for other websites (like the table from https://willsmithte.com/NBA and form & button from https://willsmithte.com/rsvpyo)