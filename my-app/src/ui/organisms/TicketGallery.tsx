import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface TicketOption {
	value: string;
	label: string;
	description: string;
	benefits: string[];
	usage: string[];
}

const ticketOptions: TicketOption[] = [
	{
		value: 'day',
		label: 'Day Ticket',
		description: 'The Day Ticket offers unlimited travel across the public transport network for an entire day, providing a hassle-free and economical option for frequent travelers, tourists, and commuters.',
		"benefits": [
			"Time-Saving: Avoid daily ticket purchases.",
			"Cost-Effective: Significant savings for regular travelers.",
			"Environmental Impact: Promotes the use of public transport, reducing carbon footprint.",
			"Stress-Free Travel: Simplifies commuting for regular users.",
			"Enhanced Mobility: Provides the freedom to travel without worrying about daily ticket costs."
		],
		"usage": [
			"Purchase: Obtain the month ticket from a sales point.",
			"Validation: Validate the ticket if required before the first journey.",
			"Travel: Enjoy unlimited travel across the network for the month.",
			"Keep Handy: Have the ticket accessible for inspections."
		],
	},
	{
		value: 'hour',
		label: 'Hour Ticket',
		description: 'The Hour Ticket offers unlimited travel within the public transport network for one hour, perfect for short trips or quick errands.',
		benefits: [
			"Time-Saving: Avoid multiple ticket purchases for short trips.",
			"Cost-Effective: Save money on quick journeys.",
			"Environmental Impact: Encourages use of public transport for short trips, reducing carbon footprint.",
			"Stress-Free Travel: Simplifies short-distance travel plans.",
			"Enhanced Mobility: Provides the freedom to make quick trips without worrying about multiple ticket costs."
		],
		usage: [
			"Purchase: Obtain the hour ticket from a sales point.",
			"Validation: Validate the ticket at the start of the journey.",
			"Travel: Enjoy unlimited travel within the network for one hour.",
			"Keep Handy: Have the ticket accessible for inspections."
		],
	},
	{
		value: 'month',
		label: 'Month Ticket',
		description: "The Month Ticket provides unlimited travel across the public transport network for a full month, offering a cost-effective solution for regular commuters and frequent travelers.",
		benefits: [
			"Time-Saving: Avoid daily ticket purchases.",
			"Cost-Effective: Significant savings for regular travelers.",
			"Environmental Impact: Promotes the use of public transport, reducing carbon footprint.",
			"Stress-Free Travel: Simplifies commuting for regular users.",
			"Enhanced Mobility: Provides the freedom to travel without worrying about daily ticket costs."
		],
		usage: [
			"Purchase: Obtain the month ticket from a sales point.",
			"Validation: Validate the ticket if required before the first journey.",
			"Travel: Enjoy unlimited travel across the network for the month.",
			"Keep Handy: Have the ticket accessible for inspections."
		],
	},
	// add more ticket options here
];


export const GuideForm = styled.form`
  max-width: 800px;
  width: 100%;
  margin-right: 20px;
  font-family: 'Nunito', sans-serif;
  margin: 0 auto;
  padding: 2rem;
  padding-left: 3rem; // increase left padding
  padding-right: 3rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  flex: 1;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  position: relative;

  ul {
    list-style-type: none;
    padding: 2rem;
  }

  li {
    margin-bottom: 20px;
  }

  h3 {
    margin-bottom: 10px;
    font-size: 1.2rem;
    color: #ff9100;
  }

  h4 {
    margin-top: 15px;
    margin-bottom: 5px;
    font-size: 1rem;
    color: #000000;
  }

  .benefits,
  .usage {
    padding-left: 20px;
  }

  .benefits li,
  .usage li {
    color: #555;
    margin-bottom: 10px;
  }

  hr {
    border: 0;
    height: 1px;
    background-color: #ddd;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

const GalleryControls = styled.div`
	position: absolute;
	top: 50%;
	left: 2rem; // position from the left padding
	right: 2rem; // position from the right padding
	transform: translateY(-50%);
	display: flex;
	justify-content: space-between;
`;

const GalleryControlButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #666;
`;

const StyledUl = styled.ul`
  list-style-type: none;
  padding: 2rem;
`;

const TicketGallery: React.FC<{ ticketOptions: TicketOption[] }> = ({ ticketOptions }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const handlePrev = (event: React.MouseEvent) => {
		event.preventDefault();
		setCurrentIndex(prevIndex => (prevIndex === 0 ? ticketOptions.length - 1 : prevIndex - 1));
	};

	const handleNext = (event: React.MouseEvent) => {
		event.preventDefault();
		setCurrentIndex(prevIndex => (prevIndex === ticketOptions.length - 1 ? 0 : prevIndex + 1));
	};

	return (
		<GuideForm>
			<GalleryControls>
				<GalleryControlButton onClick={handlePrev}>
					<IoIosArrowBack />
				</GalleryControlButton>
				<GalleryControlButton onClick={handleNext}>
					<IoIosArrowForward />
				</GalleryControlButton>
			</GalleryControls>
			<StyledUl>
				{ticketOptions.map((option, index) => (
					<li key={index} style={{ display: index === currentIndex ? 'block' : 'none' }}>
						<h3>{option.label}</h3>
						<h4>Benefits</h4>
						<ul>
							{option.benefits.map((benefit, idx) => (
								<li key={idx}>{benefit}</li>
							))}
						</ul>
						<h4>Usage</h4>
						<ul>
							{option.usage.map((usage, idx) => (
								<li key={idx}>{usage}</li>
							))}
						</ul>
						<hr />
					</li>
				))}
			</StyledUl>
		</GuideForm>
	);
};

export default TicketGallery;
