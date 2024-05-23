import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Reset styles */
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Add your global styles here */
  body {
    height: 100%;
    font-family: 'Nunito', sans-serif;    /* Add other body styles */
  }

  /* Custom scrollbar styles */
  /* This applies to all scrollable elements */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #888;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #555;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  /* Car styles */
  #car {
  position: fixed;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  background: url('https://png.pngtree.com/png-vector/20230408/ourmid/pngtree-white-car-top-view-vector-png-image_6681668.png') no-repeat;
  background-size: cover;
  z-index: 2;


  /* Hide on mobile */
  @media (max-width: 1024px) {
    display: none;
  }
}

#road {
  position: fixed;
  top: 0;
  right: 0;
  width: 50px;
  height: 100%;  // Adjust this to change the height of the road
  background: url('https://us.123rf.com/450wm/llepod/llepod1608/llepod160800052/61084056-seamless-texture-highway-asphalt-road-with-yellow-stripes-2d-illustration.jpg') repeat-y center bottom;
  z-index: 1;  // Put the road behind the car

  /* Hide on mobile */
  @media (max-width: 1024px) {
    display: none;
  }
}

  /* Add more global styles as needed */
`;

export default GlobalStyles;