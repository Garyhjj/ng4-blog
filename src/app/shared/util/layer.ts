import { Subject } from 'rxjs/Subject';
export class Layer {
    private informer:Subject<any>;
    private listener:Subject<any>;
    private topLayers:Set<Layer>;
    constructor() {
        this.informer = new Subject();
        this.listener = new Subject();
    }

    inform(target) {
        this.informer.next(target);
    }
    dealWithInform(target:any,cb:Function) {
        return this.informer.asObservable().filter((name) => name === target)
        .subscribe(() => cb())
    }
    reponse(data) {
        this.listener.next(data);
    }
    dealWithResponse(cb:Function,emit:boolean=true) {
        return this.listener.asObservable().subscribe((data) => {
            let res = cb(data);
            emit && this.responseToTopLayer(res);
        });
    }
    responseToTopLayer(res) {
        if(!res) return;
        let topLayers = this.topLayers;
        if(topLayers && topLayers.size>0) {
            topLayers.forEach((layer) => layer.reponse(res))
        }
    }
    addTopLayer(layer:Layer) {
        this.topLayers = this.topLayers || new Set();
        this.topLayers.add(layer);
    }
    removeTopLayer(layer:Layer) {
        let topLayers = this.topLayers;
        if(topLayers && topLayers.size>0) {
            this.topLayers.delete(layer);
        }
    }
}