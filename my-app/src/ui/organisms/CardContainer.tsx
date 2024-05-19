import React, { useState } from 'react';
import { Button, Expiry, VisaChip, NFCIcon, BankLogo, Form, InputContainer, InputIcon, Input, CardIssuerInfo, CardBrandLogo, CardholderAgreementInfo, CardHolder, CardNumber, CardContainer, Card, CardFace, CardChip, BankName, FrontFace, BackFace, MagneticStripe, MagneticStripeText, SecurityFeatures, SignatureStrip, CVV, CVVLabel } from '../pages/Payments/Payment.styles'

type PaymentMethod = {
  value: string;
  label: string;
  logo: string;
  bankName: string;
};

interface CardContainerProps {
	paymentMethod: PaymentMethod;
	cardNumber: string;
	cardHolderName: string;
	expiry: string;
	cvv: string;
	children?: React.ReactNode; // Add this line
}

const CardContainerOrganism: React.FC<CardContainerProps> = ({ paymentMethod, cardNumber, cardHolderName, expiry, cvv }) => {
	const [isFlipped, setIsFlipped] = useState(false);

	const flipCard = () => {
		setIsFlipped(!isFlipped);
	};

	return (
		<CardContainer>
			<Card onClick={flipCard} style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
				<FrontFace cardtype={paymentMethod.value}>
					<BankName src={paymentMethod.bankName} />
					<CardChip src="https://cdn-icons-png.freepik.com/512/6404/6404100.png" alt="Card Chip" />
					<NFCIcon src="https://icons.veryicon.com/png/o/object/material-design-icons-1/nfc-2.png" alt="NFC Icon" />
					<CardNumber>{cardNumber || '0000 0000 0000 0000'}</CardNumber>
					<CardHolder>{cardHolderName}</CardHolder>
					<Expiry>{expiry || 'MM/YY'}</Expiry>
					<BankLogo src={paymentMethod.logo} alt="Bank Logo" />
				</FrontFace>
				<BackFace cardtype={paymentMethod.value}>
					<MagneticStripeText>This is the magnetic stripe text. This is the magnetic stripe.</MagneticStripeText>
					<MagneticStripe />
					<SignatureStrip>
						<CVVLabel>CVV</CVVLabel>
						<CVV>{cvv || '###'}</CVV>
					</SignatureStrip>
					<CardIssuerInfo>Issuer Info</CardIssuerInfo>
					<SecurityFeatures>Security Features</SecurityFeatures>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<CardBrandLogo>
							<img src="https://icon-library.com/images/credit-icon/credit-icon-7.jpg" alt="Visa Logo" />
						</CardBrandLogo>
						<CardholderAgreementInfo>Cardholder Agreement Info</CardholderAgreementInfo>
					</div>
				</BackFace>
			</Card>
		</CardContainer>
	)
}

export default CardContainerOrganism;