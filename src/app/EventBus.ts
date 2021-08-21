class EventBusClass {
    subscriptions: any = {};
    lastId: number = 0;

    get getNextUniqueId(): number {
        this.lastId += 1;
        return this.lastId;
    }

    subscribe(event: string, callback: Function): any {
        const id = this.getNextUniqueId;
        if (!this.subscriptions[event]) {
            this.subscriptions[event] = {};
        }
        this.subscriptions[event][id] = callback;
        return {
            unsubscribe: () => {
                delete this.subscriptions[event][id];
                if (Object.keys(this.subscriptions[event]).length === 0)
                    delete this.subscriptions[event];
            },
        };
    }

    publish(event: string) {
        if (!this.subscriptions[event]) {
            return;
        }
        Object.keys(this.subscriptions[event]).forEach((key) =>
            this.subscriptions[event][key]()
        );
    }
}

const EventBus = new EventBusClass();
export default EventBus;
