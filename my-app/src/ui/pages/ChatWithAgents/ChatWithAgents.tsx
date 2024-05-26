import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Navbar from '../../organisms/Navbar';
import GlobalStyles from '../../atoms/GlobalStyles';
import {
	Container,
	AgentListContainer,
	AgentCard,
	AgentAvatar,
	SecondSection,
	ChatContainer,
	ChatMessages,
	Message,
	AdditionalInfoContainer,
	AgentInfo,
	AgentName,
	AgentDescription,
	Persona,
	ChatInput,
	HeroSection,
	HeroTitle,
	Title,
	HeroSubtitle,
	AdditionalInfoText,
	BulletPoint,
	AdditionalInfoHeader,
	AdditionalInfoParagraph,
	AdditionalInfoList,
	AdditionalInfoListItem,
	AdditionalInfoStrong,
	Overlay,
	OverlayText
  } from './ChatWithAgents.styles';
  
const agents = [
	{
		id: 1,
		name: 'Money Saving Sam',
		description: 'Focused on saving money and finding the best deals.',
		persona: 'Money-focused',
		avatar: 'https://www.sports-king.com/images/nicknames/jude-bellingham.jpg',
	},
	{
		id: 2,
		name: 'Creative Connoisseur Claire',
		description: 'Passionate about creativity and innovation.',
		persona: 'Entertainment-focused',
		avatar: 'https://www.sports-king.com/images/nicknames/olivier-giroud.jpg',
	},
	{
		id: 3,
		name: 'Tech-Savvy Tyler',
		description: 'Enthusiastic about technology and gadgets.',
		persona: 'Tech-savvy',
		avatar: 'https://www.sports-king.com/images/nicknames/cristiano-ronaldo-02.jpg',
	},
];

const responses = {
	"agent1": {
		"hi": "Hello! How can I assist you with your city exploration plans today?",
		"hi!": "Hello! How can I assist you with your city exploration plans today?",
		"hi.": "Hello! How can I assist you with your city exploration plans today?",
		"hi?": "Hello! How can I assist you with your city exploration plans today?",
		"hello": "Hello! How can I assist you with your city exploration plans today?",
		"hello!": "Hello! How can I assist you with your city exploration plans today?",
		"hello.": "Hello! How can I assist you with your city exploration plans today?",
		"hello?": "Hello! How can I assist you with your city exploration plans today?",
		"hey": "Hello! How can I assist you with your city exploration plans today?",
		"hey!": "Hello! How can I assist you with your city exploration plans today?",
		"hey.": "Hello! How can I assist you with your city exploration plans today?",
		"hey?": "Hello! How can I assist you with your city exploration plans today?",
		"howdy": "Howdy! How can I assist you with your city exploration plans today?",
		"howdy!": "Howdy! How can I assist you with your city exploration plans today?",
		"howdy.": "Howdy! How can I assist you with your city exploration plans today?",
		"howdy?": "Howdy! How can I assist you with your city exploration plans today?",
		"hi there": "Hello! How can I assist you with your city exploration plans today?",
		"hi there!": "Hello! How can I assist you with your city exploration plans today?",
		"hi there.": "Hello! How can I assist you with your city exploration plans today?",
		"hi there?": "Hello! How can I assist you with your city exploration plans today?",
		"hello there": "Hello! How can I assist you with your city exploration plans today?",
		"hello there!": "Hello! How can I assist you with your city exploration plans today?",
		"hello there.": "Hello! How can I assist you with your city exploration plans today?",
		"hello there?": "Hello! How can I assist you with your city exploration plans today?",
		"hey there": "Hello! How can I assist you with your city exploration plans today?",
		"hey there!": "Hello! How can I assist you with your city exploration plans today?",
		"hey there.": "Hello! How can I assist you with your city exploration plans today?",
		"hey there?": "Hello! How can I assist you with your city exploration plans today?",
		"hiya": "Hiya! How can I assist you with your city exploration plans today?",
		"hiya!": "Hiya! How can I assist you with your city exploration plans today?",
		"hiya.": "Hiya! How can I assist you with your city exploration plans today?",
		"hiya?": "Hiya! How can I assist you with your city exploration plans today?",
		"how's it going?": "I'm here and ready to help you save money on your city adventures!",
		"how's it going?!": "I'm here and ready to help you save money on your city adventures!",
		"how's it going?.": "I'm here and ready to help you save money on your city adventures!",
		"how's it going??": "I'm here and ready to help you save money on your city adventures!",
		"what's up?": "I'm here and ready to help you save money on your city adventures!",
		"what's up?!": "I'm here and ready to help you save money on your city adventures!",
		"what's up?.": "I'm here and ready to help you save money on your city adventures!",
		"what's up??": "I'm here and ready to help you save money on your city adventures!",
		"thank you": "You're welcome! If you need any further assistance, feel free to ask!",
		"thank you!": "You're welcome! If you need any further assistance, feel free to ask!",
		"thank you.": "You're welcome! If you need any further assistance, feel free to ask!",
		"thank you?": "You're welcome! If you need any further assistance, feel free to ask!",
		"thanks": "You're welcome! If you need any further assistance, feel free to ask!",
		"thanks!": "You're welcome! If you need any further assistance, feel free to ask!",
		"thanks.": "You're welcome! If you need any further assistance, feel free to ask!",
		"thanks?": "You're welcome! If you need any further assistance, feel free to ask!",
		"great, thanks": "You're welcome! If you need any further assistance, feel free to ask!",
		"great, thanks!": "You're welcome! If you need any further assistance, feel free to ask!",
		"great, thanks.": "You're welcome! If you need any further assistance, feel free to ask!",
		"great, thanks?": "You're welcome! If you need any further assistance, feel free to ask!",
		"thank you so much": "You're welcome! If you need any further assistance, feel free to ask!",
		"thank you so much!": "You're welcome! If you need any further assistance, feel free to ask!",
		"thank you so much.": "You're welcome! If you need any further assistance, feel free to ask!",
		"thank you so much?": "You're welcome! If you need any further assistance, feel free to ask!",
		"thanks a lot": "You're welcome! If you need any further assistance, feel free to ask!",
		"thanks a lot!": "You're welcome! If you need any further assistance, feel free to ask!",
		"thanks a lot.": "You're welcome! If you need any further assistance, feel free to ask!",
		"thanks a lot?": "You're welcome! If you need any further assistance, feel free to ask!"
	  }	
};

// Mock chat data
const chatData = {
	agent1: [
		{ sender: 'agent', message: 'Welcome! How can I help you with your finances today?' },
	],
	agent2: [
		{ sender: 'agent', message: 'Hello! What movies or TV shows are you interested in?' },
	],
	agent3: [
		{ sender: 'agent', message: 'Hi there! Do you have any questions about the latest technology trends?' },
	],
};

type Agent = {
	id: string;
	name: string;
	description: string;
	persona: string;
	avatar: string;
};


const ChatPage = () => {
	const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
	const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);
	const [chatData, setChatData] = useState({
		agent1: [
			{ sender: 'agent', message: 'Welcome! How can I help you with your finances today?' },
		],
		agent2: [
			{ sender: 'agent', message: 'Hello! What movies or TV shows are you interested in?' },
		],
		agent3: [
			{ sender: 'agent', message: 'Hi there! Do you have any questions about the latest technology trends?' },
		],

	});
	const [agentSelected, setAgentSelected] = useState(false);

	useEffect(() => {
		if (selectedAgent) {
			setMessages(chatData[`agent${selectedAgent}` as keyof typeof chatData]);
			setAgentSelected(true); // Set agentSelected to true when an agent is selected
		}
	}, [selectedAgent, chatData]);

	const handleAgentSelect = (agentId: string) => {
		setSelectedAgent(agentId);
		setMessages(chatData[`agent${agentId}` as keyof typeof chatData]);
	};

	const handleSendMessage = (message: string) => {
		setChatData(prevChatData => ({
			...prevChatData,
			[`agent${selectedAgent}`]: [
				...prevChatData[`agent${selectedAgent}` as keyof typeof prevChatData],
				{ sender: 'user', message },
			],
		}));

		const agentResponses = responses[`agent${selectedAgent}` as keyof typeof responses];
		const userMessage = message.trim().toLowerCase();

		const matchedResponse = Object.keys(agentResponses).find(key => key.toLowerCase() === userMessage);

		if (matchedResponse) {
			setChatData(prevChatData => ({
				...prevChatData,
				[`agent${selectedAgent}`]: [
					...prevChatData[`agent${selectedAgent}` as keyof typeof prevChatData],
					{ sender: 'agent', message: agentResponses[matchedResponse as keyof typeof agentResponses] },
				],
			}));
		} else {
			// Send a default response if no match is found
			setChatData(prevChatData => ({
				...prevChatData,
				[`agent${selectedAgent}`]: [
					...prevChatData[`agent${selectedAgent}` as keyof typeof prevChatData],
					{ sender: 'agent', message: "I'm sorry, I didn't understand that. Could you please rephrase?" },
				],
			}));
		}
	};

	return (
		<>
			<GlobalStyles></GlobalStyles>
			<Navbar></Navbar>
			<HeroSection>
				<HeroTitle>Chat with Agents</HeroTitle>
				<HeroSubtitle>Connect with knowledgeable agents for tailored assistance</HeroSubtitle>
			</HeroSection>
			<Title>Please select and Agent</Title>
			<Container>
				<AgentListContainer>
					{agents.map(agent => (
						<AgentCard
							key={agent.id}
							onClick={() => handleAgentSelect(agent.id.toString())}
							isSelected={Number(selectedAgent) === agent.id} // Add this line
						>
							<AgentAvatar src={agent.avatar} alt={agent.name} />
							<AgentName>{agent.name}</AgentName>
							<AgentDescription>{agent.description}</AgentDescription>
							<Persona>Persona: {agent.persona}</Persona>
						</AgentCard>
					))}
				</AgentListContainer>
				<SecondSection>
					<ChatContainer>
						<AdditionalInfoHeader>Chat</AdditionalInfoHeader>
						<ChatMessages>
							{messages.map((msg, index) => (
								<Message key={index} sender={msg.sender}>{msg.message}</Message>
							))}
							{!agentSelected && (
								<Overlay>
									<OverlayText>Please select an agent to start the chat.</OverlayText>
								</Overlay>
							)}
						</ChatMessages>
						<ChatInput
							type="text"
							placeholder="Type your message..."
							onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
								if (e.key === 'Enter') {
									handleSendMessage(e.currentTarget.value);
									e.currentTarget.value = '';
								}
							}}
						/>
					</ChatContainer>
					<AdditionalInfoContainer>
						{selectedAgent ? (
							<>
								<AdditionalInfoHeader>Selected Agent</AdditionalInfoHeader>
								<AgentInfo>
									<AgentAvatar src={agents[Number(selectedAgent) - 1].avatar} alt={agents[Number(selectedAgent) - 1].name} />
									<AgentName>{agents[Number(selectedAgent) - 1].name}</AgentName>
									<AgentDescription>{agents[Number(selectedAgent) - 1].description}</AgentDescription>
									<Persona>Persona: {agents[Number(selectedAgent) - 1].persona}</Persona>
								</AgentInfo>
							</>
						) : (
							<AdditionalInfoText>
								<AdditionalInfoHeader>Additional Information</AdditionalInfoHeader>
								<AdditionalInfoParagraph>
									Welcome to our chat service! Here, you can interact with our knowledgeable agents who specialize in different areas:
								</AdditionalInfoParagraph>
								<AdditionalInfoList>
									<AdditionalInfoListItem>
										<AdditionalInfoStrong>Money Saving Sam:</AdditionalInfoStrong> Focused on saving money and finding the best deals.
									</AdditionalInfoListItem>
									<AdditionalInfoListItem>
										<AdditionalInfoStrong>Creative Connoisseur Claire:</AdditionalInfoStrong> Passionate about creativity and innovation.
									</AdditionalInfoListItem>
									<AdditionalInfoListItem>
										<AdditionalInfoStrong>Tech-Savvy Tyler:</AdditionalInfoStrong> Enthusiastic about technology and gadgets.
									</AdditionalInfoListItem>
								</AdditionalInfoList>
								<AdditionalInfoParagraph>
									Select an agent to start a conversation and get assistance tailored to your needs. Our agents are here to help you with financial advice, entertainment recommendations, and technology insights.
								</AdditionalInfoParagraph>
							</AdditionalInfoText>
						)}
					</AdditionalInfoContainer>
				</SecondSection>
			</Container>
		</>
	);
};

export default ChatPage;