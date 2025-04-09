import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProjectShow from "./component/project/ProjectShow";
import TaskShow from "./component/task/TaskShow"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProjectShow/>}/>
        <Route path="task/:TaskId" element={<TaskShow/>}/>
      </Routes>
    </Router>
  )
}
export default App