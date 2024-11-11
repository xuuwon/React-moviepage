import { useEffect, useState } from 'react'
import { BASE_URL, API_READ_ACCESS_TOKEN } from '../../config.js'

export default function useFetch (endPoint, page=1) {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${BASE_URL}${endPoint}&page=${page}`
                    , {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
                        accept: 'application/json',
                    },
                })
                const data = await response.json()
                
                if (page === 1) {
                    setData(data)
                } else {
                    setData((prev) => ({
                        ...prev,
                        results: [...prev.results, ...data.results], // results만 병합
                    }));
                }
            } catch (error) {
                console.log('Error fetching data:', error)
                setError(error)
            } finally {
                setLoading(false)
            }
        }
    
        fetchData()
    }, [endPoint, page])

    return { data, loading, error };
}