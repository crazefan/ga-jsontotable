import React from "react";

import { getHeadLabelsFromRows, getRowKids } from "../utils";

import {
  Box,
  Table,
  TableRow,
  TableCell,
  TableHead,
  IconButton,
  TableBody,
  Typography,
  TableContainer,
  Paper,
} from "@material-ui/core";

import { withStyles, makeStyles } from "@material-ui/core/styles";

import {
  Cancel,
  KeyboardArrowDown,
  KeyboardArrowRight,
} from "@material-ui/icons";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#b8ffef",
    color: theme.palette.common.black,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const RowBuilder = ({ rowData, onUpdated, rowIndex, onDeleted }) => {
  const kids = getRowKids(rowData);

  const { data, __isOpen = false } = rowData;
  const { key, records } = kids || {};

  const hasKids = kids && Array.isArray(records) && records.length > 0;

  const onToggleOpen = () => {
    const newRowState = { ...rowData, __isOpen: !__isOpen };
    onUpdated(newRowState, rowIndex);
  };

  const onDeleteClick = () => {
    onDeleted(rowIndex);
  };

  const onRowUpdated = (rowToUpdate, indexToUpdate) => {
    const newRowState = {
      ...rowData,
      kids: {
        [key]: {
          records: records.map((record, i) =>
            i === indexToUpdate ? rowToUpdate : record
          ),
        },
      },
    };
    onUpdated(newRowState, rowIndex);
  };

  const onRowDeleted = (indexToDelete) => {
    const newRowState = {
      ...rowData,
      kids: {
        [key]: {
          records: records.filter((record, index) => index !== indexToDelete),
        },
      },
    };
    onUpdated(newRowState, rowIndex);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          {hasKids && (
            <IconButton onClick={onToggleOpen}>
              {__isOpen ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
            </IconButton>
          )}
        </TableCell>
        {Object.keys(data).map((key) => (
          <TableCell key={`table-cell-${key}`}>{data[key]}</TableCell>
        ))}
        <TableCell>
          <IconButton onClick={onDeleteClick}>
            <Cancel />
          </IconButton>
        </TableCell>
      </TableRow>
      {hasKids && __isOpen && (
        <TableRow>
          <TableCell colSpan={100}>
            <Box py={1} px={1}>
              <Typography>{key}</Typography>
              <TableBuilder
                rows={records}
                onRowUpdated={onRowUpdated}
                onRowDeleted={onRowDeleted}
              />
            </Box>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

const TableBuilder = ({ rows, onRowUpdated, onRowDeleted }) => {
  const headLabels = getHeadLabelsFromRows(rows);
  const classes = useStyles();

  return (
    <Box my={2} mx={2}>
      <TableContainer className={classes.table} component={Paper}>
        <Table size={"small"}>
          <TableHead>
            <TableRow>
              {headLabels.map((label, i) => (
                <StyledTableCell key={`head-label-${label}-${i}`}>
                  {label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <RowBuilder
                key={`row-builder-item-${JSON.stringify(row)}`}
                rowData={row}
                rowIndex={i}
                onDeleted={onRowDeleted}
                onUpdated={onRowUpdated}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableBuilder;
