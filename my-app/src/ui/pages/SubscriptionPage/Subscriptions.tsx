import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../organisms/Navbar';
import GlobalStyles from '../../atoms/GlobalStyles';
import Faq from '../../organisms/FAQ';
import {
  PageContainer,
  Container,
  Flex,
  FlexContent,
  H2,
  H4,
  Span,
  Ul,
  Li,
  DividerContainer,
  Divider
} from './Subscriptions.styles';

const faqData = [
  {
    question: 'What benefits do I get with a Pro subscription?',
    answer: 'With a Pro subscription, you get access to premium cars, priority customer support, the ability to earn loyalty points, and exclusive discounts. The yearly subscription offers additional benefits such as 2 months free and access to exclusive yearly member events.'
  },
  {
    question: 'How do loyalty points work?',
    answer: 'Loyalty points are earned on every rental. These points can be redeemed for discounts on future rentals or other exclusive benefits. The more you rent, the more points you accumulate.'
  },
  {
    question: 'Can I switch between monthly and yearly plans?',
    answer: 'Yes, you can switch between monthly and yearly plans at any time. The changes will take effect at the end of your current billing period.'
  },
  {
    question: 'What cars are available for rent?',
    answer: 'With a Free subscription, you can rent economy and standard cars. Pro subscribers can rent premium cars, including luxury and high-performance vehicles.'
  },
  {
    question: 'What happens if I need to cancel my subscription?',
    answer: 'You can cancel your subscription at any time. If you cancel, you will retain access to your current subscription benefits until the end of the billing period. No refunds will be provided for the remaining period.'
  },
];

type ButtonProps = {
  primary?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = styled.button<ButtonProps>`
  outline: none;
  border: 1px solid #0cdd32;
  background: ${(props) => (props.primary ? '#0cdd32' : 'transparent')};
  color: ${(props) => (props.primary ? 'white' : '#0cdd32')};
  width: 100%;
  height: 50px;
  border-radius: 5px;
  font-family: 'Nunito', sans-serif;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.primary ? 'white' : '#0cdd32')};
    color: ${(props) => (props.primary ? '#0cdd32' : 'white')};
  }
`;

const PricingTable = () => {
  const navigate = useNavigate();
  return (
    <>
      <GlobalStyles />
      <PageContainer>
      <Navbar />
      <Container>
        <Flex>
          <FlexContent>
            <H2>Free</H2>
            <H4>$0 / month</H4>
            <Span>Basic access to our rental services</Span>
            <Ul>
              <Li>Rent economy and standard cars</Li>
              <Li>No access to loyalty points</Li>
              <Li>Standard customer support</Li>
            </Ul>
            <Button onClick={() => navigate('/profile')}>
              Stay on Free
            </Button>
          </FlexContent>
          <FlexContent>
            <H2>Pro Monthly</H2>
            <H4>$19 / month</H4>
            <Span>Enhanced access with monthly billing</Span>
            <Ul>
              <Li>Rent premium cars</Li>
              <Li>Priority customer support</Li>
              <Li>Earn special loyalty points</Li>
              <Li>Exclusive discounts</Li>
            </Ul>
            <Button onClick={() => navigate('/payment')}>
              Try Monthly
            </Button>
          </FlexContent>
          <FlexContent>
            <H2>Pro Yearly</H2>
            <H4>$199 / year</H4>
            <Span>Best value with yearly billing</Span>
            <Ul>
              <Li>All Pro Monthly features</Li>
              <Li>2 months free (compared to monthly)</Li>
              <Li>Exclusive yearly member events</Li>
            </Ul>
            <Button onClick={() => navigate('/payment')}>
              Try Yearly
            </Button>
          </FlexContent>
        </Flex>
      </Container>
      <DividerContainer>
      <Divider>
        <span>FAQ</span>
      </Divider>
      </DividerContainer>
      <Faq
          headingText="F.A.Q"
          headingTitle="Frequently Asked Questions"
          headingSubtitle="Here are some of the most common questions our customers ask about our subscription plans."
          faqs={faqData}
          bgColor="#ffffff"
          iconBgColor="#0cdd32"
        />
      </PageContainer>
    </>
  );
};

export default PricingTable;
