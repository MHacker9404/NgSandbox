import _remove from 'lodash/remove';
import _forEach from 'lodash/forEach';

export const LESSONS_LIST_AVAILABLE = 'NEW_LIST_AVAILABLE';
export const ADD_NEW_LESSON = 'ADD_NEW_LESSON';

export interface Observer {
    notify(payload: any);
}

interface Subject {
    registerObserver(eventType: string, obs: Observer);
    unregisterObeserver(eventType: string, obs: Observer);
    notifyObservers(eventType: string, payload: any);
}

class EventBus implements Subject {
    private _observers: { [key: string]: Observer[] } = {};

    registerObserver(eventType: string, obs: Observer) {
        this.observersPerEventType(eventType).push(obs);
    }
    unregisterObeserver(eventType: string, obs: Observer) {
        _remove(this.observersPerEventType(eventType), el => el === obs);
    }
    notifyObservers(eventType: string, payload: any) {
        _forEach(this.observersPerEventType(eventType), obs => obs.notify(payload));
    }
    private observersPerEventType(eventType: string): Observer[] {
        // const obs = this._observers[eventType];
        // if(!obs){
        //     this._observers[eventType] = [];
        // }
        // return this._observers[eventType];
        return this._observers[eventType] || (this._observers[eventType] = []);
    }
}

export const globalEventBus = new EventBus();
