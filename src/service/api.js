import axios from 'axios';

const send = async ({ method = '', path = '', data = {} } = {}) => {
    const commonURl = 'http://52.79.45.94:80'; // 백엔드 서버 주소
    const url = commonURl + path; // API로 전달될 주소

    const headers = {
        'Access-Control-Allow-Origin': 'http://52.79.45.94:80', // 백엔드 서버의 주소. 크로스 도메인 대응
        'Access-Control-Allow-Credentials': true,
        'content-type': 'application/json;charset=UTF-8', // 송수신 데이터 타입
        accept: 'application/json',
        SameSite: 'None',
        // Authorization: access_token,
    };

    const options = {
        method,
        url,
        headers,
        data,
        // withCredentials: true, // 꼭 작성해야 함. 백, 프론트 포트가 다르면 무조건 트루
    };

    try {
        const response = await axios(options);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getApi = ({ path = '' } = {}) => {
    return send({ method: 'GET', path });
};

const putApi = ({ path = '', data = {} } = {}) => {
    return send({ method: 'PUT', path, data });
};

const postApi = ({ path = '', data = {} } = {}) => {
    return send({ method: 'POST', path, data });
};

const delApi = ({ path = '', data = {} } = {}) => {
    return send({ method: 'DELETE', path, data });
};

export { getApi, putApi, postApi, delApi };
