root
├── backend
│   ├── controllers--authController.js, cartController.js, orderController.js, paymentController.js, productController.js, reviewController.js
│   ├── middleware -- auth.js , imageUpload.js
│   ├── models -- Cart.js, Order.js, productModel.js, Review.js, User.js
│   ├── routes -- authRoutes.js, cartRoutes.js, orderRoutes.js, paymentRoutes.js, productRoutes.js, reviewRoutes.js
│   ├── utils -- queryBuilder.js
│   └── server.js
├── node_modules
├── src
│   ├── assets
│   │   ├── images -- javascript.svg, vite.svg
│   │   └── styles -- styles.css
│   ├── components
│   │   └── Counter.jsx, AdminRoute.jsx, Navbar.jsx, ProtectedRoute.jsx , OrderList.jsx , BilliForm.jsx, CartSummary.jsx, PaymentForm.jsx,ProductCard.jsx,ProductList.jsx

│   ├── context -- AuthContext.jsx, CartConextx.jsx
│   ├── pages
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx, Register.jsx
│   │   ├── Profile.jsx
│   │   └── Register.jsx, StripePayment.jsx , OrderDetails.jsx, Cart.Jsx
        
│   ├── services -- AuthService.jsx, OrderServivce.jsx, PaymentService.jsx
│   ├── utils -- TokenHelper.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── routes.jsx
│   
├── .env
├── .gitignore
├── index.html
├── vite.config.js
├── package.json, package-lock.json
└── README.md
