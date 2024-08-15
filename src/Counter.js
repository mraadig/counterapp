import React, { useState } from 'react';
import './Counter.css';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const increment = () => {
    if (count < 150) {
      setUndoStack([...undoStack, count]);
      setCount(count + 1);
      setRedoStack([]);
    }
  };

  const decrement = () => {
    if (count > 0) {
      setUndoStack([...undoStack, count]);
      setCount(count - 1);
      setRedoStack([]);
    }
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const lastValue = undoStack.pop();
      setRedoStack([...redoStack, count]);
      setCount(lastValue);
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const lastValue = redoStack.pop();
      setUndoStack([...undoStack, count]);
      setCount(lastValue);
    }
  };

  return (
    <div className="counter-container">
      <h1>Counter App</h1>
      <div className="button-container">
        <button onClick={decrement}>Decrement</button>
        <button onClick={increment}>Increment</button>
      </div>
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${(count / 150) * 100}%` }}
        >
          <div className="progress-bar-circle"></div>
          {count}%
        </div>
      </div>
      <div className="undo-redo-container">
        <button onClick={handleUndo} disabled={undoStack.length === 0}>Undo</button>
        <button onClick={handleRedo} disabled={redoStack.length === 0}>Redo</button>
      </div>
    </div>
  );
};

export default Counter;
