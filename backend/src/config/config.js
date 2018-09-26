const TEST = "TEST";
const DEV = "DEV";
const PROD = "PROD";

const env = process.env.NODE_ENV || DEV;
console.log(`Your environment is: ${env}`);

if (env === DEV) {
  process.env.PORT = 8081;
  process.env.MONGODB_URI = "mongodb://localhost:27017/UserManagement"
} else if (env === TEST) {
  process.env.PORT = 3001;
  process.env.MONGODB_URI = "mongodb://localhost:27017/UserManagementTest"
} else if (env === PROD) {
  process.env.PORT = 80;
  process.env.MONGODB_URI = "mongodb://localhost:27017/UserManagement";
}

