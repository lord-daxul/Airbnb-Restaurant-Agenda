import React from 'react';
import { useTranslation } from './i18n';

function Profile() {
  const { t } = useTranslation();
  return (
    <div style={{ padding: 20 }}>
      <h2>{t('footer.menu.profile')}</h2>
      <p>Página de perfil (vacía).</p>
    </div>
  );
}

export default Profile;
