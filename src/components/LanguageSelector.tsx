import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const btnSX = {
  color: 'rgb(255,255,255)',
  fontWeight: '700',
  fontSize: '15px'
}

function LanguageSelector() {
  const { i18n } = useTranslation();

  const isActiveLanguage = (lng: string) => {
    return i18n.language === lng;
  };

  const changeLanguage = (lng: string) => {
    console.log('Changing language to:', lng);
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <Button 
        variant='text' 
        sx={btnSX} 
        style={{
          textDecoration: isActiveLanguage('en') ? 'underline' : 'none',
        }}
        onClick={(e) => {
          e.stopPropagation();
          changeLanguage('en')
        }}
      >
        EN
      </Button>
      <Button 
        variant='text' 
        sx={btnSX} 
        style={{
          textDecoration: isActiveLanguage('hr') ? 'underline' : 'none',
        }}
        onClick={(e) => {
          e.stopPropagation();
          changeLanguage('hr')
        }}
      >
        HR
      </Button>
      {/* Add more buttons for other languages */}
    </>
  );
}

export default LanguageSelector;