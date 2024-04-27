import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 6rem;
`;

const HeadingContainer = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const HeadingText = styled.p`
  color: #6c757d;
  font-weight: 300;
  margin-bottom: 0;
`;

const HeadingTitle = styled.h2`
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

const HeadingSubtitle = styled.p`
  font-weight: 500;
  margin-bottom: 4rem;
`;

const AccordionContainer = styled.div`
  margin-top: 4rem;
`;

const AccordionItem = styled.div`
  border: none;
  margin-bottom: 2rem;
`;

const AccordionHeader = styled.h2`
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 0;
`;

const AccordionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  text-align: left;
  font-weight: 500;
  color: #212529;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e9ecef;
  }

  &:focus {
    outline: none;
  }
`;

const AccordionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
  background-color: #007bff;
  color: #fff;
  font-size: 1.5rem;
  border-radius: 50%;
`;

const AccordionBody = styled.div`
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-top: none;
  border-radius: 0 0 0.5rem 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  text-align: left;
  font-weight: 400;
  color: #212529;
`;

const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleAccordionClick = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <Container>
      <HeadingContainer>
        <HeadingText>F.A.Q</HeadingText>
        <HeadingTitle>Frequently Asked Questions</HeadingTitle>
        <HeadingSubtitle>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit Consequatur
          quidem eius cum voluptatum quasi delectus.
        </HeadingSubtitle>
      </HeadingContainer>
      <AccordionContainer>
        <AccordionItem>
          <AccordionHeader>
            <AccordionButton onClick={() => handleAccordionClick(0)}>
              <AccordionIcon>1</AccordionIcon>
              <span>Lorem ipsum dolor sit amet adipisicing ?</span>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className={`bi bi-chevron-down ${activeIndex === 0 ? 'rotate-180' : ''}`}
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </AccordionButton>
          </AccordionHeader>
          {activeIndex === 0 && (
          <AccordionBody>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime quos
            voluptatum at, quibusdam blanditiis saepe soluta laborum,
            repellendus nemo id porro dolor eveniet perspiciatis veritatis
            doloremque aliquam nam! Libero, nostrum!
          </AccordionBody>
          )}
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader>
            <AccordionButton onClick={() => handleAccordionClick(1)}>
              <AccordionIcon>2</AccordionIcon>
              <span>Lorem ipsum dolor sit amet adipisicing ?</span>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className={`bi bi-chevron-down ${activeIndex === 1 ? 'rotate-180' : ''}`}
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </AccordionButton>
          </AccordionHeader>
          {activeIndex === 1 && (
          <AccordionBody>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime quos
            voluptatum at, quibusdam blanditiis saepe soluta laborum,
            repellendus nemo id porro dolor eveniet perspiciatis veritatis
            doloremque aliquam nam! Libero, nostrum!
          </AccordionBody>
          )}
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader>
            <AccordionButton onClick={() => handleAccordionClick(2)}>
              <AccordionIcon>3</AccordionIcon>
              <span>Lorem ipsum dolor sit amet adipisicing ?</span>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 1616"
                className={`bi bi-chevron-down ${activeIndex === 2 ? 'rotate-180' : ''}`}
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </AccordionButton>
          </AccordionHeader>
          {activeIndex === 2 && (
          <AccordionBody>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime quos
            voluptatum at, quibusdam blanditiis saepe soluta laborum,
            repellendus nemo id porro dolor eveniet perspiciatis veritatis
            doloremque aliquam nam! Libero, nostrum!
          </AccordionBody>
          )}
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader>
            <AccordionButton onClick={() => handleAccordionClick(3)}>
              <AccordionIcon>4</AccordionIcon>
              <span>Lorem ipsum dolor sit amet adipisicing ?</span>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className={`bi bi-chevron-down ${activeIndex === 3 ? 'rotate-180' : ''}`}
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </AccordionButton>
          </AccordionHeader>
          {activeIndex === 3 && (
          <AccordionBody>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime quos
            voluptatum at, quibusdam blanditiis saepe soluta laborum,
            repellendus nemo id porro dolor eveniet perspiciatis veritatis
            doloremque aliquam nam! Libero, nostrum!
          </AccordionBody>
          )}
        </AccordionItem>
      </AccordionContainer>
    </Container>
  );
};

export default Faq;