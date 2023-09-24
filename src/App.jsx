import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import styled from 'styled-components'

const ContainerData = styled.div`
  width: 100%;
  display: flex;
  height: fit-content;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  h1{

  }

  input{
    width: 100%;
    padding: 10px;
    font-size: 20px;
    box-sizing: border-box;
    border-radius: 10px;
  }

`

const StyledPre = styled.pre`
  height: 300px;
  padding: 20px;
  overflow: auto;
  text-align: left;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #353535;
`;


import { getBencineras } from './services/bencineras'

function App() {
  const [data, setData] = useState([]);
  const [region, setRegion] = useState("");

  const getData = async () => {
    const values = await getBencineras({region: region});
    { values && setData(values) }
  };

  useEffect(() => {
    getData();
  }, [region]);

  return (
    <ContainerData>
      <input type="ciudad" placeholder='Región' value={region} onChange={(e)=>{
        setRegion(e.target.value)
      }} />

     {
      Object.keys(data).length > 0 &&
      <div className="data">
        <StyledPre>
          {JSON.stringify(data, null, 2)}
        </StyledPre>
      </div>     
     }
    </ContainerData>
  );
}

export default App;
