import CImg from './CImg';
import { modalCancel } from '../../assets';

interface ModlaProps {
  cancel?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const CModal = ({ cancel = false, onClose, children }: ModlaProps) => {
  const baseStyle =
    'justify-center p-10 rounded-[40px] shadow-modal max-w-173.5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white';

  return (
    <div className="fixed inset-0 bg-gray-scale-100/25">
      <div className={`${baseStyle} ${cancel ? '' : 'py-20'}`}>
        {cancel ? (
          <div className="flex justify-end w-full ">
            <CImg className="cursor-pointer" src={modalCancel} alt="취소" onClick={onClose} />
          </div>
        ) : (
          ''
        )}

        {children}
      </div>
    </div>
  );
};

export default CModal;
