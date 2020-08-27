import TableBuilder from "./TableBuilder";
import exampleData from "./shared/example-data.json";
import React, { useState } from "react";

function App() {
  const [data, setData] = useState(exampleData);

  const onRowUpdated = (rowToUpdate, indexToUpdate) => {
    setData(
      data.map((row, index) => (index === indexToUpdate ? rowToUpdate : row))
    );
  };
  const onRowDeleted = (indexToDelete) => {
    setData(data.filter((row, index) => index !== indexToDelete));
  };

  return (
    <div>
      <TableBuilder
        rows={data}
        onRowUpdated={onRowUpdated}
        onRowDeleted={onRowDeleted}
      />
    </div>
  );
}

export default App;
