import _remove from 'lodash/remove';
import _forEach from 'lodash/forEach';

export interface Observer {
    notify(payload: any);
}

interface Subject {
    registerObserver(o: Observer);
    unregisterObeserver(o: Observer);
    notifyObservers(payload: any);
}

class EventBus implements Subject {
    private _observers: Observer[] = [];

    registerObserver(o: Observer) {
        this._observers.push(o);
    }
    unregisterObeserver(o: Observer) {
        _remove(this._observers, el => el === o);
    }
    notifyObservers(payload: any) {
        _forEach(this._observers, o => o.notify(payload));
    }
}

export const globalEventBus = new EventBus();
