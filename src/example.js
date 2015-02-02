var AppDispatcher = new Flux.Dispatcher();

var ListStore = {
    items: [],

    getAll: function () {
        return this.items;
    }
};

MicroEvent.mixin(ListStore);

AppDispatcher.register(function(payload) {
    switch (payload.eventName) {
        case 'new-item':
            ListStore.items.push(payload.newItem);
            ListStore.trigger('change');
            break;
    }

    return true; // Needed for Flux promise resolution
});

ListStore.bind('change', function () {
    console.log('item changed!');
});

ListActions = {
    add: function(item) {
        AppDispatcher.dispatch({
            eventName: 'new-item',
            newItem: item
        });
    }
};
