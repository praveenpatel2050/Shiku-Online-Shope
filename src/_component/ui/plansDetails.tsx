import { Table, TableCell, TableBody, TableContainer, TableRow, Paper, Box, Container, TableHead, } from '@mui/material'
import Typography from './Typography';

function createData(level: string, peoples: number, commission: string) {
  return { level, peoples, commission };
}

const rows = [
  createData('Level - 1', 2, "10%"),
  createData('Level - 2', 4, "5%"),
  createData('Level - 3', 8, "4%"),
  createData('Level - 4', 16, "3%"),
  createData('Level - 5', 32, "2%"),
  createData('Level - 6', 64, "1%"),
  createData('Level - 7', 128, "0.50%"),
  createData('Level - 8', 256, "0.25%"),
  createData('Level - 9', 512, "0.125%"),
  createData('Level - 10', 1024, "0.075%"),
]

const  PlansDetails = () => {

  return (
    <Box
      component="section"
      sx={{ display: 'flex', bgcolor: 'secondary.white', overflow: 'hidden' }}
    >
      <Container
        sx={{
          mt: 4,
          mb: 5,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4" marked="center"   sx={{ mb: 4, fontSize: 21, "@media (min-width: 200px) and (max-width: 560px)": {
                            fontSize: 14,
                          }, }}>
          Commission Based On Level
        </Typography>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} aria-label="custom pagination table">
        <TableHead >
          <TableRow>
                      <TableCell>Level</TableCell>
                      <TableCell align="right">Connect People</TableCell>
                      <TableCell align="right">Commission</TableCell>
                    </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.level}>
              <TableCell component="th" scope="row">
                {row.level}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.peoples}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.commission}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Container>
    </Box>
  );
}

export default PlansDetails;
