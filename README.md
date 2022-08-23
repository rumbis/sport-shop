# sportshop

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

Using technology
Frontend:
•Java Script (framework Vue)
•HTML
•CSS.

Backend:
•NodeJS

Base:
•MySQL
The focus is on the frontend. The backend is as hollow as Swiss cheese. It serves only for communication with the base.
For images in the database, I put only the name of the image and then set the path from the front. I didn't put in the binary since I haven't really researched it.
About project (sport shop)
There are 3 types of users on the site:
1. Guest
2. Logged in user
3. Admin
- When the user enters the login data, he can click to remember his login. Then it is placed in local storage. A those who do not click will be placed in session storage.
Guest:
- does not have any possibility except to view products, read comments and view other available pages on the site.
- If he tries to leave a comment or add a product to the cart, a message will be written in red letters

User logged in:
• Can add products to the basket and order them
• Can add comments on products

Admin:
• All characteristics of the logged-in user
• Can delete comments
• Can see all products, change them and add new ones
• Can add new categories and modify them
• Can see all orders and delete them
• Can see all registered users
Home page
From the home page, we can open the shop section for a specific type:
Man
Women
Unisex
Shoes
Clothing
Equipment
Football
Running
Shop page
• Products are rendered on this page.
• Clicking on a specific product opens the page about the clicked product.
• If a product is currently out of stock, the image will be paler and there will be a red crossed out circle in the corner and it will not be long target to add to the basket, a message will be printed that there are currently no products.

Product page
• On this page we have a toggle for preview description.
• From this page, we add the product to the basket (if the user is logged in).
• On this page comments for the product are left and displayed (also if the user is logged in), and if the field for comment is empty and trying to add a comment will  print an error to enter some text.
• Even if the admin is logged in on this page, he can delete comments.
• If the user is not logged in and tries to add a product to the cart, an error will be displayed.
• Likewise if he tries to enter a comment
About
• There is no functionality on this page. Just a picture and lorem text.

Contact
• Clicking on E-mail opens the e-mail for sending
• Clicking on Call Us pops up a pop-up to select an application for a title
• Google map is embedded

Cart
• If the user is not logged in or the basket is empty, a cart image will be displayed with the inscription that the basket is empty
• If the user is logged in and has something in the basket, all added products will be displayed.
• The quantity of products can be reduced or increased (min: 1, max: how many pieces are in stock)
• The product can be deleted from the basket
• Total items and total price are calculated.
• Clicking on checkout opens a form for filling in information about the shipment (name, surname, address, place, postal number, phone number).
Form validation

1. All fields must be filled
2. The postal code must have 5 characters and must be a number
3. The mobile number has validation for a phone number ('^[0-9]{5}$')

If the field is not valid, the border will turn red.

• If the order is confirmed, the product quantity is updated.

Admin
• On this page are the paths to all the admin features listed above.
• If someone who is not an admin tries to enter /admin in the path, which targets the admin page, they will be sent to the home page (/)
• Also there is validation for all forms and entries. If one is not correct it will turn red.

Registration

• Form for creating an account.
• All fields must be filled
• Email has email validation and if the entered email matches the existing one, an error will be printed.
• Password must have at least 8 characters
• The repeated password must match the password.
Log in

• If the data does not match, an error will be printed.
• When the user is logged in, it shows a thumbnail, his first and last name and a logout button.
