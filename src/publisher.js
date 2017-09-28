class Publisher {
    constructor(data) {
        this.moduleName = "Publisher module";
        console.log(this.moduleName);

        this.subscribers = [];
    }

    fireEvent() {
        this.subscribers.forEach(function(fn) {
            fn(data);
        });

        return this;
    }

    subscribe(observer, context = null) {
        this.subscribers.push({ observer, context });
    }

    unsubscribe(type, fn, context) {
        let i = 0;
        while (i < this.subscribers.length) {
            if (this.subscribers[i].observer === observer && this.subscribers[i].context === context) {
                this.subscribers = this.subscribers.splice(i, 1);
            } else {
                i++;
            }
        }
    }
}

module.exports.Publisher = Publisher;