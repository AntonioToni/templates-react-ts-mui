import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";

export function About() {
  const { t } = useTranslation();
  return(
    <>
      <Box sx={{
        flex: '1 0 0%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Paper sx={{
          maxWidth: '800px',
          padding: '20px',
          borderRadius: '10px',
        }}>
          <Typography variant="h4" sx={{
            textAlign: 'center',
            fontWeight: 600
          }}>
            [ {t("about.title")} ]
          </Typography>
          <TableContainer 
          sx={{
            margin: '20px 0',
            borderRadius: '10px',
            border: 'solid 1px rgb(92, 51, 136)',
            backgroundColor: 'rgb(92, 51, 136)'
          }}>
            <Table sx={{
              borderRadius: '10px',
            }}>
              <TableHead sx={{
              }}>
                <TableRow>
                  <TableCell sx={{
                    padding: '0 0 0 10px'
                  }}>
                    <Typography variant="h5" 
                    sx={{
                      color: 'rgb(255, 255, 255)',
                    }}>
                      {t('about.subtitle')}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{
                backgroundColor: 'rgb(255, 255, 255)'
              }}>
                <TableRow>
                  <TableCell sx={{
                    padding: '10px',
                    border: 'none'
                  }}>
                    <Typography sx={{ whiteSpace: 'pre-wrap'}}>
                      {t('about.description')}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  )
}
