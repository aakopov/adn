import { Application } from './application';

let application = new Application("3000", "/var/run/docker.sock");
application.start();