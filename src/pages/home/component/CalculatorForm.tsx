import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import CButton from '../../../components/common/CButton';
import CInput from '../../../components/common/CInput';
import CRadio from '../../../components/common/CRadio';
import { useState } from 'react';
import { MEDICAL_ITEMS, MEDICAL_PURPOSE, MEDICAL_TYPES, type MedicalItemsValue } from '../../../constants/insurance';
import { useUserStore } from '../../../store/useUserStore';
import { useModalStore } from '../../../store/useModalStore';
import { useNavigate } from 'react-router';

/**
 * 계산기
 *
 */
const CalculatorForm = () => {
  const [medicalItems, setMedicalItems] = useState<MedicalItemsValue | null>(null);
  const openModal = useModalStore((state) => state.openModal);
  const userInfo = useUserStore((state) => state.userInfo);
  const navigate = useNavigate();
  const goCalculator = () => {
    navigate('/calculator');
  };
  return (
    <div className="w-190.5 h-111.5 rounded-3xl p-10 bg-gray-scale-0 relative">
      <span className="left-95 top-25 h-47.25 border border-gray-scale-10 absolute"></span>
      <div className="flex flex-row gap-23 mb-10">
        <div className="flex flex-col w-73.75 h-69.75 gap-8">
          <div>
            <p className="mb-3">보험 선택하기</p>
            <CButton className="w-73.75 h-10.75 rounded-[10px] " children="내 보험에서 불러오기" />
          </div>
          <div>
            <p className="mb-3">진료 유형</p>
            {MEDICAL_TYPES.map((items) => (
              <CRadio key={items.value} label={items.label} name="medical_type" value={items.value} />
            ))}
          </div>
          <div>
            <p className="mb-3">진료 항목</p>
            <div className="mx-auto h-13 w-73.75">
              <Listbox value={medicalItems} onChange={setMedicalItems}>
                <ListboxButton className="w-full border rounded-[10px] border-gray-scale-30 text-left px-5 py-3 block cursor-pointer text-black focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25">
                  {medicalItems ?? '선택'}
                </ListboxButton>
                <ListboxOptions
                  anchor="bottom"
                  transition
                  className="w-(--button-width) border rounded-[10px] border-gray-scale-50 bg-white p-1 focus:outline-none transition duration-200 ease-in-out data-leave:data-closed:opacity-0 "
                >
                  {MEDICAL_ITEMS.map((items) => (
                    <ListboxOption
                      key={items.value}
                      value={items.value}
                      className="text-black flex cursor-default items-center gap-2 rounded-[10px] px-3 py-1.5 select-none data-focus:bg-gray-scale-20"
                    >
                      {items.label}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-73.75 h-69.75 gap-8">
          <div>
            <p className="mb-3">총 진료비</p>
            <CInput className="h-11" placeholder="예) 1,000,000 원" />
          </div>
          <div>
            <p className="mb-3">진료 목적</p>
            {MEDICAL_PURPOSE.map((items) => (
              <CRadio key={items.value} label={items.label} name="medical_purpose" value={items.value} />
            ))}
          </div>
          <div>
            <p className="mb-3">요양급여수가코드 (EDI) (선택)</p>
            <CInput className="h-11" placeholder="예) HE115 (어깨 MRI)" />
          </div>
        </div>
      </div>
      {userInfo.name !== '' ? (
        <CButton onClick={goCalculator} className="w-170.5 h-12.75 rounded-[10px] bg-primary-50 text-white" children="환급금 계산하기" />
      ) : (
        <CButton onClick={() => openModal('LOGIN')} className="w-170.5 h-12.75 rounded-[10px]" children="로그인하고 환급금 계산하기" />
      )}
    </div>
  );
};

export default CalculatorForm;
