This Quick-Quote is a mini verion of e-commerce app. This is designed for the users who already familiar with the products really well. It help the users place new orders, manage existing orders, and analyze purchases easily.

## Demo

You can visit this deployed site to check out the app: <br>https://ollert-b16a7.firebaseapp.com/login

## Installation

- Clone down this repo and ``` npm install ```
- Under src dictory, open up constants.js.example
- Fill in your firebase configuration info and Google API key
```const constants = {
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
  },
    googleMap: {
    apiKey: '',
  },
};
```
- Save the file and rename the file as constants.js

- Import company.json and product.json into your firbase database

## Usage

![Login Page](https://raw.githubusercontent.com/jeffreychen2016/capstone-quickquote/master/imgs/1.PNG)

Type in test credential to sign in:<br>
username: test@test.com<br>
password: 123456

![MyOrder Page, Estimates](https://raw.githubusercontent.com/jeffreychen2016/capstone-quickquote/master/imgs/2.PNG)

Once logged in, you will be directed to My Order page where you can see all of your estimates and sales orders.<br>

In My Estimates, you can delete exsiting estimates, view the estimates, and change the estimate to sales order

![MyOrder Page, Orders](https://raw.githubusercontent.com/jeffreychen2016/capstone-quickquote/master/imgs/3.PNG)

In My Orders, you only have option to view the order detail

![Order Detail, Estimates](https://raw.githubusercontent.com/jeffreychen2016/capstone-quickquote/master/imgs/4.PNG)

When click on "view" button in an estimate, you can see the details about the estmiate. You will be able to change shipping info, item, and quantity in the estimate.

![Order Detail, Orders](https://raw.githubusercontent.com/jeffreychen2016/capstone-quickquote/master/imgs/5.PNG)

When click on "view" button in an order, you can see the details about the order. However, you will not be able to modify the order.

![Order Form](https://raw.githubusercontent.com/jeffreychen2016/capstone-quickquote/master/imgs/screencapture-localhost-3000-orderform-2018-08-17-20_57_52.png)

When you click on the Order Form in the Navbar, you will be redirected to the Order Form page

![Buyer Profile](https://raw.githubusercontent.com/jeffreychen2016/capstone-quickquote/master/imgs/6.PNG)

Order By field will be auto populated based on the company.json you imported to the firebase. For shipping adress, you have option to either manually type it in or you can check the "Same as above" checkbox if the shipping address is same as the order by address.

![Order Table](https://raw.githubusercontent.com/jeffreychen2016/capstone-quickquote/master/imgs/7.PNG)

You can place order using the order table. If you do not like the entry you put in, you can delete the entry by clicking on the delete button. If you need more rows, you can click on the "+" button on the last row.<br>

Once you finish the order form, you can save the form either as estimste or sales orders.

![Chart](https://raw.githubusercontent.com/jeffreychen2016/capstone-quickquote/master/imgs/10.PNG)

When click on the Reports in the Navbar, you will be redirected to the Report page. You can pick whatever report you want to run (currently only had one report built) from the Report List.

## Authors
[Jeffrey Chen](https://github.com/jeffreychen2016)