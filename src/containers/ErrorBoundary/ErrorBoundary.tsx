import React, { useState, FC } from 'react';

// libs
import { ErrorBoundary } from 'react-error-boundary';

import { Toast } from '@douyinfe/semi-ui';

const DefaultPage: FC = ({ children }) => {
  const [boundaryKey, setBoundaryKey] = useState(0);
  const [toastIds, setToastIds] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const handleError = async (message?: any) => {
    if (errors.includes(message)) return;
    setErrors([...errors, message]);
    const id = Toast.error({
      duration: 0,
      content: message
    });
    setToastIds([...toastIds, id]);
  };
  // const memorizedSyncLog = useCallback(handleError, []);
  // useEffect(() => {
  //   console.log('toastids change', toastIds);
  // }, [toastIds]);
  // useEffect(() => {
  //   async function sendLogWhenOnline() {
  //     const getLogFromStorage = LStorage.getItem(ERROR_LOG, null);
  //     if (getLogFromStorage) {
  //       memorizedSyncLog();
  //     }
  //   }
  //
  //   sendLogWhenOnline();
  //
  //   window.onerror = async (message, _, __, ___, errorObj) => {
  //     memorizedSyncLog(message, errorObj?.stack);
  //   };
  //
  //   return () => {
  //     window.onerror = null;
  //   };
  // }, [memorizedSyncLog]);

  // <Modal
  //   onCancel={resetErrorBoundary}
  //   centered
  //   visible
  //   footer={
  //     <div style={{ textAlign: 'center' }}>
  //       <Button type='primary' theme='solid' onClick={resetErrorBoundary}>
  //         OK
  //       </Button>
  //     </div>
  //   }>
  //   <h3 style={{ textAlign: 'center', fontSize: 24, margin: 40 }}>Error</h3>
  //   <div>{error.message}</div>
  // </Modal>;

  // function ErrorFallbackUI({ error, resetErrorBoundary }: FallbackProps) {
  //   const destroy = (toastId: string) => {
  //     console.log('destroy', toastId);
  //     if (toastId && toastId.length > 0) {
  //       const toastIdx = toastIds.indexOf(toastId);
  //       if (toastIdx > -1) {
  //         console.log('id', toastIdx);
  //         setToastIds(toastIds.filter(id => toastId !== id));
  //         errors.splice(toastIdx, 1);
  //         setErrors(errors);
  //       }
  //
  //       Toast.close(toastId);
  //     }
  //   };
  //
  //   return <></>;
  // }

  return (
    <ErrorBoundary
      fallbackRender={() => <div>Oh no</div>}
      resetKeys={[boundaryKey]}
      onError={handleError}>
      {children}
    </ErrorBoundary>
  );
};

export default DefaultPage;
