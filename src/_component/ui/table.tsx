import React, { FC } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableFooter,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import CustomTablePagination from "./Pagination";

interface IColumn {
  id: string;
  label: string;
}

interface ITables {
  columns: IColumn[];
  data: any[];
  pagination: boolean;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Tables: FC<ITables> = ({
  data: item,
  columns,
  pagination,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    onPageChange(event, newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onRowsPerPageChange(event);
  };

  return (
    <Table sx={{ minWidth: 100 }} stickyHeader aria-label="sticky table">
      <TableHead>
        <StyledTableRow>
          {columns.map((column, index) => {
            return (
              <StyledTableCell key={index}>{column.label}</StyledTableCell>
            );
          })}
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {item.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => {
          return (
            <StyledTableRow hover key={index}>
              {columns.map((column, index) => {
                return (
                  <StyledTableCell key={index}>
                    {data[column.id]}
                  </StyledTableCell>
                );
              })}
            </StyledTableRow>
          );
        })}
      </TableBody>
      {pagination && (
        <TableFooter>
          <TableRow>
            <CustomTablePagination
              count={item.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
};

export default Tables;
