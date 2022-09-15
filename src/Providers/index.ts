import { DappSonar } from "../DappSonar";
import { Notify } from "../Notify/Notify";
import { NotifyApi } from "../Notify/NotifyApi";
import { NotifyLog } from "../Notify/NotifyLog";
import { NotifyVoid } from "../Notify/NotifyVoid";
import container from "simple-di";


container.register('Notify', (): Notify => {
    if (process.env.NODE_ENV === 'test') {
        return new NotifyVoid()
    }
    if (process.env.NODE_ENV === 'production') {
        return new NotifyApi(container.get('Api'))
    }
    return new NotifyLog()
});

container.register('Api', (): Api => new Api(DappSonar.apikey));

export default container
