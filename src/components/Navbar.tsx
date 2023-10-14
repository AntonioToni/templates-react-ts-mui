import { Box } from "@mui/material";
import NavDrawer from "./NavDrawer";

export function Navbar() {

  return(
    <>
      <Box sx={{
        marginBottom: '60px'
      }}>
        <Box sx={{
          backgroundColor: 'rgb(12, 44, 80)',
          position: 'fixed',
          zIndex: 10,
          width: 1,
          height: '60px',
          top: 0,
          borderBottom: '.1rem solid rgba(0, 0, 0, 0.15)',
          boxShadow: '0 0 14px rgb(141, 141, 141)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <NavDrawer />
        </Box>
      </Box>
    </>
  );
}
