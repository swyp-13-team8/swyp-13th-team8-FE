import { loading } from '../../assets';
import CImg from '../common/CImg';
import CModal from '../common/CModal';

interface LoadingModalProps {
  onClose: () => void;
}

const LoadingModal = ({ onClose }: LoadingModalProps) => {
  return (
    <CModal cancel={false} onClose={onClose}>
      <div className="flex flex-col items-center transform transition-all">
        <div className="flex items-center justify-center mb-6">
          <CImg src={loading} alt="로딩" />
        </div>

        <h3 className="mb-3 text-2xl font-bold text-gray-900">잠시만 기다려주세요!</h3>
      </div>
    </CModal>
  );
};

export default LoadingModal;
