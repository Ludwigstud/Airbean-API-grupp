
-- MVC✅
//Enbart gå att lägga till produkter som finns i menyn, annars felmeddelande
//All input som skickas med i body ska valideras, rätt produkt (ÄVEN PRIS)
//När ett konto skapas ska det tilldelas slumpat användarid
//Kunna hämta användarhistorik genom ID 
//AnvändarID ska inte skickas med i url när historik hämtas



{
    "userId": "1e4d1190-20d0-4965-b808-919532e7efaf",
    "items": [
        {
            "_id": 1,
            "title": "Bryggkaffe",
            "category": "beverage",
            "price": 49 
        }

    ]
} 


http://localhost:8000/api/users
http://localhost:8000/api/menu
http://localhost:8000/api/orders
http://localhost:8000/api/orders/user