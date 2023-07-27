import React, { FC } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableFooter,
} from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import CustomTablePagination from "./Pagination";
type IColumn = {
  id: string;
  label: string;
};
export interface ITables {
  columns: IColumn[];
  data: any[];
  pagination: boolean;
}

export const Tables: FC<ITables> = ({ data: item, columns, pagination}) => {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#F5FFFA",
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Table sx={{ minWidth: 100 }}  stickyHeader aria-label="sticky table">
      <TableHead>
        <StyledTableRow>
          {columns.map((column, index) => {
            return <StyledTableCell key={index}>{column.label}</StyledTableCell>;
          })}
        </StyledTableRow>
      </TableHead>
      <TableBody>
        { item.map((data, index) => {
          return (
            <StyledTableRow hover key={index}>
              {columns.map((column, index) => { 
                return (
                  
                    <StyledTableCell key={index} >{data[column.id]}</StyledTableCell>
                  
                );
              })}
            </StyledTableRow>
          );
        })}
      </TableBody>
      <TableFooter>
          <TableRow>
          {pagination && (
            <CustomTablePagination
              count={item.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
          </TableRow>
        </TableFooter>
    </Table>
  );
};