import { useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../../../../api/axios';
import type { CompanyName } from './InsuranceSelectModal';

export const useAddInsurance = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState<CompanyName | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedInsurance, setSelectedInsurance] = useState<number | null>(null);
  const [sameInsuranceRegister, setSameInsuranceRegister] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);

  const handleStep0Next = () => {
    if (!selectedCompany) return;
    setCurrentStep(1);
    setShowModal(true);
  };

  const handleModalConfirm = async () => {
    if (!selectedInsurance || !selectedYear || !selectedMonth) return;
    try {
      const subscribedAt = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}`;

      // POST /insurance/register
      await api.post('/insurance/register', {
        insuranceId: selectedInsurance,
        subscribedAt,
      });

      setShowModal(false);
      setSameInsuranceRegister(false);
      setCurrentStep(2);
    } catch (error) {
      setSameInsuranceRegister(true);
      console.error('보험 등록 실패:', error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentStep(0);
  };

  return {
    currentStep,
    selectedCompany,
    sameInsuranceRegister,
    setSameInsuranceRegister,
    setSelectedCompany,
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    selectedInsurance,
    setSelectedInsurance,
    showModal,
    handleStep0Next,
    handleModalConfirm,
    handleModalClose,
    navigate,
  };
};
