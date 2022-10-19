 //PAGE 1
# list of category
https://carwale.herokuapp.com/categories

//PAGE 2
# all cars
https://carwale.herokuapp.com/allcars
# car wrt category
https://carwale.herokuapp.com/catcars?categoryId=1
# car wrt to brand id <Done>
https://carwale.herokuapp.com/allcars?brand=1
# car wrt brand id  lprice hprice <Done>
https://carwale.herokuapp.com/filter/1?lprice=200000&hprice=8000000

# car with brandId wrt category price
https://carwale.herokuapp.com/filter/11?category=Sedan%20Car&lprice=110000&hprice=32490000
# car wrt category and brand id
https://carwale.herokuapp.com/filtercat/1?brandId=1


# car also (wrt category) and brandid and lprice and hprice with sort
https://carwale.herokuapp.com/filtercat/4?brandId=7&lprice=100000&hprice=2000000&sort=-1

// PAGE 3

# Details of car
https://carwale.herokuapp.com/details/4.8


// PAGE 4
  
# Place Order (post)
https://carwale.herokuapp.com/placeOrder?aa@gmail.com
  

// PAGE 5

# List of Order
https://carwale.herokuapp.com/orders

# List of Order wrt to email
https://carwale.herokuapp.com/orders?aa@gmail.com
# Update Order
https://carwale.herokuapp.com/updateOrder/11{
    "Bank_name":"sbi",
    "date":"2/11/22",
    "status":"recived"
}
# Delete Order (Delete)
https://carwale.herokuapp.com/deleteOrder/634f027f30667edf1a327052
