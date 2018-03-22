declare function require(path: string): any;

const http = require("http");

export class SocketService {
    constructor(private socketPath : string){}

    public invokeSocket(path : string, method : string, data : any) : Promise<any> {
        var options = {
            socketPath : this.socketPath,
            method: method,
            path: path,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return new Promise((resolve, error) => {
            var request = http.request(options, (response) => {
                response.setEncoding("UTF-8");
                var chunks = '';
                response.on('data', data => chunks += data);
                response.on('end', () => resolve(chunks));
                response.on('error', data => error(data));
            });
            if(data){
                request.write(data);
            }
            request.end();
        });
    }
}