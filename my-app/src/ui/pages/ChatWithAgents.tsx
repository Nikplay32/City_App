import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Navbar from '../organisms/Navbar';
import GlobalStyles from '../atoms/GlobalStyles';

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

type MessageProps = {
	sender: string;
};
type Agent = {
	id: string;
	name: string;
	description: string;
	persona: string;
	avatar: string;
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
	height: 100%;
  background-color: #f0f0f0;
`;

const AgentListContainer = styled.div`
  flex: 0 0 25%;
  padding: 20px;
  overflow-y: auto;
`;

const AgentCard = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;

const AgentAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const ChatContainer = styled.div`
  flex: 0 0 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChatMessages = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  overflow-y: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Message = styled.div<MessageProps>`
  padding: 10px;
  border-radius: 10px;
  background-color: ${({ sender }) => sender === 'user' ? '#4CAF50' : '#2196F3'};
  color: #fff;
  max-width: 70%;
  align-self: ${({ sender }) => sender === 'user' ? 'flex-end' : 'flex-start'};
  animation: ${keyframes`
    0% { opacity: 0; transform: translateY(-10px); }
    100% { opacity: 1; transform: translateY(0); }
  `} 0.5s ease-out;
`;

const AdditionalInfoContainer = styled.div`
  flex: 0 0 25%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AgentInfo = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const AgentName = styled.h2`
  margin-bottom: 10px;
`;

const AgentDescription = styled.p`
  margin-bottom: 20px;
`;

const Persona = styled.p`
  font-style: italic;
  color: #888;
`;

const ChatInput = styled.input`
  width: calc(100% - 40px);
  padding: 10px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  outline: none;
`;

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
	
	useEffect(() => {
		if (selectedAgent) {
			setMessages(chatData[`agent${selectedAgent}` as keyof typeof chatData]);
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
			<Container>
				<AgentListContainer>
					<h1>Select an Agent</h1>
					{agents.map(agent => (
						<AgentCard key={agent.id} onClick={() => handleAgentSelect(agent.id.toString())}>
							<AgentAvatar src={agent.avatar} alt={agent.name} />
							<AgentName>{agent.name}</AgentName>
							<AgentDescription>{agent.description}</AgentDescription>
							<Persona>Persona: {agent.persona}</Persona>
						</AgentCard>
					))}
				</AgentListContainer>
				<ChatContainer>
					<h1>Chat</h1>
					<ChatMessages>
						{messages.map((msg, index) => (
							<Message key={index} sender={msg.sender}>{msg.message}</Message>
						))}
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
					<h1>Additional Info</h1>
					{selectedAgent && (
						<AgentInfo>
							<AgentAvatar src={agents[Number(selectedAgent) - 1].avatar} alt={agents[Number(selectedAgent) - 1].name} />
							<AgentName>{agents[Number(selectedAgent) - 1].name}</AgentName>
							<AgentDescription>{agents[Number(selectedAgent) - 1].description}</AgentDescription>
							<Persona>Persona: {agents[Number(selectedAgent) - 1].persona}</Persona>
						</AgentInfo>
					)}
				</AdditionalInfoContainer>
			</Container>
		</>
	);
};

export default ChatPage;