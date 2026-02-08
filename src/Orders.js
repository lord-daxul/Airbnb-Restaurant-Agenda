import React from 'react';
import { useTranslation } from './i18n';

function Orders() {
  const { t } = useTranslation();
  return (
    <div style={{ padding: 20 }}>
      <h2>{t('footer.menu.orders')}</h2>
      <p>Página de pedidos (vacía).</p>
    </div>
  );
}

export default Orders;
