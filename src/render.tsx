import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import { WebBle } from './utils/bluetooth';
import ScanningView from './views/Scanning';
import DetailView from './views/Detail';
import App from './views/App';

const Index = () => {
  const [detailId, setDetailId] = useState(null);

  return <App />
  !detailId ? (
    <ScanningView onConnect={id => setDetailId(id)} />
  ) : (
    <DetailView deviceId={detailId} onDisconnect={() => setDetailId(null)} />
  );
};

ReactDOM.render(<Index />, document.getElementById('app'));
