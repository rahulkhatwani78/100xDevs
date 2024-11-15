In the file index.html of render-functionality folder, we have tried to replicate the React functionality, 
But in our render function we are first clearing the content of the "ol (#todos)" element and then we are creating the todos again.
The above process happens everytime the new todo is added.
But, React actually does this in a very optimized way, it compares the old state with the new state and renders the difference,
This process is know as reconcilation.