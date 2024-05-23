import React, { useState } from 'react';
import styled from 'styled-components';

interface FaqProps {
  headingText: string;
  headingTitle: string;
  headingSubtitle: string;
  faqs: { question: string; answer: string }[];
  bgColor?: string;
  headingTextColor?: string;
  headingTitleColor?: string;
  headingSubtitleColor?: string;
  itemBgColor?: string;
  itemTextColor?: string;
  itemHoverBgColor?: string;
  iconBgColor?: string;
  iconColor?: string;
}

const Container = styled.div<{ bgColor?: string }>`
  padding: 4rem 2rem;
  background-color: ${(props) => props.bgColor || '#f0f4f8'};
  color: #333;
  font-family: 'Nunito', sans-serif;
`;

const HeadingContainer = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const HeadingText = styled.p<{ color?: string }>`
  color: ${(props) => props.color || '#6c757d'};
  font-weight: 300;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const HeadingTitle = styled.h2<{ color?: string }>`
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
  color: ${(props) => props.color || '#2c3e50'};
`;

const HeadingSubtitle = styled.p<{ color?: string }>`
  font-weight: 500;
  font-size: 1.1rem;
  color: ${(props) => props.color || '#7f8c8d'};
  margin-bottom: 2rem;
`;

const AccordionContainer = styled.div`
  margin-top: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const AccordionItem = styled.div<{ bgColor?: string; textColor?: string }>`
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  background-color: ${(props) => props.bgColor || '#fff'};
  color: ${(props) => props.textColor || '#333'};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const AccordionHeader = styled.h2`
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 0;
`;

const AccordionButton = styled.button<{ hoverBgColor?: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  border: none;
  border-radius: 8px 8px 0 0;
  text-align: left;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: ${(props) => props.hoverBgColor || '#e9ecef'};
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: none;
    background-color: ${(props) => props.hoverBgColor || '#e9ecef'};
  }
`;

const AccordionIcon = styled.div<{ bgColor?: string; color?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
  background-color: ${(props) => props.bgColor || '#007bff'};
  color: ${(props) => props.color || '#fff'};
  font-size: 1.2rem;
  border-radius: 50%;
`;

const AccordionBody = styled.div`
  padding: 1.5rem 2rem;
  background-color: #fff;
  border-top: 1px solid #e1e8ed;
  border-radius: 0 0 8px 8px;
  text-align: left;
  font-weight: 400;
  color: #333;
  line-height: 1.6;
`;

const Faq: React.FC<FaqProps> = ({
  headingText,
  headingTitle,
  headingSubtitle,
  faqs,
  bgColor,
  headingTextColor,
  headingTitleColor,
  headingSubtitleColor,
  itemBgColor,
  itemTextColor,
  itemHoverBgColor,
  iconBgColor,
  iconColor,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleAccordionClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Container bgColor={bgColor}>
      <HeadingContainer>
        <HeadingText color={headingTextColor}>{headingText}</HeadingText>
        <HeadingTitle color={headingTitleColor}>{headingTitle}</HeadingTitle>
        <HeadingSubtitle color={headingSubtitleColor}>{headingSubtitle}</HeadingSubtitle>
      </HeadingContainer>
      <AccordionContainer>
        {faqs.map((faq, index) => (
          <AccordionItem key={index} bgColor={itemBgColor} textColor={itemTextColor}>
            <AccordionHeader>
              <AccordionButton onClick={() => handleAccordionClick(index)} hoverBgColor={itemHoverBgColor}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <AccordionIcon bgColor={iconBgColor} color={iconColor}>{index + 1}</AccordionIcon>
                  <span>{faq.question}</span>
                </div>
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  className={`bi bi-chevron-down ${activeIndex === index ? 'rotate-180' : ''}`}
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
            {activeIndex === index && (
              <AccordionBody>
                {faq.answer}
              </AccordionBody>
            )}
          </AccordionItem>
        ))}
      </AccordionContainer>
    </Container>
  );
};

export default Faq;
