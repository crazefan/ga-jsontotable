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
} from "@material-ui/core";

import {
  Cancel,
  KeyboardArrowDown,
  KeyboardArrowRight,
} from "@material-ui/icons";

const RowBuilder = ({ rowData, onUpdated, onDeleted }) => {
  const kids = getRowKids(rowData);
  const { data, __isOpen = true } = rowData;
  const { key, records } = kids || {};
  const hasKids = kids && Array.isArray(records) && records.length > 0;

  const onRowUpdated = () => {};
  const onRowDeleted = () => {};
  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton>{kids ? <KeyboardArrowDown /> : null}</IconButton>
        </TableCell>
        {Object.keys(data).map((key) => (
          <TableCell key={`table-cell-${key}`}>{data[key]}</TableCell>
        ))}
        <TableCell>
          <IconButton>
            <Cancel />
          </IconButton>
        </TableCell>
      </TableRow>
      {hasKids && __isOpen && (
        <TableRow>
          <TableCell colSpan={100}>
            <Box py={4}>
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
  return (
    <Table size={"small"}>
      <TableHead>
        <TableRow>
          {headLabels.map((label, i) => (
            <TableCell key={`head-label-${label}-${i}`}>{label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, i) => (
          <RowBuilder
            key={`row-builder-item-${JSON.stringify(row)}`}
            rowData={row}
            onDeleted={onRowUpdated}
            onUpdated={onRowUpdated}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default TableBuilder;
