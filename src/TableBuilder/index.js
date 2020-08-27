import React from "react";

import { getHeadLabelsFromRows } from "../utils";

import {
  Box,
  Table,
  TableRow,
  TableCell,
  TableHead,
  IconButton,
  TableBody,
  Typography,
  Tab,
} from "@material-ui/core";

const TableBuilder = ({ rows, onRowUpdated }) => {
  const headLabels = getHeadLabelsFromRows(rows);
  return (
    <Table>
      <TableHead>
        <TableRow>
          {headLabels.map((label, i) => (
            <TableCell>{label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody></TableBody>
    </Table>
  );
};

export default TableBuilder;
