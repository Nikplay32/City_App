import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Navbar from '../organisms/Navbar';
import GlobalStyles from '../atoms/GlobalStyles';
import Faq from '../organisms/FAQ';

const PageContainer = styled.div`
  background: seashell;
  min-height: 100vh;
`;

const Container = styled.div`
  background-color: #24141c;
  color: #cccccc;
  font-family: 'Nunito', sans-serif;
  width: 80%;
  border-radius: 10px;
  padding: 4%;
  margin: 5% auto 0;
  background-image: url('/riga.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-around;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;

const FlexContent = styled.div`
  padding: 5% 5%;
  flex: 1;
  background: rgba(36, 20, 28, 0.85);
  border-radius: 10px;
  margin: 10px;
  color: #fff;
`;

const H2 = styled.h2`
  font-weight: 600;
  margin-bottom: 10px;
`;

const H4 = styled.h4`
  font-weight: 400;
  margin: 5px 0 20px;
`;

const Span = styled.span`
  font-weight: 200;
  display: block;
  margin-bottom: 20px;
`;

const Ul = styled.ul`
  padding-inline-start: 7%;
  margin: 20% 0;
  list-style: none;
`;

const Li = styled.li`
  font-weight: 200;
  margin-bottom: 10px;
  &:before {
    content: "✓";
    color: #0cdd32;
    margin-right: 10px;
  }
`;
const DividerContainer = styled.div`

`;

const Divider = styled.div`
  margin: 5% auto;
  width: 100%;
  text-align: center;
  position: relative;

  &:before, &:after {
    content: '';
    position: absolute;
    top: 50%;
    width: 40%;
    height: 2px;
    background-color: #0cdd32;
  }

  &:before {
    left: 0;
  }

  &:after {
    right: 0;
  }

  span {
    display: inline-block;
    padding: 0 10px;
    color: #0cdd32;
    font-size: 1.5rem;
    font-weight: 600;
  }
`;


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
