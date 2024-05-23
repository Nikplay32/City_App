import React from 'react';
import styled from 'styled-components';
import Navbar from '../organisms/Navbar';
import GlobalStyles from '../atoms/GlobalStyles';
import Hero from '../organisms/Hero';


const restaurantsData = [
    {
      "name": "Max Cekot Kitchen",
      "description": "Contemporary cuisine, original ideas and advantages of small details - the restaurant “Max Chekot Kitchen” combines them all...",
      "imageSrc": "max-cekot-kitchen.jpg"
    },
    {
      "name": "Nomad",
      "description": "Restaurant “Nomad” invites you on a unique gastronomical journey through Pan-Asian cuisine - exploring Japanese, Thai, Vietnamese and Chinese traditional dishes, as well as a bouquet of flavours from Argentina, Peru and America...",
      "imageSrc": "nomad.jpg"
    },
    {
      "name": "TAILS",
      "description": "TAILS is a new concept fish restaurant on the gastronomic map of Riga. The premises are arranged in two areas: the classic restaurant hall and the Raw Bar counter opposite the open kitchen, where guests can watch the cooking process...",
      "imageSrc": "tails.jpg"
    },
    {
      "name": "The three chefs restaurant",
      "description": "The three chefs restaurant „Tam labam būs augt” is an open-kitchen restaurant, which is loved by both residents of Riga and guests of the city...",
      "imageSrc": "three-chefs.jpg"
    },
    {
      "name": "Chef’s Corner",
      "description": "The top-notch restaurant, which is among the 30 best new restaurants in Europe - is “Chef’s Corner”. It is located in the midst of all the beautiful Art Nouveau buildings in the Quiet centre...",
      "imageSrc": "chefs-corner.jpg"
    },
    {
      "name": "JOHN",
      "description": "Experience exquisite flavours in a relaxed atmosphere in the restaurant “JOHN”. Head Chef Kristaps Sīlis creates a menu that is always changing and adapting to the seasons...",
      "imageSrc": "john.jpg"
    },
    {
      "name": "Entresol",
      "description": "One of the most accomplished head chefs in Latvia is Raimonds Zommers, therefore we recommend trying a menu based on Latvian values in the restaurant “Entresol”...",
      "imageSrc": "entresol.jpg"
    },
    {
      "name": "Fabrikas restorāns",
      "description": "“Fabrikas restorāns” is located in the quiet and peaceful area of Kipsala, right on the shore of the River Daugava - with a superb view of the old town...",
      "imageSrc": "fabrikas.jpg"
    },
    {
      "name": "Osta",
      "description": "Restaurant with a view - it is the restaurant “Osta”. When visiting this restaurant, it is possible to experience magical moments watching the boats and yachts pass by as you tuck into an unrushed and unhurried meal...",
      "imageSrc": "osta.jpg"
    },
    {
      "name": "Riviera",
      "description": "A Mediterranean cuisine restaurant in Riga - it is the restaurant “Riviera”! On this restaurant’s menu you will find flavours from Italy, Spain, France and Greece...",
      "imageSrc": "riviera.jpg"
    },
    {
      "name": "Barents",
      "description": "Restaurant ”Barents” is proud of its northern origins, therefore guests are offered an opportunity to get to know and enjoy the freshest and highest quality local produce...",
      "imageSrc": "barents.jpg"
    }
  ]
  

const RestaurantCard = styled.div`
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const RestaurantName = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
`;

const RestaurantDescription = styled.p`
  font-size: 16px;
  color: #666;
`;

const RestaurantImage = styled.img`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Define the main component to display all restaurants
const BestRestaurantsInRiga: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Hero title="Best Restaurants in Riga" description="A culinary journey through Riga's finest dining experiences." text=""/>
      <div>
        {restaurantsData.map((restaurant, index) => (
          <RestaurantCard key={index}>
            <RestaurantName>{restaurant.name}</RestaurantName>
            <RestaurantImage src={restaurant.imageSrc} alt={restaurant.name} />
            <RestaurantDescription>{restaurant.description}</RestaurantDescription>
          </RestaurantCard>
        ))}
      </div>
    </>
  );
};

export default BestRestaurantsInRiga;
