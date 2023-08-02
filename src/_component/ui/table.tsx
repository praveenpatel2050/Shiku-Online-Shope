import React, { FC, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  IconButton,
  Stack,
  Popover,
  Button,
  TableFooter,
  Box,
  SvgIcon,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import CustomTablePagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BadgeIcon from '@mui/icons-material/Badge';
interface IColumn {
  id: string;
  label: string;
  action?: any[];
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
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [currentUserId, setCurrentUserId] = useState<string>("");

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
      {(rowsPerPage > 0
            ? item.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : item
          ).map((data, index) => {
          return (
            <StyledTableRow hover key={index}>
              {columns.map((column, index) => {
                  if (column.id === "actions" && column?.action) {
                    
                    return (
                      <TableCell
                        sx={{
                          "@media (min-width: 200px) and (max-width: 560px)": {
                            fontSize: "0.675rem",
                          },
                        }}
                        key={index}
                      >
                          <Button
                          id={data._id}
                          aria-describedby={id}
                          variant="contained"
                          onClick={(event) => {
                            setCurrentUserId(data._id);
                            handleClick(event);
                          }}
                        >
                          <MoreHorizIcon />
                        </Button>
                        <Popover
                          id={data._id}
                          open={open}
                          anchorEl={anchorEl}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                        >
                             <Stack direction="row" sx={{boxShadow: '5px 10px #888888'}}>
                            {column.action.map(
                              (actionItem: any, indexb: number) => {
                                return (
                                  <Button
                                  startIcon={
                                    
                                       <BadgeIcon /> 
                                  }
                                  key={indexb}
                                  sx={{
                                    backgroundColor: "purple",
                                    "@media (min-width: 200px) and (max-width: 600px)": {
                                      padding: "2px 12px",
                                      fontSize: "0.7rem",
                                    },
                                  }}
                                  onClick={() => {
                                    navigate(`/userlist/details/user/${currentUserId}`);
                                  }}
                                  variant="contained"
                                >
                                  User Details
                                </Button>
                                );
                              },
                            )}
                          </Stack>
                        </Popover>
                        </TableCell>
              );
            }
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
