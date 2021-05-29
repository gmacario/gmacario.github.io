import express from 'express'

//
// Create a server instance to serve the '_static' folder
//

// Set listening port
const PORT = process.env.PORT || 8080

const app = express()

// Serve static pages
app.use(express.static('../../_static'));

app.listen(PORT, () => console.log(`Now serving contents on port ${PORT}`))
.on('error', (err) => console.log(err.message))
// EOF
