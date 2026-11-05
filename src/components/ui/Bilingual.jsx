import { usePreferences } from '../../context/PreferencesContext';

// Shows English and/or Khmer text according to the meaning-language setting.
// "Both" puts the Khmer line under the English one.
export default function Bilingual({ en, km, as: Tag = 'p', className = '', kmClassName = '' }) {
  const { meaningLanguage } = usePreferences();
  const showEnglish = meaningLanguage !== 'km' || !km;
  const showKhmer = meaningLanguage !== 'en' && Boolean(km);

  return (
    <>
      {showEnglish && en ? <Tag className={className}>{en}</Tag> : null}
      {showKhmer ? (
        <Tag lang="km" className={showEnglish ? kmClassName : className}>
          {km}
        </Tag>
      ) : null}
    </>
  );
}
