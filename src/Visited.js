import React from 'react';
import { useTranslation } from './i18n';

function Visited() {
  const { t } = useTranslation();
  return (
    <div style={{ padding: 20 }}>
      <h2>{t('footer.menu.visited')}</h2>
      <p>Página de visitados (vacía).</p>
    </div>
  );
}

export default Visited;
