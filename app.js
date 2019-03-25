const express    = require('express'),
      app        = express(),
      stripe     = require('stripe')('sk_test_aM6AP0ewaXMkoH7VdurpFmPj'),
      bodyParser = require('body-parser'),
      exphbs     = require('express-handlebars');
      
//handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// set static folder
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
    res.render('index');
});

//charge route
app.post('/charge', (req, res) => {
    const amount = 50000;
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
        amount,
        description: 'Web Development Ebook',
        currency: 'usd',
        customer: customer.id
    }))
    .then(charge => res.render('success'));
});
      
app.listen(process.env.PORT, process.env.IP, () => console.log('server started'));      