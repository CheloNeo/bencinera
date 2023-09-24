import axios from 'axios';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYmV0YS5hcGkuY25lLmNsL2FwaS9sb2dpbiIsImlhdCI6MTY5NTUyNjE0MywiZXhwIjoxNjk1NTI5NzQzLCJuYmYiOjE2OTU1MjYxNDMsImp0aSI6IlNrNXBqZ3JlWHBqdUxPaVkiLCJzdWIiOiI0NyIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.rBDNE6phg8zqrL5RrDYJY5D50ayFVbS4bJYvtX9SG2Q'
console.log(token)
const region = '05';

let axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

const getToken = async ( ) => {
    const {data} = await axios.post('https://beta.api.cne.cl/api/login?email=marcelo.estay@alumnos.uv.cl&password=Admin11278');
    return data.token
}

const getBencineras = async (filters) => {
    try {
  
        axiosConfig.headers.Authorization = `Bearer ${await getToken()}`
        const { data } = await axios.get('https://beta.api.cne.cl/api/v3/combustible/vehicular/estaciones', axiosConfig);
        let filteredData = data;
        if (filters) {
            // Ejemplo de filtro por región (reemplaza con tus criterios de filtro)
            if (filters.region) {
                filteredData = Object.keys(filteredData)
                    .filter((key) => filteredData[key].id_region === filters.region)
                    .reduce((obj, key) => {
                        obj[key] = filteredData[key];
                        return obj;
                    }, {});
            }            
        }

        return filteredData;

    } catch (error) {
        console.log(error)
        return false;
    }
}

export{
    getBencineras
}