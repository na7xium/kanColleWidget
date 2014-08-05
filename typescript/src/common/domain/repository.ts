
module KCW {
    export class Repository {
        private storage: Storage = window.localStorage;
        constructor(private key: string, storage: Storage = null) {
            if (storage != null) this.storage = storage;
        }
        get(): Object {
            return JSON.parse(this.storage.getItem(this.key));
        }
        set(val: any) {
            return this.storage.setItem(this.key, JSON.stringify(val));
        }
    }
}
