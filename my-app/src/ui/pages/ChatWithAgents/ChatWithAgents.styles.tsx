import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas: 
        "agents"
        "second";

    @media (min-width: 1025px) {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto;
        grid-template-areas: 
            "agents agents"
            "second second";
    }
    height: 100%;
    background-color: #f0f0f0;
`;

export const AgentListContainer = styled.div`
	grid-area: agents;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    padding: 20px;
    width: 100%;
	justify-content: center;
	gap: 4rem;

    @media (max-width: 768px) {
        width: 100%;
        padding: 20px;
		flex-direction: column;
		align-items: center;

    }
`;

export const AgentCard = styled.div<{ isSelected: boolean }>`
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
	width: 50vh;

    ${({ isSelected }) =>
		isSelected &&
		css`
            border: 2px solid green;
        `}

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 768px) {
        padding: 10px;
        margin-bottom: 10px;
		width: 25vh;
    }
`;

export const AgentAvatar = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;

    @media (max-width: 1024px) {
        width: 50px;
        height: 50px;
    }
`;

export const SecondSection = styled.div`
    grid-area: second;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

export const ChatContainer = styled.div`
	grid-area: main;
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 1025px) {
        width: 75%;
        padding: 20px;
    }
`;

export const ChatMessages = styled.div`
    background-color: #ffffff;
    border-radius: 10px;
		position: relative;
    padding: 20px;
    height: 50vh;
    overflow-y: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (max-width: 1024px) {
        height: 40vh;
        padding: 10px;
    }
`;

type MessageProps = {
	sender: string;
};

export const Message = styled.div<MessageProps>`
    padding: 10px;
    border-radius: 10px;
    background-color: ${({ sender }) => (sender === 'user' ? '#4CAF50' : '#2196F3')};
    color: #fff;
    max-width: 70%;
    align-self: ${({ sender }) => (sender === 'user' ? 'flex-end' : 'flex-start')};
    animation: ${keyframes`
        0% { opacity: 0; transform: translateY(-10px); }
        100% { opacity: 1; transform: translateY(0); }
    `} 0.5s ease-out;
`;

export const AdditionalInfoContainer = styled.div`
    display: none;
	grid-area: additional;
	width: 50vh;

    @media (min-width: 1025px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
    }
`;

export const AgentInfo = styled.div`
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;

    @media (max-width: 1024px) {
        padding: 10px;
    }
`;

export const AgentName = styled.h2`
    margin-bottom: 10px;

    @media (max-width: 1024px) {
        font-size: 1.2rem;
    }
`;

export const AgentDescription = styled.p`
    margin-bottom: 20px;

    @media (max-width: 1024px) {
        font-size: 0.9rem;
        margin-bottom: 10px;
    }
`;

export const Persona = styled.p`
    font-style: italic;
    color: #888;
`;

export const ChatInput = styled.input`
    width: calc(100% - 40px);
    padding: 10px;
    margin-top: 20px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    outline: none;

    @media (max-width: 1024px) {
        width: calc(100% - 20px);
        padding: 5px;
        font-size: 14px;
    }
`;

export const HeroSection = styled.div`
  background: url('https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2023/07/banner-bg-27.webp') no-repeat center center/cover;
  color: #fff;
  padding: 150px 20px;
  text-align: left;
  position: relative;
  overflow: hidden;
	@media (max-width: 768px) {
    background-size: 100% auto;
		padding: 0px;
		height: 100px; // Adjust this value as needed
  }
`;

export const HeroTitle = styled.h1`
  font-size: 4rem;
  margin: 0;
	padding-left: 3rem;
  z-index: 2;
  position: relative;
	@media (max-width: 768px) {
    font-size: 1.5rem;
		padding-top: 30px;
		padding-left: 1.5rem;
  }
`;

export const Title = styled.h3`
  font-size: 2rem;
  margin: 0;
  z-index: 2;
  padding: 2rem;
  position: relative;
  background-color: #f0f0f0;
  text-align: center;
`;

export const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin: 20px 0 0;
  z-index: 2;
	padding-left: 3rem;
  position: relative;
	@media (max-width: 768px) {
    display: none;
  }
`;
export const AdditionalInfoText = styled.div`
    color: #000000;
    font-size: 16px;
    line-height: 1.5;
`;

export const BulletPoint = styled.li`
    margin-bottom: 8px;
`;

export const AdditionalInfoHeader = styled.h1`
    color: #333333;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
`;

export const AdditionalInfoParagraph = styled.p`
    color: #666666;
    margin-bottom: 16px;
`;

export const AdditionalInfoList = styled.ul`
    list-style-type: disc;
    margin-left: 20px;
`;

export const AdditionalInfoListItem = styled.li`
    color: #666666;
    margin-bottom: 8px;
`;

export const AdditionalInfoStrong = styled.strong`
    color: #333333;
    font-weight: bold;
`;

export const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6); // Semi-transparent black overlay
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const OverlayText = styled.p`
    color: #fff;
    font-size: 24px;
    text-align: center;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.8); /* Darker background for text */
    border-radius: 10px;
`;

