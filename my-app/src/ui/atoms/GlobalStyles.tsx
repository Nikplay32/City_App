import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    height: 100%;
    font-family: 'Nunito', sans-serif; 
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #888;
  }

  ::-webkit-scrollbar-thumb {
    background: #555;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  #car {
  position: fixed;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  background: url('https://png.pngtree.com/png-vector/20230408/ourmid/pngtree-white-car-top-view-vector-png-image_6681668.png') no-repeat;
  background-size: cover;
  z-index: 2;


  @media (max-width: 1024px) {
    display: none;
  }
}

#road {
  position: fixed;
  top: 0;
  right: 0;
  width: 50px;
  height: 100%; 
  background: url('https://us.123rf.com/450wm/llepod/llepod1608/llepod160800052/61084056-seamless-texture-highway-asphalt-road-with-yellow-stripes-2d-illustration.jpg') repeat-y center bottom;
  z-index: 1;
  @media (max-width: 1024px) {
    display: none;
  }
}

`;

export default GlobalStyles;