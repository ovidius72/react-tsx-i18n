import makeInspectable from 'mobx-devtools-mst';
import mainStore from 'models/rootStore';

const store = makeInspectable(mainStore);
export default store;
