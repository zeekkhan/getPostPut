import express from 'express';

const PORT = 3000;
const app = express();

// Use JSON middleware to parse JSON bodies
app.use(express.json());

// Function to generate random email
const generateRandomEmail = (name) => {
  const domain = ['gmail.com', 'yahoo.com', 'outlook.com', 'example.com'];
  const randomDomain = domain[Math.floor(Math.random() * domain.length)];
  return `${name.toLowerCase()}@${randomDomain}`;
};

// Mock array of items with replaced names and random emails
let items = [
  { id: 1, name: 'Ahmad', email: "ahmad@gmail.com.pk" },
  { id: 2, name: 'Asad', email: "asad@gmail.com" }
];

// GET request to fetch all items
app.get('/api/items', (req, res) => {
  res.status(200).json({
    message: 'Fetched Data Successfully',
    data: items
  });
});

// POST request to add a new item
app.post('/api/items', (req, res) => {
  const { id, name } = req.body;

  // Generate a random email for the new item
  const newItem = {
    id: id || items.length + 1, // Auto-increment ID if not provided
    name,
    email: generateRandomEmail(name)
  };

  // Add the new item to the array
  items.push(newItem);

  res.status(201).json({
    message: 'Item added successfully!',
    data: newItem
  });
});

// PUT request to update an item by ID
app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  // Find the item to update
  const itemIndex = items.findIndex(item => item.id == id);

  if (itemIndex !== -1) {
    // Update the item and regenerate the email based on the new name
    items[itemIndex] = { id: parseInt(id), name, email: generateRandomEmail(name) };

    res.status(200).json({
      message: 'Item updated successfully!',
      data: items[itemIndex]
    });
  } else {
    res.status(404).json({
      message: 'Item not found!'
    });
  }
});

// DELETE request to remove an item by ID
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;

  // Find the item to delete
  const itemIndex = items.findIndex(item => item.id == id);

  if (itemIndex !== -1) {
    const deletedItem = items.splice(itemIndex, 1);

    res.status(200).json({
      message: 'Item deleted successfully!',
      data: deletedItem
    });
  } else {
    res.status(404).json({
      message: 'Item not found!'
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
