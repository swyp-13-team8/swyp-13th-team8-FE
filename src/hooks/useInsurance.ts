import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import api from '../api/axios';

export interface Insurance {
  userInsuranceId: number;
  companyName: string;
  productName: string;
  generation: number;
  joinDate: string;
  contractType?: string;
  coverageStructure?: string;
  cautionPoint?: string;
}

const useInsurance = () => {
  const [insurances, setInsurances] = useState<Insurance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken } = useAuthStore();

  useEffect(() => {
    if (!accessToken) {
      setIsLoading(false);
      return;
    }

    const fetchInsurances = async () => {
      try {
        const res = await api.get('/insurance/list');
        if (res.data.code === 200) {
          setInsurances(res.data.data.insurances);
        }
      } catch (e) {
        console.log(e);
        setInsurances([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInsurances();
  }, [accessToken]);

  return { insurances, isLoading, setInsurances };
};

export default useInsurance;
