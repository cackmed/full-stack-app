import { useState, useEffect } from 'react';


export const useSupervisorData = () => {
  const [loading, setLoading] = useState(true);
  const [SupervisorData, setSupervisorData] = useState([]);
    
  useEffect(() => {
    fetch('/api/supervisors')
      .then((res) => res.json())
      .then(res => {
        setSupervisorData(res);
      })
      .finally(() => setLoading(false));
  }, []);
    
  return { loading, SupervisorData };
};
