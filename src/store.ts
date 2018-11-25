import makeInspectable from 'mobx-devtools-mst';
import mainStore from 'models/rootStore';

// Makes the store inspectable by the mobx devtools
const store = makeInspectable(mainStore);
export default store;
