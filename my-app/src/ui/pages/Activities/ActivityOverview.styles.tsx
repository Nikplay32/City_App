import styled from "styled-components";

export const ActivityContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const ImageContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const Image = styled.img`
  width: 100%;
  height: 600px;
  object-fit: cover;
  @media screen and (max-width: 768px) {
    height: auto;
  }
`;

export const InfoContainer = styled.div`
  width: 80%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const DescriptionContainer = styled.div`
  flex: 2;
  margin-right: 20px;
`;

export const Description = styled.div`
  padding: 1rem 0 0 0;
  line-height: 1.6;
`;

export const AddToCartButton = styled.button`
  display:none;
`;


export const TitleContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const TitleText = styled.h1`
  color: #333;
  font-weight: normal;
  padding: 10px 0px 20px 20px;
`;

export const TitleBorder = styled.hr`
  border: 0;
  height: 1px;
  background: #e3dddd;
  width: 100%;
`;

export const HighlightsContainer = styled.ul`
  list-style-type: disc;
  margin-left: 20px;
`;

export const Highlight = styled.li`
  margin: 0.5rem 0;
`;

export const Note = styled.p`
  color: red;
  padding-top: 1rem;
  font-weight: bold;
`;
