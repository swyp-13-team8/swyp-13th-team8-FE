import { useNavigate } from "react-router";
import CBreadcrumb from "../../components/common/CBreadcrumb";
import InsuranceInfo from "./components/InsuranceInfo";
import type { Insurance } from "./components/insuranceTypes";

const Calculator = () => {
  const navigate = useNavigate();

  const handleSelectInsurance = (insurance: Insurance) => {
    navigate("/medical-info", { state: { insurance } });
  };

  return (
    <div>
      <CBreadcrumb items={[{ label: "환급금 계산기" }]} />
      <InsuranceInfo onSelect={handleSelectInsurance} />
    </div>
  );
};

export default Calculator;
