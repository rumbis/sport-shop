let express = require('express');
let bodyParser = require('body-parser')
let mysql = require('mysql');

let router = express.Router();
let app = express();
let port = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use((req,res,next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.listen(port, function(){
    console.log("App radi na portu: "+ port)
});

let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "shop"
});
    
conn.connect(function(err) {
    if(err) throw err;
    console.log("Database connected successfully!")
});


app.get("/",function(req, res){
    let search = req.query.search;

    if(search === undefined){
        conn.query("SELECT * FROM products", function(err, result, fields){
            if(err) throw err;
            res.json({
                data: result
            });
        });
    }
    else{
        search = search.trim()
        conn.query("SELECT * FROM products WHERE pro_name=?",[search],
            function(err, result, fields){
                if(err) throw err;
                res.json({
                    data:result
                });
            });
    }
});

app.post("/login", function(req, res){
    let email = req.body.email;
    let password = req.body.password;

    if(email === undefined){
        res.json({
            result: "ERROR",
            message: "Email parameter is mising"
        });
        return;
    }
    if(password === undefined){
        res.json({
            result: "ERROR",
            message: "Password parameter is mising"
        });
        return;
    }

    conn.query("SELECT usr_firstname, usr_surname, usr_level, usr_id FROM users WHERE usr_email=? AND usr_password=?", [email, password], 
        function(err, result, fields){
            if(err) throw err;
            if(result.length === 0){
                res.json({
                    result: "ERROR",
                    message: "Invalid credentials"
                });
                return;
            }

            res.json({
                result: "OK",
                data: result[0]
            });
        });
});


app.post("/register", function(req, res){
    let firstname = req.body.firstname;
    let surname = req.body.surname;
    let email = req.body.email;
    let password = req.body.password;
    let level = 2;

    conn.query("SELECT usr_email FROM users WHERE usr_email=?", [email],
        function(err, result, fields){
            if(err) throw err;
            if(result.length > 0){
                res.json({
                    result: "ERROR",
                    message: "Email Already in Use"
                });
                return;
            }
            conn.query(`INSERT INTO users(usr_firstname, usr_surname, usr_email, usr_password, usr_level) 
                VALUES('${firstname}', '${surname}', '${email}', '${password}', ${level})`);

            res.json({
                result: "OK"
            })
        })
})

app.get("/shop/:path",function(req, res){
    let path = req.params.path;
    //let current = req.query.curr;
    //let perPage = req.query.number;
    //LIMIT ${current}, ${perPage}
    if(path === "all"){
        conn.query(`SELECT * FROM products`, function(err, result, fields){
            if(err) throw err;
            if(result.length <= 0){
                res.json({
                    result: "ERROR"
                });
                return;
            }
            res.json({
                data: result
            });
        });
        return;
    }
    if(path === "M" || path === "F" || path === "U"){
        conn.query("SELECT * FROM products WHERE pro_gender=? or pro_gender='U'", [path], function(err, result, fields){
            if(err) throw err;
            if(result.length <= 0){
                res.json({
                    result: "ERROR"
                });
                return;
            }
            res.json({
                data: result
            });
        });
        return;
    }
    if(path === "running" || path === "football" || path === "lifestyle" || path === "fitness" || path === "volleyball" || path === "swimming" || path === "shoes" || path === "t-shirt" || path === "shorts" || path === "jeans" || path === "sweat shirt" || path === "bags" || path === "clothing" || path === "equipment"){
        conn.query("SELECT cat_id FROM categories WHERE cat_name=?", [path], function(err, result, fields){
            if(err) throw err;
            let id = result[0].cat_id;
            conn.query("SELECT * FROM product_categories INNER JOIN products ON (products.pro_id=product_categories.pro_id) WHERE cat_id=?", [id], function(err, result, fields){
                if(err) throw err;
                if(result.length <= 0){
                    res.json({
                        result: "ERROR"
                    });
                    return;
                }
                res.json({
                    data: result
                });
            });
        });
        return;
    }
    
    res.json({
        result: "ERROR"
    });
});

app.get("/products/:id",function(req, res){
    let id = parseInt(req.params.id);
    conn.query("SELECT * FROM products WHERE pro_id=?", [id], function(err, result, fields){
        if(err) throw err;
		
		let products = result;
		
		conn.query("SELECT * FROM categories INNER JOIN product_categories ON(product_categories.cat_id=categories.cat_id) WHERE product_categories.pro_id=?", [id], function(err, result, fields){
            if(err) throw err;
            res.json({
                products: products,
                categories: result
            });
        });
    });
});

app.post("/comment", function(req, res){
    let userId = req.body.userId;
    let productId = req.body.productId;
    let content = req.body.content
    let date = req.body.date
    if(!userId || !productId || !content || !date){
        res.json({
            result: "ERROR",
            message: "Error. Unable to comment!"
        });
        return;
    }
    
    conn.query(`INSERT INTO comments(com_text, com_date, pro_id, usr_id)
        VALUES('${content}', '${date}', ${productId}, ${userId})`);

    res.json({
        result: "OK"
    });
});

app.get("/comments/:id", function(req, res){
    let id = parseInt(req.params.id);
    conn.query("SELECT com_id, pro_id, com_text, com_date, usr_firstname, usr_surname FROM shop.comments INNER JOIN users ON (users.usr_id=comments.usr_id) WHERE pro_id=?", [id], 
        function(err, result, fields){
            if(err) throw err;
            res.json({
                data: result
            });
        });
});


app.post("/order", function(req, res){
    let userId = req.body.userId;
    let address = req.body.address;
    let ponumber = req.body.ponumber;
    let phonenumber = req.body.phonenumber;
    let place = req.body.place;

    if(!userId || !address || !ponumber || !phonenumber || !place){
        res.json({
            result: "ERROR",
            message: "Unable to place order."
        });
        return;
    }

    conn.query(`INSERT INTO orders(ord_date, usr_id, ord_address, ord_ponumber, ord_tel, ord_place)
        VALUES(NOW(), ${userId}, '${address}', '${ponumber}', '${phonenumber}', '${place}')`);

    

    conn.query("SELECT * FROM orders WHERE usr_id=? AND ord_address=? AND ord_ponumber=? AND ord_tel=? AND ord_place=?",
        [userId, address, ponumber, phonenumber, place], function(err, result, fields){
            if(err) throw err;
            if(result.length === 0){
                res.json({
                    result: "ERROR",
                });
                return;
            }
            
            res.json({
                result: "OK",
                data: result[0]
            });
        });
});

app.post("/order-items", function(req, res){
    let proId = req.body.proId;
    let ordId = req.body.ordId;
    let quantity = req.body.quantity;

    if(!proId || !ordId || !quantity){
        res.json({
            result: "ERROR",
            message: "Unable to place order."
        });
        return;
    }
	
	conn.query("SELECT * FROM products WHERE pro_id=?", [proId], function(err, result, fields){
		if(err) throw err;
		let price = result[0].pro_price;
		
		conn.query(`INSERT INTO order_items(pro_id, ord_id, ori_quantity, ori_price)
			VALUES(${proId}, ${ordId}, ${quantity}, ${price})`);
	});
	
    conn.query(`UPDATE products SET pro_amount=pro_amount-${quantity} where pro_id=?`, [proId], function(err, result, fields){
        if(err) throw err;
        console.log(result)
    })
    
});


app.get("/product-categories", function(req, res){
    conn.query("SELECT * FROM product_categories INNER JOIN categories ON (categories.cat_id=product_categories.cat_id)", function(err, result, fields){
        if(err) throw err;
        res.json({
            data: result
        });
    });
});

app.get("/product-categories/:id",function(req, res){
    let id = parseInt(req.params.id);
    conn.query("SELECT * FROM product_categories INNER JOIN categories ON (categories.cat_id=product_categories.cat_id) WHERE pro_id=?", [id], function(err, result, fields){
        if(err) throw err;
        res.json({
            data: result
        });
    });
});

//ADMIN
app.post("/delete-comment", function(req, res){
    let id = req.body.comId;
    if(!id){
        res.json({
            result: "ERROR",
            message: "It is not possible to delete the account."
        });
        return;
    }

    conn.query(`DELETE FROM comments WHERE com_id=?`, [id], function(err, result, fields){
        if(err) throw err;

    });
    res.json({
        result: "OK"
    });
});

app.get("/admin/orders", function(req, res){
    conn.query("SELECT ord_address, ord_date, ord_id, ord_place, ord_ponumber, ord_tel, usr_firstname, usr_surname FROM orders INNER JOIN users ON (users.usr_id=orders.usr_id)", function(err, result, fields){
        if(err) throw err;
		
		let orders = result;
		
		conn.query("SELECT * FROM order_items INNER JOIN products ON (order_items.pro_id=products.pro_id)", function(err, result, fields){
			if(err) throw err;
			res.json({
				orders: orders,
				ordItems: result
			});
		});
        
    });
});

app.get("/admin/orders/:id", function(req, res){
	let id = req.params.id;
	conn.query("SELECT * FROM order_items INNER JOIN products ON (order_items.pro_id=products.pro_id) WHERE ord_id=?", [id], function(err, result, fields){
		if(err) throw err;
		res.json({
			data: result
		});
	});	
});

app.post("/delete-order", function(req, res){
    let id = req.body.ordId;
    if(!id){
        res.json({
            result: "ERROR",
            message: "It is not possible to delete the account."
        });
        return;
    }

    conn.query(`DELETE FROM order_items WHERE ord_id=?`, [id], function(err, result, fields){
        if(err) throw err;
		conn.query(`DELETE FROM orders WHERE ord_id=?`, [id], function(err, result, fields){
			if(err) throw err;
			res.json({
				message: 'success'
			});
		});
    });
});

app.get("/admin/products", function(req, res){
    conn.query("SELECT * FROM products",
    function(err, result, fields){
        if(err) throw err;
        
        let products = result;

        conn.query("SELECT * FROM categories INNER JOIN product_categories ON(product_categories.cat_id=categories.cat_id)", function(err, result, fields){
            if(err) throw err;
            res.json({
                products: products,
                categories: result
            });
        });
    });
});

app.get("/admin/products/:id", function(req, res){
	let id = req.params.id;
	conn.query("SELECT * FROM categories INNER JOIN product_categories ON(product_categories.cat_id=categories.cat_id) WHERE pro_id=?", [id], function(err, result, fields){
		if(err) throw err;
		res.json({
			data: result
		});
	});
});


app.patch("/admin/products/:id", function(req, res){
    let id = parseInt(req.params.id);
    let name = req.body.name;
    let price = req.body.price;
    let amount = req.body.amount;
    let gender = req.body.gender;
    let imageName = req.body.imageName;
    let description = req.body.description;
	let categories = req.body.categories;
	
	if(!id || !name || !price || !amount || !gender || !imageName || !description || !categories){
		res.json({
			result: "ERROR",
			message: "All fields mus be filled."
		})
	}
	
    conn.query("UPDATE products SET pro_name=?, pro_price=?, pro_amount=?, pro_gender=?, pro_image=?, pro_description=? WHERE pro_id=?", [name, price, amount, gender, imageName, description, id], function(err, result, fields){
        if(err) throw err;
		conn.query("DELETE FROM product_categories WHERE pro_id=?", [id], function(err, result, fields){
			if(err) throw err;
		});
		for(let i=0; i<categories.length; i++){
			conn.query(`INSERT INTO product_categories (pro_id, cat_id) VALUES (${id}, ${categories[i].cat_id})`, function(err, result, fields){
				if(err) throw err;
			});
		}
		res.json({
            data: result
        })
    });
});

app.post("/admin/products", function(req, res){
    let name = req.body.name;
    let price = req.body.price;
    let amount = req.body.amount;
    let gender = req.body.gender;
    let imageName = req.body.imageName;
    let description = req.body.description;
	let categories = req.body.categories;
	
	if(!name || !price || !amount || !gender || !imageName || !description || !categories){
		res.json({
			result: "ERROR",
			message: "All fields mus be filled."
		})
	}
	
    conn.query(`INSERT INTO products (pro_name, pro_price, pro_amount, pro_gender, pro_image, pro_description) VALUES ('${name}', ${price}, ${amount}, '${gender}', '${imageName}', "${description}")`, function(err, result, fields){
        if(err) throw err;
		let proId = result.insertId;
		for(let i=0; i<categories.length; i++){
			conn.query(`INSERT INTO product_categories (pro_id, cat_id) VALUES (${proId}, ${categories[i].cat_id})`, function(err, result, fields){
				if(err) throw err;
			});
		}
		res.json({
			data: result
		})
    });
});

app.get("/admin/categories", function(req, res){
    conn.query("SELECT * FROM categories", function(err, result, fields){
        if(err) throw err;
        res.json({
            data: result
        });
    });
});

app.post("/admin/categories", function(req, res){
    let name = req.body.catName;
    conn.query(`INSERT INTO categories (cat_name) VALUES ('${name}')`, function(err, result, fields){
        if(err) throw err;
        res.json({
            data: result
        });
    });
});

app.patch("/admin/categories", function(req, res){
    let id = req.body.catId
    let name = req.body.catName
    conn.query("UPDATE categories SET cat_name=? WHERE cat_id=?", [name, id], function(err, result, fields){
        if(err) throw err;
        res.json({
            data: result
        });
    });
});

app.get("/admin/users", function(req, res){
    conn.query("SELECT usr_id, usr_firstname, usr_surname, usr_email, usr_level FROM users ORDER BY usr_level, usr_firstname, usr_surname", function(err, result, fields){
        if(err) throw err;
        res.json({
            data: result
        });
    });
});