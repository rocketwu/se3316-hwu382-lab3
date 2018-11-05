//server.js

var express = require('express');
var app     = express();
var bodyParser = require('body-parser');
var Cart    = require('./app/models/cart');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.use((req, res, next)=>{
    console.log('request received!');
    next();
});


var cartsRoute = router.route('/carts');
cartsRoute.post((req, res)=>{
    //create item with name, price and tax(optional). quantity is initilize to 0
    //use POST https://se3316-hwu382-lab3-hwu382.c9users.io/carts
    //Body attribute: name, price, tax(optional)
    let cName = req.body.name;
    let cPrice = Number(req.body.price);
    let cTax = Number(req.body.tax);
    
    if ((!cName)||(!cPrice)) {
        //name or price is empty discard request
        res.json({message: 'Name/Price cannot be empty!'});
        return;
    }
    
    if(cPrice<=0){
        //invalid price
        res.json({message: 'Invalid price!'});
        return;
    }
    
    if (!cTax) {
        cTax=Number(0);
    }
    
    var cart = new Cart();
    cart.name = cName;
    cart.price = cPrice;
    cart.tax = cTax;
    cart.quantity = 0;
    
    cart.save((err)=>{
        if (err) res.send(err);
        else res.json({message:'Item created!'});
    });
});

cartsRoute.get((req, res)=>{
    //get all items
    //use GET https://se3316-hwu382-lab3-hwu382.c9users.io/carts
    Cart.find((err, cart)=>{
        if(err) res.send(err);
        else res.json(cart);
    });
});

router.route('/carts/:item_id/quantity').put((req, res)=>{
    //update quantity
    //use PUT https://se3316-hwu382-lab3-hwu382.c9users.io/carts/id/quantity
    //Body attribute: quantity
    Cart.findById(req.params.item_id, (err,item)=>{
        if(err) res.send(err);
        else{
            let cQuantity = Number(req.body.quantity);
            if (cQuantity<0) {
                res.json({message: 'Invalid Quantity!'});
            }
            else{
                item.quantity = cQuantity;
                item.save((err)=>{
                    if (err) res.send(err);
                    else res.json({message: 'quantity updated! '})
                });
            }
        }
    });
});


router.route('/carts/:item_id/tax').put((req, res)=>{
    //update tax
    //use PUT https://se3316-hwu382-lab3-hwu382.c9users.io/carts/id/tax
    //Body attribute: tax
    Cart.findById(req.params.item_id, (err,item)=>{
        if(err) res.send(err);
        else{
            let cTax = Number(req.body.tax);
            if (cTax<0) {
                res.json({message: 'Invalid Tax!'});
            }
            else{
                item.tax = cTax;
                item.save((err)=>{
                    if (err) res.send(err);
                    else res.json({message: 'tax updated! '})
                });
            }
        }
    });
});

router.route('/carts/:item_id').delete((req, res)=>{
    //delete item
    //use DELETE https://se3316-hwu382-lab3-hwu382.c9users.io/carts/id
    Cart.remove({_id: req.params.item_id}, (err, item)=>{
        if (err) res.send(err);
        else res.json({message: 'successfully deleted!'});
    });
})

.get((req, res)=>{
    //get single item
    //use GET https://se3316-hwu382-lab3-hwu382.c9users.io/carts/id
    Cart.findById(req.params.item_id, (err, item)=>{
        if (err) res.send(err);
        else res.json(item);
    });
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});


app.use(router);
app.listen(port);