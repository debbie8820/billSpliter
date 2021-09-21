# BillSpliter API
This is an API server for a bill-spliting website.

### API Documentation
https://billspliter.docs.apiary.io/#

### Environments
* [Node.js (14.16.1)](https://nodejs.org/en/)
* [Express (4.17.1)](https://expressjs.com/zh-tw/)

### Getting Started
1. Clone this repo to your desktop
```
$ git clone https://github.com/debbie8820/billSpliter.git
```


2. Open the root directory and install all dependencies
```
$ npm install
```


3. Set up database (Please make sure you have installed MySQL locally)
```
create database split_keeper
```


4. Set up environment variables</br>
create an .env file and set the environment variables


5. Set up seed files
```
npm run seed
```


6. Execute
```
npm run start
```


7. When the app starts running, the terminal will send:
```
Example app listening on port 3000
```


8. Now you can see the result on localhost 3000
```
http://localhost:3000/
```


### Author
Debbie Chang