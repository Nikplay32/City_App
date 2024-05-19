// SightsPage.tsx
import React from 'react';
import styled, { keyframes } from 'styled-components';
import Navbar from '../organisms/Navbar';
import GlobalStyles from '../atoms/GlobalStyles';

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;
// Sample data for demonstration
const sightsData = [
  {
    name: 'Old Town',
    description: 'Historic center of Riga with charming cobblestone streets.',
    image: 'old_town.jpg',
    location: 'Old Town, Riga',
    openingHours: 'Open 24/7',
    admission: 'Free',
  },
  {
    name: 'Freedom Monument',
    description: 'Iconic monument symbolizing Latvia’s freedom and independence.',
    image: 'freedom_monument.jpg',
    location: 'Brīvības iela, Riga',
    openingHours: 'Open 24/7',
    admission: 'Free',
  },
  // Add more sight data as needed
];

// Styled components
// Styled components
const Container = styled.div`
  padding: 50px;
  background: linear-gradient(45deg, #f9f9f9, #e0e0e0);
  min-height: 100vh;
`;

const Heading = styled.h1`
  font-size: 48px;
  color: #2C3E50;
  text-align: center;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  animation: ${pulse} 2s infinite;
`;

const Description = styled.p`
  font-size: 18px;
  color: #666;
  text-align: center;
  margin-bottom: 50px;
  animation: ${pulse} 2s infinite;
`;

const FeaturedSection = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 50px;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const FeaturedHeading = styled.h2`
  font-size: 36px;
  color: #2C3E50;
  margin-bottom: 20px;
`;

const FeaturedDescription = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 30px;
`;

const BlogPostImage = styled.img`
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const BlogPostTitle = styled.h2`
  font-size: 24px;
  color: #2C3E50;
  margin-bottom: 10px;
`;

const BlogPostContent = styled.p`
  font-size: 16px;
  color: #666;
`;

const AttractionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const BlogPostContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const BlogPost = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;


// SightsPage component
const SightsPage: React.FC = () => {
  return (
    <>
    <Navbar></Navbar>
    <GlobalStyles></GlobalStyles>
    <Container>
      <Heading>Welcome to Riga</Heading>
      <Description>Discover the enchanting beauty and vibrant culture of Latvia's capital city.</Description>

      <FeaturedSection>
        <FeaturedHeading>Experience Riga's Vibrant Culture</FeaturedHeading>
        <FeaturedDescription>Immerse yourself in the lively atmosphere of Riga's streets filled with charming cafes, art galleries, and music venues. Explore the local art scene, attend a live performance, or simply wander through the picturesque alleys of the Old Town.</FeaturedDescription>
      </FeaturedSection>

      <FeaturedSection>
        <FeaturedHeading>Indulge in Culinary Delights</FeaturedHeading>
        <FeaturedDescription>Sample the flavors of Latvia with a culinary journey through Riga's diverse gastronomic scene. From traditional dishes like rye bread and smoked fish to modern fusion cuisine, there's something to tantalize every palate. Don't miss the chance to dine at one of Riga's renowned restaurants or cozy bistros.</FeaturedDescription>
      </FeaturedSection>

      <FeaturedSection>
        <FeaturedHeading>Explore Nature's Beauty</FeaturedHeading>
        <FeaturedDescription>Escape the hustle and bustle of the city and discover the natural beauty surrounding Riga. Take a leisurely stroll through lush parks, explore tranquil forests, or enjoy a scenic boat ride along the Daugava River. With its abundance of green spaces and breathtaking landscapes, Riga offers endless opportunities for outdoor adventure and relaxation.</FeaturedDescription>
      </FeaturedSection>

      <AttractionsContainer>
        {/* Add more attractions or activities here */}
        <div>
          <img src="attraction1.jpg" alt="Attraction 1" />
          <h3>Art Nouveau Architecture</h3>
          <p>Explore the stunning Art Nouveau buildings that line the streets of Riga, showcasing intricate facades and elaborate decorations.</p>
        </div>
        <div>
          <img src="attraction2.jpg" alt="Attraction 2" />
          <h3>Riga Central Market</h3>
          <p>Experience the vibrant atmosphere of Riga Central Market, one of the largest and oldest markets in Europe, offering a wide range of local produce, crafts, and street food.</p>
        </div>
        {/* Add more attractions as needed */}
      </AttractionsContainer>

      <BlogPostContainer>
        <BlogPost>
          <BlogPostImage src="blog_post1.jpg" alt="Blog Post 1" />
          <BlogPostTitle>Hidden Gems of Riga</BlogPostTitle>
          <BlogPostContent>Discover the lesser-known attractions and hidden gems tucked away in the corners of Riga, waiting to be explored by intrepid travelers.</BlogPostContent>
        </BlogPost>
        <BlogPost>
          <BlogPostImage src="blog_post2.jpg" alt="Blog Post 2" />
          <BlogPostTitle>A Taste of Riga: Food Tour</BlogPostTitle>
          <BlogPostContent>Embark on a culinary adventure through Riga's vibrant food scene, sampling local delicacies and culinary delights at some of the city's best eateries.</BlogPostContent>
        </BlogPost>
        {/* Add more blog posts as needed */}
      </BlogPostContainer>
    </Container>
    </>
  );
};

export default SightsPage;
