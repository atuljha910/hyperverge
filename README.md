# hyperverge
hyperverge assignment


/login: post request will be called and json containing user_id and password will be posted. both the credentials will be checked
by querying into the user table.

/register : if the person is not registered it will be redirected to this page . post request containing user_id, pass1 and pass2
 if both password are correct it will be saved in user table. after that login page will be opened again
 
/home : in the post request for home, user_id , seat_no to be booked and passenger name will be sent, and it will be saved in the 
seats table in the database;

/home : in the get request of home all the rows of seats table will be sent in the response.

/home/admin : in the post request of this , a json containing reset variable will be posted ,if it is true seats table will be truncated
