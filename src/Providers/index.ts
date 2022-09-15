import { DappSonar } from "../DappSonar";
import { Notify } from "../Notify/Notify";
import { NotifyApi } from "../Notify/NotifyApi";
import { NotifyLog } from "../Notify/NotifyLog";
import { NotifyVoid } from "../Notify/NotifyVoid";
import { Container } from 'typedi';


Container.set('Api', (): Api => new Api(DappSonar.apikey));

Container.set('Notify', ((): Notify => {
    if (process.env.NODE_ENV === 'test') {
        return new NotifyVoid()
    }
    console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'production') {
        return new NotifyApi(Container.get<Api>('Api'))
    }
    return new NotifyLog()
})());


export default Container


