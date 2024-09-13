import fs from 'fs';
import swaggerDocs from '../config/swaggerConfig.js'; 

// Write the Swagger JSON to a file
fs.writeFileSync('./backend/public/swagger.json', JSON.stringify(swaggerDocs, null, 2), 'utf-8');
console.log('Swagger JSON generated successfully.');