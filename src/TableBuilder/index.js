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
  const { data, isOpen = false } = rowData;
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
    </>
  );
};

const TableBuilder = ({ rows, onRowUpdated, onRowDeleted }) => {
  const headLabels = getHeadLabelsFromRows(rows);
  return (
    <Table>
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
