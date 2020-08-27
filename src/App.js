import TableBuilder from "./TableBuilder";
import exampleData from "./shared/example-data.json";
import React, { useState } from "react";

function App() {
  const [data, setData] = useState(exampleData);

  const onRowUpdated = () => {};

  return (
    <div>
      <TableBuilder rows={data} onRowUpdated={onRowUpdated} />
    </div>
  );
}

export default App;
