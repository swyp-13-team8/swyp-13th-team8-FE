import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import CImg from '../../../components/common/CImg';
import CButton from '../../../components/common/CButton';
import { useModalStore } from '../../../store/useModalStore';
import { analysisAI, sseConnectAPI } from '../../../api/analysisApi';
import { useAuthStore } from '../../../store/useAuthStore';

interface PdfUploaderProps {
  name: string;
}

const PdfUploader = ({ name }: PdfUploaderProps) => {
  const openModal = useModalStore((state) => state.openModal);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [userInsuranceId, setUserInsuranceId] = useState<number | null>(null);
  const [clientId, setClientID] = useState<string>('');

  const [data, setData] = useState({});
  const token = useAuthStore((state) => state.accessToken);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]);
      console.log('업로드된 파일:', acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    noClick: true, // 💡 중요: 박스 전체 클릭 시 탐색기가 열리는 것을 막음
    noKeyboard: true,
  });

  const analysisStartHandler = () => {
    sseConnectAPI(async (id) => {
      setClientID(id);

      try {
        await analysisAI(
          (data) => {
            setData(data);
          },
          token,
          uploadedFile,
          clientId,
          userInsuranceId,
        );
      } catch (e) {
        console.log(e);
      }
    }, token);
  };

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col h-78.75 rounded-3xl items-center justify-center gap-7 transition-colors duration-200 border
        ${
          isDragActive
            ? 'bg-primary-20 border-primary-50' // 드래그 중일 때 색상 진해짐
            : 'bg-primary-10 border-primary-20' // 평상시 색상
        }`}
    >
      <input {...getInputProps()} />

      {/* 파일이 업로드되었을 때 보여줄 UI */}
      {uploadedFile ? (
        <div className="flex flex-col items-center gap-5">
          <CImg className="w-16 h-16" src="" alt="PDF_아이콘" />
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-title-h3 text-gray-scale-80">{uploadedFile.name}</p>
            <p className="text-body-m-r text-gray-scale-50">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <div className="flex gap-3 mt-2">
            <CButton onClick={() => setUploadedFile(null)} className="px-5 py-3 rounded-2xl bg-gray-scale-20 text-gray-scale-70">
              삭제
            </CButton>
            <CButton onClick={analysisStartHandler} className="px-5 py-3 rounded-2xl bg-primary-50 text-white cursor-pointer">
              분석 시작하기
            </CButton>
          </div>
        </div>
      ) : (
        /* 파일 업로드 전 초기 UI (작성하신 코드 그대로 적용) */
        <>
          <div className="flex flex-col gap-5 items-center pointer-events-none">
            <CImg className="w-20 h-20" src="" alt="PDF_아이콘" />
            <div className="flex flex-col items-center gap-1">
              <p className="text-title-h3 text-gray-scale-80">약관 파일을 업로드하세요.</p>
              <p className="text-body-m-r text-gray-scale-50">내 PC에서 첨부하거나 문서를 드래그하여 넣어주세요.</p>
            </div>
          </div>

          <div className="flex flex-row gap-3">
            {/* 💡 onClick={open}을 통해 이 버튼을 누를 때만 탐색기가 열림 */}
            <CButton onClick={open} className="flex items-center gap-2 px-5 py-4 bg-primary-0 rounded-2xl cursor-pointer">
              <CImg className="w-5 h-5" src="" alt="업로드" />
              <p className="text-gray-scale-60">컴퓨터에서 업로드</p>
            </CButton>

            <CButton
              onClick={() => openModal('MYINSURANCE')}
              className={`flex items-center gap-2 px-5 py-4 text-white rounded-2xl ${
                name ? 'bg-primary-50 cursor-pointer' : 'bg-gray-scale-40 cursor-not-allowed'
              }`}
            >
              <CImg className="w-5 h-5" src="" alt="불러오기" />
              <p>내 보험에서 불러오기</p>
            </CButton>
          </div>
        </>
      )}
    </div>
  );
};

export default PdfUploader;
