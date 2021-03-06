const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;


// use body parser middleware
app.use(bodyParser.urlencoded( {extended: false} ))

// API KEY: pk_ae48454bd18a453599f01ffa35da75f7

// Function to call the API
function call_api(finishedAPI, ticker) {
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_ae48454bd18a453599f01ffa35da75f7', {json: true}, (err, res, body) => {
        if (err) {
            return console.log(err);
        };
        if (res.statusCode === 200) {
            // console.log(body);
            finishedAPI(body);
        };
    });
};

// Set Handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// TODO
// 1. make home not display stock data
// 2. make company page route use api
// 3. the not having a ticker symbol in the URL in call_api prevents the company route from working.


// Index GET route

app.get('/', function (req, res) {
    // use a callback to ensure time for data retrieval
//    call_api(function(completeAPI) {
//        res.render('home', {
//            stock: completeAPI
//        });
//    });
    res.render('home');
});


/*
// Company GET route
app.get('/company', function (req, res) {
    // use a callback to ensure time for data retrieval
    call_api(function(completeAPI) {
        res.render('company', {
            stock: completeAPI
        });
    });
});
*/

// Index POST route
/*
app.post('/', function (req, res) {
    // use a callback to ensure time for data retrieval
    call_api(function(completeAPI) {
        // returned_data = req.body.stock_ticker;
        res.render('home', {
            stock: completeAPI,
        //    returned_data: returned_data
        });
    }, req.body.stock_ticker);
});
*/

// Company route
app.post('/company', function (req, res) {
    // use a callback to ensure time for data retrieval
    call_api(function(completeAPI) {
        // returned_data = req.body.stock_ticker;
        res.render('company', {
            stock: completeAPI,
        //    returned_data: returned_data
        });
    }, req.body.stock_ticker);
});

/*
app.get('/company.html', function(req, res) {
    res.render('company');
});
*/

// About page route
app.get('/about.html', function (req, res) {
    res.render('about');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server listening on port ' + PORT));