 //PAGE 1
# list of category
http://localhost:4360/categories

//PAGE 2
# all cars
http://localhost:4360/allcars
# car wrt category
http://localhost:4360/catcars?categoryId=1
# car wrt to brand id <Done>
http://localhost:4360/allcars?brand=1
# car wrt brand id  lprice hprice <Done>
http://localhost:4360/filter/1?lprice=200000&hprice=8000000

# car with brandId wrt category price
http://localhost:4360/filter/11?category=Sedan%20Car&lprice=110000&hprice=32490000
# car wrt category and brand id
http://localhost:4360/filtercat/1?brandId=1


# car also (wrt category) and brandid and lprice and hprice with sort
http://localhost:4360/filtercat/4?brandId=7&lprice=100000&hprice=2000000&sort=-1

// PAGE 3

# Details of car
http://localhost:4360/details/4.8


// PAGE 4
  
# Place Order (post)
http://localhost:4360/placeOrder?aa@gmail.com
  

// PAGE 5

# List of Order
http://localhost:4360/orders

# List of Order wrt to email
http://localhost:4360/orders?aa@gmail.com
# Update Order
http://localhost:4360/updateOrder/11{
    "Bank_name":"sbi",
    "date":"2/11/22",
    "status":"recived"
}
# Delete Order (Delete)
http://localhost:4360/deleteOrder/634f027f30667edf1a327052
