import {config} from 'dotenv'
config();

console.log(process.env.port)
export default {
    port: 4000
}