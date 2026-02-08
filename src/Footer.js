import React from "react";
import "./Footer.css";
import { useTranslation } from './i18n';

function Footer() {
  const { t } = useTranslation();
  return (
    <div className="footer">
      <p>
        {t('footer.credit')}
      </p>
      <p>{t('footer.links')}</p>
    </div>
  );
}

export default Footer;
