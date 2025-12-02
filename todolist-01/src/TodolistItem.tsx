export const TodolistItem = () => {
  return (
    <div>
      <h3>What to learn</h3>
      <input></input>
      <button>+</button>
      <ul>
        <li><input type="checkbox" checked={true}/><span>HTML&CSS</span></li>
        <li><input type="checkbox" checked={true}/><span>JS</span></li>
        <li><input type="checkbox" checked={false}/><span>React</span></li>
      </ul>
      <button>All</button>
      <button>Active</button>
      <button>Completed</button>


    </div>
  );
};

export default TodolistItem;