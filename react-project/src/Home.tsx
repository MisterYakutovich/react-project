import './Home.css';

function Home() {
  return (
    <div className="container">
      <div className="sidebar">
        <h3>Sidebar</h3>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
      <div className="main-content">
        <h2>CRUD Example</h2>
        <div id="form-container" className="form-container">
          <form id="item-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea id="description" name="description"></textarea>
            </div>
            <button type="submit">Save</button>
          </form>
        </div>
        <table id="item-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
        <button id="add-item-button">Add Item</button>
      </div>
    </div>
  );
}
export default Home;
