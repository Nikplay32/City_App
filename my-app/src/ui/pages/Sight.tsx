// Sight.tsx
import React from 'react';
import styled from 'styled-components';

// Define SightProps interface
interface SightProps {
  name: string;
  description: string;
  image: string;
  // Add more properties as needed
}

// Styled components for sight card
const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const SightImage = styled.img`
  max-width: 100%;
  border-radius: 8px;
`;

// Sight component
const Sight: React.FC<SightProps> = ({ name, description, image }) => {
  return (
    <Card>
      <SightImage src={image} alt={name} />
      <h2>{name}</h2>
      <p>{description}</p>
      {/* Add more sight details here */}
    </Card>
  );
};

export default Sight;
